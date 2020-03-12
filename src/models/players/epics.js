import { ofType, combineEpics } from 'redux-observable';
import { map } from 'rxjs/operators';

import { initializeGame } from 'models/game/actions';
import { initializePlayers } from './actions';

const initializePlayersCardsEpic = (action$, state$) =>
  action$.pipe(
    ofType(initializePlayers.type),
    map(() => initializeGame()),
  );

export default combineEpics(initializePlayersCardsEpic);
