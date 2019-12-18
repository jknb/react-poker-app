import React from 'react';
import Card from './Card/Card';

import classes from './Hand.module.css';

const Hand = (props) => {
  return (
    <ul className={classes.Hand}>
      {props.hand.map((card, index) => (
        <Card 
          key={index} 
          rank={card.rank} 
          suit={card.suit} />
      ))}
    </ul>
  );
}

export default Hand;