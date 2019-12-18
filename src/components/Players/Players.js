import React from 'react';
import classes from './Players.module.css';
import Player from './Player/Player';

const Players = (props) => {

  return (
    <ul className={classes.Players}>
      {props.players.map((player, index) => (
        <Player 
          key={index}
          playersLength={props.players.length} 
          seatIndex={index} 
          name={player.name}
          hand={player.hand}
          chips={player.chips} />
      ))}
    </ul>
  );
};

export default Players;