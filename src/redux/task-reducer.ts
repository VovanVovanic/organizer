
import { addTodolist, removeTodolist, setTodolists } from "./todos-reduser";
import { TaskStatuses,  TaskType, todolistsAPI } from '../api/api'
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "./store";
import { TasksStateType } from "../components/app/App";


type TaskReducerState = typeof initialState
const initialState: TasksStateType = {}

export type SetTasksActionType = ReturnType<typeof setTasks>
export type AddTaskActionType = ReturnType<typeof addNewTask>
export type ChangeTaskStatuses = TaskStatuses | null
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>

type TasksActionType =
  ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  |ChangeTaskTitleType
  | AddTaskActionType 
  | ChangeTaskStatusType
  | ReturnType<typeof changeTaskTitle>
  | SetTasksActionType
  | ReturnType<typeof setTodolists>

export const setTasks = (todolistId: string, tasks: Array<TaskType>) => {
  return { type: 'SET-TASKS', todolistId, tasks } as const
}

export const addNewTask = (task:TaskType) => {
  return { type: 'ADD-TASK', task } as const
}
export const changeTaskStatus = (taskId: string, status: ChangeTaskStatuses, todolistId: string) => {
  return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId } as const
}
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
  return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const
}

export const tasksReducer = (state: TaskReducerState = initialState, action: TasksActionType):TaskReducerState => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST':
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks.map(el => el.id === action.taskId ? { ...el, status: action.status } : el);
            state[action.todolistId] = newTasksArray;
            return ({...state});

    }
    case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
    }
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state }
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy;
    }
    case 'SET-TASKS':
      const copy = { ...state }
      copy[action.todolistId] = action.tasks
      return copy
    default: return state
  }
}
export const fetchTasksReceive = (todoListId: string): ThunkAction<void, AppRootStateType, unknown, SetTasksActionType> => {
    return (dispatch) => {
        todolistsAPI.getTasks(todoListId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasks(todoListId, tasks)
               dispatch(action)
            
        })
    }
}
export const fetchTaskDelete = (todolistId: string, taskId: string): ThunkAction<void, AppRootStateType, unknown, SetTasksActionType> => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
              if (res.data.resultCode === 0) {
                  dispatch(fetchTasksReceive(todolistId))
                };               
        })
    }
}
export const fetchTaskCreation = (todolistId: string, taskTitile: string): ThunkAction<void, AppRootStateType, unknown, AddTaskActionType> => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitile)
            .then((res) => {
            dispatch(addNewTask(res.data.item));
            
        })
    }
}
export const updateTaskStatus = (taskId: string, todolistId: string, changes: ChangeTaskStatuses | string): ThunkAction<void, AppRootStateType, unknown, ChangeTaskStatusType | ChangeTaskTitleType> => {
   return (dispatch, getState ) => {
       const allTasksFromState = getState().tasks;
       const tasksForCurrentTodolist = allTasksFromState[todolistId]
       const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
       })
       if (task) {
           let t = (typeof changes === 'string') ? changes : null
           let s = (typeof changes === 'number') ? changes : TaskStatuses.New
           todolistsAPI.updateTask(todolistId, taskId, {
               title: t === null ? task.title : t,
               startDate: task.startDate,
               priority: task.priority,
               description: task.description,
               deadline: task.deadline,
               status: s === null ? task.status : s
           }).then(() => {

               s !== null && dispatch(changeTaskStatus(taskId, s, todolistId))
               t !== null &&  dispatch(changeTaskTitle(taskId, t, todolistId))
               
           })
       }
   }
}