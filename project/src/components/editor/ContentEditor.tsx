import React, { useState, useCallback } from 'react';
import { Save, Wand2 } from 'lucide-react';
import { useContent } from '../../hooks/useContent';
import { useProfile } from '../../hooks/useProfile';
import { generateContent, analyzeContent } from '../../lib/ai/index';
import EditorToolbar from './EditorToolbar';
import KeywordsInput from './KeywordsInput';
import ToneSelector from './ToneSelector';
import SEOAnalyzer from '../seo/SEOAnalyzer';

interface ContentEditorProps {
  userId: string;
  onSave?: () => void;
}

export default function ContentEditor({ userId, onSave }: ContentEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'article' | 'social' | 'email' | 'product'>('article');
  const [tone, setTone] = useState('professional');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const { createContent, loading: saving } = useContent();
  const { updateWordCount } = useProfile();

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const generatedContent = await generateContent(title, type, tone, {
        keywords,
        style: 'analytical',
        length: 'medium'
      });
      setContent(generatedContent);
      
      // Analyze the generated content
      const contentAnalysis = await analyzeContent(generatedContent);
      setAnalysis(contentAnalysis);
      
      const wordCount = generatedContent.split(/\s+/).length;
      await updateWordCount(userId, wordCount);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      await createContent(title, content, type, userId, keywords);
      onSave?.();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!content) return;
    try {
      const contentAnalysis = await analyzeContent(content);
      setAnalysis(contentAnalysis);
    } catch (error) {
      console.error('Error analyzing content:', error);
    }
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        className="w-full text-2xl font-bold mb-4 p-2 border-b focus:outline-none focus:border-indigo-500"
      />
      
      <div className="flex gap-4 mb-4">
        <ToneSelector value={tone} onChange={setTone} />
        <KeywordsInput value={keywords} onChange={setKeywords} />
      </div>

      <EditorToolbar type={type} onTypeChange={setType} />
      
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing or generate content..."
          className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        <button
          onClick={handleAnalyze}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-indigo-600"
        >
          Analyze
        </button>
      </div>

      {analysis && (
        <div className="mt-4">
          <SEOAnalyzer 
            content={content} 
            keyword={keywords[0] || ''} 
            analysis={analysis}
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleGenerate}
          disabled={generating || !title}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          {generating ? 'Generating...' : 'Generate Content'}
        </button>

        <button
          onClick={handleSave}
          disabled={saving || !content}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}