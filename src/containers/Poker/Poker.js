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
  rounds = [
    {
      name: 'first',
      idk: 0,
    },
    {
      name: 'second',
      idk: 1,
    },
    {
      name: 'showdown',
      idk: 2,
    },
  ];

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
      winningHandCombo: calculateBestHand(playerHands).result[0],
      bettingRound: this.rounds.find(({ name }) => name === 'first'),
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
      lastBettor: currentPlayerIndex,
    });
  }

  foldClickedHandler = () => {
    const { players, currentPlayerIndex } = this.state;

    const newPlayers = players.map((player, index) => (
      index === currentPlayerIndex ? { ...player, hand: [], isInHand: false } : player
    ));

    const bettingRound = this.isRoundOver() ? this.getNextBettingRound() : this.state.bettingRound;

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
      bettingRound: bettingRound,
    });
  }

  callClickedHandler = () => {
    const { players, currentPlayerIndex } = this.state;

    const newPlayers = players.map((player, index) => (
      index === currentPlayerIndex ? { ...player, chips: player.chips - 100 } : player
    ));

    const bettingRound = this.isRoundOver() ? this.getNextBettingRound() : this.state.bettingRound;

    this.setState({
      players: newPlayers,
      currentPlayerIndex: this.getNextPlayerIndex(currentPlayerIndex),
      bettingRound: bettingRound,
    });
  }

  getNextPlayerIndex = (currentPlayerIndex) => {
    // Cycles through indices (players[last] >>> players[first])
    const { players } = this.state;
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return players[nextPlayerIndex].isInHand ? nextPlayerIndex : this.getNextPlayerIndex(nextPlayerIndex);
  }

  isRoundOver = () => {
    const { lastBettor, currentPlayerIndex, players } = this.state;
    return (
      lastBettor === this.getNextPlayerIndex(currentPlayerIndex) ||
      players.filter(player => player.isInHand).length === 1
    );
  }

  getNextBettingRound = () => {
    const currentRoundIndex = this.rounds.indexOf(this.state.bettingRound);
    return this.rounds[(currentRoundIndex + 1) % this.rounds.length];
  }

  render() {
    const {
      players,
      currentPlayerIndex = 0,
      dealerIndex,
      gameStarted,
      winnerIndex = 0,
      winningHandCombo,
      bettingRound = { name: '' },
    } = this.state;

    return (
      <div className={classes.Poker}>
        <PokerTable>
          dealer
          [ cards, pot ]
          <br />
          *Winner: {players[winnerIndex].name}*
          <br />
          *Combo: {winningHandCombo}
          <br />
          Betting Round: {bettingRound.name}
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