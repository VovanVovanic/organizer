import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { todolistsAPI } from "../api/api"
import { setIsLoggedIn } from "./auth-reducer"
import { handleServerAppError, handleServerNetworkError } from "./error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type errorType = string | null

const initialState = {
   status: 'idle' as RequestStatusType,
   error: null as errorType,
   isInitialized: false
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type SetInitTypeType = ReturnType<typeof setAppInitialized>


const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{status:RequestStatusType}>) {
      state.status = action.payload.status
      },
      setAppInitialized(state, action: PayloadAction<{ init:boolean }>) {
        state.isInitialized = action.payload.init
      },
      setAppError(state, action: PayloadAction<{ error: errorType}>) {
        state.error = action.payload.error
    }
  }
})
export const appReducer = slice.reducer
export const { setAppError,  setAppStatus, setAppInitialized} = slice.actions


export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppInitialized({init:false}))
   todolistsAPI.me().then(res => {
       if (res.resultCode === 0) {
           dispatch(setIsLoggedIn({ value:true}));
       } else {
           handleServerAppError(res, dispatch);
       }
        dispatch(setAppInitialized({init:true}))
   })
       .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
}