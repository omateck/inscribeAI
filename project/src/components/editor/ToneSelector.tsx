import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const tones = [
    'professional',
    'casual',
    'friendly',
    'formal',
    'persuasive',
  ];

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Tone</span>
      </div>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        {tones.map((tone) => (
          <option key={tone} value={tone}>
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}