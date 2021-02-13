import { v1 } from "uuid";
import { FilterType, TodoListsType } from "../components/app/App";

type TodosReducerState = typeof initialState
const initialState: Array<TodoListsType> = []

type TodosActionType =
  ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>

export const addTodolist = (title: string) => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1() } as const
}
export const removeTodolist = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}
export const changeTodolistTitle = (id: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title } as const
}
export const changeTodolistFilter = (id: string, filter: FilterType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const
}
export const todolistsReducer = (state: TodosReducerState = initialState, action: TodosActionType): TodosReducerState => {

  switch (action.type) {
    case 'ADD-TODOLIST':
      return [
        { id: action.todolistId, title: action.title, filter: 'all' },
        ...state
      ]
    case 'REMOVE-TODOLIST':
      return state.filter(el => el.id !== action.id)

    case 'CHANGE-TODOLIST-TITLE':
      return state.map((el) => {
        if (el.id === action.id) {
          el.title = action.title
        }
        return { ...el }
      })
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state]
    }
    default: return state
  }
}