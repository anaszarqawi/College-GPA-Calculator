import React, { useState } from 'react';
import './style.scss';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon.svg';
import { ReactComponent as CloseSquare } from '../../../../assets/svg/Close-Square.svg';
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg';
import { ReactComponent as LockIcon } from '../../../../assets/svg/lock-icon.svg';
import { useCalc } from '../../../../contexts/calcContext';

const Card = (props) => {
  const { semesters, setSemesters } = useCalc();
  const [editMode, setEditMode] = useState(false);
  const [lockMode, setLockMode] = useState(false);

  return (
    <div className="card">
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
            {semesters.length !== 1 && (
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
              className={`card-header-button ${props.semester.isLocked && 'active-button'}`}
              onClick={() => {
                setLockMode(!lockMode);
                const newSemesters = [...semesters];
                newSemesters[props.i].isLocked = !newSemesters[props.i].isLocked;
                setSemesters(newSemesters);
              }}>
              <LockIcon />
            </div>
          </div>
        </div>
        <table className="card-body">
          <tr>
            <th className="col-id">#</th>
            <th className="col-course">Course</th>
            <th className="col-grade">Grade</th>
            <th className="col-credit">Credit</th>

            {editMode && <th className="col-delete"></th>}
          </tr>

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

                <td>{course.grade}</td>
                <td>
                  <input
                    type="number"
                    placeholder="-"
                    value={course.credit}
                    onChange={(e) => {
                      const newSemesters = [...semesters];
                      newSemesters[props.i].courses[i].credit = e.target.value;
                      setSemesters(newSemesters);
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
                  grade: '-',
                  credit: 3,
                });
                setSemesters(newSemesters);
                console.log(newSemesters);
              }}>
              <td className="add-row-btn-id">{props.semester.courses.length + 1}</td>
              <td>Tap to add new course {props.semester.courses.length + 1}</td>
              <td>-</td>
              <td>3</td>
            </tr>
          )}
        </table>
      </div>
      <div className="card-result">
        <div className="card-gpa-title">GPA</div>
        <div className="card-gpa-value">UoU</div>
        <div className="card-estimate">Estimate</div>
      </div>
    </div>
  );
};

export default Card;
