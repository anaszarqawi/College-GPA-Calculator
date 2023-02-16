import React from 'react';
import $ from 'jquery';

const CalcContext = React.createContext({});

export const useCalc = () => React.useContext(CalcContext);

export default function CalcProvider({ children }) {
  const semester = {
    id: 0,
    courses: [],
    gpa: 0,
    totalHours: 0,
    totalPoints: 0,
  };

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
      estimate: null,
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
    console.log(newSemesters);

    for (const semester of newSemesters) {
      let semesterPoints = 0;
      let semesterHours = 0;
      for (const course of semester.courses) {
        if (course.grade.value === null) {
          semester.gpa = null;
          break;
        } else {
          semesterPoints += +course.grade.value * +course.credit;
          semesterHours += +course.credit;
        }
        semester.gpa = (+semesterPoints / +semesterHours).toFixed(2);
      }

      setSemesters(newSemesters);
    }
  };

  const getGradeName = (grade) => {
    const gradeObj = grades.find((gradeObj) => gradeObj.value === grade);
    return gradeObj.name;
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
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
