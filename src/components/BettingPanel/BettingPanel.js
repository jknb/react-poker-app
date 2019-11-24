import React, { Component } from 'react';
import classes from './BettingPanel.module.css';
import RaiseBar from './RaiseBar/RaiseBar';
import Button from './Button/Button';

class BettingPanel extends Component {
  state = { inputValue: '' }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div className={classes.BettingPanel}>
        <RaiseBar chips={this.props.chips} handleChange={this.handleChange} inputValue={this.state.inputValue}/>
        <Button clicked={this.props.foldClicked} value="Fold" />
        <Button clicked={this.props.callClicked} value="Call" />
        <Button clicked={() => this.props.raiseClicked(this.state.inputValue)} value="Raise" />
      </div>
    );
  }
};

export default BettingPanel;