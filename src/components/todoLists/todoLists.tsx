
import React from 'react'
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

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, active, todoListId}) => {
  
  const dispatch = useDispatch();
  
  const changeFilterHandler = (value: FilterType) => {
    dispatch(changeTodolistFilter(todoListId, value));
  }

  const onItemDeleteHandler = (id: string) => {
   dispatch(removeTask(id, todoListId));
  }
  const changeStatusHandler = (id: string, isDone: boolean,) => {
    dispatch(changeTaskStatus(id, isDone, todoListId));
  }

  const onTodoRemove = () => {
  dispatch(removeTodolist(todoListId));
}
  const onTaskAdded = (title: string) => {
   dispatch(addNewTask(title, todoListId));
  }
  const onChangeTitle = (todoId: string, value: string) => {
        dispatch(changeTaskTitle(todoId, value, todoListId));
        dispatch(changeTaskStatus(todoId, false, todoListId));
  }
  const OnChangeTodoName = (title: string) => {
    dispatch(changeTodolistTitle(todoListId, title));
  }

  const itemList = tasks.map(({...props}) => {
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
}
export default TodoLists