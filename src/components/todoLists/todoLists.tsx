import classes from '../app/App.module.scss';
import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'

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
  const [newTitle, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const changeFilterHandler = (value: FilterType) => {
    changeFilter(value, todoListId)
  }

  const onItemDeleteHandler = (id: string) => {
  onItemDelete(id, todoListId)
  }
  const changeStatusHandler = (id: string, isDone: boolean,) => {
    changeStatus(id, isDone, todoListId)
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  };
  const onTodoRemove = () => {
  removeTodoList(todoListId)
}
  const onAddedNewTitle = () => {
    if (newTitle.trim() !== '') {
      onAdded(newTitle, todoListId);
      setError(null)
      
    }
    else {
      setError("Title is required");
    }
    setTitle('');
    
  }

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onAddedNewTitle()
    e.key === 'Escape' && setTitle('')
  };

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
      <div>
        <input
          className={error ? classes.error : ''}
        value={newTitle}
          onChange={onChangeInput}
          onKeyDown={onKeyPressHandler}
        />
        <Button variant='contained' color='primary' onClick={onAddedNewTitle}>add task</Button>
        {error && <div className={classes.Error}>{error}</div>}
      </div>
      <ul>
        {itemList}
      </ul>
      <Buttons changeFilterClick={changeFilterHandler} active={active}/>
    </div>
  )
}
export default TodoLists