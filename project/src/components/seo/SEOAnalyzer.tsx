import React from 'react';
import { Target, TrendingUp, Book } from 'lucide-react';

interface SEOAnalyzerProps {
  content: string;
  keyword: string;
  analysis: {
    readability: number;
    seoScore: number;
    sentiment: number;
    suggestions: string[];
  };
}

export default function SEOAnalyzer({ content, keyword, analysis }: SEOAnalyzerProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const metrics = [
    {
      label: 'SEO Score',
      value: analysis.seoScore,
      icon: Target,
      description: 'Overall search engine optimization score'
    },
    {
      label: 'Readability',
      value: analysis.readability,
      icon: Book,
      description: 'How easy it is to read and understand'
    },
    {
      label: 'Sentiment',
      value: analysis.sentiment,
      icon: TrendingUp,
      description: 'Content tone and emotional impact'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <metric.icon className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-medium text-gray-900">{metric.label}</h3>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(metric.value)}`}>
              {metric.value}
            </p>
            <p className="mt-1 text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      {analysis.suggestions.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Improvement Suggestions
          </h3>
          <ul className="space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-indigo-600">•</span>
                <span className="text-gray-600">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}