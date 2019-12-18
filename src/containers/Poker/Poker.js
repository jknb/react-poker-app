import React, { Component } from 'react';
import { PokerTable } from '../../components/PokerTable/PokerTable';
import Players from '../../components/Players/Players';
import BettingPanel from '../../components/BettingPanel/BettingPanel';
import Dealer from '../../components/Dealer/Dealer';

import { generatedDeck } from '../../components/Deck/Deck';
import { playerList } from './playerList';
import { EventEmitter } from '../../events';
import { calculateBestHand, winnerIndex } from './handEvaluator';

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

    const newPlayers = players.map(player => ({
      ...player,
      hand: newDeck.splice(0, 5),
      chips: 1500,
      isInHand: true,
    }));
    
    const dealerIndex = Math.floor(Math.random() * (players.length));
    
    const playerHands = newPlayers.map(player => player.hand);
    console.log('BEST HAND >>> ', calculateBestHand(playerHands));
    console.log('chicken dinner -> ', winnerIndex(playerHands));

    this.setState({
      deck: newDeck,
      players: newPlayers,
      gameStarted: true,
      dealerIndex: dealerIndex,
      currentPlayerIndex: (dealerIndex + 1) % players.length,
      winnerIndex: winnerIndex(playerHands),
      winningHandCombo: calculateBestHand(playerHands)['result'],
    });
  }

  componentDidMount() {
    EventEmitter.subscribe('startGame', this.newGameStart);
  }

  raiseClickedHandler = (amount) => {
    const { players, currentPlayerIndex } = this.state;

    const newPlayers = players.map((player, index) => (
      index === currentPlayerIndex ? { ...player, chips: Math.max(0, player.chips - amount) } : player
    ));

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
    });
  }

  foldClickedHandler = () => {
    const { players, currentPlayerIndex } = this.state;

    const newPlayers = players.map((player, index) => (
      index === currentPlayerIndex ? { ...player, hand: [], isInHand: false } : player
    ));

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
    });
  }

  callClickedHandler = () => {

  }

  getNextPlayerIndex = (currentPlayerIndex) => {
    // Cycles through indices (players[last] >>> players[first])
    const { players } = this.state;
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    return players[nextPlayerIndex].isInHand ? nextPlayerIndex : this.getNextPlayerIndex(nextPlayerIndex);
  }

  render() {
    const {
      players,
      currentPlayerIndex = 0,
      dealerIndex,
      gameStarted,
      winnerIndex = 0,
      winningHandCombo,
    } = this.state;

    return (
      <div className={classes.Poker}>
        <PokerTable>
          dealer
          [ cards, pot ]
          <br /><br />
          *Winner: {players[winnerIndex].name}*
          *Combo: {winningHandCombo}
          <Players players={players} />
          <Dealer dealerIndex={dealerIndex} />
        </PokerTable>
        {gameStarted
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