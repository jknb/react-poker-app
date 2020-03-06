import { GENERATE_DECK, SHUFFLE_DECK } from './types';

import { generatedDeck } from '../components/Deck/Deck';
import { shuffle } from 'lodash-es';

export const generateDeck = () => dispatch => {
  dispatch({
    type: GENERATE_DECK,
    payload: generatedDeck()
  });
};

export const shuffleDeck = () => (dispatch, getState) => {
  dispatch({
    type: SHUFFLE_DECK,
    payload: shuffle(getState().deck.deck)
  });
};

export const genNShuffle = () => (dispatch, getState) => {
  dispatch({
    type: GENERATE_DECK,
    payload: generatedDeck()
  })
  
  dispatch({
    type: SHUFFLE_DECK,
    payload: shuffle(getState().deck.deck)
  })
}
