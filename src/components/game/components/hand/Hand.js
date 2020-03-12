import React from 'react';
import classes from './Hand.module.css';

import { cardNames } from 'components/game/components/deck';

const Card = ({ rank, suit }) => (
  <li className={classes.Card}>
    {cardNames[rank] || rank} of {suit}
  </li>
);

const Hand = ({ cards }) => {
  return (
    <ul className={classes.Hand}>
      {cards.map((card, index) => (
        <Card
          key={index}
          rank={card.rank}
          suit={card.suit}
        />
      ))}
    </ul>
  );
}

export default Hand;