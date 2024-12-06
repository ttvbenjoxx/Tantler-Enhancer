import React from 'react';

interface NotepadProps {
  content: string;
  onChange: (content: string) => void;
}

export function Notepad({ content, onChange }: NotepadProps) {
  return (
    <div className="w-full">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing your notes here..."
        className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </div>
  );
}