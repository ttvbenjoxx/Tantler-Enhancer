import React from 'react';
import { Brain, HelpCircle, ChevronDown } from 'lucide-react';
import { BoardSelector } from './BoardSelector';
import { Board } from '../types';

interface HeaderProps {
  boards: Board[];
  activeBoard: Board;
  onBoardChange: (boardId: string) => void;
  onCreateBoard: () => void;
  onRenameBoard: (boardId: string, newName: string) => void;
  onOpenDocs: () => void;
}

export function Header({
  boards,
  activeBoard,
  onBoardChange,
  onCreateBoard,
  onRenameBoard,
  onOpenDocs,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Brain className="h-8 w-8 text-blue-500" />
              <ChevronDown className="h-4 w-4 text-blue-500 absolute -bottom-2 left-1/2 transform -translate-x-1/2" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tantler Enhancer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <BoardSelector
              boards={boards}
              activeBoard={activeBoard}
              onBoardChange={onBoardChange}
              onCreateBoard={onCreateBoard}
              onRenameBoard={onRenameBoard}
            />
            <button
              onClick={onOpenDocs}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Show Help"
            >
              <HelpCircle className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}