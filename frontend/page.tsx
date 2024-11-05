import React, { useState, useEffect } from 'react';

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number, text: string }[]>([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [editTexts, setEditTexts] = useState<{ [key: number]: string }>({});

    const apiUrl = 'http://localhost:3000/todos';

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async () => {
        if (!newTodoText) return alert('Please enter a to-do text');
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTodoText })
        });
        setNewTodoText('');
        fetchTodos();
    };

    const editTodo = async (id: number) => {
        const text = editTexts[id];
        if (!text) return alert('Please enter a new to-do text');
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        fetchTodos();
    };

    return (
        <div>
            <h1>Shared To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="Enter new to-do"
                />
                <button onClick={addTodo}>Add To-Do</button>
            </div>
            <div>
                {todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <span>{todo.text}</span>
                        <input
                            type="text"
                            value={editTexts[todo.id] || ''}
                            onChange={(e) => setEditTexts({ ...editTexts, [todo.id]: e.target.value })}
                            placeholder="Edit to-do"
                        />
                        <button onClick={() => editTodo(todo.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoApp; 