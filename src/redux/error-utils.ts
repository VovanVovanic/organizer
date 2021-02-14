
import { Dispatch } from 'redux';
import { setAppError, SetAppErrorType, setAppStatus, SetAppStatusType } from './app-reducer';
import{ResponseType}from '../api/api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('Some error occurred'))
  }
  dispatch(setAppStatus('failed'))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppError(error.message))
  dispatch(setAppStatus('failed'))
}

export type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>