import { initializePlayers, dealHands } from './actions';

const initialState = {
  players: [],
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case initializePlayers.type:
      return {
        ...state,
        players: payload,
      }
    case dealHands.type:
      return {
        ...state,
        players: payload,
      }  
    default:
      return state;  
  }
}

export default reducer;