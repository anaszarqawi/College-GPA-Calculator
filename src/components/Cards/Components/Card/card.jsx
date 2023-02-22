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

  const handleChangeTitle = (e) => {
    const newSemesters = [...semesters];
    newSemesters[props.i].name = e.target.value;
    setSemesters(newSemesters);
  };

  const handleChangeCourseName = (e, i) => {
    const newSemesters = [...semesters];
    newSemesters[props.i].courses[i].course = e.target.value;
    setSemesters(newSemesters);
  };

  const handleChangeCredit = (e, i) => {
    const newSemesters = [...semesters];
    newSemesters[props.i].courses[i].credit = e.target.value;
    setSemesters(newSemesters);
    calculateGPA();
  };

  const handleRemoveCourse = (i) => {
    if (props.semester.courses.length === 3) return;

    const newSemesters = [...semesters];
    newSemesters[props.i].courses.splice(i, 1);
    setSemesters(newSemesters);
    calculateGPA();
    if (newSemesters[props.i].courses.length === 3) setEditMode(false);
  };

  const handleAddCourse = () => {
    const newSemesters = [...semesters];
    newSemesters[props.i].courses.push({
      course: '',
      grade: { name: null, value: null },
      credit: 3,
    });
    setSemesters(newSemesters);
    calculateGPA();
  };

  const handleRemove = () => {
    const newSemesters = [...semesters];
    newSemesters.splice(props.i, 1);
    setSemesters(newSemesters);
  };

  const handleLock = () => {
    setLockMode(!lockMode);
    setEditMode(false);
    const newSemesters = [...semesters];
    newSemesters[props.i].isLocked = !newSemesters[props.i].isLocked;
    setSemesters(newSemesters);
  };

  const handleChangeEditMode = () => {
    setEditMode(!editMode);
  };

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
              onChange={handleChangeTitle}
              disabled={props.semester.isLocked}
            />
          </div>
          <div className="card-header-buttons">
            {props.semester.courses.length !== 3 && !props.semester.isLocked && (
              <div className={`card-header-button ${editMode && 'active-button'}`} onClick={handleChangeEditMode}>
                <EditIcon />
              </div>
            )}
            {semesters.length !== 1 && !lockMode && (
              <div className="card-header-button" onClick={handleRemove}>
                <DeleteIcon />
              </div>
            )}
            <div className="card-header-button" onClick={handleLock}>
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
                      onChange={(e) => handleChangeCourseName(e, i)}
                      disabled={props.semester.isLocked}
                    />
                  </td>
                  <td>
                    <GradeInput
                      semesterNum={props.i}
                      courseNum={i}
                      grade={course.grade}
                      isDisabled={props.semester.isLocked}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="-"
                      value={course.credit}
                      onChange={(e) => handleChangeCredit(e, i)}
                      disabled={props.semester.isLocked}
                    />
                  </td>
                  {editMode && (
                    <td onClick={() => handleRemoveCourse(i)}>
                      <CloseSquare />
                    </td>
                  )}
                </tr>
              );
            })}
            {props.semester.courses.length !== 10 && !props.semester.isLocked && (
              <tr className="add-row-btn" onClick={handleAddCourse}>
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
        <div className="card-estimate">
          {props.semester.estimate.percentage === null ||
          props.semester.estimate.grade === null ||
          props.semester.estimate.estimateGrade === null ? (
            'General Estimate'
          ) : (
            <>
              <div className="total-estimate-part">{props.semester.estimate.percentage + '%'}</div>
              <div className="small-divider">|</div>
              <div className="total-estimate-part">{props.semester.estimate.estimateGrade}</div>
              <div className="small-divider">|</div>
              <div className="total-estimate-part">{props.semester.estimate.grade}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
