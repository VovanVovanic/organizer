
import { Container, Grid, Paper } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateTodoList, fetchTodolists, TodoListsCommonType } from '../../redux/todos-reduser';
import AddItemForm from '../common/addItemForm/addItemForm';
import Header from '../header/header';
import TodoLists from '../todoLists/todoLists';
import classes from './App.module.scss';
import { AppRootStateType } from '../../redux/store';
import { TaskType } from '../../api/api';
import { LinearProgress } from "@material-ui/core";
import { RequestStatusType } from '../../redux/app-reducer';
import { ErrorSnackbar } from '../common/errorSnackbar/errorSnackbar';


export type TasksStateType = {
  [key: string]: Array<TaskType>;
};


function App() {

  const dispatch = useDispatch()
  const todos = useSelector<AppRootStateType, Array<TodoListsCommonType>>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

  useEffect(() => {
    dispatch(fetchTodolists());
  }, [])



  const onTodoAdded = useCallback((title: string) => {
    dispatch(fetchCreateTodoList(title));
  }, [dispatch])

  return (
    <div className={classes.App}>
      <Header />
      <ErrorSnackbar />
      {status === 'loading' &&  <LinearProgress color="primary" variant="indeterminate" style={{ height: "10px", backgroundColor: "#abe9cd", backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)" }} />}
      <Container fixed>
        <Grid container style={{ padding: "30px", justifyContent: "center" }}>
          <AddItemForm
            addTitle={onTodoAdded}
            name={"todo"}
            placeholder="Type todo name to start"
          />
        </Grid>
        <Grid
          container
          spacing={3}
          style={{ marginTop: "50px" }}
          direction="row"
          justify="space-between"
        >
          {todos.map((el) => {
            return (
              <Grid key={el.id} item style={{ width: "500px" }}>
                <Paper style={{ padding: "10px" }}>
                  <TodoLists
                    key={el.id}
                    todoListId={el.id}
                    title={el.title}
                    tasks={tasks[el.id]}
                    active={el.filter}
                    entityStatus={el.entityStatus}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
