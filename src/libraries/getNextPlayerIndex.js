export const getNextPlayerIndex = (currentPlayerIndex, players) => {
  // Cycles through indices (players[last] >>> players[first])  
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  
  return players[nextPlayerIndex].isInHand ? nextPlayerIndex : this.getNextPlayerIndex(nextPlayerIndex);
}