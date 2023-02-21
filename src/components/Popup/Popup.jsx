import React from 'react';
import './style.scss';

const Popup = (props) => {
  return (
    <div
      className={`popup ${props.isOpened ? 'popup-opened' : ''}`}
      onClick={() => {
        props.setIsOpened(!props.isOpened);
      }}>
      <div className="popup-inner">
        <div className="popup-header">
          <div className="popup-title">{props.title}</div>
        </div>
        <div className="popup-content">{props.content}</div>
      </div>
    </div>
  );
};

export default Popup;
