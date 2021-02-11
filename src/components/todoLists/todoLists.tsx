import classes from '../app/App.module.scss';
import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'

type todoListTypes = {
  title: string;
  tasks: TasksType;
  onItemDelete: (id: string) => void;
  changeFilter: (value: FilterType) => void;
  active: FilterType;
  onAdded: (value: string) => void;
  changeStatus: (id:string, isDone:boolean)=>void
};

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, onItemDelete, changeFilter, active, onAdded, changeStatus }) => {
  const [newTitle, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  };

  const onAddedNewTitle = () => {
    if (newTitle.trim() !== '') {
      onAdded(newTitle);
      
   }
    setTitle('');
    setError('Title is required')
  }

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onAddedNewTitle()
    e.key === 'Escape' && setTitle('')
  };

  const itemList = tasks.map(({...props}) => {
    return <ListItem
      key={props.id}
      {...props}
      onItemDelete={onItemDelete}
      changeStatus={changeStatus}
   
    />;
  })
  return (
    <div>
      <h3>{title}</h3>
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
      <Buttons changeFilter={changeFilter} active={active}/>
    </div>
  )
}
export default TodoLists