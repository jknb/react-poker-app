import React from 'react';
import Button from '../Button/Button';
import classes from './Navbar.module.css';
import { EventEmitter } from '../../events';


const Navbar = (props) => {
  const startGameHandler = () => {
    EventEmitter.dispatch('startGame', null);
  }
  
  return (
    <nav className={classes.Navbar}>
      <Button clicked={startGameHandler} value={'Start Game'} />
    </nav>
  );
};

export default Navbar;