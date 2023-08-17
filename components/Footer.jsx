import React from 'react';
import Github from '../assets/svg/Github - Negative.svg';
import Linkedin from '../assets/svg/LinkedIn - Negative.svg';
import Instagram from '../assets/svg/Instagram - Negative.svg';
import Discord from '../assets/svg/Discord - Negative.svg';
import Telegram from '../assets/svg/Telegram - Negative.svg';
import MiniLabel from './MiniLabel';

// import { getAnalytics, logEvent } from 'firebase/analytics';
// import { app } from '../utils/firebase-config.js';
// import MiniLabel from './MiniLabel';

const Footer = () => {
  // const analytics = getAnalytics(app);

  const social = [
    {
      name: 'Github',
      link: 'https://www.linkedin.com/in/anas-zarqawi/',
      icon: <Linkedin className="social-icon" />,
    },
    {
      name: 'Linkedin',
      link: 'https://github.com/anaszarqawi',
      icon: <Github className="social-icon" />,
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/anaszarqawi_/',
      icon: <Instagram className="social-icon" />,
    },
    {
      name: 'Discord',
      link: 'https://discordapp.com/users/823643786499981324',
      icon: <Discord className="social-icon" />,
    },
    {
      name: 'Telegram',
      link: 'https://www.t.me/anaszarqawi',
      icon: <Telegram className="social-icon" />,
    },
  ];
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="copyright">
          <span className="text">© {new Date().getFullYear()} anaszarqawi.</span>
        </div>
        <div className="version">
          v3.0
          <MiniLabel label="Beta" />
        </div>

        <div className="social">
          {social.map((site) => {
            return (
              <a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-container"
                // onClick={() => logEvent(analytics, `social_${site.name}`)}
              >
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
