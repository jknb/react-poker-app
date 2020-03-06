import { combineReducers } from 'redux';
import DeckReducer from './DeckReducer';
import PlayerReducer from './PlayerReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  deck: DeckReducer,
  betActions: PlayerReducer,
  game: GameReducer,
});
