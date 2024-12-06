import React, { useState, useEffect } from 'react';
import { CommandBar } from './components/CommandBar';
import { Header } from './components/Header';
import { Notepad } from './components/Notepad';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { Timer } from './components/Timer';
import { Bookmarks } from './components/Bookmarks';
import { QuickLinks } from './components/QuickLinks';
import { Documentation } from './components/Documentation';
import { executeCommand } from './utils/commands';
import { Board } from './types';

function App() {
  const [boards, setBoards] = useState<Board[]>(() => {
    const saved = localStorage.getItem('boards');
    if (saved) {
      return JSON.parse(saved);
    }
    return [{
      id: 'default',
      name: 'My Board',
      tasks: [],
      bookmarks: [],
      quickLinks: [],
      notes: ''
    }];
  });

  const [activeBoardId, setActiveBoardId] = useState<string>('default');
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes' | 'bookmarks' | 'timer' | 'links'>('tasks');
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const activeBoard = boards.find(b => b.id === activeBoardId)!;

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  const updateBoard = (updatedBoard: Board) => {
    setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
  };

  const handleCommand = (command: string) => {
    if (command === '/help') {
      setIsDocsOpen(true);
      return;
    }

    const result = executeCommand(command, {
      setActiveTab,
      activeBoard,
      updateBoard,
      setBoards,
      boards,
    });

    if (result) {
      console.log(result);
    }
  };

  const createBoard = () => {
    const newBoard: Board = {
      id: Date.now().toString(),
      name: 'New Board',
      tasks: [],
      bookmarks: [],
      quickLinks: [],
      notes: ''
    };
    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  const renameBoard = (boardId: string, newName: string) => {
    setBoards(boards.map(b => 
      b.id === boardId ? { ...b, name: newName } : b
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        boards={boards}
        activeBoard={activeBoard}
        onBoardChange={setActiveBoardId}
        onCreateBoard={createBoard}
        onRenameBoard={renameBoard}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <CommandBar onCommand={handleCommand} />

          <div className="flex space-x-4">
            {(['tasks', 'notes', 'bookmarks', 'timer', 'links'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <AddTask
                  onAddTask={(text) => {
                    const updatedBoard = {
                      ...activeBoard,
                      tasks: [
                        ...activeBoard.tasks,
                        { id: Date.now().toString(), text, completed: false, boardId: activeBoard.id }
                      ]
                    };
                    updateBoard(updatedBoard);
                  }}
                />
                <TaskList
                  tasks={activeBoard.tasks}
                  onToggleTask={(id) => {
                    const updatedBoard = {
                      ...activeBoard,
                      tasks: activeBoard.tasks.map(task =>
                        task.id === id ? { ...task, completed: !task.completed } : task
                      )
                    };
                    updateBoard(updatedBoard);
                  }}
                  onDeleteTask={(id) => {
                    const updatedBoard = {
                      ...activeBoard,
                      tasks: activeBoard.tasks.filter(task => task.id !== id)
                    };
                    updateBoard(updatedBoard);
                  }}
                />
              </div>
            )}
            {activeTab === 'notes' && (
              <Notepad
                content={activeBoard.notes}
                onChange={(content) => {
                  const updatedBoard = {
                    ...activeBoard,
                    notes: content
                  };
                  updateBoard(updatedBoard);
                }}
              />
            )}
            {activeTab === 'bookmarks' && (
              <Bookmarks
                bookmarks={activeBoard.bookmarks}
                onDeleteBookmark={(id) => {
                  const updatedBoard = {
                    ...activeBoard,
                    bookmarks: activeBoard.bookmarks.filter(b => b.id !== id)
                  };
                  updateBoard(updatedBoard);
                }}
              />
            )}
            {activeTab === 'timer' && <Timer />}
            {activeTab === 'links' && (
              <QuickLinks
                links={activeBoard.quickLinks}
                onDeleteLink={(id) => {
                  const updatedBoard = {
                    ...activeBoard,
                    quickLinks: activeBoard.quickLinks.filter(l => l.id !== id)
                  };
                  updateBoard(updatedBoard);
                }}
              />
            )}
          </div>
        </div>
      </main>

      <Documentation isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}

export default App;