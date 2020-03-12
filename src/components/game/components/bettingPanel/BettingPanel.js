import React, { useState } from 'react';
import classes from './BettingPanel.module.css';

import { Button } from 'components';

const RaiseBar = ({ handleChange, inputValue, chips }) => (
  <div className={classes.Bar}>
    <br />
    *Raise Buttons (Min, 1/2, Pot, Max)*
    <br />
    <input type="number" onChange={handleChange} value={inputValue}></input>
    <input type="range" max={chips} onChange={handleChange} value={inputValue}></input>
  </div>
);

const BettingPanel = ({ chips, foldClicked, callClicked, betRaise }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={classes.BettingPanel}>
      <RaiseBar
        chips={chips}
        handleChange={e => setInputValue(e.target.value)}
        inputValue={inputValue}
      />
      <Button
        className={`${classes.Button} ${classes.Left}`}
        clicked={foldClicked}
        value="Fold"
      />
      <Button
        className={`${classes.Button} ${classes.Middle}`}
        clicked={callClicked}
        value="Call"
      />
      <Button
        className={`${classes.Button} ${classes.Right}`}
        clicked={() => betRaise(inputValue)}
        value={"Raise " + inputValue}
      />
    </div>
  );
};

export default BettingPanel;