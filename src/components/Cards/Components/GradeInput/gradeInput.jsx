import React from 'react';
import GradePopup from '../GradePopup/GradePopup';
import './style.scss';
import { useCalc } from '../../../../contexts/calcContext';

const GradeInput = (props) => {
  // const [grade, setGrade] = React.useState(null);
  const [isOpened, setIsOpened] = React.useState(false);
  const { grades } = useCalc();

  return (
    <div className="grade-input-container">
      <div
        className={`grade-input ${props.isDisabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!props.isDisabled) setIsOpened(true);
        }}>
        {props.grade.name === null ? '-' : props.grade.name}
      </div>
      <GradePopup
        selectedGrade={props.grade.name}
        // setGrade={setGrade}
        isOpened={isOpened}
        semesterNum={props.semesterNum}
        courseNum={props.courseNum}
        setIsOpened={setIsOpened}
      />
    </div>
  );
};

export default GradeInput;
