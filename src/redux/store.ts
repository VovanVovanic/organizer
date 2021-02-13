
import {combineReducers, createStore} from 'redux';
import { tasksReducer } from './task-reducer';
import { todolistsReducer } from './todos-reduser';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>
