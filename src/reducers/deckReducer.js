import { GENERATE_DECK, SHUFFLE_DECK } from '../actions/types';

const initialState = {
  deck: [],
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GENERATE_DECK:
      return {
        deck: action.payload
      }
    case SHUFFLE_DECK:
      return {
        deck: action.payload
      }  
    default:
      return state;
  }
};