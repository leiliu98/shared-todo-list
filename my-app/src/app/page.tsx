import * as React from "react";

export default function Home() {
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
            <li className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <input type="checkbox" className="h-4 w-4" />
              <span>Research latest LLM developments</span>
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <input type="checkbox" className="h-4 w-4" />
              <span>Schedule next AI meetup</span>
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <input type="checkbox" className="h-4 w-4" />
              <span>Share interesting AI papers</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
