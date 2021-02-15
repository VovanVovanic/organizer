import { Dispatch } from "redux"
import { todolistsAPI } from "../api/api"
import { setIsLoggedIn } from "./auth-reducer"
import { handleServerAppError, handleServerNetworkError } from "./error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
   status: RequestStatusType
   error: null | string
   isInitialized: boolean
}

const initialState: InitialStateType = {
   status: 'idle',
   error: null,
   isInitialized: false
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type SetInitTypeType = ReturnType<typeof setAppInitialized>

export const setAppStatus = (status: RequestStatusType) => {
  return{type: 'APP/SET-STATUS', status}as const
}
export const setAppInitialized = (init:boolean)=>({type: 'APP/SETINITIALIZED', init} as const)
export const setAppError = (error: string | null) => {
   return{type:'APP/SET-ERROR', error} as const
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
       return { ...state, status: action.status }
           case 'APP/SET-ERROR': 
         return { ...state, error: action.error }
              case 'APP/SETINITIALIZED':
            return{...state, isInitialized: action.init}
       default:
           return state
   }
}

export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppInitialized(false))
   todolistsAPI.me().then(res => {
       if (res.resultCode === 0) {
           dispatch(setIsLoggedIn(true));
       } else {
           handleServerAppError(res, dispatch);
       }
        dispatch(setAppInitialized(true))
   })
       .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
}

type ActionsType = ReturnType<typeof setAppStatus> | SetAppErrorType | SetInitTypeType