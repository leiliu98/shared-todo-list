"use client";

import * as React from "react";
import DueDatePicker from "../../components/DueDatePicker";

// Define the Task interface
interface Task {
  id: string;
  title: string;
  dueDate: string;
}

export default function Home() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  // Fetch tasks from the backend
  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://api.example.com/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const updateDueDate = async (id: string, newDate: string) => {
    try {
      const response = await fetch(`https://api.example.com/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dueDate: newDate }),
      });

      if (response.ok) {
        console.log(`Task ${id} due date updated to ${newDate}`);
        // Optionally, refetch tasks or update state directly
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, dueDate: newDate } : task
          )
        );
      } else {
        console.error("Failed to update task due date");
      }
    } catch (error) {
      console.error("Error updating task due date:", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">AI Interest Group</h1>
          <p className="text-gray-600 dark:text-gray-400">Shared TODO List</p>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Add a new task..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex flex-col gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>{task.title}</span>
                </div>
                <DueDatePicker task={task} onUpdateDueDate={updateDueDate} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
