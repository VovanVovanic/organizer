import React from 'react'
import {ItemType } from '../../app/App'

type ItemPropsType = ItemType & {
  onItemDelete:(id:number)=>void
}
const ListItem: React.FC<ItemPropsType> = ({ id, title, isDone, onItemDelete }) => {
  const onDeleted = () => {
    onItemDelete(id)
  }
  return (
    <li><input type='checkbox' checked={isDone} /><span>{title}</span><button onClick = {onDeleted}>del</button></li>
  )
}
export default ListItem