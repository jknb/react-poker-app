import React from 'react';
import { cardNames } from '../../../cardNames';

import classes from './Card.module.css';

const Card = (props) => (
  <li className={classes.Card}>
    {cardNames[props.rank] || props.rank} of {props.suit}
  </li>
);

export default Card;