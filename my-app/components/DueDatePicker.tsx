"use client";

import React, { useState, useEffect } from "react";

// Assume TaskModel is imported and has methods to get and update the due date
interface TaskModel {
  id: string;
  dueDate: string;
}

interface DueDatePickerProps {
  task: TaskModel;
  onUpdateDueDate: (id: string, newDate: string) => void;
}

const DueDatePicker: React.FC<DueDatePickerProps> = ({ task, onUpdateDueDate }) => {
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    setDueDate(task.dueDate);
  }, [task.dueDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDueDate(newDate);
    onUpdateDueDate(task.id, newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={`due-date-${task.id}`} className="text-sm">
        Due Date:
      </label>
      <input
        type="date"
        id={`due-date-${task.id}`}
        value={dueDate}
        onChange={handleDateChange}
        className="p-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};

export default DueDatePicker; 