import { Dispatch } from "redux";
import { todolistsAPI } from "../api/api";
import { SetAppErrorType, setAppStatus, SetAppStatusType } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "./error-utils";


const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState,action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedIn = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatus("loading"));
 todolistsAPI.login(email, password, rememberMe)
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(setAppStatus("succeeded"));
        dispatch(setIsLoggedIn(true));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const logout = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatus("loading"));
  todolistsAPI.logout()
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(setIsLoggedIn(false));
        dispatch(setAppStatus("succeeded"));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};


// types
type ActionsType =
  | ReturnType<typeof setIsLoggedIn>
  | SetAppStatusType
  | SetAppErrorType;
