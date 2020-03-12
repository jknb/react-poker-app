import { of } from 'rxjs';
import { combineEpics, ofType, } from 'redux-observable';
import { map, mergeMap, concatMap, } from 'rxjs/operators';

import { generateShuffledDeck, updateDeck, } from 'models/poker/actions';
import { dealHands, initializePlayers, } from 'models/players/actions';
import { initializeGame, startGame, updateTable, } from './actions';

const startGameEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => initializePlayers()),
  );

const initializeGameEpic = (action$, state$) =>
  action$.pipe(
    ofType(initializeGame.type),
    mergeMap(() => of(generateShuffledDeck(), { type: 'DEAL_CARDS' }))
  );

const dealCardsToPlayersEpic = (action$, state$) =>
  action$.pipe(
    ofType('DEAL_CARDS'),
    concatMap(() => {
      const deck = [...state$.value.poker.deck];

      const players = state$.value.players.players.map(player => ({
        ...player,
        hand: deck.splice(0, 5),
        chips: 1500,
        isInHand: true,
      }));

      return [dealHands(players), updateDeck(deck), updateTable(players, deck)];
    })
  );

const epics = combineEpics(initializeGameEpic, dealCardsToPlayersEpic, startGameEpic);

export default epics;

