import React from 'react';
import './style.scss';

import { ReactComponent as CloseSquare } from '../../../../assets/svg/Close-Square.svg';
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg';
import { useCalc } from '../../../../contexts/calcContext';
const GardePopup = () => {
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
  const { selectedGrade, setSelectedGrade } = useCalc();

  return (
    <div className="grade-popup">
      <div className="grade-popup-header">
        <div className="grade-popup-title">Grades</div>
        <div className="grade-popup-buttons">
          <div className="grade-popup-button">
            <EditIcon />
          </div>
          <div className="grade-popup-button">
            <CloseSquare />
          </div>
        </div>
      </div>
      <div className="grade-popup-options">
        {grades.map((grade) => (
          <div className="grade-popup-option" data-grade={grade.name}>
            <div className="grade-popup-option-name">{grade.name}</div>
            <div className="grade-popup-option-value">
              {grade.value.toString().length === 3 ? grade.value : `${grade.value}.0`}
            </div>
            <div className={`grade-popup-option-button ${grade.name === selectedGrade && 'selected'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardePopup;
