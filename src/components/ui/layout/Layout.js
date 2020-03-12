import React from 'react';
import { Navbar } from 'components';
import classes from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={classes.Layout}>
    <Navbar />
    {children}
  </div>
);

export default Layout;