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
      id: 0,
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
        {
          course: 'CS 103',
          grade: 'C',
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

  const addSemester = () => {
    const newSemester = { ...semester };
    newSemester.id = semesters.length;
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id) => {
    const newSemesters = semesters.filter((semester) => semester.id !== id);
    setSemesters(newSemesters);
  };

  const value = {
    semesters,
    addSemester,
    removeSemester,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
