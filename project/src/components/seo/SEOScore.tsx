import React from 'react';
import { Target } from 'lucide-react';

interface SEOScoreProps {
  score: number;
}

export default function SEOScore({ score }: SEOScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <Target className="w-6 h-6 text-indigo-600" />
      <div>
        <h3 className="text-sm font-medium text-gray-900">SEO Score</h3>
        <p className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}/100
        </p>
      </div>
    </div>
  );
}