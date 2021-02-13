import classes from '../app/App.module.scss';
import React from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'
import AddItemForm from '../common/addItemForm/addItemForm';
import EditableTitle from '../common/editableTitle/editableTitle';

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
    <div>
      <EditableTitle value={title} onTitleChange={OnChangeTodoName}/>
      <button onClick={onTodoRemove}>del</button>
      <AddItemForm addTitle={onTaskAdded} name={"add task"} />
      <ul>{itemList}</ul>
      <Buttons changeFilterClick={changeFilterHandler} active={active} />
    </div>
  );
}
export default TodoLists