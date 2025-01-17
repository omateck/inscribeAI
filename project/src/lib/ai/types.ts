export type ContentType = 'article' | 'social' | 'email' | 'product';

export type ToneType = 
  | 'professional'
  | 'casual'
  | 'friendly'
  | 'formal'
  | 'persuasive';

export interface ContentMetrics {
  readability: number;
  engagement: number;
  seoScore: number;
  sentiment: number;
  complexity: number;
  originality: number;
  shareability: number;
  conversionPotential: number;
}

export interface GenerationOptions {
  length?: 'short' | 'medium' | 'long';
  keywords?: string[];
  style?: 'creative' | 'analytical' | 'persuasive';
  format?: 'markdown' | 'html' | 'plain';
  temperature?: number;
}