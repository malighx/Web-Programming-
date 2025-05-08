const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON body

// In-memory array to store tasks
let tasks = [];
let currentId = 1;

// POST /addTask → Add a new task
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).json({ error: 'taskName is required' });
    }

    const newTask = { id: currentId++, taskName };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task added successfully', task: newTask });
});

// GET /tasks → Get all tasks
app.get('/', (req, res) => {
    res.send('Welcome to the Task API! Use POST /addTask to add tasks.');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE /task/:id → Delete a task by ID
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: 'Task deleted', task: deletedTask[0] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
