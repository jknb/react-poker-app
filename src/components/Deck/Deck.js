const suits = [
  'Spades',
  'Clubs',
  'Hearts',
  'Diamonds'
];

const ranks = [...Array(13).keys()].map(x => x+2);

export const generatedDeck = () => {
  const deck = [];
  
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit: suit, rank: rank });
    })
  });

  return deck;
}