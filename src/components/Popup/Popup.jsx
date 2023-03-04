import React from 'react';
import './style.scss';
import { useCalc } from '../../contexts/calcContext';

const Popup = (props) => {
  const { hidePopup } = useCalc();
  return (
    <div
      className={`popup ${props.isOpened ? 'popup-opened' : ''}`}
      onClick={(e) => {
        if (e.target.className === 'popup popup-opened') {
          hidePopup(props.setIsOpened);
        }
      }}>
      <div className="popup-inner">
        <div className="popup-header">
          <div className="popup-title">{props.title}</div>
          {props.buttons && <div className="popup-buttons">{props.buttons}</div>}
        </div>
        <div className="popup-content">{props.content}</div>
      </div>
    </div>
  );
};

export default Popup;
