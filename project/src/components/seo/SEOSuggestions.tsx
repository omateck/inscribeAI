import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SEOSuggestionsProps {
  suggestions: string[];
}

export default function SEOSuggestions({ suggestions }: SEOSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-green-700">Great job! No SEO improvements needed.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Suggestions for Improvement
      </h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm">
            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}