import React, { useState } from 'react';
import './style.scss';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon.svg';
import { ReactComponent as CloseSquare } from '../../../../assets/svg/Close-Square.svg';
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg';
import { ReactComponent as LockIcon } from '../../../../assets/svg/lock-icon.svg';
import { ReactComponent as UnlockIcon } from '../../../../assets/svg/unlock-icon.svg';

import { useCalc } from '../../../../contexts/calcContext';
import GradeInput from '../GradeInput/gradeInput';

const Card = (props) => {
  const { semesters, setSemesters, grades, calculateGPA } = useCalc();
  const [editMode, setEditMode] = useState(false);
  const [lockMode, setLockMode] = useState(false);

  return (
    <div className="card" key={props.i}>
      <div className="card-calculator">
        <div className="card-header">
          <div className="card-header-title">
            <input
              className="input-header"
              type="text"
              placeholder={`Semester ${props.i + 1}`}
              value={props.semester.name}
              onChange={(e) => {
                const newSemesters = [...semesters];
                newSemesters[props.i].name = e.target.value;
                setSemesters(newSemesters);
              }}
            />
          </div>
          <div className="card-header-buttons">
            {props.semester.courses.length !== 3 && !props.semester.isLocked && (
              <div
                className={`card-header-button ${editMode && 'active-button'}`}
                onClick={() => {
                  setEditMode(!editMode);
                }}>
                <EditIcon />
              </div>
            )}
            {semesters.length !== 1 && !lockMode && (
              <div
                className="card-header-button"
                onClick={() => {
                  // delete semester
                  const newSemesters = [...semesters];
                  newSemesters.splice(props.i, 1);
                  setSemesters(newSemesters);
                }}>
                <DeleteIcon />
              </div>
            )}
            <div
              className="card-header-button"
              onClick={() => {
                setLockMode(!lockMode);
                setEditMode(false);
                const newSemesters = [...semesters];
                newSemesters[props.i].isLocked = !newSemesters[props.i].isLocked;
                setSemesters(newSemesters);
              }}>
              {props.semester.isLocked ? <LockIcon /> : <UnlockIcon />}
            </div>
          </div>
        </div>
        <table className="card-body">
          <thead>
            <tr>
              <th className="col-id">#</th>
              <th className="col-course">Course</th>
              <th className="col-grade">Grade</th>
              <th className="col-credit">Credit</th>

              {editMode && <th className="col-delete"></th>}
            </tr>
          </thead>
          <tbody>
            {props.semester.courses.map((course, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type="text"
                      placeholder={`Untitled Course ${i + 1}`}
                      value={course.course}
                      onChange={(e) => {
                        const newSemesters = [...semesters];
                        newSemesters[props.i].courses[i].course = e.target.value;
                        setSemesters(newSemesters);
                      }}
                    />
                  </td>
                  <td>
                    <GradeInput semesterNum={props.i} courseNum={i} grade={course.grade} />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="-"
                      value={course.credit}
                      onChange={(e) => {
                        const newSemesters = [...semesters];
                        newSemesters[props.i].courses[i].credit = e.target.value;
                        setSemesters(newSemesters);
                        calculateGPA();
                      }}
                    />
                  </td>
                  {editMode && (
                    <td
                      onClick={() => {
                        if (props.semester.courses.length === 3) return;

                        const newSemesters = [...semesters];
                        newSemesters[props.i].courses.splice(i, 1);
                        setSemesters(newSemesters);
                        calculateGPA();
                        if (newSemesters[props.i].courses.length === 3) setEditMode(false);
                      }}>
                      <CloseSquare />
                    </td>
                  )}
                </tr>
              );
            })}
            {props.semester.courses.length !== 10 && !props.semester.isLocked && (
              <tr
                className="add-row-btn"
                onClick={() => {
                  const newSemesters = [...semesters];
                  newSemesters[props.i].courses.push({
                    course: '',
                    grade: { name: null, value: null },
                    credit: 3,
                  });
                  setSemesters(newSemesters);
                  calculateGPA();
                  // console.log(newSemesters);
                }}>
                <td className="add-row-btn-id">{props.semester.courses.length + 1}</td>
                <td>Tap to add new course</td>
                <td>-</td>
                <td>3</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="card-result">
        <div className="card-gpa-title">GPA</div>
        <div className="card-gpa-value">{props.semester.gpa ? props.semester.gpa : 'UoU'}</div>
        <div className="card-estimate">Estimate</div>
      </div>
    </div>
  );
};

export default Card;
