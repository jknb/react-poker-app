import React, { Component } from 'react';
import { PokerTable } from '../../components/PokerTable/PokerTable';
import Players from '../../components/Players/Players';
import BettingPanel from '../../components/BettingPanel/BettingPanel';

import { generatedDeck } from '../../components/Deck/Deck';
import { playerList } from './playerList';
import { EventEmitter } from '../../events';

import { shuffle } from 'lodash-es';
import classes from './Poker.module.css';

class Poker extends Component {
  state = {
    deck: [],
    players: playerList,
  }

  newGameStart = () => {
    const newDeck = shuffle(generatedDeck());
    const newPlayers = [...this.state.players];
    
    newPlayers.forEach(player => {
      player.hand = newDeck.splice(0, 2);
      player.chips = 1500;
    }); 
    
    this.setState({
      deck: newDeck,
      players: newPlayers,
    });
  }

  componentDidMount() {
    EventEmitter.subscribe('startGame', this.newGameStart);
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