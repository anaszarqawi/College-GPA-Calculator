import React from 'react';
import Link from 'next/link';

import Logo from '../assets/svg/logo';
import MoonIcon from '../assets/svg/moon-icon';
import SunIcon from '../assets/svg/sun-icon';

import { useCalc } from '../contexts/calcContext';
import { useTheme } from 'next-themes';

const Header = () => {
  const { changeThemeToDark, changeThemeToLight } = useCalc();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = React.useState('light');

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

  React.useEffect(() => {
    if (theme !== 'system') setMode(theme);
    else setMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="header-buttons">
          {/* <div className="header-button">
            <SettingsIcon />
          </div> */}
          <div className="header-button" onClick={() => (mode === 'dark' ? setTheme('light') : setTheme('dark'))}>
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
