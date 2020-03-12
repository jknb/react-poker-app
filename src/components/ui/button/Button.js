import React from 'react';
import classes from './Button.module.css';

const Button = ({ className, clicked, value }) => (
  <button className={`${className} ${classes.Button}`} onClick={clicked}>
    {value}
  </button>
);

export default Button;