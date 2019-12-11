import {
  groupBy,
  flow,
  sortBy,
  uniq,
  partialRight,
  reduce,
  map,
  orderBy,
} from 'lodash-es';

const maxInARow = weights =>
  flow([
    partialRight(map, x => +x),
    sortBy,
    uniq,
    partialRight(
      reduce,
      (acc, cur, idx, arr) =>
        idx <= arr.length && arr[idx + 1] - arr[idx] === 1 ? acc + 1 : acc,
      1
    )
  ])(weights);

function cardGroupings(hand) {
  this.ranks = groupBy(hand, 'rank');
  this.suits = groupBy(hand, 'suit');
  this.highCardsInOrder = orderBy(hand, 'weight', 'desc');

  this.rankTimes = groupBy(this.ranks, 'length');
  this.suitTimes = groupBy(this.suits, 'length');

  this.maxInARow = maxInARow(hand.map(({ weight }) => weight));

  this.getOfSameRank = n => this.rankTimes[n] || [];
  this.getOfSameSuit = n => this.suitTimes[n] || [];

  this.hasAce = () => !!this.ranks['A'];
  this.hasInARow = n => this.maxInARow >= n;

  this.hasOfSameRank = n => this.getOfSameRank(n).length;
  this.hasOfSameSuit = n => this.getOfSameSuit(n).length;

  this.isLowStraight = () => 
    this.hasAce() 
      ? maxInARow(hand.map(({ weight }) => (weight === 12 ? -1 : weight))) >= 5
      : false;
}

const handRank = {
  RoyalFlush: hand => hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: hand => (hand.hasInARow(5) && hand.hasOfSameSuit(5)) || (hand.isLowStraight() && hand.hasOfSameSuit(5)),
  FourOfAKind: hand => hand.hasOfSameRank(4),
  FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: hand => hand.hasOfSameSuit(5),
  Straight: hand => hand.hasInARow(5) || hand.isLowStraight(),
  ThreeOfAKind: hand => hand.hasOfSameRank(3),
  TwoPair: hand => hand.hasOfSameRank(2) >= 2,
  OnePair: hand => hand.hasOfSameRank(2),
  HighCard: hand => hand.highCardsInOrder,
};

const evaluateHand = hand =>
  Object.entries(handRank)
    .find(([, is]) => is(hand));

export const rank = hand => evaluateHand(new cardGroupings(hand));
