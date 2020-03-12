import React from 'react';
import classes from './Dealer.module.css';

const Dealer = ({ dealerButtonPositionStyle }) => (
  <div
    className={classes.Dealer}
    style={dealerButtonPositionStyle}
  >
    D
  </div>
);

export default Dealer;