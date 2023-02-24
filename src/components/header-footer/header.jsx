import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as MoonIcon } from '../../assets/svg/moon-icon.svg';
import { ReactComponent as SunIcon } from '../../assets/svg/sun-icon.svg';

import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const Header = () => {
  const { theme, setTheme, changeThemeToDark, changeThemeToLight } = useCalc();

  // Dark theme
  // --color-1: #1a1e22;
  // --color-2: #272d33;
  // --color-3: #d8d2cc;
  // --color-3-60: rgba(216, 210, 204, 0.6);
  // --color-3-50: rgba(216, 210, 204, 0.5);
  // --color-3-20: rgba(216, 210, 204, 0.2);
  // --color-3-10: rgba(216, 210, 204, 0.1);
  // light theme
  // --color-1: #fafafc;
  // --color-2: #eaeaed;
  // --color-3: rgb(59, 60, 69);
  // --color-3-60: rgba(59, 60, 69, 0.6);
  // --color-3-50: rgba(59, 60, 69, 0.5);
  // --color-3-20: rgba(59, 60, 69, 0.2);
  // --color-3-10: rgba(59, 60, 69, 0.1);

  const handleChangeTheme = () => {
    if (theme === 'dark') changeThemeToLight();
    else changeThemeToDark();
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="title">College GPA Calculator</h1>
        <div className="header-buttons">
          <div className="header-button" onClick={handleChangeTheme}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
