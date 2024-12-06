import React from 'react';
import { commandsList } from '../utils/commands';
import { X } from 'lucide-react';

interface DocumentationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Documentation({ isOpen, onClose }: DocumentationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Command Documentation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {commandsList.map((category) => (
          <div key={category.category} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.commands.map((cmd) => (
                <div
                  key={cmd.command}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <code className="text-sm font-mono text-blue-600">
                    {cmd.command}
                  </code>
                  <p className="mt-1 text-gray-600">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}