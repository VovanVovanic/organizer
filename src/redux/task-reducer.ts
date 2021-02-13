import { v1 } from "uuid";
import { ItemType, TaskStateType } from "../components/app/App";
import { addTodolist, removeTodolist } from "./todos-reduser";

type TaskReducerState = typeof initialState
const initialState: TaskStateType = {}

type TasksActionType =
  ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addNewTask>
  | ReturnType<typeof changeTaskStatus>
  | ReturnType<typeof changeTaskTitle>

export const removeTask = (taskId: string, todolistId: string) => {
  return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId } as const
}
export const addNewTask = (title: string, todolistId: string) => {
  return { type: 'ADD-TASK', title, todolistId } as const
}
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
  return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId } as const
}
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
  return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const
}

export const tasksReducer = (state: TaskReducerState = initialState, action: TasksActionType): TaskReducerState => {
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
    case 'REMOVE-TASK': {
      const stateCopy = { ...state }
      stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state }
      const newTask: ItemType = { id: v1(), title: action.title, isDone: false }
      stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]];
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks.map(el => el.id === action.taskId
          ? { ...el, isDone: action.isDone }
          : el);
      return ({ ...state });
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks
        .map(el => el.id === action.taskId
          ? { ...el, title: action.title }
          : el);
      return ({ ...state });
    }
    default: return state
  }
}