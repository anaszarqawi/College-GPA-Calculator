import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const TotalResults = () => {
  const { semesters, totalGpa } = useCalc();

  return (
    semesters.length !== 1 && (
      <div className="total-results">
        <div className="total-results-container ">
          <div className="total-gpa">
            <div className="total-semesters">
              {semesters.length} {semesters.length === 1 ? 'Semester' : 'Semesters'}
            </div>
            <div className="small-divider">|</div>
            <div className="total-gpa-title">Total GPA</div>
            <div className="total-gpa-arrow">⇒</div>
            <div className="total-gpa-value">{totalGpa === null ? 'UoU' : totalGpa}</div>
          </div>
          <div className="total-estimate">
            <div className="total-estimate-part">97.00%</div>
            <div className="small-divider">|</div>
            <div className="total-estimate-part">Excellent</div>
            <div className="small-divider">|</div>
            <div className="total-estimate-part">A+</div>
          </div>
        </div>
      </div>
    )
  );
};

export default TotalResults;
