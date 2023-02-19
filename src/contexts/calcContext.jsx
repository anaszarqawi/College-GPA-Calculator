import React from 'react';
import $ from 'jquery';

const CalcContext = React.createContext({});

export const useCalc = () => React.useContext(CalcContext);

export default function CalcProvider({ children }) {
  const [totalGpa, setTotalGpa] = React.useState('UoU');
  const [totalPercentage, setTotalPercentage] = React.useState(null);
  const [totalGrade, setTotalGrade] = React.useState(null);
  const [totalEstimateGrade, setTotalEstimateGrade] = React.useState(null);

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

  const [defaultGrades, setDefaultGrades] = React.useState([
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

  React.useEffect(() => {
    const semesters = JSON.parse(localStorage.getItem('semesters'));
    const grades = JSON.parse(localStorage.getItem('grades'));
    if (semesters) {
      setSemesters(semesters);
      calculateGPA();
    }

    if (grades) {
      setGrades(grades);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [semesters, grades]);

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
          break;
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

      setSemesters(newSemesters);

      if (semester.gpa === null) {
        setTotalGpa(null);
        setTotalPercentage(null);
        setTotalGrade(null);
        setTotalEstimateGrade(null);
      } else {
        setTotalGpa((+totalPoints / +totalHours).toFixed(2));
        const totalGpa_ = (+totalPoints / +totalHours).toFixed(2);
        setTotalPercentage((((+totalPoints / +totalHours) * 100) / 4).toFixed(2));
        setTotalGrade(getGradeLetter(totalGpa_));
        setTotalEstimateGrade(getEstimateGrade(totalGpa_));
      }
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
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
