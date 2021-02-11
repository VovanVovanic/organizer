import classes from '../../app/App.module.scss';
import React from 'react'
import {ItemType } from '../../app/App'

type ItemPropsType = ItemType & {
  onItemDelete: (id: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
};
const ListItem: React.FC<ItemPropsType> = ({ id, title, isDone, onItemDelete, changeStatus }) => {
  const onDeleted = () => {
    onItemDelete(id)
  }
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked)
  };
  return (
    <li className = {isDone ? classes.IsDone : ''}>
      <input
      type='checkbox'
      checked={isDone}
      onChange={onStatusChange}
    /><span>{title}</span><button onClick={onDeleted}>del</button></li>
  )
}
export default ListItem