import React from 'react';
import classes from './RaiseBar.module.css';

const RaiseBar = props => {
    return (
      <div className={classes.Bar}>
        <br />
        *Raise Buttons (Min, 1/2, Pot, Max)*
        <br />
        <input type="number" onChange={props.handleChange} value={props.inputValue}></input>
        <input type="range" max={props.chips} onChange={props.handleChange} value={props.inputValue}></input>
      </div>
    );
};

export default RaiseBar;