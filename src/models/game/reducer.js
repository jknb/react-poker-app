import { initializeGame, startGame, updateTable, } from './actions';
import { calculateBestHand, winnerIndex } from 'libraries/handEvaluator';

const initialState = {
  gameHasStarted: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case initializeGame.type:
      return {
        state,
      }
    case startGame.type:
      return {
        state,
      }
    case updateTable.type:
      const { players } = payload;
      const dealerIndex = Math.floor(Math.random() * (players.length));
      const playerHands = players.map(player => player.hand);

      return {
        ...state,
        gameHasStarted: true,
        startingPlayersLength: players.length,
        dealerIndex,
        currentPlayerIndex: (dealerIndex + 1) % players.length,
        winnerIndex: winnerIndex(playerHands),
        winningHandCombo: calculateBestHand(playerHands).result[0],
        bettingRound: 'first',
      }
    default:
      return state;
  }
};

export default reducer;