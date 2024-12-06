import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleTask(task.id)}
              className="text-blue-500 hover:text-blue-600"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <span
              className={`${
                task.completed ? 'line-through text-gray-500' : 'text-gray-700'
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}