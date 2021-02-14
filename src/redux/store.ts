
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';
import { tasksReducer } from './task-reducer';
import { todolistsReducer } from './todos-reduser';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

