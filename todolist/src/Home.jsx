import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsCircleFill, BsPencilFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';
import './App.css';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleToggleDone = (id, done) => {
    axios.put(`http://localhost:3001/update/${id}`, { done: !done })
      .then(result => {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !done } : todo));
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id, task) => {
    const newTask = prompt('Edit Task:', task);
    if (newTask) {
      axios.put(`http://localhost:3001/update/${id}`, { task: newTask })
        .then(result => {
          setTodos(todos.map(todo => todo._id === id ? { ...todo, task: newTask } : todo));
        })
        .catch(err => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create setTodos={setTodos} />
      {
        todos.length === 0 
          ? 
          <div><h2>No Record</h2></div>
          : 
          todos.map(todo => (
              <div key={todo._id} className='task'>
                <div className='checkbox' onClick={() => handleToggleDone(todo._id, todo.done)}>
                  {todo.done ?
                    <BsFillCheckCircleFill className='icon' />
                    : <BsCircleFill className='icon' />
                  }
                  <p className={todo.done ? 'line_through' : ""}>{todo.task}</p>
                </div>
                <div className='icons'>
                  <BsPencilFill className='icon' onClick={() => handleEdit(todo._id, todo.task)} />
                  <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
                </div>
              </div>
            ))
      }
    </div>
  );
}
