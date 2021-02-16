

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import classes from './App.module.scss';
import { AppRootStateType } from '../../redux/store';
import { TaskType } from '../../api/api';
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { initializeApp, RequestStatusType } from '../../redux/app-reducer';
import { ErrorSnackbar } from '../common/errorSnackbar/errorSnackbar';
import Content from '../content/content';
import Login from '../common/login/login';
import { Redirect, Route, Switch } from 'react-router-dom';
import Page404 from '../common/404/404';


export type TasksStateType = {
  [key: string]: Array<TaskType>;
};


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeApp());
  },[])
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
console.log(isInitialized);

  if (!isInitialized) {
   return <div
       style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
       <CircularProgress/>
   </div>
}

  return (
    <div className={classes.App}>
      <Header />
      <ErrorSnackbar />
      {status === "loading" && (
        <LinearProgress
          color="primary"
          variant="indeterminate"
          style={{
            height: "10px",
            backgroundColor: "#abe9cd",
            backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
          }}
        />
      )}
      <Switch>
        <Route exact path={"/"} render={() => <Content />} />
        <Route exact path={"/login"} render={() => <Login />} />
        <Route path={"*"} render={() => <Page404 />} />
        <Redirect from={"*"} to={"/404"} />
      </Switch>
    </div>
  );
}

export default App;
