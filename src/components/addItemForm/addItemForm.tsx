import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import classes from "../app/App.module.scss";


type InputPropsType = {
  addTitle: (title: string) => void
}
const AddItemForm: React.FC<InputPropsType> = ({ addTitle }) => {

  const [error, setError] = useState<string | null>(null);
  const [newTitle, setTitle] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(null);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && onAddedNewTitle();
    e.key === "Escape" && setTitle("");
  };

  const onAddedNewTitle = () => {
    if (newTitle.trim() !== "") {
      addTitle(newTitle)
      setError(null);
    } else {
      setError("Title is required");
    }
    setTitle("");
  };
  return (
    <div>
      <input
        className={error ? classes.error : ''}
        value={newTitle}
        onChange={onChangeInput}
        onKeyDown={onKeyPressHandler}
      />
      <Button variant='contained' color='primary' onClick={onAddedNewTitle}>add task</Button>
      {error && <div className={classes.Error}>{error}</div>}
    </div>
  )
}
export default AddItemForm