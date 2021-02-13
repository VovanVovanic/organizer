import React, { useState } from 'react'

type EdTitleType = {
  value: string
  onTitleChange?: (title:string)=>void
}
const EditableTitle:React.FC<EdTitleType> = ({value, onTitleChange}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

  
 const onEditHandler = () => {
    setEdit(true)
  }

  const onTitleChangeHandler = () => {
    if (title.trim() !== "") {
      onTitleChange && onTitleChange(title);
    }
  };
  const onBlurHandler = () => {
    onTitleChangeHandler()
    setEdit(false)
  }
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  };
  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { onBlurHandler() }
    if (e.key === 'Escape') {
      setTitle(value)
      setEdit(false)
    }
  };
  return (
    <>
      {edit
        ? <input
          type='text'
          value={title}
          autoFocus
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          onKeyDown={onKeyHandler}
        />
        : <span onDoubleClick={onEditHandler}>{value}</span>
      }
    </>
  )
}

export default EditableTitle