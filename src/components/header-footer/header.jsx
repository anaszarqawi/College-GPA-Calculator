import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const Header = () => {
  const { semesters, setSemesters, calculateGPA } = useCalc();
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="title">College GPA Calculator</h1>
        <div className="header-buttons">
          <div className="header-button">Calculator</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
