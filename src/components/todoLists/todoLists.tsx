import { Button } from '@material-ui/core'
import React from 'react'
import { TasksType } from '../app/App'
import ListItem from './listItem/listItem'

type todoListTypes = {
  title: string;
  tasks: TasksType;
  onItemDelete: (id: number) => void;
};

const TodoLists: React.FC<todoListTypes> = ({ title, tasks, onItemDelete }) => {
  
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
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  )
}
export default TodoLists