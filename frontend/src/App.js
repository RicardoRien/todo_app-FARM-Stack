import React, { useState, useEffect} from 'react';
import './App.css';
import TodoView from './components/TodoListView';
import axios from 'axios';


function App() {

  const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('') 
  const [desc, setDesc] = useState('')
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
      .then(res => {
        setTodoList(res.data)
      })
  });

  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo/', { 'title': title, 'description': desc })
      .then(res => console.log(res))
};

  return (
  <div className="App" >
    <div className="container-main">

      <h1 className="title" >Task Manager</h1>
      <h5 className="subtitle">FASTAPI, React & MongoDB</h5>

      <input className="button__input" onChange={event => setTitle(event.target.value)} placeholder='Title'/> 
      <input className="button__input" onChange={event => setDesc(event.target.value)}   placeholder='Description'/>

      <button className="button__add"  onClick={addTodoHandler}>Add Task</button>

      <h5 className="title__task ">Your Tasks</h5>
      <TodoView todoList={todoList} />

    </div>
  </div>
  );
}

export default App;
