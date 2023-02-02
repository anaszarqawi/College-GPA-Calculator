import React from 'react';
import './style.scss';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-calculator">
        <div className="card-header">
          <div className="card-header-title">{props.semester.name}</div>
          <div className="card-header-buttons">
            <div className="card-header-button">Edit</div>
            <div className="card-header-button">Delete</div>
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
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <input type="text" placeholder="Untitled Course" value={course.course} />
                </td>
                <td>{course.grade}</td>
                <td>{course.credit}</td>
              </tr>
            );
          })}
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
