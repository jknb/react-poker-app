import React from 'react';
import classes from './PokerTable.module.css';

import { getRotateAngle, getTranslationY } from 'libraries/tableSeatsPositioning';

import { Players } from 'components/game/components';
import { Dealer } from 'components/game/components';

const PokerTable = ({ players, dealerIndex, winnerIndex, winningHandCombo }) => {
  const playersPositionStyle = players.map((player, index) => {
    const playerRotateAngle = getRotateAngle(index, players.length);
    const playerTranslationY = getTranslationY(index, players.length);

    return {
      transform:
        `rotate(${playerRotateAngle}rad) 
        translateY(${playerTranslationY}px) 
        rotate(-${playerRotateAngle}rad)`
    };
  });

  const dealerRotateAngle = getRotateAngle(dealerIndex, players.length);
  const dealerTranslationY = 80 - getTranslationY(dealerIndex, players.length);
  const dealerButtonPositionStyle = {
    transform:
      `rotate(${dealerRotateAngle}rad) 
      translateY(${dealerTranslationY}px) 
      rotate(-${dealerRotateAngle}rad)`
  };

  return (
    <div className={classes.PokerTable}>
      <br />
      *Winner: {players[winnerIndex].name}*
      <br />
      *Combo: {winningHandCombo}
      <Players players={players} tablePositions={playersPositionStyle} />
      <Dealer dealerButtonPositionStyle={dealerButtonPositionStyle} />
    </div>
  );
};

export default PokerTable;