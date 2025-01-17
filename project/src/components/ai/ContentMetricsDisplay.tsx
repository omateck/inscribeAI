import React from 'react';
import { BarChart2, Book, Heart, Target, Zap, Star, Share2, TrendingUp } from 'lucide-react';
import { ContentMetrics } from '../../lib/ai/types';

interface MetricsDisplayProps {
  metrics: ContentMetrics;
}

export default function ContentMetricsDisplay({ metrics }: MetricsDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const metricsConfig = [
    {
      label: 'Readability',
      value: metrics.readability,
      icon: Book,
      description: 'How easy it is to read and understand',
    },
    {
      label: 'Engagement',
      value: metrics.engagement,
      icon: Heart,
      description: 'How likely to keep readers interested',
    },
    {
      label: 'SEO Score',
      value: metrics.seoScore,
      icon: Target,
      description: 'Search engine optimization score',
    },
    {
      label: 'Complexity',
      value: metrics.complexity,
      icon: Zap,
      description: 'Content depth and sophistication',
    },
    {
      label: 'Originality',
      value: metrics.originality,
      icon: Star,
      description: 'Content uniqueness score',
    },
    {
      label: 'Shareability',
      value: metrics.shareability,
      icon: Share2,
      description: 'Viral potential score',
    },
    {
      label: 'Conversion',
      value: metrics.conversionPotential,
      icon: TrendingUp,
      description: 'Likelihood to drive action',
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {metricsConfig.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <metric.icon className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {metric.label}
              </h3>
              <p className={`text-xl font-bold ${getScoreColor(metric.value)}`}>
                {Math.round(metric.value)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}