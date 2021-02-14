
import { Container, Grid, Paper } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodolist, fetchCreateTodoList, fetchTodolists, TodoListsCommonType} from '../../redux/todos-reduser';
import AddItemForm from '../common/addItemForm/addItemForm';
import Header from '../header/header';
import TodoLists from '../todoLists/todoLists';
import classes from './App.module.scss';
import {AppRootStateType} from '../../redux/store';
import { TaskType } from '../../api/api';



export type TasksStateType = {
  [key: string]: Array<TaskType>;
};


function App() {
  
  const dispatch = useDispatch()
  const todos = useSelector<AppRootStateType, Array<TodoListsCommonType>>((state) => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>((state)=>state.tasks)
   
  useEffect(() => {
    dispatch(fetchTodolists());
  },[])



  const onTodoAdded = useCallback((title: string) => {
    dispatch(fetchCreateTodoList(title));
  },[dispatch])

  return (
    <div className={classes.App}>
      <Header />
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
