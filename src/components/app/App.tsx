
import React, { useState } from 'react';
import { v1 } from 'uuid';
import Header from '../header/header';
import TodoLists from '../todoLists/todoLists';
import classes from './App.module.scss';



const tasks1 = [
  { id: v1(), title: "HTML", isDone: true },
  { id: v1(), title: "React", isDone: true },
  { id: v1(), title: "Redux", isDone: false },
  { id: v1(), title: "Rest", isDone: true },
];
// const tasks2 = [
//   { id: 1, title: "3333", isDone: true },
//   { id: 2, title: "222", isDone: false },
//   { id: 3, title: "ffff", isDone: true },
//   { id: 4, title: "xxxx", isDone: false },
// ];

export type TasksType = typeof tasks1
export type ItemType = typeof tasks1[0];
export type FilterType = 'all' | 'active' | 'completed'

function App() {

  const [tasks, setTasks] = useState<TasksType>(tasks1)
  const [filter, setFilter] = useState<FilterType>('all')

  const onItemDelete = (id: string) => {
    const newTasks = tasks.filter((el) => el.id !== id)
    setTasks(newTasks)
  }

  const onFilterHandler = (arr: TasksType, filter: FilterType) => {
    switch (filter) {
      case "all": {
        return arr;
      }
      case "active": {
        return arr.filter((el) => !el.isDone);
      }
      case "completed": {
        return arr.filter((el) => el.isDone);
      }
      default:
        return arr;
    }
  };

  const onFilterChange = (value: FilterType) => {
    setFilter(value)
  }

  const addTask = (value:string) => {
    const newtask = { id: v1(), title: value, isDone: true };
    setTasks([...tasks, newtask])
  }

  const changeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find((el) => el.id === id)
    if (task) {
      task.isDone = isDone
      setTasks([...tasks])
    }
  }
  return (
    <div className={classes.App}>
      <Header />
      <TodoLists
        title={"What to learn"}
        tasks={onFilterHandler(tasks, filter)}
        onItemDelete={onItemDelete}
        changeFilter={onFilterChange}
        active={filter}
        onAdded={addTask}
        changeStatus={changeStatus}
      />
      {/* <TodoLists title={"What to do"} tasks={tasks2}/> */}
    </div>
  );
}

export default App;
