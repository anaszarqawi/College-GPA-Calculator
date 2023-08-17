import React from 'react';

const MiniLabel = (props) => {
  return <label className={'mini-label' + ' ' + (props.highlight ? 'highlight-label' : '')}>{props.label}</label>;
};

export default MiniLabel;
