import React from 'react';
import Navbar from '../../components/Navigation/Navbar';
import classes from './Layout.module.css';

const Layout = (props) => (
  <div className={classes.Layout}>
    <Navbar />
    {props.children}
  </div>
);

export default Layout;