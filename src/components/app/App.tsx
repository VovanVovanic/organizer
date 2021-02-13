
import { Container, Grid, Paper } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodolist} from '../../redux/todos-reduser';
import AddItemForm from '../common/addItemForm/addItemForm';
import Header from '../header/header';
import TodoLists from '../todoLists/todoLists';
import classes from './App.module.scss';
import {AppRootStateType} from '../../redux/store';




export type TasksType = Array<ItemType>
export type ItemType = { id: string, title: string, isDone: boolean };
export type FilterType = 'all' | 'active' | 'completed'

export type TaskStateType = {
  [key: string]: Array<ItemType>
}

export type TodoListsType = {
  id:string, title:string, filter: FilterType
}

function App() {
  
  const dispatch = useDispatch()
  const todos = useSelector<AppRootStateType, Array<TodoListsType>>((state) => state.todolists)
   const tasks = useSelector<AppRootStateType, TaskStateType>((state)=>state.tasks)
   



  const onTodoAdded = useCallback((title: string) => {
    dispatch(addTodolist(title));
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
