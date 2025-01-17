import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';

interface KeywordsInputProps {
  value: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordsInput({ value, onChange }: KeywordsInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onChange([...value, input.trim()]);
      setInput('');
    }
  };

  const removeKeyword = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-4 h-4" />
        <span className="text-sm font-medium">Keywords</span>
      </div>
      
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
        {value.map((keyword, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(index)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add keywords..."
          className="flex-1 min-w-[100px] outline-none"
        />
      </div>
    </div>
  );
}