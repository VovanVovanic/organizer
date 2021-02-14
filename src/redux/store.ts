
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { tasksReducer } from './task-reducer';
import { todolistsReducer } from './todos-reduser';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

