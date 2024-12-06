import { Task, Bookmark, QuickLink } from '../types';

export const executeCommand = (
  command: string,
  {
    setActiveTab,
    setTasks,
    setBookmarks,
    setQuickLinks,
    startTimer,
    pauseTimer,
    resetTimer,
    tasks,
    bookmarks,
    quickLinks,
  }: any
) => {
  const [cmd, ...args] = command.split(' ');

  switch (cmd) {
    // Navigation commands
    case '/show':
      if (['tasks', 'notes', 'bookmarks', 'timer', 'links'].includes(args[0])) {
        setActiveTab(args[0]);
        return `Switched to ${args[0]}`;
      }
      break;

    // Task commands
    case '/task':
      if (args[0] === 'add' && args.slice(1).join(' ')) {
        const newTask: Task = {
          id: Date.now().toString(),
          text: args.slice(1).join(' '),
          completed: false,
        };
        setTasks([...tasks, newTask]);
        return 'Task added successfully';
      }
      if (args[0] === 'clear') {
        setTasks([]);
        return 'All tasks cleared';
      }
      break;

    // Bookmark commands
    case '/bookmark':
      if (args[0] === 'add' && args[1] && args[2]) {
        const newBookmark: Bookmark = {
          id: Date.now().toString(),
          title: args[1],
          url: args[2],
          tags: args.slice(3),
          createdAt: new Date().toISOString(),
        };
        setBookmarks([...bookmarks, newBookmark]);
        return 'Bookmark added successfully';
      }
      break;

    // Timer commands
    case '/timer':
      if (args[0] === 'start') {
        startTimer();
        return 'Timer started';
      }
      if (args[0] === 'pause') {
        pauseTimer();
        return 'Timer paused';
      }
      if (args[0] === 'reset') {
        resetTimer();
        return 'Timer reset';
      }
      break;

    // Quick links commands
    case '/link':
      if (args[0] === 'add' && args[1] && args[2]) {
        const newLink: QuickLink = {
          id: Date.now().toString(),
          title: args[1],
          url: args[2],
          icon: args[3] || '🔗',
        };
        setQuickLinks([...quickLinks, newLink]);
        return 'Quick link added successfully';
      }
      break;

    // Clear commands
    case '/clear':
      if (args[0] === 'notes') {
        localStorage.setItem('notepad-content', '');
        window.location.reload();
        return 'Notes cleared';
      }
      break;

    default:
      return 'Unknown command. Type /help to see available commands.';
  }
};

export const commandsList = [
  {
    category: 'Navigation',
    commands: [
      { command: '/show tasks', description: 'Switch to tasks view' },
      { command: '/show notes', description: 'Switch to notes view' },
      { command: '/show bookmarks', description: 'Switch to bookmarks view' },
      { command: '/show timer', description: 'Switch to timer view' },
      { command: '/show links', description: 'Switch to quick links view' },
    ],
  },
  {
    category: 'Tasks',
    commands: [
      { command: '/task add <text>', description: 'Add a new task' },
      { command: '/task clear', description: 'Clear all tasks' },
    ],
  },
  {
    category: 'Bookmarks',
    commands: [
      {
        command: '/bookmark add <title> <url> [tags...]',
        description: 'Add a new bookmark with optional tags',
      },
    ],
  },
  {
    category: 'Timer',
    commands: [
      { command: '/timer start', description: 'Start the Pomodoro timer' },
      { command: '/timer pause', description: 'Pause the timer' },
      { command: '/timer reset', description: 'Reset the timer' },
    ],
  },
  {
    category: 'Quick Links',
    commands: [
      {
        command: '/link add <title> <url> [icon]',
        description: 'Add a new quick link with optional icon',
      },
    ],
  },
  {
    category: 'Other',
    commands: [
      { command: '/clear notes', description: 'Clear all notes' },
      { command: '/help', description: 'Show this help message' },
    ],
  },
];