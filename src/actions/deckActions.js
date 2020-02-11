import { GENERATE_DECK, SHUFFLE_DECK } from './types';
import { generatedDeck } from '../components/Deck/Deck';
import { shuffle } from 'lodash-es';

export const generateDeck = () => {
  return ({
    type: GENERATE_DECK,
    payload: generatedDeck()
  });
};

export const shuffleDeck = deck => {
  return ({
    type: SHUFFLE_DECK,
    payload: shuffle(deck)
  });
};
