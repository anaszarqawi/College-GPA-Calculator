/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';
import Card from './Components/Card/card';
import TotalResults from '../TotalResults/TotalResults';
import { useSearchParams } from 'react-router-dom';
import ControlBar from './Components/ControlBar/ControlBar';

const Cards = () => {
  const { semesters, setSemesters, grades, setGrades } = useCalc();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setSearchParams({ semesters: JSON.stringify(semesters), grades: JSON.stringify(grades) });
  }, [semesters, grades]);

  React.useEffect(() => {
    if (searchParams.get('semesters')) {
      setSemesters(JSON.parse(searchParams.get('semesters')));
    } else if (JSON.parse(localStorage.getItem('semesters'))) {
      setSemesters(JSON.parse(localStorage.getItem('semesters')));
    }

    if (searchParams.get('grades')) {
      setGrades(JSON.parse(searchParams.get('grades')));
    } else if (JSON.parse(localStorage.getItem('grades'))) {
      setGrades(JSON.parse(localStorage.getItem('grades')));
    }
  }, []);

  return (
    <>
      <div className="Cards">
        <ControlBar />
        {semesters.map((semester, i) => {
          return (
            <>
              <Card semester={semester} i={i} />
              {semesters.length > i + 1 && <hr className="line-divider" key={`line ${i}`}></hr>}
            </>
          );
        })}
      </div>
      <TotalResults />
    </>
  );
};

export default Cards;
