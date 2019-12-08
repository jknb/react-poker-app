import { groupBy } from 'lodash-es';

export const evaluateHand = (hand) => {
  const a = new cardGrouping(hand);
  console.log('ranks ',a.ranks);
  console.log('rankTimes', a.rankTimes);
  // console.log(groupBy(groupBy(hand, 'rank'), 'length'));
}

export function cardGrouping(hand) {
  this.ranks = groupBy(hand, 'rank');
  this.suits = groupBy(hand, 'suit');
  this.rankTimes = groupBy(this.ranks, 'length');
  this.suitTimes = groupBy(this.suits, 'length');

  // const getOfSameRank = n => rankTimes[n] || [];

  // const getOfSameSuit = n => suitTimes[n] || [];

}



