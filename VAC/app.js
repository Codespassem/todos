const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

// POST /todos: Create a new to-do
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required.' });
    }
    const newTodo = {
        id: idCounter++,
        task,
        isCompleted: false,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos: Get all to-dos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET /todos/:id: Get a single to-do by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === Number(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'To-Do not found.' });
    }
    res.json(todo);
});

// PUT /todos/:id: Update a to-do
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === Number(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'To-Do not found.' });
    }
    const { task, isCompleted } = req.body;
    if (task !== undefined) todo.task = task;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;
    res.json(todo);
});

// DELETE /todos/:id: Delete a to-do
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === Number(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'To-Do not found.' });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
