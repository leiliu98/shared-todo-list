"use client";

import * as React from "react";
import DueDatePicker from "../../components/DueDatePicker";

interface Task {
  id: string;
  title: string;
  dueDate?: string | null;
  description?: string;
  completed?: boolean;
}

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function Home() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [newTask, setNewTask] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  // Create a default user when the component mounts
  React.useEffect(() => {
    const createDefaultUser = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'default@example.com',
            name: 'Default User',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create user');
        }

        const user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error creating default user:', error);
      }
    };

    if (!currentUser) {
      createDefaultUser();
    }
  }, [currentUser]);

  const createTask = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTask.trim() && currentUser) {
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask,
            userId: currentUser.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask("");
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
      }
    }
  };

  const updateDueDate = async (taskId: string, newDate: Date | null) => {
    try {
      const response = await fetch(`/api/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dueDate: newDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update due date');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating due date:', error);
      alert('Failed to update due date. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">AI Interest Group</h1>
          <p className="text-gray-600 dark:text-gray-400">Shared TODO List</p>
          {currentUser && (
            <p className="text-sm text-gray-500">Logged in as: {currentUser.email}</p>
          )}
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Add a new task..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={createTask}
              disabled={!currentUser}
            />
            {!currentUser && (
              <p className="text-sm text-red-500 mt-2">Loading user account...</p>
            )}
          </div>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex flex-col gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="flex-1">{task.title}</span>
                  <DueDatePicker
                    task={task}
                    onUpdateDueDate={updateDueDate}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
