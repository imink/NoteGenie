import React, { forwardRef } from 'react';
import { AppState, Pattern, Theme } from '../types';

interface PhonePreviewProps {
  appState: AppState;
  selectedPattern: Pattern;
}

export const PhonePreview = forwardRef<HTMLDivElement, PhonePreviewProps>(({ appState, selectedPattern }, ref) => {
  const isDark = appState.theme === Theme.Dark;
  
  // Decide the background style
  const backgroundStyle = appState.customBackground 
    ? { backgroundImage: `url(${appState.customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : selectedPattern.css;

  // Font family classes
  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }[appState.font];

  return (
    <div className="flex justify-center items-start py-8 min-h-full">
      {/* The capture target needs to handle its own sizing properly for html-to-image to capture all scrolling content. 
          We set a fixed width (iPhone 14 Pro Max approx width) and auto height. 
      */}
      <div 
        ref={ref}
        className="relative w-[400px] shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          ...backgroundStyle,
          minHeight: '800px', // Minimum phone screen height
        }}
      >
        {/* Content Container */}
        <div className={`
          relative z-10 p-8 min-h-[800px] flex flex-col
          ${isDark ? 'text-gray-100' : 'text-gray-900'}
        `}>
          
          {/* Card / Text Area */}
          <div className={`
            backdrop-blur-xl rounded-2xl p-8 shadow-lg flex-grow
            ${isDark ? 'bg-black/70 border border-white/10' : 'bg-white/80 border border-white/40'}
            transition-colors duration-300
          `}>
            {appState.title && (
              <h1 className={`text-3xl font-bold mb-6 leading-tight ${fontClass}`}>
                {appState.title}
              </h1>
            )}
            
            <div className={`whitespace-pre-wrap leading-relaxed ${fontClass} text-lg`}>
              {appState.content || "Start typing or generate text..."}
            </div>

            <div className="mt-12 pt-6 border-t border-current opacity-30 flex justify-between items-center text-xs tracking-widest uppercase">
              <span>NoteGenie</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

PhonePreview.displayName = 'PhonePreview';