import React, { Component } from 'react';
import { PokerTable } from 'components';
import { Players } from 'components';
import { BettingPanel } from 'components';
import { Dealer } from 'components';

import classes from './Poker.module.css';

import { connect } from 'react-redux';
import { generateDeck, shuffleDeck } from '../../actions/deckActions';
import { initializePlayers } from '../../actions/gameActions';
import { initializeGame } from '../../actions/gameActions';

class Poker extends Component {
  componentDidMount() {}

  raiseClickedHandler = (amount) => {
    const { players, currentPlayerIndex } = this.props;

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
    const { players } = this.props;
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
      game,
    } = this.props;
    const {
      currentPlayerIndex = 0,
      dealerIndex,
      gameStarted,
      winnerIndex = 0,
      winningHandCombo,
      bettingRound = { name: '' },
    } = game;

    return (
      <div className={classes.Poker}>
        <PokerTable>
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
            
            foldClicked={this.foldClickedHandler}
            callClicked={this.callClickedHandler}
          />
          :
          null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deck: state.deck.deck,
    players: state.game.players,
    game: state.game,
  };
}

export default connect(mapStateToProps,
  {
    generateDeck,
    shuffleDeck,
    initializePlayers,
    initializeGame,
  })(Poker);