import { useDispatch, useSelector } from 'react-redux';

import { initializeGame, startGame, } from './actions';
import {
  gameHasStarted,
  dealerIndex,
  currentPlayerIndex,
  winnerIndex,
  winningHandCombo,
  startingPlayersLength,
} from './selectors';

const useGameModel = () => {
  const dispatch = useDispatch();

  return {
    gameHasStarted: useSelector(gameHasStarted),
    dealerIndex: useSelector(dealerIndex),
    currentPlayerIndex: useSelector(currentPlayerIndex),
    winnerIndex: useSelector(winnerIndex),
    winningHandCombo: useSelector(winningHandCombo),
    startingPlayersLength: useSelector(startingPlayersLength),
    initializeGame: () => dispatch(initializeGame()),
    startGame: () => dispatch(startGame()),
  }
}

export default useGameModel;