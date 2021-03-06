
import { configureStore } from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import { tasksReducer } from './task-reducer';
import { todolistsReducer } from './todos-reduser';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
   auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>getDefaultMiddleware().prepend(thunk)  
})
export type AppRootStateType = ReturnType<typeof rootReducer>

