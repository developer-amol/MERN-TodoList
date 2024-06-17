const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todo'); // Adjust path as per your project structure

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task, done } = req.body; // Get task and done status from request body
  TodoModel.findByIdAndUpdate(id, { task: task, done: done }, { new: true }) // Update both task and done status
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json({ message: 'Todo deleted successfully', deletedTodo: result }))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
