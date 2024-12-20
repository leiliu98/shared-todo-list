"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import DueDatePicker from './DueDatePicker';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
}

interface NewTask {
  title: string;
  description: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({ 
    title: '',
    description: ''
  });

  const fetchTasks = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTasks(data);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        userId: 'placeholder-user-id' 
      }),
    });
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateDueDate = async (id: string, date: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dueDate: date }),
      });

      if (!response.ok) {
        throw new Error('Failed to update due date');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error updating due date:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task description"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Add Task</Button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <DueDatePicker 
              task={task} 
              onUpdateDueDate={handleUpdateDueDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 