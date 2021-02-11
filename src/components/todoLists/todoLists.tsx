import { Button } from '@material-ui/core'
import React from 'react'
import { FilterType, TasksType } from '../app/App'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'

type todoListTypes = {
  title: string;
  tasks: TasksType;
  onItemDelete: (id: number) => void;
  changeFilter: (value: FilterType) => void;
  active: FilterType
};

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, onItemDelete, changeFilter, active }) => {
  
  const itemList = tasks.map(({...props}) => {
    return <ListItem key={props.id} {...props} onItemDelete={onItemDelete}/>;
  })
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/><Button variant = 'contained' color='primary'>add task</Button>
      </div>
      <ul>
        {itemList}
      </ul>
      <Buttons changeFilter={changeFilter} active={active}/>
    </div>
  )
}
export default TodoLists