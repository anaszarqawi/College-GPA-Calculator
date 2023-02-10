import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const TotalResults = () => {
  const { semesters } = useCalc();
  const [totalGpa, setTotalGpa] = React.useState(3.5);

  return (
    <div className={`total-results footer ${semesters.length === 1 && 'hide-total-results'}`}>
      <div className="total-results-container footer-container">
        <div className="total-gpa">
          <div className="total-gpa-title">Total GPA</div>
          <div className="total-gpa-arrow">⇒</div>
          <div className="total-gpa-value">{totalGpa}</div>
        </div>
        <div className="total-estimate">
          <div className="total-estimate-part">97.00%</div>
          <div className="estimate-divider">|</div>
          <div className="total-estimate-part">Excellent</div>
          <div className="estimate-divider">|</div>
          <div className="total-estimate-part">A+</div>
        </div>
      </div>
    </div>
  );
};

export default TotalResults;
