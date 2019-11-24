import React from 'react';
import classes from './Button.module.css';

const buttonPositionFromValue = {
  Fold: 'Left',
  Check: 'Left',
  Call: 'Middle',
  Raise: 'Right',
}

const Button = (props) => {
  const buttonPosition = buttonPositionFromValue[props.value];

  return (
      <button 
        className={[ classes.Button, classes[buttonPosition] ].join(' ')} 
        onClick={props.clicked}>
        {props.value}</button>
  );
};

export default Button;