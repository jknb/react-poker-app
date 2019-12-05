import React, { Component } from 'react';
import { PokerTable } from '../../components/PokerTable/PokerTable';
import Players from '../../components/Players/Players';
import BettingPanel from '../../components/BettingPanel/BettingPanel';
import Dealer from '../../components/Dealer/Dealer';

import { generatedDeck } from '../../components/Deck/Deck';
import { playerList } from './playerList';
import { EventEmitter } from '../../events';

import { shuffle } from 'lodash-es';
import classes from './Poker.module.css';

class Poker extends Component {
  state = {
    deck: [],
    players: playerList,
    gameStarted: false,
  }

  newGameStart = () => {
    const { players } = this.state;
    const newDeck = shuffle(generatedDeck());

    const newPlayers = players.map(player => {
      return {
        ...player,
        hand: newDeck.splice(0, 5),
        chips: 1500,
        isInHand: true,
      };
    });

    const dealerIndex = Math.floor(Math.random() * (players.length));

    this.setState({
      deck: newDeck,
      players: newPlayers,
      gameStarted: true,
      dealerIndex: dealerIndex,
      currentPlayerIndex: (dealerIndex + 1) % players.length,
    });
  }

  componentDidMount() {
    EventEmitter.subscribe('startGame', this.newGameStart);
  }

  raiseClickedHandler = (amount) => {
    const { players, currentPlayerIndex } = this.state;
    let { chips } = players[currentPlayerIndex];

    const newPlayers = this.state.players.map((player, index) => { 
      return index === currentPlayerIndex ? {...player, chips: Math.max(0, chips - amount)} : player;
    });

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
    });
  }

  foldClickedHandler = () => {
    const { players, currentPlayerIndex } = this.state;
    
    const newPlayers = players.map((player, index) => {
      return index === currentPlayerIndex ? {...player, hand: [], isInHand: false} : player;
    });

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
    });
  }

  callClickedHandler = () => {
    
  }

  getNextPlayerIndex = (currentPlayerIndex) => {
    // Cycles through indices (players[last + 1] -> players[first])
    const { players } = this.state;
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    return players[nextPlayerIndex].isInHand ? nextPlayerIndex : this.getNextPlayerIndex(nextPlayerIndex);
  }

  render() {
    const { 
      players,
      currentPlayerIndex = 0,
      dealerIndex,
    } = this.state;

    return (
      <div className={classes.Poker}>
        <PokerTable>
          dealer
          [ cards, pot ]
          <br /><br />
          *Current Player: {players[currentPlayerIndex].name}*
          <Players players={players} />
          <Dealer dealerIndex={dealerIndex} />
        </PokerTable>
        {this.state.gameStarted
          ?
          <BettingPanel
            chips={players[currentPlayerIndex].chips}
            raiseClicked={this.raiseClickedHandler}
            foldClicked={this.foldClickedHandler}
            callClicked={this.callClickedHandler}
          />
          :
          null}
      </div>
    );
  }
}

export default Poker;