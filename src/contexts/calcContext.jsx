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
      name: 'Fall 2020',
      courses: [
        {
          course: 'CS 101',
          grade: 'A',
          credit: 3,
        },
        {
          course: 'CS 102',
          grade: 'B',
          credit: 3,
        },
        {
          course: 'CS 103',
          grade: 'C',
          credit: 3,
        },
      ],
      gpa: 'UoU',
      totalHours: 0,
      totalPoints: 0,
    },
  ]);

  React.useEffect(() => {
    const semesters = JSON.parse(localStorage.getItem('semesters'));
    if (semesters) {
      setSemesters(semesters);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
  }, [semesters]);

  const addSemester = () => {
    const newSemester = { ...semester };
    newSemester.id = semesters.length;
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id) => {
    const newSemesters = semesters.filter((semester) => semester.id !== id);
    setSemesters(newSemesters);
  };

  const toLocalStorage = () => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
  };

  const CalcualteGPA = (courses) => {
    let totalHours = 0;
    let totalPoints = 0;
    courses.forEach((course) => {
      totalHours += parseInt(course.credit);
      totalPoints += parseInt(course.credit) * parseInt(course.grade);
    });
    return (totalPoints / totalHours).toFixed(2);
  };

  const value = {
    semesters,
    setSemesters,
    addSemester,
    removeSemester,
    toLocalStorage,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
