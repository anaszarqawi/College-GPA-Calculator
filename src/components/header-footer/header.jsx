import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const Header = () => {
  const { semesters, setSemesters, calculateGPA } = useCalc();
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="title">College GPA Calculator</h1>
        <div className="header-buttons">
          {semesters.length !== 20 ? (
            <div
              className="header-button"
              onClick={() => {
                const newSemesters = [...semesters];
                newSemesters.push({
                  name: '',
                  isLocked: false,
                  courses: [
                    {
                      course: '',
                      grade: {
                        name: null,
                        value: null,
                      },
                      credit: 3,
                    },
                    {
                      course: '',
                      grade: {
                        name: null,
                        value: null,
                      },
                      credit: 3,
                    },
                    {
                      course: '',
                      grade: {
                        name: null,
                        value: null,
                      },
                      credit: 3,
                    },
                  ],
                  gpa: null,
                  estimate: {
                    percentage: null,
                    grade: null,
                    estimateGrade: null,
                  },
                });
                setSemesters(newSemesters);
                // calculateGPA();
              }}>
              New Semester
            </div>
          ) : (
            <div className="header-button">Max Semesters</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
