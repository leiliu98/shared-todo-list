import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let todos: { id: number, text: string }[] = [];
let nextId = 1;

// Create a new to-do item
app.post('/todos', (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Text is required');
    }
    const newTodo = { id: nextId++, text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Modify an existing to-do item
app.put('/todos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).send('To-do item not found');
    }
    if (!text) {
        return res.status(400).send('Text is required');
    }
    todo.text = text;
    res.json(todo);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
