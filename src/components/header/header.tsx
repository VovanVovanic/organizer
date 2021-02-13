import { AppBar, FormControlLabel, FormGroup, Paper, Switch } from '@material-ui/core';
import React from 'react'

//checked={auth} onChange={handleChange}
//auth ? 'Logout' : 'Login'
const Header = () => {
  return (
    <>
      <FormGroup style={{ background: "rgba(31, 58, 147, .9)" }}>
        <FormControlLabel
          style={{ color: "white" }}
          control={<Switch aria-label="login switch" />}
          label={"Login"}
        />
      </FormGroup>
      <AppBar position="static" color="primary">
        <div>
          <h1>organizer</h1>
          <h3>handle your daily tasks properly</h3>
        </div>
      </AppBar>
    </>
  );
}
export default Header