import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Poker from './containers/Poker/Poker';

function App() {
  return (
      <div className="App">
        <Layout>
          <Poker />
        </Layout>
      </div>
  );
}

export default App;
