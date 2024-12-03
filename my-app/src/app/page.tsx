"use client";

import * as React from "react";
import DueDatePicker from "../../components/DueDatePicker";

// Mock task model for demonstration purposes
const tasks = [
  {
    id: "1",
    title: "Research latest LLM developments",
    dueDate: "2023-12-01",
  },
  {
    id: "2",
    title: "Schedule next AI meetup",
    dueDate: "2023-12-05",
  },
  {
    id: "3",
    title: "Share interesting AI papers",
    dueDate: "2023-12-10",
  },
];

export default function Home() {
  const updateDueDate = (id: string, newDate: string) => {
    console.log(`Task ${id} due date updated to ${newDate}`);
    // Here you would update the task in your state or database
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
