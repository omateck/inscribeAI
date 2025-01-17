import { ContentType, ToneType, ContentMetrics } from './types';
import { supabase } from '../supabase';
import Replicate from 'replicate';
import { analyzeContent as analyzeContentUtil } from './contentAnalysis';

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

export async function generateContent(
  prompt: string,
  type: ContentType,
  tone: ToneType,
  options: {
    length?: 'short' | 'medium' | 'long';
    keywords?: string[];
    style?: 'creative' | 'analytical' | 'persuasive';
  } = {}
): Promise<string> {
  try {
    const output = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt: generatePrompt(prompt, type, tone, options),
          temperature: 0.7,
          max_length: getLengthTokens(options.length),
          top_p: 0.9,
        }
      }
    );

    return output.join('');
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}

export async function analyzeContent(content: string): Promise<ContentMetrics> {
  return analyzeContentUtil(content);
}

function generatePrompt(
  prompt: string,
  type: ContentType,
  tone: ToneType,
  options: any
): string {
  const basePrompt = `Create ${type} content with a ${tone} tone about: ${prompt}`;
  const styleGuide = options.style ? `\nUse a ${options.style} writing style.` : '';
  const keywordGuide = options.keywords?.length 
    ? `\nIncorporate these keywords naturally: ${options.keywords.join(', ')}`
    : '';

  return `${basePrompt}${styleGuide}${keywordGuide}`;
}

function getLengthTokens(length: string = 'medium'): number {
  const tokens = {
    short: 300,
    medium: 600,
    long: 1200
  };
  return tokens[length] || tokens.medium;
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
        }
      }
    );

    return output[0];
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

export async function generateVideo(prompt: string, duration: number = 4): Promise<string> {
  try {
    const output = await replicate.run(
      "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
      {
        input: {
          prompt,
          video_length: duration,
          fps: 24,
          motion_bucket_id: 127,
          cond_aug: 0.02,
        }
      }
    );

    return output.video;
  } catch (error) {
    console.error('Error generating video:', error);
    throw new Error('Failed to generate video');
  }
}