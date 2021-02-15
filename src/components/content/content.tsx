import { Container, Grid, Paper } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppRootStateType } from '../../redux/store'
import { fetchCreateTodoList, fetchTodolists, TodoListsCommonType } from '../../redux/todos-reduser'
import { TasksStateType } from '../app/App'
import AddItemForm from '../common/addItemForm/addItemForm'
import TodoLists from '../todoLists/todoLists'

const Content = () => {
  const dispatch = useDispatch()
  const todos = useSelector<AppRootStateType, Array<TodoListsCommonType>>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchTodolists());
  }, [])

  const onTodoAdded = useCallback((title: string) => {
    dispatch(fetchCreateTodoList(title));
  }, [dispatch])
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
  return (
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
  );
}
export default Content