import classes from '../../app/App.module.scss';
import React, { useCallback } from 'react'
import EditableTitle from '../../common/editableTitle/editableTitle';
import { Button, Checkbox,  Paper } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { TaskStatuses, TaskType } from '../../../api/api';
import { fetchTaskDelete, updateTaskStatus } from '../../../redux/task-reducer';
import { useDispatch } from 'react-redux';

type ItemPropsType = TaskType & {
  todoListId: string
};
const ListItem: React.FC<ItemPropsType> = React.memo(({ id, title, status, todoListId}) => {
const dispatch = useDispatch()
  let isShadow = status === TaskStatuses.Completed && classes.isDone
  const onDeleted = () => {
    dispatch(fetchTaskDelete(todoListId, id));
  }
  const onStatusChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTaskStatus(id,todoListId, e.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New));
  }, [id, todoListId])
  
  const onTitleChange= useCallback((value: string) => {
    dispatch(updateTaskStatus(id, todoListId, value));
  }, [dispatch, todoListId])
  
  return (
    <Paper className={classes.Paper + ' ' + isShadow} elevation={3} style={{padding:"5px 5px 5px 0"}}>
      <div>
        <Checkbox
          checked={status === TaskStatuses.Completed}
          onChange={onStatusChange}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <EditableTitle
          value={title}
          changeTitle={onTitleChange}
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
})
export default ListItem