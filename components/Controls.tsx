import React, { useState } from 'react';
import { AppState, Pattern, Theme } from '../types';
import { PATTERNS } from '../constants';
import { Button } from './Button';
import { Wand2, Download, Moon, Sun, Type, Image as ImageIcon, Sparkles, RefreshCcw } from 'lucide-react';

interface ControlsProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  onGenerateText: (prompt: string) => Promise<void>;
  onGenerateBackground: (prompt: string) => Promise<void>;
  onDownload: () => void;
  isGenerating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  appState, 
  setAppState, 
  onGenerateText, 
  onGenerateBackground,
  onDownload,
  isGenerating 
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [aiPrompt, setAiPrompt] = useState('');

  const handlePatternSelect = (patternId: string) => {
    setAppState(prev => ({ ...prev, patternId }));
  };

  const handleThemeToggle = () => {
    setAppState(prev => ({ ...prev, theme: prev.theme === Theme.Light ? Theme.Dark : Theme.Light }));
  };

  const handleFontChange = (font: AppState['font']) => {
    setAppState(prev => ({ ...prev, font }));
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2 text-indigo-600 mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold text-lg tracking-tight">NoteGenie</span>
        </div>
        <p className="text-sm text-gray-500">Create stunning cards for social media.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Content
        </button>
        <button 
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'design' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Design
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* AI Generation */}
            <div className="bg-indigo-50 p-4 rounded-xl space-y-3">
              <label className="block text-sm font-semibold text-indigo-900 flex items-center">
                <Wand2 className="w-4 h-4 mr-2" />
                AI Content Generator
              </label>
              <textarea 
                className="w-full p-3 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                placeholder="e.g. Write a motivational quote about success..."
                rows={2}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <Button 
                onClick={() => onGenerateText(aiPrompt)}
                disabled={!aiPrompt} 
                isLoading={isGenerating}
                className="w-full text-sm"
              >
                Generate Magic Content
              </Button>
            </div>

            {/* Manual Edit */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={appState.title}
                onChange={(e) => setAppState(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title..."
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Body Text</label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-64 font-mono text-sm"
                value={appState.content}
                onChange={(e) => setAppState(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Type your long text here..."
              />
            </div>
          </div>
        )}

        {/* DESIGN TAB */}
        {activeTab === 'design' && (
          <div className="space-y-8">
             {/* Theme & Font */}
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Theme</label>
                <button 
                  onClick={handleThemeToggle}
                  className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {appState.theme === Theme.Light ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{appState.theme === Theme.Light ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Font</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {(['sans', 'serif', 'mono'] as const).map(f => (
                     <button
                       key={f}
                       onClick={() => handleFontChange(f)}
                       className={`flex-1 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${appState.font === f ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                       {f}
                     </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Background */}
            <div className="bg-purple-50 p-4 rounded-xl space-y-3">
              <label className="block text-sm font-semibold text-purple-900 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                AI Background Generator
              </label>
              <textarea 
                className="w-full p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                placeholder="e.g. Sunset clouds, neon city rain..."
                rows={2}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <Button 
                onClick={() => onGenerateBackground(aiPrompt)}
                disabled={!aiPrompt} 
                isLoading={isGenerating}
                variant="secondary"
                className="w-full text-sm !bg-white !text-purple-700 !border-purple-200 hover:!bg-purple-50"
              >
                Generate Background
              </Button>
            </div>

            {/* Patterns Grid */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Background Patterns</label>
                {appState.customBackground && (
                  <button onClick={() => setAppState(prev => ({...prev, customBackground: undefined}))} className="text-xs text-red-500 hover:underline">Clear Custom</button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {PATTERNS.filter(p => p.id !== 'custom').map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => {
                      handlePatternSelect(pattern.id);
                      setAppState(prev => ({...prev, customBackground: undefined}));
                    }}
                    className={`
                      relative aspect-square rounded-lg border-2 transition-all overflow-hidden group
                      ${appState.patternId === pattern.id && !appState.customBackground ? 'border-indigo-600 ring-2 ring-indigo-200 ring-offset-1' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="absolute inset-0" style={pattern.css} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <Button onClick={onDownload} className="w-full flex items-center justify-center space-x-2">
           <Download className="w-4 h-4" />
           <span>Download Image</span>
        </Button>
      </div>
    </div>
  );
};
