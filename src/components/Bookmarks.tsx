import React from 'react';
import { Bookmark, ExternalLink, Tag, Trash2 } from 'lucide-react';
import { Bookmark as BookmarkType } from '../types';

interface BookmarksProps {
  bookmarks: BookmarkType[];
  onDeleteBookmark: (id: string) => void;
}

export function Bookmarks({ bookmarks, onDeleteBookmark }: BookmarksProps) {
  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Bookmark className="h-5 w-5 text-blue-500" />
            <div>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-900 hover:text-blue-600 flex items-center"
              >
                {bookmark.title}
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <div className="flex items-center space-x-2 mt-1">
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => onDeleteBookmark(bookmark.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
      {bookmarks.length === 0 && (
        <p className="text-center text-gray-500">
          No bookmarks yet. Add one using the command bar!
        </p>
      )}
    </div>
  );
}