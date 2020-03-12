import { useDispatch, useSelector } from 'react-redux';

import { initializePlayers, dealHands } from './actions';
import { players } from './selectors';

const usePlayersModel = () => {
  const dispatch = useDispatch();

  return {
    players: useSelector(players),
    initializePlayers: () => dispatch(initializePlayers()),
    dealHands: (players) => dispatch(dealHands(players)),
  };
};

export default usePlayersModel;