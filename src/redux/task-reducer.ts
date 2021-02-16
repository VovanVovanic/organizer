
import { addTodolist, changeListEntity, removeTodolist, setTodolists } from "./todos-reduser";
import { TaskStatuses, TaskType, todolistsAPI } from '../api/api'
import { AppRootStateType } from "./store";
import { TasksStateType } from "../components/app/App";
import { RequestStatusType, setAppStatus} from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "./error-utils";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Dispatch } from 'redux';

const initialState: TasksStateType = {}


export type ChangeTaskStatuses = TaskStatuses | null
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>




const slice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    deleteTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const indx = tasks.findIndex((el) => el.id === action.payload.taskId)
      if (indx > -1) {
        tasks.splice(indx, 1)
      }
    },
    addNewTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    changeTaskStatus(state, action: PayloadAction<{ taskId: string, status: ChangeTaskStatuses, todolistId: string }>) {
      const tasks = state[action.payload.todolistId]
      const indx = tasks.findIndex((el) => el.id === action.payload.taskId)
      if (indx > -1) {
        tasks[indx].status = action.payload.status
      }
    },
    changeTaskTitle(state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) {
      const tasks = state[action.payload.todolistId]
      const indx = tasks.findIndex((el) => el.id === action.payload.taskId)
      if (indx > -1) {
        tasks[indx].title = action.payload.title
      }
    },
    changeTaskEntity(state, action: PayloadAction<{ id: string, enStatus: RequestStatusType, todoId: string }>) {
      const tasks = state[action.payload.todoId]
      const indx = tasks.findIndex((el) => el.id === action.payload.id)
      if (indx > -1) {
        tasks[indx].entityStatus = action.payload.enStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolists.id] = []
    })
    builder.addCase(setTodolists, (state, action) => {
      action.payload.todolists.forEach((el) => state[el.id] = [])
    })

  }
})
export const tasksReducer = slice.reducer
export const { setTasks, deleteTask, changeTaskStatus, changeTaskTitle, changeTaskEntity, addNewTask } = slice.actions

export const fetchTasksReceive = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.getTasks(todoListId)
      .then((res) => {
        const tasks = res.data.items
        dispatch(setTasks({ todolistId: todoListId, tasks }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
  }
}
export const fetchTaskDelete = (todolistId: string, taskId: string) => {
 
  return (dispatch:Dispatch) => {
    dispatch(changeTaskEntity({ id: taskId, enStatus: 'loading', todoId: todolistId }))
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.deleteTask(todolistId, taskId)
      
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(deleteTask({ todolistId, taskId }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        };
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
      .finally(() => dispatch(changeTaskEntity({ id: taskId, enStatus: 'idle', todoId: todolistId })))
  }
}
export const fetchTaskCreation = (todolistId: string, taskTitile: string) => {
  return (dispatch: Dispatch) => {
    dispatch(changeListEntity({ id: todolistId, status: 'loading' }))
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.createTask(todolistId, taskTitile)
      .then((res) => {
        if (res.resultCode === 0) {
          dispatch(addNewTask({ task: res.data.item }));
          dispatch(setAppStatus({ status: 'succeeded' }))
          dispatch(changeListEntity({ id: todolistId, status: 'idle' }))
        }
        else {
          handleServerAppError(res, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
        dispatch(changeListEntity({ id: todolistId, status: 'idle' }))
      })
      .finally(() => dispatch(changeListEntity({ id: todolistId, status: 'idle' })))
  }
}
export const updateTaskStatus = (taskId: string, todolistId: string, changes: ChangeTaskStatuses | string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const allTasksFromState = getState().tasks;
  const tasksForCurrentTodolist = allTasksFromState[todolistId]
  const task = tasksForCurrentTodolist.find(t => {
    return t.id === taskId
  })
  if (task) {
    let t = (typeof changes === 'string') ? changes : null
    let s = (typeof changes === 'number') ? changes : TaskStatuses.New
    dispatch(changeTaskEntity({ id: taskId, enStatus: 'loading', todoId: todolistId }))
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.updateTask(todolistId, taskId, {
      title: t === null ? task.title : t,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      status: s === null ? task.status : s
    }).then((res) => {
      if (res.resultCode === 0) {
        s !== null && dispatch(changeTaskStatus({ taskId, status: s, todolistId }))
        t !== null && dispatch(changeTaskTitle({ taskId, title: t, todolistId }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      }
      else {
        handleServerAppError(res, dispatch)
      }
    })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
      .finally(() => dispatch(changeTaskEntity({ id: taskId, enStatus: 'idle', todoId: todolistId })))
  }
}
