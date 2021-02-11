
import React, { useState } from 'react';
import Header from '../header/header';
import TodoLists from '../todoLists/todoLists';
import classes from './App.module.scss';


 
  const tasks1 = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "React", isDone: true },
    { id: 3, title: "Redux", isDone: false },
    { id: 4, title: "Rest", isDone: true },
  ];
  // const tasks2 = [
  //   { id: 1, title: "3333", isDone: true },
  //   { id: 2, title: "222", isDone: false },
  //   { id: 3, title: "ffff", isDone: true },
  //   { id: 4, title: "xxxx", isDone: false },
  // ];

export type TasksType = typeof tasks1
export type ItemType = typeof tasks1[0];

function App() {

  const [tasks, setTasks] = useState<TasksType>(tasks1)
  
  const onItemDelete = (id: number) => {
    const newTasks = tasks.filter((el) => el.id !== id)
    setTasks(newTasks)
  }

  return (
    <div className={classes.App}>
      <Header />
      <TodoLists title={"What to learn"} tasks={tasks} onItemDelete={onItemDelete}/>
      {/* <TodoLists title={"What to do"} tasks={tasks2}/> */}
    </div>
  );
}

export default App;
