import React from 'react';
import { useGameModel } from 'models/game';

const withNavbarProps = Component => props => {
  const { startGame } = useGameModel();

  return (
    <Component startGame={startGame} {...props} />
  );
};

export default withNavbarProps;