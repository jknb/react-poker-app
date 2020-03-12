const gameHasStarted = ({ game }) => game.gameHasStarted;
const dealerIndex = ({ game }) => game.dealerIndex;
const currentPlayerIndex = ({ game }) => game.currentPlayerIndex;
const winnerIndex = ({ game }) => game.winnerIndex;
const winningHandCombo = ({ game }) => game.winningHandCombo;
const startingPlayersLength = ({ game }) => game.startingPlayersLength;

export {
  gameHasStarted,
  dealerIndex,
  currentPlayerIndex,
  winnerIndex,
  winningHandCombo,
  startingPlayersLength,
};