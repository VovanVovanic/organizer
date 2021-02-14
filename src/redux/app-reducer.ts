
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
   status: RequestStatusType
   error: null | string
}

const initialState: InitialStateType = {
   status: 'idle',
   error: null
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppStatus = (status: RequestStatusType) => {
  return{type: 'APP/SET-STATUS', status}as const
}

export const setAppError = (error: string | null) => {
   return{type:'APP/SET-ERROR', error} as const
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
       return { ...state, status: action.status }
           case 'APP/SET-ERROR': 
         return {...state, error: action.error}
       default:
           return state
   }
}

type ActionsType = ReturnType<typeof setAppStatus> | SetAppErrorType 