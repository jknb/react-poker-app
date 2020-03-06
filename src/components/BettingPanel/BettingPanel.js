import React, { Component } from 'react';
import classes from './BettingPanel.module.css';
import RaiseBar from './RaiseBar/RaiseBar';
import Button from '../Button/Button';

import { connect } from 'react-redux';
import { betRaise } from '../../actions/playerActions';

class BettingPanel extends Component {
  state = { inputValue: '' }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div className={classes.BettingPanel}>
        <RaiseBar chips={this.props.chips} handleChange={this.handleChange} inputValue={this.state.inputValue}/>
        
          <Button className={`${classes.Button} ${classes.Left}`} clicked={this.props.foldClicked} value="Fold" />
          <Button className={`${classes.Button} ${classes.Middle}`} clicked={this.props.callClicked} value="Call" />
          <Button className={`${classes.Button} ${classes.Right}`} clicked={() => this.props.betRaise(this.state.inputValue)} value={"Raise " + this.state.inputValue} />
        
        
      </div>
    );
  }
};

export default connect(null, { betRaise })(BettingPanel);