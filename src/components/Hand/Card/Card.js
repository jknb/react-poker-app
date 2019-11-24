import React from 'react';
import classes from './Card.module.css';

const Card = (props) => (
  <li className={classes.Card}>
    {props.rank} of {props.suit}
  </li>
);

export default Card;