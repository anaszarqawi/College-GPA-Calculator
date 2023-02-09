import React from 'react';

const GradeInput = () => {
  const [grade, setGrade] = React.useState(null);
  const [customGrade, setCustomGrade] = React.useState(null);
  const [gradeType, setGradeType] = React.useState('letter');

  return <div className="grade-input">{gradeType === 'letter' ? grade : customGrade}</div>;
};

export default GradeInput;
