import React, { useState } from 'react';
import { ChevronDown, Plus, Edit2 } from 'lucide-react';
import { Board } from '../types';

interface BoardSelectorProps {
  boards: Board[];
  activeBoard: Board;
  onBoardChange: (boardId: string) => void;
  onCreateBoard: () => void;
  onRenameBoard: (boardId: string, newName: string) => void;
}

export function BoardSelector({
  boards,
  activeBoard,
  onBoardChange,
  onCreateBoard,
  onRenameBoard,
}: BoardSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(activeBoard.name);

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim()) {
      onRenameBoard(activeBoard.id, editedName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        {isEditing ? (
          <form onSubmit={handleRename} className="flex items-center">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="px-2 py-1 border rounded text-lg font-semibold"
              autoFocus
              onBlur={handleRename}
            />
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-lg font-semibold hover:text-blue-600"
          >
            <span>{activeBoard.name}</span>
            <Edit2 className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => {
                onBoardChange(board.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                board.id === activeBoard.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {board.name}
            </button>
          ))}
          <div className="border-t my-2" />
          <button
            onClick={() => {
              onCreateBoard();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Board
          </button>
        </div>
      )}
    </div>
  );
}