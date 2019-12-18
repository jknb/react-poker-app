import { orderBy } from "lodash-es";
import {
  flow,
  reduce,
  identity,
  uniq,
  sortBy,
  map,
  groupBy,
  partialRight,
} from "lodash-fp";

const Letters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"
];

const maxInARow = weights =>
  flow(
    sortBy(identity),
    uniq,
    reduce(
      (acc, cur, idx, arr) =>
        idx <= arr.length && arr[idx + 1] - cur === 1 ? acc + 1 : acc,
      1
    )
  )(weights);

function cardGroupings(hand) {
  this.ranks = groupBy("rank")(hand);
  this.suits = groupBy("suit")(hand);
  this.highCardsInOrder = orderBy(hand, "weight", "desc");

  this.rankTimes = groupBy("length")(this.ranks);
  this.suitTimes = groupBy("length")(this.suits);

  this.maxInARow = maxInARow(hand.map(({ weight }) => weight));

  this.getOfSameRank = n => this.rankTimes[n] || [];
  this.getOfSameSuit = n => this.suitTimes[n] || [];

  this.hasAce = () => !!this.ranks["A"];
  this.hasInARow = n => this.maxInARow >= n;

  this.hasOfSameRank = n => this.getOfSameRank(n).length;
  this.hasOfSameSuit = n => this.getOfSameSuit(n).length;

  this.isLowStraight = () =>
    maxInARow(hand.map(({ weight }) => (weight === 12 ? -1 : weight))) >= 5;
}

const handRank = {
  RoyalFlush: hand =>
    hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: hand =>
    (hand.hasInARow(5) && hand.hasOfSameSuit(5)) ||
    (hand.isLowStraight() && hand.hasOfSameSuit(5)),
  FourOfAKind: hand => hand.hasOfSameRank(4),
  FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: hand => hand.hasOfSameSuit(5),
  Straight: hand => hand.hasInARow(5) || hand.isLowStraight(),
  ThreeOfAKind: hand => hand.hasOfSameRank(3),
  TwoPair: hand => hand.hasOfSameRank(2) >= 2,
  OnePair: hand => hand.hasOfSameRank(2),
  HighCard: hand => hand.highCardsInOrder
};

const getWeight = ([ranking, func]) => {
  return handRankWeights.find(({ rank }) => rank === ranking)["weight"];
};

const handRankWeights = Object.keys(handRank)
  .reverse()
  .map((rank, index) => ({ rank, weight: index }));

const evaluateHand = hand =>
  Object.entries(handRank).find(([, is]) => is(hand));

//oti xeirotero exw grapsei sti zwi mou
const convertToLetters = hand =>
  flow(
    map(({ weight }) =>
      Object.entries(Letters).find(([index, letter]) => {
        return +index === weight;
      })
    ),
    map(([_, letter]) => letter),
    groupBy(identity),
    partialRight(orderBy, [a => a.length, a => a[0]], ["desc", "desc"])
  )(hand)
    .flatMap(x => x)
    .join("");

const compareHandsAsLetters = (p1Hand, p2Hand) => {
  const { hand: hand1 } = p1Hand;
  const { hand: hand2 } = p2Hand;

  const letters1 = convertToLetters(hand1);
  const letters2 = convertToLetters(hand2);

  return letters1 > letters2 ? p1Hand : letters2 > letters1 ? p2Hand : "TIE";
};

export const calculateBestHand = hands => hands
  .map(hand => ({
    hand: hand,
    result: evaluateHand(new cardGroupings(hand))
  }))
  .reduce((prvHand, curHand) => {
    const prvWeight = getWeight(prvHand.result);
    const curWeight = getWeight(curHand.result);

    if (prvWeight > curWeight) {
      return prvHand;
    } else if (curWeight > prvWeight) {
      return curHand;
    } else {
      return compareHandsAsLetters(prvHand, curHand);
    }
  })

export const winnerIndex = hands => {
  const winningHand = calculateBestHand(hands)['hand'];
  return hands.findIndex(hand => hand === winningHand);
}
  