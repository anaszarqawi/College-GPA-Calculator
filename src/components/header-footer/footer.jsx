import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as Github } from '../../assets/svg/Github - Negative.svg';
import { ReactComponent as Linkedin } from '../../assets/svg/LinkedIn - Negative.svg';
import { ReactComponent as Instagram } from '../../assets/svg/Instagram - Negative.svg';
import { ReactComponent as Discord } from '../../assets/svg/Discord - Negative.svg';
import { ReactComponent as Telegram } from '../../assets/svg/Telegram - Negative.svg';

import './style.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="copyright">
          {window.innerWidth > 768 && (
            <div className="logo">
              <Logo />
            </div>
          )}
          <span className="text">© {new Date().getFullYear()} anaszarqawi.</span>
        </div>
        <a
          href="https://github.com/anaszarqawi/College-GPA-Calculator/releases/tag/v2.0.0"
          target="_blank"
          rel="noopener noreferrer"
          className="version">
          v3.0.0
        </a>

        <div className="social">
          <a href="https://www.linkedin.com/in/anas-zarqawi/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="social-icon" />
          </a>
          <a href="https://github.com/anaszarqawi" target="_blank" rel="noopener noreferrer">
            <Github className="social-icon" />
          </a>
          <a href="https://www.instagram.com/anaszarqawi_/" target="_blank" rel="noopener noreferrer">
            <Instagram className="social-icon" />
          </a>
          <a href="https://discordapp.com/users/823643786499981324" target="_blank" rel="noopener noreferrer">
            <Discord className="social-icon" />
          </a>
          <a href="https://www.t.me/anaszarqawi" target="_blank" rel="noopener noreferrer">
            <Telegram className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
