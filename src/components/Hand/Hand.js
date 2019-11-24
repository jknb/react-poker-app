import React from 'react';
import Card from './Card/Card';

import uuid from 'uuid';

import classes from './Hand.module.css';

const Hand = (props) => {
  return (
    <ul className={classes.Hand}>
      {props.hand.map(card => (
        <Card 
          key={uuid()} 
          rank={card.rank} 
          suit={card.suit} />
      ))}
    </ul>
  );
}

export default Hand;