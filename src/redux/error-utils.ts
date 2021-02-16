
import { Dispatch } from 'redux';
import { setAppError, SetAppErrorType, setAppStatus, SetAppStatusType } from './app-reducer';
import{ResponseType}from '../api/api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppError({error:data.messages[0]}))
  } else {
    dispatch(setAppError({error:'Some error occurred'}))
  }
  dispatch(setAppStatus({status:'failed'}))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppError({error:error.message}))
  dispatch(setAppStatus({status:'failed'}))
}

export type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>