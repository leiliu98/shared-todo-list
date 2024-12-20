"use client";

import React from "react";

interface TaskModel {
  id: string;
  dueDate: string | null | undefined;
}

interface DueDatePickerProps {
  task: TaskModel;
  onUpdateDueDate: (id: string, newDate: string) => void;
}

const DueDatePicker = ({ task, onUpdateDueDate }: DueDatePickerProps) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
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
        value={task.dueDate || ''}
        onChange={handleDateChange}
        className="p-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};

export default DueDatePicker; 