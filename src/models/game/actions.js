const INITIALIZE_GAME = 'INITIALIZE_GAME';
const START_GAME = 'START_GAME';
const UPDATE_TABLE = 'UPDATE_TABLE';

const initializeGame = () => ({
  type: INITIALIZE_GAME,
});

const startGame = () => ({
  type: START_GAME,
});

const updateTable = (players, deck) => ({
  type: UPDATE_TABLE,
  payload: { players, deck },
})

initializeGame.type = INITIALIZE_GAME;
startGame.type = START_GAME;
updateTable.type = UPDATE_TABLE;

export { initializeGame, startGame, updateTable, };