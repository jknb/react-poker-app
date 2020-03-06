import { INITIALIZE_PLAYERS, INITIALIZE_GAME, START_GAME, PLAYER_ACTION__RAISE } from '../actions/types';
import { calculateBestHand, winnerIndex } from '../containers/Poker/handEvaluator';
import { playerList } from '../containers/Poker/playerList';

const initialState = { gameStarted: false, players: playerList  };

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case INITIALIZE_PLAYERS:
      const deck = [...payload.deck];
      const newPlayers = state.players.map(player => ({
        ...player,
        hand: deck.splice(0, 5),
        chips: 1500,
        isInHand: true,
      }));

      return {
        ...state,
        players: newPlayers,
      }

    case INITIALIZE_GAME:
      const { players } = payload;

      const dealerIndex = Math.floor(Math.random() * (players.length));
      const playerHands = players.map(player => player.hand);

      return {
        ...state,
        gameStarted: true,
        dealerIndex,
        currentPlayerIndex: (dealerIndex + 1) % players.length,
        winnerIndex: winnerIndex(playerHands),
        winningHandCombo: calculateBestHand(playerHands).result[0],
        bettingRound: 'first',
      };

    case START_GAME:
      return state;

    case PLAYER_ACTION__RAISE:
      return {
        ...state,
        ...payload,
      }  
    default:
      return state;
  }

}
