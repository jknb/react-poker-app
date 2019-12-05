import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Poker from './containers/Poker/Poker';
import { playerList } from './containers/Poker/playerList';

export const PlayersLengthContext = React.createContext(playerList.length);

function App() {
  return (
    <PlayersLengthContext.Provider value={playerList.length}>
      <div className="App">
        <Layout>
          <Poker />
        </Layout>
      </div>
    </PlayersLengthContext.Provider>
  );
}

export default App;
