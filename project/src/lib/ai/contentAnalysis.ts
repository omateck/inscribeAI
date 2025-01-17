import { ContentMetrics } from './types';

export function analyzeContent(content: string): ContentMetrics {
  return {
    readability: calculateReadability(content),
    engagement: calculateEngagement(content),
    seoScore: calculateSEOScore(content),
    sentiment: analyzeSentiment(content),
    complexity: calculateComplexity(content),
    originality: checkOriginality(content),
    shareability: calculateShareability(content),
    conversionPotential: analyzeConversionPotential(content)
  };
}

function calculateReadability(content: string): number {
  const sentences = content.split(/[.!?]+/);
  const words = content.split(/\s+/);
  const syllables = countSyllables(content);
  
  // Advanced readability using multiple formulas
  const fleschScore = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
  const gunningFog = 0.4 * ((words.length / sentences.length) + 100 * (complexWords(content) / words.length));
  
  return normalizeScore((fleschScore + (100 - gunningFog)) / 2);
}

function calculateEngagement(content: string): number {
  const metrics = {
    questionDensity: (content.match(/\?/g) || []).length / content.length,
    emotionalWords: countEmotionalWords(content),
    powerWords: countPowerWords(content),
    readingTime: estimateReadingTime(content),
    structureScore: analyzeStructure(content)
  };

  return calculateEngagementScore(metrics);
}

function calculateComplexity(content: string): number {
  // Analyze linguistic complexity
  return 85; // Placeholder
}

function checkOriginality(content: string): number {
  // Check content uniqueness
  return 90; // Placeholder
}

function calculateShareability(content: string): number {
  // Analyze viral potential
  return 75; // Placeholder
}

function analyzeConversionPotential(content: string): number {
  // Analyze conversion optimization
  return 80; // Placeholder
}

// Helper functions
function countSyllables(word: string): number {
  return word.toLowerCase()
    .replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '')
    .match(/[aeiouy]{1,2}/g)?.length || 1;
}

function complexWords(content: string): number {
  return content.split(/\s+/).filter(word => countSyllables(word) > 2).length;
}

function normalizeScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

function countEmotionalWords(content: string): number {
  const emotionalWords = ['love', 'hate', 'exciting', 'amazing', 'terrible'];
  return emotionalWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(word, 'g')) || []).length
  , 0);
}

function countPowerWords(content: string): number {
  const powerWords = ['instantly', 'proven', 'guarantee', 'exclusive', 'revolutionary'];
  return powerWords.reduce((count, word) => 
    count + (content.toLowerCase().match(new RegExp(word, 'g')) || []).length
  , 0);
}

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return words / 200; // Average reading speed
}

function analyzeStructure(content: string): number {
  const paragraphs = content.split('\n\n');
  const avgParagraphLength = content.length / paragraphs.length;
  return normalizeScore(100 - (avgParagraphLength - 80) * 0.5);
}