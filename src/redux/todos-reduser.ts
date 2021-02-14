
import { ThunkAction } from "redux-thunk";
import { todolistsAPI, TodolistType } from "../api/api";
import { AppRootStateType } from "./store";


type TodosReducerState = typeof initialState

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListsCommonType = TodolistType & {
  filter: FilterType
}
type setTodolistsType = ReturnType<typeof setTodolists>
type AddTodolistType = ReturnType<typeof addTodolist>
type RemoveTodolistType = ReturnType<typeof removeTodolist>
type ChangeTitleType = ReturnType<typeof changeTodolistTitle>
type TodosActionType =
  AddTodolistType
  | RemoveTodolistType
  | ChangeTitleType 
  | ReturnType<typeof changeTodolistFilter>
  | setTodolistsType


const initialState: Array<TodoListsCommonType> = []
export const addTodolist = (todolistId:string,title: string) => {
  return { type: 'ADD-TODOLIST', todolistId, title} as const
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
export const setTodolists = (todolists: Array<TodolistType>) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}
export const todolistsReducer = (state: TodosReducerState = initialState, action: TodosActionType): TodosReducerState => {

  switch (action.type) {
    case 'ADD-TODOLIST':
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
          addedDate: '',
          order: 0
        },
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
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all'
      }))
    }
    default: return state
  }
}

export const fetchTodolists = (): ThunkAction<void, AppRootStateType, unknown, setTodolistsType> =>
    (dispatch) => {
   todolistsAPI.getTodolists()
       .then((res) => {
           dispatch(setTodolists(res))
       })
  }
export const fetchRemoveTodoList = (id: string): ThunkAction<void, AppRootStateType, unknown, RemoveTodolistType> =>
    (dispatch) => {
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                dispatch(removeTodolist(id)) ////сделай обработку и вывод ошибки
            }
        })
    }

export const fetchCreateTodoList = (title: string): ThunkAction<void, AppRootStateType, unknown, AddTodolistType> =>
    (dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist(res.data.item.id, title))
                
        })
  }

  export const fetchChangeListTitle = (title: string, todoListId:string): ThunkAction<void, AppRootStateType, unknown, ChangeTitleType > =>
    (dispatch) => {
        todolistsAPI.updateTodolist(todoListId, title)
            .then((res) => {
              if (res.resultCode === 0) {
                dispatch(changeTodolistTitle(todoListId, title))
              }
              
        })
    }