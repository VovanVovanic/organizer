import classes from '../../app/App.module.scss';
import React from 'react'
import {ItemType } from '../../app/App'
import EditableTitle from '../../common/editableTitle/editableTitle';
import { Button, Checkbox, Grid, Paper } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

type ItemPropsType = ItemType & {
  onItemDelete: (id: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
  changeTitle: (todoId: string, value: string) => void
};
const ListItem: React.FC<ItemPropsType> = ({ id, title, isDone, onItemDelete, changeStatus, changeTitle }) => {
  let isShadow = isDone && classes.isDone
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
    <Paper className={classes.Paper + ' ' + isShadow} elevation={3}>
      <div>
        <Checkbox
          checked={isDone}
          onChange={onStatusChange}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <EditableTitle
          value={title}
          onTitleChange={onTitleHandler}
          type="listItem"
        />
      </div>

      <Button
        variant="outlined"
        size="small"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={onDeleted}
      >
        task
      </Button>
    </Paper>
  );
}
export default ListItem