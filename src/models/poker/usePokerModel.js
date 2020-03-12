import { useDispatch, useSelector } from 'react-redux';

import { generateSortedDeck, generateShuffledDeck, updateDeck } from './actions';
import { deck } from './selectors';

const usePokerModel = () => {
  const dispatch = useDispatch();

  return {
    deck: useSelector(deck),
    generateSortedDeck: () => dispatch(generateSortedDeck()),
    generateShuffledDeck: () => dispatch(generateShuffledDeck()),
    updateDeck: (deck) => dispatch(updateDeck(deck)),
  };
};

export default usePokerModel;