import { playerList } from 'libraries/playerList';

const INITIALIZE_PLAYERS = 'INITIALIZE_PLAYERS';
const DEAL_HANDS = 'DEAL_HANDS';

const initializePlayers = () => ({
  type: INITIALIZE_PLAYERS,
  payload: playerList,
});

const dealHands = players => ({
  type: DEAL_HANDS,
  payload: players,
})

initializePlayers.type = INITIALIZE_PLAYERS;
dealHands.type = DEAL_HANDS;

export { initializePlayers, dealHands, };