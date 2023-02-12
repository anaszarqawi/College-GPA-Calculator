import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';
import Card from './Components/Card/card';
import GardePopup from './Components/GradePopup/GardePopup';

const Cards = (props) => {
  const { semesters } = useCalc();

  return (
    <div className="Cards">
      {semesters.map((semester, i) => {
        return (
          <>
            <Card semester={semester} i={i} />
            {semesters.length > i + 1 && <hr className="line-divider" key={`line ${i}`}></hr>}
          </>
        );
      })}
      <GardePopup />
    </div>
  );
};

export default Cards;
