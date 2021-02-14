import { TextField } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import classes from './title.module.scss'


type EdTitleType = {
  value: string
  changeTitle?: (title: string) => void
  type?: string
}
const EditableTitle: React.FC<EdTitleType> = React.memo(({ value, changeTitle, type }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

const cls=[classes.Span]
  type && cls.push(classes[type])

 const onEditHandler = () => {
    setEdit(true)
  }

  const onTitleChangeHandler = useCallback(() => {
    if (title.trim() !== "") {
      changeTitle && changeTitle(title);
    }
  }, [changeTitle, title]);
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
        ? <TextField
          variant='standard'
          type='text'
          value={title}
          autoFocus
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          onKeyDown={onKeyHandler}
        />
        : <span onDoubleClick={onEditHandler} className={cls.join(' ')}>{value}</span>
      }
    </>
  )
})

export default EditableTitle