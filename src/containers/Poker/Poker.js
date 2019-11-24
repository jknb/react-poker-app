import React, { Component } from 'react';
import { PokerTable } from '../../components/PokerTable/PokerTable';
import Players from '../../components/Players/Players';
import BettingPanel from '../../components/BettingPanel/BettingPanel';

import { generatedDeck } from '../../components/Deck/Deck';
import { playerList } from './playerList';

import { shuffle } from 'lodash-es';
import classes from './Poker.module.css';

class Poker extends Component {
  state = {
    deck: [],
    players: playerList
  }

  constructor(props) {
    super(props);
    
    const newDeck = shuffle(generatedDeck());
    
    this.state.players.forEach(player => {
      player.hand = newDeck.splice(0, 2);
    });
    
    this.state.deck = newDeck;
  }

  raiseClicked = (amount) => {
    const raiseAmount = amount > this.state.players[0].chips ? this.state.players[0].chips : amount;
    console.log('Raising by ' + raiseAmount);

    const newPlayers = [...this.state.players];
    newPlayers[0].chips -= raiseAmount;
    
    this.setState({
      players: newPlayers
    }); 
  }

  render() {
    return (
      <div className={classes.Poker}>
        <PokerTable>
          <Players players={this.state.players}/>
        </PokerTable>
        <BettingPanel 
          chips={this.state.players[0].chips} 
          raiseClicked={this.raiseClicked}/>
      </div>
    );
  }
}

export default Poker;