
import React, { useCallback } from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'
import AddItemForm from '../common/addItemForm/addItemForm';
import EditableTitle from '../common/editableTitle/editableTitle';
import { Button, Grid} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from 'react-redux';
import { addNewTask, changeTaskStatus, changeTaskTitle, removeTask } from '../../redux/task-reducer';
import { changeTodolistFilter, changeTodolistTitle, removeTodolist } from '../../redux/todos-reduser';

type todoListTypes = {
  title: string;
  todoListId: string;
  tasks: TasksType;
  active: FilterType;
};

const TodoLists: React.FC<todoListTypes> = React.memo(({ title, tasks, active, todoListId}) => {
  
  const dispatch = useDispatch();
  
  const changeFilterHandler = (value: FilterType) => {
    dispatch(changeTodolistFilter(todoListId, value));
  }

  const onItemDeleteHandler = useCallback((id: string) => {
   dispatch(removeTask(id, todoListId));
  }, [dispatch, todoListId])
  
  const changeStatusHandler = useCallback((id: string, isDone: boolean,) => {
    dispatch(changeTaskStatus(id, isDone, todoListId));
  },[dispatch, todoListId])

  const onTodoRemove = useCallback(() => {
  dispatch(removeTodolist(todoListId));
  }, [dispatch, todoListId])
  
  const onTaskAdded = useCallback((title: string) => {
   dispatch(addNewTask(title, todoListId));
  }, [dispatch, todoListId])
  
  const onChangeTitle = useCallback((todoId: string, value: string) => {
        dispatch(changeTaskTitle(todoId, value, todoListId));
        dispatch(changeTaskStatus(todoId, false, todoListId));
  }, [dispatch, todoListId])
  
  const OnChangeTodoName = useCallback((title: string) => {
    dispatch(changeTodolistTitle(todoListId, title));
  },[dispatch, todoListId])

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
  const itemList = onFilterHandler(tasks, active).map(({...props}) => {
    return <ListItem
      key={props.id}
      {...props}
      onItemDelete={onItemDeleteHandler}
      changeStatus={changeStatusHandler}
      changeTitle={onChangeTitle}
    />;
  })
  return (
    <Grid container>
      <Grid item xs>
        <EditableTitle value={title} onTitleChange={OnChangeTodoName} type='header'/>
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          startIcon={<DeleteIcon />}
          onClick={onTodoRemove}
          style={{marginLeft:"30px"}}
        >
          list
        </Button>
      </Grid>

      <AddItemForm addTitle={onTaskAdded} name={"task"} placeholder='type your task name'/>
      <Grid item style={{width: "100%"}}>{itemList}</Grid>
      <Buttons changeFilterClick={changeFilterHandler} active={active} />
    </Grid>
  );
})
export default TodoLists