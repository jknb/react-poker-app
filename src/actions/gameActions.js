import { INITIALIZE_PLAYERS, INITIALIZE_GAME, START_GAME } from './types';
import { generateDeck, shuffleDeck } from '../actions/deckActions';

export const initializePlayers = () => (dispatch, getState) => {
  dispatch({
    type: INITIALIZE_PLAYERS,
    payload: getState().deck,
  })
}

export const initializeGame = () => (dispatch, getState) => {
  const { players } = getState().game;

  dispatch({
    type: INITIALIZE_GAME,
    payload: {
      players,
    }
  })
}

export const startGame = () => (dispatch) => {
  dispatch(generateDeck())
  dispatch(shuffleDeck())
  dispatch(initializePlayers())
  dispatch(initializeGame())

  dispatch({ 
    type: START_GAME,
  })
}