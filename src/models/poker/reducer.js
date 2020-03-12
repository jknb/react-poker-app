import { generateSortedDeck, generateShuffledDeck, updateDeck, } from './actions';

import { generatedDeck } from 'components/game/components/deck';
import { shuffle } from 'lodash-es';

const initialState = {
  deck: [],
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case generateSortedDeck.type:
      return {
        ...state,
        deck: generatedDeck(),
      }
    case generateShuffledDeck.type:
      return {
        ...state,
        deck: shuffle(generatedDeck()),
      }
    case updateDeck.type:
      return {
        ...state,
        deck: payload,
      }  
    default:
      return state;
  }
}

export default reducer;