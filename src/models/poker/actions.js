const GENERATE_SORTED_DECK = 'GENERATE_SORTED_DECK';
const GENERATE_SHUFFLED_DECK = 'GENERATE_SHUFFLED_DECK';
const UPDATE_DECK = 'UPDATE_DECK';

const generateSortedDeck = () => ({
  type: GENERATE_SORTED_DECK,
});

const generateShuffledDeck = () => ({
  type: GENERATE_SHUFFLED_DECK,
});

const updateDeck = deck => ({
  type: UPDATE_DECK,
  payload: deck,
})

generateSortedDeck.type = GENERATE_SORTED_DECK;
generateShuffledDeck.type = GENERATE_SHUFFLED_DECK;
updateDeck.type = UPDATE_DECK;

export { generateSortedDeck, generateShuffledDeck, updateDeck, };