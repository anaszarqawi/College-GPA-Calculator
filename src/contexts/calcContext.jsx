import React from 'react';
import $ from 'jquery';

const CalcContext = React.createContext({});

export const useCalc = () => React.useContext(CalcContext);

export default function CalcProvider({ children }) {
  const [totalGpa, setTotalGpa] = React.useState('UoU');
  const [totalPercentage, setTotalPercentage] = React.useState(null);
  const [totalGrade, setTotalGrade] = React.useState(null);
  const [totalEstimateGrade, setTotalEstimateGrade] = React.useState(null);
  // detect theme from window and set it
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const [semesters, setSemesters] = React.useState([
    {
      name: '',
      isLocked: false,
      courses: [
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
      ],
      gpa: null,
      estimate: {
        percentage: null,
        grade: null,
        estimateGrade: null,
      },
    },
  ]);

  const [grades, setGrades] = React.useState([
    {
      name: 'A+',
      value: 4.0,
    },
    {
      name: 'A',
      value: 3.8,
    },
    {
      name: 'A-',
      value: 3.6,
    },
    {
      name: 'B+',
      value: 3.4,
    },
    {
      name: 'B',
      value: 3.2,
    },
    {
      name: 'B-',
      value: 3.0,
    },
    {
      name: 'C+',
      value: 2.8,
    },
    {
      name: 'C',
      value: 2.6,
    },
    {
      name: 'C-',
      value: 2.4,
    },
    {
      name: 'D+',
      value: 2.2,
    },
    {
      name: 'D',
      value: 2.0,
    },
    {
      name: 'F',
      value: 0.0,
    },
  ]);

  const defaultGrades = [
    {
      name: 'A+',
      value: 4.0,
    },
    {
      name: 'A',
      value: 3.8,
    },
    {
      name: 'A-',
      value: 3.6,
    },
    {
      name: 'B+',
      value: 3.4,
    },
    {
      name: 'B',
      value: 3.2,
    },
    {
      name: 'B-',
      value: 3.0,
    },
    {
      name: 'C+',
      value: 2.8,
    },
    {
      name: 'C',
      value: 2.6,
    },
    {
      name: 'C-',
      value: 2.4,
    },
    {
      name: 'D+',
      value: 2.2,
    },
    {
      name: 'D',
      value: 2.0,
    },
    {
      name: 'D-',
      value: 1.8,
    },
    {
      name: 'F',
      value: 0.0,
    },
  ];

  React.useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
    localStorage.setItem('grades', JSON.stringify(grades));
    calculateGPA();
  }, [semesters, grades]);

  React.useEffect(() => {
    if (localStorage.getItem('theme')) setTheme(localStorage.getItem('theme'));
    else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') changeThemeToDark();
    if (theme === 'light') changeThemeToLight();
  }, []);

  const calculateGPA = () => {
    const newSemesters = [...semesters];
    let totalPoints = 0;
    let totalHours = 0;

    for (const semester of newSemesters) {
      let semesterPoints = 0;
      let semesterHours = 0;
      for (const course of semester.courses) {
        if (course.grade.value === null) {
          semester.gpa = null;
          semester.estimate.percentage = null;
          semester.estimate.grade = null;
          semester.estimate.estimateGrade = null;

          setTotalGpa(null);
          setTotalPercentage(null);
          setTotalGrade(null);
          setTotalEstimateGrade(null);
          return;
        } else {
          semesterPoints += +course.grade.value * +course.credit;
          semesterHours += +course.credit;
        }
        semester.gpa = (+semesterPoints / +semesterHours).toFixed(2);
        semester.estimate.percentage = (((+semesterPoints / +semesterHours) * 100) / 4).toFixed(2);
        semester.estimate.grade = getGradeLetter(semester.gpa);
        semester.estimate.estimateGrade = getEstimateGrade(semester.gpa);
      }

      totalPoints += semesterPoints;
      totalHours += semesterHours;

      setTotalGpa((+totalPoints / +totalHours).toFixed(2));
      const totalGpa_ = (+totalPoints / +totalHours).toFixed(2);
      setTotalPercentage((((+totalPoints / +totalHours) * 100) / 4).toFixed(2));
      setTotalGrade(getGradeLetter(totalGpa_));
      setTotalEstimateGrade(getEstimateGrade(totalGpa_));
    }
  };

  const getGradeName = (grade) => {
    const gradeObj = grades.find((gradeObj) => gradeObj.value === grade);
    return gradeObj.name;
  };

  const getGradeLetter = (grade) => {
    if (grade < 1.6) return 'F';
    else if (grade < 2.0) return 'D';
    else if (grade < 2.2) return 'D+';
    else if (grade < 2.4) return 'C-';
    else if (grade < 2.6) return 'C';
    else if (grade < 2.8) return 'C+';
    else if (grade < 3.0) return 'B-';
    else if (grade < 3.2) return 'B';
    else if (grade < 3.4) return 'B+';
    else if (grade < 3.6) return 'A-';
    else if (grade < 3.8) return 'A';
    else if (grade <= 4.0) return 'A+';
  };

  const getEstimateGrade = (grade) => {
    if (grade < 1.6) return 'Very Weak';
    else if (grade < 2.0) return 'Weak';
    else if (grade < 2.4) return 'Sufficient';
    else if (grade < 3.0) return 'Good';
    else if (grade < 3.6) return 'Very Good';
    else if (grade <= 4.0) return 'Excellent';
  };

  const resetGrades = () => {
    setGrades([
      {
        name: 'A+',
        value: 4.0,
      },
      {
        name: 'A',
        value: 3.8,
      },
      {
        name: 'A-',
        value: 3.6,
      },
      {
        name: 'B+',
        value: 3.4,
      },
      {
        name: 'B',
        value: 3.2,
      },
      {
        name: 'B-',
        value: 3.0,
      },
      {
        name: 'C+',
        value: 2.8,
      },
      {
        name: 'C',
        value: 2.6,
      },
      {
        name: 'C-',
        value: 2.4,
      },
      {
        name: 'D+',
        value: 2.2,
      },
      {
        name: 'D',
        value: 2.0,
      },
      {
        name: 'D-',
        value: 1.8,
      },
      {
        name: 'F',
        value: 0.0,
      },
    ]);
  };

  const changeThemeToDark = () => {
    document.documentElement.style.setProperty('--color-1', '#1a1e22');
    document.documentElement.style.setProperty('--color-2', '#272d33');
    document.documentElement.style.setProperty('--color-3', '#d8d2cc');
    document.documentElement.style.setProperty('--color-3-60', 'rgba(216, 210, 204, 0.6)');
    document.documentElement.style.setProperty('--color-3-50', 'rgba(216, 210, 204, 0.5)');
    document.documentElement.style.setProperty('--color-3-20', 'rgba(216, 210, 204, 0.2)');
    document.documentElement.style.setProperty('--color-3-10', 'rgba(216, 210, 204, 0.1)');
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  };

  const changeThemeToLight = () => {
    document.documentElement.style.setProperty('--color-1', '#fafafc');
    document.documentElement.style.setProperty('--color-2', '#eaeaed');
    document.documentElement.style.setProperty('--color-3', 'rgb(59, 60, 69)');
    document.documentElement.style.setProperty('--color-3-60', 'rgba(59, 60, 69, 0.6)');
    document.documentElement.style.setProperty('--color-3-50', 'rgba(59, 60, 69, 0.5)');
    document.documentElement.style.setProperty('--color-3-20', 'rgba(59, 60, 69, 0.2)');
    document.documentElement.style.setProperty('--color-3-10', 'rgba(59, 60, 69, 0.1)');
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  const value = {
    semesters,
    setSemesters,
    grades,
    setGrades,
    getGradeName,
    resetGrades,
    calculateGPA,
    defaultGrades,
    totalGpa,
    totalPercentage,
    totalGrade,
    totalEstimateGrade,
    theme,
    setTheme,
    changeThemeToDark,
    changeThemeToLight,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
