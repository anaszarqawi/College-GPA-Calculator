import React from 'react';
import './style.scss';

import { ReactComponent as CloseSquare } from '../../../../assets/svg/Close-Square.svg';
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg';
import { useCalc } from '../../../../contexts/calcContext';

const GradePopup = (props) => {
  const { grades, setGrades, semesters, setSemesters, resetGrades, calculateGPA } = useCalc();
  const [editMode, setEditMode] = React.useState(false);

  return (
    <div className="grade-popup">
      <div className="grade-popup-header">
        {!editMode && <div className="grade-popup-title">Grades</div>}
        {editMode && (
          <div
            className="grade-popup-title title-btn"
            onClick={() => {
              resetGrades();
            }}>
            Reset
          </div>
        )}

        <div className="grade-popup-buttons">
          <div
            className={`grade-popup-button ${editMode && 'active-button'}`}
            onClick={() => {
              setEditMode(!editMode);
            }}>
            <EditIcon />
          </div>
          <div
            className="grade-popup-button"
            onClick={() => {
              props.setIsOpened(false);
            }}>
            <CloseSquare />
          </div>
        </div>
      </div>
      <div className="grade-popup-options">
        {grades.map((grade, i) => (
          <div
            className="grade-popup-option"
            data-grade={grade.name}
            onClick={() => {
              if (!editMode) {
                const newSemesters = [...semesters];
                newSemesters[props.semesterNum].courses[props.courseNum].grade = grade;
                setSemesters(newSemesters);
                props.setIsOpened(false);
                calculateGPA();
              }
            }}>
            <div className="grade-popup-option-name-container">
              <div className="grade-popup-option-name">{grade.name}</div>
            </div>
            <input
              type="number"
              className={`grade-popup-option-value ${editMode && 'active-input'}`}
              value={grade.value}
              onChange={(e) => {
                if (editMode) {
                  const newGrades = [...grades];
                  newGrades[i].value = e.target.value;
                  setGrades(newGrades);
                }
              }}
              disabled={!editMode}></input>

            {!editMode && (
              <div className="grade-popup-option-button-container">
                <div className={`grade-popup-option-button ${grade.name === props.selectedGrade && 'selected'}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradePopup;
