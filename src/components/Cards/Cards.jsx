import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';
import Card from './Components/Card/card';

const Cards = (props) => {
  const { semesters } = useCalc();

  return (
    <div className="Cards">
      {semesters.map((semester) => {
        return <Card semester={semester} />;
      })}
    </div>
  );
};

export default Cards;
