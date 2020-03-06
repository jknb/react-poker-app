import { BET_ACTION__RAISE, BET_ACTION__CALL, BET_ACTION__FOLD, PLAYER_ACTION__RAISE } from './types';
import { getNextPlayerIndex } from '../utils/getNextPlayerIndex';

export const betRaise = (amount) => (dispatch, getState) => {
  const { players, currentPlayerIndex } = getState().game;

  const validAmount = Math.min(players[currentPlayerIndex].chips, amount);

  const newPlayers = players.map((player, index) =>
    index === currentPlayerIndex ? { ...player, chips: player.chips - validAmount } : player
  );

  const nextPlayerIndex = getNextPlayerIndex(currentPlayerIndex, newPlayers);

  dispatch({
    type: BET_ACTION__RAISE,
    payload: {
      lastBettor: currentPlayerIndex,
      betAmount: validAmount,
    },
  });

  dispatch({
    type: PLAYER_ACTION__RAISE,
    payload: {
      players: newPlayers,
      currentPlayerIndex: nextPlayerIndex,
    }
  })
}

export const betCall = (currentPlayer) => (dispatch, getState) => {
  dispatch({
    type: BET_ACTION__CALL,
    payload: {
      // TODO currentplayer from state,
      // TODO bet amount from state
    }
  });
}

export const betFold = (currentPlayer) => (dispatch, getState) => {
  dispatch({
    type: BET_ACTION__FOLD,
    payload: {
      // TODO currentplayer from state
    }
  });
} 