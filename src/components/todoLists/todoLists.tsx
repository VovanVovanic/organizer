
import React, { useCallback, useEffect } from 'react'
import Buttons from '../common/buttons/buttons';
import ListItem from './listItem/listItem'
import AddItemForm from '../common/addItemForm/addItemForm';
import EditableTitle from '../common/editableTitle/editableTitle';
import { Button, Grid} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from 'react-redux';
import { fetchTaskCreation, fetchTasksReceive} from '../../redux/task-reducer';
import { changeTodolistFilter, changeTodolistTitle, fetchChangeListTitle, fetchRemoveTodoList, FilterType, removeTodolist } from '../../redux/todos-reduser';
import { TaskStatuses, TaskType } from '../../api/api';

type todoListTypes = {
  title: string;
  todoListId: string;
  tasks: Array<TaskType>;
  active: FilterType;
};

const TodoLists: React.FC<todoListTypes> = React.memo(({ title, tasks, active, todoListId}) => {
  
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchTasksReceive(todoListId));
    }, []);
  
  const changeFilterHandler = useCallback((value: FilterType) => {
    dispatch(changeTodolistFilter(todoListId, value));
  },[dispatch, todoListId])

  const onTodoRemove = useCallback(() => {
  dispatch(fetchRemoveTodoList(todoListId));
  }, [dispatch, todoListId])
  
  const onTaskAdded = useCallback((title: string) => {
   dispatch(fetchTaskCreation(todoListId, title));
  }, [dispatch, todoListId])
  
  const OnChangeTodoName = useCallback((title: string) => {
    dispatch(fetchChangeListTitle(title, todoListId));
  },[dispatch, todoListId])

    const onFilterHandler = (arr: Array<TaskType>, filter: FilterType) => {
      switch (filter) {
        case "all": {
          return arr;
        }
        case "active": {
          return arr.filter((el) => el.status === TaskStatuses.New);
        }
        case "completed": {
          return arr.filter((el) => el.status === TaskStatuses.Completed);
        }
        default:
          return arr;
      }
    };
  const itemList = onFilterHandler(tasks, active).map(({...props}) => {
    return <ListItem
      key={props.id}
      {...props}
    />;
  })
  return (
    <Grid container>
      <Grid item xs>
        <EditableTitle value={title} changeTitle={OnChangeTodoName} type='header'/>
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          startIcon={<DeleteIcon />}
          onClick={onTodoRemove}
          style={{marginLeft:"30px"}}
        >
          list
        </Button>
      </Grid>

      <AddItemForm addTitle={onTaskAdded} name={"task"} placeholder='type your task name'/>
      <Grid item style={{width: "100%"}}>{itemList}</Grid>
      <Buttons changeFilterClick={changeFilterHandler} active={active} />
    </Grid>
  );
})
export default TodoLists