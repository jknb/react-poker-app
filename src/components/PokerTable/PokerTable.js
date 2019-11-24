import React from 'react';
import classes from './PokerTable.module.css';

export const PokerTable = (props) => (
  <div className={classes.PokerTable}>
    {props.children}
  </div>
);