import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons';
import React, { useState } from 'react'
import classes from "./form.module.scss";


type InputPropsType = {
  addTitle: (title: string) => void;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean
};
const AddItemForm: React.FC<InputPropsType> = React.memo(({ addTitle, name, type, placeholder, disabled}) => {


  const cls = [classes.formButton];
  type && cls.push(classes[type])
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setTitle] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error !== null && setError(null);
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
    <div className={classes.AddFormWrap}>
      <TextField
        variant="standard"
        error={!!error}
        helperText={error}
        value={newTitle}
        onChange={onChangeInput}
        onKeyDown={onKeyPressHandler}
        style={{ width: "80%" }}
        placeholder={placeholder}
        disabled={disabled}
      />
      <IconButton
        disabled={disabled}
        color="primary" onClick={onAddedNewTitle}>
        <AddBox />
        {name}
      </IconButton>
    </div>
  );
})
export default AddItemForm