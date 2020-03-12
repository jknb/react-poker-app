import React from 'react';
import classes from './Navbar.module.css';

import { Button } from 'components';

const Navbar = ({ startGame }) => (
  <nav className={classes.Navbar}>
    <Button clicked={startGame} value={'Start Game'} />
  </nav>
);

export default Navbar;