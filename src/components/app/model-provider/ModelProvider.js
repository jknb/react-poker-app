import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import configStore from 'libraries/configStore';

import { reducer as game, epics as gameEpics } from 'models/game';
import { reducer as players, epics as playersEpics } from 'models/players';
import { reducer as poker, } from 'models/poker';

const ModelProvider = ({ children }) => {
  const rootEpic = combineEpics(playersEpics, gameEpics, );
  const rootReducer = combineReducers({
    game,
    players,
    poker,
  });

  const epicMiddleware = createEpicMiddleware();

  const initialState = {};

  const middlewares = [epicMiddleware,];
  const store = configStore(rootReducer, initialState, middlewares);

  epicMiddleware.run(rootEpic);

  return <Provider store={store}>{children}</Provider>;
};

export default ModelProvider;