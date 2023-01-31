import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="title">College GPA Calculator</h1>
        <div className="header-buttons">
          <div className="header-button">New Semester</div>
          <div className="header-button">Reorder</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
