import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react'
const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <h1>organizer</h1>
      <h3>handle your daily tasks properly</h3>
    </AppBar>
  );
}
export default Header