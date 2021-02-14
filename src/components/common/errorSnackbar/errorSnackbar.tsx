import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../../redux/store'
import { setAppError } from '../../../redux/app-reducer'

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
  
    let error = useSelector<AppRootStateType, string | null>((state) => state.app.error);
    console.log(error);
    
const dispatch = useDispatch()
    
   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
       if (reason === 'clickaway') {
           return
       }
       dispatch(setAppError(null));
   }
   return (
     <Snackbar
       open={error !== null}
       autoHideDuration={6000}
       onClose={handleClose}
     >
       <Alert onClose={handleClose} severity="error">
         {error}
       </Alert>
     </Snackbar>
   );
}

