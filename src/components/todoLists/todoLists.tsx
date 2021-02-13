import classes from '../app/App.module.scss';
import React from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'
import AddItemForm from '../common/addItemForm/addItemForm';
import EditableTitle from '../common/editableTitle/editableTitle';
import { Button, Grid, GridList } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

type todoListTypes = {
  title: string;
  todoListId: string;
  tasks: TasksType;
  onItemDelete: (id: string, todoId: string) => void;
  changeFilter: (value: FilterType, todoListId: string) => void;
  active: FilterType;
  onAdded: (value: string, todoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  changeTitle: (todoListId: string, todoId: string, title: string) => void;
  changeTodoName: (todoListId:string, title:string)=> void
  removeTodoList: (todoListId: string) => void;
};

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, onItemDelete, changeFilter, active, onAdded, changeStatus, todoListId, removeTodoList, changeTitle, changeTodoName}) => {
 
 
  
  const changeFilterHandler = (value: FilterType) => {
    changeFilter(value, todoListId)
  }

  const onItemDeleteHandler = (id: string) => {
  onItemDelete(id, todoListId)
  }
  const changeStatusHandler = (id: string, isDone: boolean,) => {
    changeStatus(id, isDone, todoListId)
  }

  const onTodoRemove = () => {
  removeTodoList(todoListId)
}
  const onTaskAdded = (title: string) => {
    onAdded(title, todoListId);
  }
  const onChangeTitle = (todoId: string, value: string) => {
    changeTitle(todoListId, todoId, value)
  }
  const OnChangeTodoName = (title: string) => {
    changeTodoName(todoListId, title)
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