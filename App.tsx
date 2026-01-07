import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Controls } from './components/Controls';
import { PhonePreview } from './components/PhonePreview';
import { AppState, Theme } from './types';
import { PATTERNS, SAMPLE_TEXT } from './constants';
import { generateText, generateBackgroundPattern, isAIAvailable } from './services/geminiService';

// Helper to strip markdown syntax since we aren't using a markdown renderer anymore
const cleanMarkdown = (text: string) => {
  return text
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*/g, '')    // Remove bold
    .replace(/\*/g, '')      // Remove italic
    .replace(/__|\_/g, '')   // Remove underline/italic
    .replace(/^>\s+/gm, '')  // Remove blockquotes
    .replace(/`/g, '');      // Remove code ticks
};

const DEFAULT_STATE: AppState = {
  content: cleanMarkdown(SAMPLE_TEXT),
  title: "The Art of Simplicity",
  theme: Theme.Light,
  patternId: 'paper',
  font: 'sans',
};

export default function App() {
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedPattern = PATTERNS.find(p => p.id === appState.patternId) || PATTERNS[1];

  const handleGenerateText = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const generated = await generateText(prompt);
      // Try to split title and content if possible
      const lines = generated.split('\n');
      let newTitle = "Generated Note";
      let newContent = generated;

      if (lines.length > 0) {
        // Heuristic: If first line is short and looks like a title
        if (lines[0].length < 50 && lines[0].length > 0) {
          newTitle = lines[0].replace(/^#+\s*/, '').trim(); // Remove markdown headers
          newContent = lines.slice(1).join('\n').trim();
        }
      }

      setAppState(prev => ({
        ...prev,
        title: newTitle,
        content: newContent
      }));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Failed to generate text. Please check your API key configuration.";
      alert(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBackground = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateBackgroundPattern(prompt);
      setAppState(prev => ({
        ...prev,
        patternId: 'custom',
        customBackground: imageUrl
      }));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Failed to generate background. Please check your API key configuration.";
      alert(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) {
      return;
    }

    try {
      // Small delay to ensure rendering is stable
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `notegenie-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    }
  }, [previewRef]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 border-b flex items-center justify-between">
        <span className="font-bold text-indigo-600">NoteGenie</span>
        <button className="text-sm text-gray-500" onClick={() => alert("Please use desktop for full controls")}>Beta</button>
      </div>

      {/* Left Sidebar: Controls */}
      <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 h-[50vh] md:h-full z-20 shadow-xl relative">
        <Controls
          appState={appState}
          setAppState={setAppState}
          onGenerateText={handleGenerateText}
          onGenerateBackground={handleGenerateBackground}
          onDownload={handleDownload}
          isGenerating={isGenerating}
          isAIAvailable={isAIAvailable}
        />
      </div>

      {/* Main Area: Preview */}
      <div className="flex-1 bg-gray-100 overflow-auto h-[50vh] md:h-full relative">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
        <PhonePreview
          ref={previewRef}
          appState={appState}
          selectedPattern={selectedPattern}
        />
      </div>
    </div>
  );
}