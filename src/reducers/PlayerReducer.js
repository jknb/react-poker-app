import { BET_ACTION__RAISE, BET_ACTION__CALL, BET_ACTION__FOLD } from '../actions/types';
import { getNextPlayerIndex } from '../utils/getNextPlayerIndex';

const initialState = {
  lastBettor: null,
  betAmount: 0,
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case BET_ACTION__RAISE:
      return {
        ...state,
        ...payload,
      }
      
    default:
      return state;
  }
}