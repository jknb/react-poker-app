import React from 'react';
import classes from './Players.module.css';

import { Hand } from 'components/game/components';

const Player = ({
  name,
  hand,
  chips,
  tablePosition,
}) => (
    <div className={classes.Player} style={tablePosition}>
      <div>{name}</div>
      <Hand cards={hand} />
      <div>Chips: {chips}</div>
    </div>
  );

const Players = ({ players, tablePositions }) => (
  <ul className={classes.Players}>
    {players.map((player, index) => (
      <Player
        key={index}
        tablePosition={tablePositions[index]}
        name={player.name}
        hand={player.hand}
        chips={player.chips}
      />
    ))}
  </ul>
);

export default Players;