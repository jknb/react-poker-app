import React from 'react';
import Button from '../Button/Button';
import classes from './Navbar.module.css';

import { connect } from 'react-redux';
import { startGame } from '../../actions/gameActions';

const Navbar = (props) => { 
  return (
    <nav className={classes.Navbar}>
      <Button clicked={props.startGame} value={'Start Game'} />
    </nav>
  );
};

export default connect(null, { startGame })(Navbar);