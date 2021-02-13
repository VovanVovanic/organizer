
import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodolist, removeTodolist } from '../../redux/todos-reduser';
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
   

  const onFilterHandler = (arr: TasksType, filter: FilterType) => {
    switch (filter) {
      case "all": {
        return arr;
      }
      case "active": {
        return arr.filter((el) => !el.isDone);
      }
      case "completed": {
        return arr.filter((el) => el.isDone);
      }
      default:
        return arr;
    }
  };

  const onTodoAdded = (title: string) => {
    dispatch(addTodolist(title));
  }

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
              <Grid item style={{ width: "500px" }}>
                <Paper style={{ padding: "10px" }}>
                  <TodoLists
                    key={el.id}
                    todoListId={el.id}
                    title={el.title}
                    tasks={onFilterHandler(tasks[el.id], el.filter)}
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
