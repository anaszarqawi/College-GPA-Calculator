import React from 'react';
import './style.scss';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon.svg';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-calculator">
        <div className="card-header">
          <div className="card-header-title">
            <input
              className="input-header"
              type="text"
              placeholder={`Semester ${props.i + 1}`}
              insideText={props.semester.name}
            />
          </div>
          <div className="card-header-buttons">
            <div className="card-header-button">
              <DeleteIcon />
            </div>
          </div>
        </div>
        <table className="card-body">
          <tr>
            <th className="col-id">#</th>
            <th className="col-course">Course</th>
            <th className="col-grade">Grade</th>
            <th className="col-credit">Credit</th>
          </tr>

          {props.semester.courses.map((course, i) => {
            console.log(course.course);
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <input type="text" placeholder={`Untitled Course ${i + 1}`} insideText={course.course} />
                </td>
                <td>{course.grade}</td>
                <td>{course.credit}</td>
              </tr>
            );
          })}
          <tr className="add-row-btn">
            <td className="add-row-btn-id">{props.semester.courses.length + 1}</td>
            <td>Tap to add new course {props.semester.courses.length + 1}</td>
            <td>-</td>
            <td>3</td>
          </tr>
        </table>
      </div>
      <div className="card-result">
        <div className="card-gpa-title">GPA</div>
        <div className="card-gpa-value">{props.semester.gpa}</div>
        <div className="card-estimate">Estimate</div>
      </div>
    </div>
  );
};

export default Card;
