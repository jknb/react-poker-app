import React from 'react';

import './App.css';

import { Layout } from 'components';
import { Game } from 'components';

import ModelProvider from './model-provider';

export const App = () => {
  return (
    <ModelProvider>
      <div className="App">
        <Layout>
          <Game />
        </Layout>
      </div>
    </ModelProvider>
  );
}
