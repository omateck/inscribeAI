// SEO analysis utilities
export interface SEOScore {
  score: number;
  suggestions: string[];
}

export function analyzeKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word === keyword.toLowerCase()).length;
  return (keywordCount / words.length) * 100;
}

export function analyzeReadability(content: string): number {
  const sentences = content.split(/[.!?]+/);
  const words = content.split(/\s+/);
  const avgWordsPerSentence = words.length / sentences.length;
  // Simple readability score (0-100)
  return Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 5));
}

export function analyzeSEO(content: string, keyword: string): SEOScore {
  const suggestions: string[] = [];
  let score = 100;

  // Keyword density analysis
  const density = analyzeKeywordDensity(content, keyword);
  if (density < 0.5) {
    suggestions.push('Increase keyword density (currently too low)');
    score -= 20;
  } else if (density > 2.5) {
    suggestions.push('Decrease keyword density (currently too high)');
    score -= 15;
  }

  // Content length analysis
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 300) {
    suggestions.push('Content is too short. Aim for at least 300 words');
    score -= 25;
  }

  // Readability analysis
  const readabilityScore = analyzeReadability(content);
  if (readabilityScore < 60) {
    suggestions.push('Improve readability by using shorter sentences');
    score -= 20;
  }

  return {
    score: Math.max(0, score),
    suggestions
  };
}