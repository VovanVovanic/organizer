import classes from '../app/App.module.scss';
import React from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'
import AddItemForm from '../addItemForm/addItemForm';

type todoListTypes = {
  title: string;
  todoListId: string;
  tasks: TasksType;
  onItemDelete: (id: string, todoId: string) => void;
  changeFilter: (value: FilterType, todoListId: string) => void;
  active: FilterType;
  onAdded: (value: string, todoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId:string)=>void;
};

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, onItemDelete, changeFilter, active, onAdded, changeStatus, todoListId, removeTodoList}) => {
 
 
  
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

  const itemList = tasks.map(({...props}) => {
    return <ListItem
      key={props.id}
      {...props}
      onItemDelete={onItemDeleteHandler}
      changeStatus={changeStatusHandler}
   
    />;
  })
  return (
    <div>
      <h3>{title}<button onClick={onTodoRemove}>del</button></h3>
      <AddItemForm addTitle={onTaskAdded}/>
      <ul>
        {itemList}
      </ul>
      <Buttons changeFilterClick={changeFilterHandler} active={active}/>
    </div>
  )
}
export default TodoLists