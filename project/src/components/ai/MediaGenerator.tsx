import React, { useState } from 'react';
import { Image, Video, Wand2, Loader2, Sparkles, Camera, Clapperboard, Palette } from 'lucide-react';
import { generateImage, generateVideo, imageToVideo, ImageGenerationOptions, VideoGenerationOptions } from '../../lib/ai/mediaGeneration';

const STYLE_PRESETS = {
  photographic: {
    name: 'Photographic',
    icon: Camera,
    description: 'Realistic, high-quality photographs',
  },
  'digital-art': {
    name: 'Digital Art',
    icon: Palette,
    description: 'Modern digital art style',
  },
  cinematic: {
    name: 'Cinematic',
    icon: Clapperboard,
    description: 'Movie-like visuals with dramatic lighting',
  },
  artistic: {
    name: 'Artistic',
    icon: Sparkles,
    description: 'Creative and artistic interpretations',
  },
};

export default function MediaGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [style, setStyle] = useState<keyof typeof STYLE_PRESETS>('photographic');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9'>('16:9');
  const [quality, setQuality] = useState<'standard' | 'hd'>('standard');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      if (mediaType === 'image') {
        const imageUrl = await generateImage({
          prompt,
          negativePrompt,
          style,
          aspectRatio,
          quality
        });
        setResult(imageUrl);
      } else {
        const videoUrl = await generateVideo({
          prompt,
          duration: 4,
          fps: 24,
          style: 'realistic'
        });
        setResult(videoUrl);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Media Type Selection */}
      <div className="flex space-x-4 p-1 bg-gray-100 rounded-lg w-fit">
        <button
          onClick={() => setMediaType('image')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            mediaType === 'image' 
              ? 'bg-white text-indigo-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Image className="w-5 h-5" />
          <span>Image</span>
        </button>
        <button
          onClick={() => setMediaType('video')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            mediaType === 'video' 
              ? 'bg-white text-indigo-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Video className="w-5 h-5" />
          <span>Video</span>
        </button>
      </div>

      {/* Prompt Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prompt
          </label>
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Wand2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Negative Prompt (Optional)
          </label>
          <input
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="Describe what you want to avoid..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(STYLE_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setStyle(key as keyof typeof STYLE_PRESETS)}
              className={`flex items-start p-3 rounded-lg border-2 transition-colors ${
                style === key
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <preset.icon className={`w-5 h-5 mr-3 ${
                style === key ? 'text-indigo-500' : 'text-gray-400'
              }`} />
              <div className="text-left">
                <p className={`font-medium ${
                  style === key ? 'text-indigo-700' : 'text-gray-900'
                }`}>
                  {preset.name}
                </p>
                <p className="text-sm text-gray-500">{preset.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aspect Ratio
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as '1:1' | '16:9')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="16:9">16:9 - Landscape</option>
            <option value="1:1">1:1 - Square</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value as 'standard' | 'hd')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="standard">Standard</option>
            <option value="hd">HD</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${
          loading
            ? 'bg-indigo-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate</span>
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm mt-2">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            {mediaType === 'image' ? (
              <img
                src={result}
                alt="Generated content"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={result}
                controls
                className="w-full h-full"
              />
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => window.open(result, '_blank')}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Open in new tab
            </button>
            {mediaType === 'image' && (
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const videoUrl = await imageToVideo(result);
                    setResult(videoUrl);
                    setMediaType('video');
                  } catch (error) {
                    console.error('Video conversion failed:', error);
                    setError('Video conversion failed. Please try again.');
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Convert to video
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}