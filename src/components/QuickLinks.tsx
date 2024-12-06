import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { QuickLink as QuickLinkType } from '../types';

interface QuickLinksProps {
  links: QuickLinkType[];
  onDeleteLink: (id: string) => void;
}

export function QuickLinks({ links, onDeleteLink }: QuickLinksProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {links.map((link) => (
        <div
          key={link.id}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-2xl">{link.icon}</span>
            <button
              onClick={() => onDeleteLink(link.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block"
          >
            <h3 className="font-medium text-gray-900 flex items-center">
              {link.title}
              <ExternalLink className="h-4 w-4 ml-1" />
            </h3>
          </a>
        </div>
      ))}
      {links.length === 0 && (
        <p className="text-center text-gray-500 col-span-full">
          No quick links yet. Add one using the command bar!
        </p>
      )}
    </div>
  );
}