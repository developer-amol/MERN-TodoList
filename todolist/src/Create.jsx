import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        setTodos(prevTodos => [...prevTodos, result.data]);
        setTask(''); // Clear the input field
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
