import React from 'react';

const ControlButton = (props) => {
  return (
    <div className="control-bar-button" onClick={props.onClick}>
      <div className="control-bar-button-icon">{props.icon}</div>
      <div className="control-bar-button-name">{props.name}</div>
    </div>
  );
};

export default ControlButton;
