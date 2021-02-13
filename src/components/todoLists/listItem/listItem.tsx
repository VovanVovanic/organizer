import classes from '../../app/App.module.scss';
import React from 'react'
import {ItemType } from '../../app/App'
import EditableTitle from '../../common/editableTitle/editableTitle';

type ItemPropsType = ItemType & {
  onItemDelete: (id: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
  changeTitle: (todoId: string, value: string) => void
};
const ListItem: React.FC<ItemPropsType> = ({ id, title, isDone, onItemDelete, changeStatus, changeTitle }) => {
  const onDeleted = () => {
    onItemDelete(id)
  }
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked)
  };
  const onTitleHandler = (value: string) => {
    changeTitle(id, value)
  }
  return (
    <li className = {isDone ? classes.IsDone : ''}>
      <input
      type='checkbox'
      checked={isDone}
      onChange={onStatusChange}
      />

      <EditableTitle value={title} onTitleChange={onTitleHandler}/><button onClick={onDeleted}>del</button></li>
  )
}
export default ListItem