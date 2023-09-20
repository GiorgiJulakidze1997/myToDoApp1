import { useState, useEffect } from 'react';
import './App.css';
// import mobileImg1 from './images/bg-mobile-light.jpg';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import React from 'react';

let count = 0;
function App() {
  const [todo, settodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [complatedTodo, setComplatedTodo] = useState<Todo[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>('All')
  const [lightMode, setLightMode] = useState<boolean>(true);

  const handler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTodo.length > 0) {
        const newId = todo.length + 1;
        settodo([{ id: newId, text: newTodo, checked: active, }, ...todo,]);
        setNewTodo('');
        count = count + 1;
      }
    }
  };


  useEffect(() => {
    if (showCompleted === true) {
      setComplatedTodo(todo.filter(item => item.checked));
    } else {
      setComplatedTodo(todo);
    }
  }, [todo, showCompleted])

  console.log('show', showCompleted);

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodo(e.target.value);
  }

  const singlerCheckBoxHandler = () => {
    setActive(!active);
  }

  const checkBoxHandler = (id: number) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    settodo(updatedTodos);
  };

  const deleteHandler = (id: number) => {
    const updatedTodos = todo.filter(todo => todo.id !== id);
    settodo(updatedTodos);
  };

  const clearCompleted = () => {
    const updateTodos = todo.filter(item => !item.checked);
    settodo(updateTodos);
    setShowCompleted(false);
    setActiveStatus('All');
  }

  const completedHandler = () => {
    const complateTodos = todo.filter(item => item.checked);

    setComplatedTodo(complateTodos);

    setShowCompleted(true);
    setActiveStatus('Completed');
  }

  const allHandler = () => {
    setComplatedTodo(todo);
    setShowCompleted(false);
    setActiveStatus('All');
  }

  const name = () => {
    setComplatedTodo(todo.filter(item => !item.checked));
    setActiveStatus('Active');

  }

  count = todo.filter(item => !item.checked).length;

  const changeLightModeHandler = () => {
    setLightMode(!lightMode);
  }
  const propsObj = {
    name,
    allHandler,
    completedHandler,
    clearCompleted,
    deleteHandler,
    checkBoxHandler,
    singlerCheckBoxHandler,
    changehandler,
    handler,
    complatedTodo,
    newTodo,
    activeStatus,
    count,
    changeLightModeHandler,
    lightMode,
  }

  console.log('count: ', count);
  return (
    <div className={lightMode ? 'App' : 'App AppDark'}>
      <Header />
      <Main propsObj={propsObj} />
    </div>
  );
}

export default App;
