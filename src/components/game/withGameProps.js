import React from 'react';
import { usePlayersModel } from 'models/players';
import { usePokerModel } from 'models/poker';
import { useGameModel } from 'models/game';

const withGameProps = Component => props => {
  const { players } = usePlayersModel();
  const { deck } = usePokerModel();
  const { gameHasStarted, dealerIndex, currentPlayerIndex, winnerIndex, winningHandCombo, } = useGameModel();

  return (
    <Component
      players={players} 
      deck={deck}
      gameHasStarted={gameHasStarted}
      dealerIndex={dealerIndex}
      currentPlayerIndex={currentPlayerIndex}
      winnerIndex={winnerIndex}
      winningHandCombo={winningHandCombo}
      
      {...props}
    />
  );
};

export default withGameProps;