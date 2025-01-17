import React from 'react';
import { FileText, MessageSquare, Mail, ShoppingBag } from 'lucide-react';

interface EditorToolbarProps {
  type: 'article' | 'social' | 'email' | 'product';
  onTypeChange: (type: 'article' | 'social' | 'email' | 'product') => void;
}

export default function EditorToolbar({ type, onTypeChange }: EditorToolbarProps) {
  const types = [
    { id: 'article', icon: FileText, label: 'Article' },
    { id: 'social', icon: MessageSquare, label: 'Social' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'product', icon: ShoppingBag, label: 'Product' },
  ] as const;

  return (
    <div className="flex gap-2 mb-4">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id)}
          className={`flex items-center px-3 py-2 rounded ${
            type === id
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}