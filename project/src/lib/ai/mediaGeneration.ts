import Replicate from 'replicate';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

export interface ImageGenerationOptions {
  prompt: string;
  negativePrompt?: string;
  style?: 'photographic' | 'artistic' | 'digital-art' | 'cinematic';
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2';
  quality?: 'standard' | 'hd';
}

export interface VideoGenerationOptions {
  prompt: string;
  duration?: number;
  fps?: number;
  style?: 'realistic' | 'stylized' | 'animated';
}

export async function generateImage(options: ImageGenerationOptions): Promise<string> {
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: options.prompt,
        negative_prompt: options.negativePrompt,
        width: options.aspectRatio === '16:9' ? 1024 : 768,
        height: options.aspectRatio === '16:9' ? 576 : 768,
        num_outputs: 1,
        scheduler: "K_EULER",
        num_inference_steps: options.quality === 'hd' ? 50 : 30,
        guidance_scale: 7.5,
        refine: options.quality === 'hd' ? "expert_ensemble_refiner" : "no_refiner",
      }
    }
  );

  return output[0];
}

export async function generateVideo(options: VideoGenerationOptions): Promise<string> {
  // Generate video frames using Stable Video Diffusion
  const output = await replicate.run(
    "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
    {
      input: {
        prompt: options.prompt,
        video_length: options.duration || 4,
        fps: options.fps || 24,
        motion_bucket_id: 127,
        cond_aug: 0.02,
      }
    }
  );

  return output.video;
}

export async function imageToVideo(imageUrl: string, options: {
  duration?: number;
  motion?: 'pan' | 'zoom' | 'both';
}): Promise<string> {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  // Download the image
  const imageData = await fetchFile(imageUrl);
  ffmpeg.writeFile('input.jpg', imageData);

  // Create video effect
  const duration = options.duration || 5;
  const motion = options.motion || 'both';
  
  let filter: string;
  switch (motion) {
    case 'pan':
      filter = `zoompan=z=1:x='iw*0.5':y='ih*0.5+ih*0.25*sin(t)':d=${duration*25}:s=1920x1080`;
      break;
    case 'zoom':
      filter = `zoompan=z='1+0.1*sin(t*2)':x='iw/2':y='ih/2':d=${duration*25}:s=1920x1080`;
      break;
    case 'both':
      filter = `zoompan=z='1+0.1*sin(t*2)':x='iw*0.5+iw*0.1*cos(t)':y='ih*0.5+ih*0.1*sin(t)':d=${duration*25}:s=1920x1080`;
      break;
  }

  await ffmpeg.exec([
    '-i', 'input.jpg',
    '-vf', filter,
    '-c:v', 'libx264',
    '-t', duration.toString(),
    '-pix_fmt', 'yuv420p',
    'output.mp4'
  ]);

  const data = await ffmpeg.readFile('output.mp4');
  const videoBlob = new Blob([data], { type: 'video/mp4' });
  return URL.createObjectURL(videoBlob);
}