import React from 'react';
import { useCalc } from '../contexts/calcContext';

const TotalResults = () => {
  const { semesters, totalGpa, totalPercentage, totalGrade, totalEstimateGrade } = useCalc();

  return (
    semesters.length !== 1 && (
      <div className="total-results">
        <div className="total-results-container ">
          <div className="total-gpa">
            <div className="total-gpa-title">Total GPA</div>
            <div className="total-gpa-arrow">:</div>
            <div className="total-gpa-value">{totalGpa === null ? 'UoU' : totalGpa}</div>
          </div>
          <div className="total-estimate">
            {totalPercentage === null || totalGrade === null || totalEstimateGrade === null ? (
              'General Estimate'
            ) : (
              <>
                <div className="total-estimate-part">{totalPercentage + '%'}</div>
                <div className="small-divider">|</div>
                <div className="total-estimate-part">{totalEstimateGrade}</div>
                <div className="small-divider">|</div>
                <div className="total-estimate-part">{totalGrade}</div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TotalResults;
