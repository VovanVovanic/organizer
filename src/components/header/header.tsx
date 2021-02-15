import { AppBar, Avatar, Button, createStyles, FormControlLabel, FormGroup, makeStyles, Theme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppRootStateType } from '../../redux/store';


const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }),
);

  const classes = useStyles();

  let isLogoutBtn = isLoggedIn ? (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => dispatch(logout())}
    >
      Logout
    </Button>
  ) : (
    <Avatar className={classes.purple}>HI</Avatar>
  );

  return (
    <>
      <FormGroup style={{ background: "rgba(31, 58, 147, .9)", padding:"5px 40px" }}>
        <FormControlLabel
          control={isLogoutBtn}
          label={""}
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