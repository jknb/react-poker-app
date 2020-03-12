const Suits = [
  'Spades', 'Clubs', 'Hearts', 'Diamonds'
];

const Ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

export const generatedDeck = () => (
  Object.entries(Ranks).reduce(
    (cards, [weight, rank]) => [
      ...cards,
      ...Suits.map(suit => ({ rank, suit, weight: +weight }))
    ],
    []
  )
);

export const cardNames = {
  14: 'Ace',
  13: 'King',
  12: 'Queen',
  11: 'Jack'
};