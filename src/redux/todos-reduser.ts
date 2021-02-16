
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAPI, TodolistType } from "../api/api";
import { RequestStatusType, setAppStatus } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "./error-utils";





export type FilterType = 'all' | 'active' | 'completed' 
export type TodoListsCommonType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}




const initialState: Array<TodoListsCommonType> = []


const slice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodolist(state, action: PayloadAction<{ todolists: TodolistType }>) {
      state.unshift({ ...action.payload.todolists, filter: 'all', entityStatus: 'idle' })
    },
    removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
      return state.filter(el => el.id !== action.payload.todolistId)
    },
    changeTodolistTitle(state, action: PayloadAction<{ id: string, title: string }>) {
      const indx = state.findIndex((el) => el.id === action.payload.id)
      state[indx].title = action.payload.title
    },
    changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
      const indx = state.findIndex((el) => el.id === action.payload.id)
      state[indx].filter = action.payload.filter
    },
    changeListEntity(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const indx = state.findIndex((el) => el.id === action.payload.id)
      state[indx].entityStatus = action.payload.status
    },
    setTodolists (state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
      return action.payload.todolists.map(tl => ({...tl,filter: 'all',entityStatus: 'idle'}))
    },
  }
})
export const todolistsReducer = slice.reducer
export const { addTodolist, removeTodolist, changeTodolistTitle, changeTodolistFilter, changeListEntity, setTodolists } = slice.actions



export const fetchTodolists = () =>(dispatch:Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolists({todolists: res}))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
  }

export const fetchRemoveTodoList = (id: string) =>(dispatch:Dispatch) => {
    dispatch(changeListEntity({id, status:'loading'}))
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolist({todolistId:id}))
          dispatch(setAppStatus({ status: 'succeeded' }))
        }
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
  }

export const fetchCreateTodoList = (title: string) =>(dispatch:Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        if (res.resultCode === 0) {
          dispatch(addTodolist({todolists: res.data.item}))
          dispatch(setAppStatus({ status: 'succeeded' }))
        }
        else {
          handleServerAppError(res, dispatch)
        }
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
  }

export const fetchChangeListTitle = (title: string, todoListId: string)=>(dispatch:Dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.updateTodolist(todoListId, title)
      .then((res) => {
        if (res.resultCode === 0) {
          dispatch(changeTodolistTitle({id:todoListId, title}))
          dispatch(setAppStatus({ status: 'succeeded' }))
        }
        else {
          handleServerAppError(res, dispatch)
        }
        dispatch(setAppStatus({ status: 'succeeded' }))

      })
      .catch((e) => {
        handleServerNetworkError({ message: e.message }, dispatch)
      })
  }