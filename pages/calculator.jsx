/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useCalc } from '../contexts/calcContext';
import ControlBar from '../components/ControlBar/ControlBar';
import Card from '../components/Card';
import TotalResults from '../components/TotalResults';
import { useRouter } from 'next/router';
import FadeChildren from '../components/FadeChildren';

const Calculator = () => {
  const { semesters, setSemesters, grades, setGrades } = useCalc();
  // const [searchParams, setSearchParams] = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    router.push(
      {
        pathname: '/calculator',
        query: { semesters: JSON.stringify(semesters), grades: JSON.stringify(grades) },
      },
      undefined,
      { shallow: true }
    );
  }, [semesters, grades]);

  React.useEffect(() => {
    if (router.query.semesters) {
      setSemesters(JSON.parse(router.query.semesters));
    } else if (JSON.parse(localStorage.getItem('semesters'))) {
      setSemesters(JSON.parse(localStorage.getItem('semesters')));
    }

    if (router.query.grades) {
      setGrades(JSON.parse(router.query.grades));
    } else if (JSON.parse(localStorage.getItem('grades'))) {
      setGrades(JSON.parse(localStorage.getItem('grades')));
    }
  }, []);

  return (
    <>
      <ControlBar />
      <div className="Cards">
        {semesters.map((semester, i) => {
          return (
            // <FadeChildren delay={i + 1} once={true}>
            <>
              <Card semester={semester} i={i} />
              {semesters.length > i + 1 && <hr className="line-divider" key={`line ${i}`}></hr>}
            </>
            // </FadeChildren>
          );
        })}
      </div>
      <TotalResults />
    </>
  );
};

export default Calculator;
