import { GENERATE_DECK, SHUFFLE_DECK, SHUFFLE_NEW_DECK } from '../actions/types';

const initialState = {
  deck: [],
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case GENERATE_DECK:
      return {
        ...state,
        deck: payload
      }
    case SHUFFLE_DECK:
      return {
        ...state,
        deck: payload
      }  
    case SHUFFLE_NEW_DECK:
      return {
        ...state,
        deck: payload
      }
    default:
      return state;
  }
};