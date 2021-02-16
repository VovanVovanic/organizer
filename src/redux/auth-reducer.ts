import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { todolistsAPI } from "../api/api";
import {setAppStatus} from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "./error-utils";


const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{value:boolean}>) {
      state.isLoggedIn = action.payload.value
    }
  }
})
export const authReducer = slice.reducer
export const{setIsLoggedIn}=slice.actions

// thunks
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status:"loading"}));
 todolistsAPI.login(email, password, rememberMe)
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(setAppStatus({status:"succeeded"}));
        dispatch(setIsLoggedIn({value:true}));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const logout = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status:"loading"}));
  todolistsAPI.logout()
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(setIsLoggedIn({value:false}));
        dispatch(setAppStatus({status:"succeeded"}));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

