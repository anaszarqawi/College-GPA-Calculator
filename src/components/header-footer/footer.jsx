import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as Github } from '../../assets/svg/Github - Negative.svg';
import { ReactComponent as Linkedin } from '../../assets/svg/LinkedIn - Negative.svg';
import { ReactComponent as Instagram } from '../../assets/svg/Instagram - Negative.svg';
import { ReactComponent as Discord } from '../../assets/svg/Discord - Negative.svg';
import { ReactComponent as Telegram } from '../../assets/svg/Telegram - Negative.svg';

import './style.scss';

const Footer = () => {
  const social = [
    {
      link: 'https://www.linkedin.com/in/anas-zarqawi/',
      icon: <Linkedin className="social-icon" />,
    },
    {
      link: 'https://github.com/anaszarqawi',
      icon: <Github className="social-icon" />,
    },
    {
      link: 'https://www.instagram.com/anaszarqawi_/',
      icon: <Instagram className="social-icon" />,
    },
    {
      link: 'https://discordapp.com/users/823643786499981324',
      icon: <Discord className="social-icon" />,
    },
    {
      link: 'https://www.t.me/anaszarqawi',
      icon: <Telegram className="social-icon" />,
    },
  ];
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="copyright">
          <span className="text">{new Date().getFullYear()} © anaszarqawi_</span>
        </div>
        <a
          href="https://github.com/anaszarqawi/College-GPA-Calculator/releases/tag/v2.0.0"
          target="_blank"
          rel="noopener noreferrer"
          className="version">
          v3.0.0
        </a>

        <div className="social">
          {social.map((site) => {
            return (
              <a href={site.link} target="_blank" rel="noopener noreferrer" className="social-icon-container">
                {site.icon}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
