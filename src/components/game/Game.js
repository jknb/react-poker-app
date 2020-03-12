import React, { useEffect } from 'react';

import { PokerTable, BettingPanel, } from './components';

const Game = ({
  players,
  deck,
  gameHasStarted,
  dealerIndex,
  currentPlayerIndex = 0,
  winnerIndex = 0,
  winningHandCombo,
}) => {

  return (
    <>
      {gameHasStarted ?
        <>
          <PokerTable
            players={players}
            dealerIndex={dealerIndex}
            winnerIndex={winnerIndex}
            winningHandCombo={winningHandCombo}
          />
          <BettingPanel />
        </>
        :
        null
      }
    </>

  )
}

export default Game;