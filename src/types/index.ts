export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
  boardId: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
  boardId: string;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  boardId: string;
}

export interface Timer {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  type: 'work' | 'break';
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
  bookmarks: Bookmark[];
  quickLinks: QuickLink[];
  notes: string;
}