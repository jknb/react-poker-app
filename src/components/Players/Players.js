import React from 'react';
import classes from './Players.module.css';
import Player from './Player/Player';
import uuid from 'uuid';

const Players = (props) => {
  const offSet = 2 * Math.PI / props.players.length;

  return (
    <ul className={classes.Players}>
      {props.players.map((player, index) => (
        <Player 
          key={uuid()} 
          rotateAngle={offSet * index} 
          name={player.name}
          hand={player.hand}
          chips={player.chips} />
      ))}
    </ul>
  );
};

export default Players;