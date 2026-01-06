import { CSSProperties } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface Pattern {
  id: string;
  name: string;
  css: CSSProperties;
}

export interface AppState {
  content: string;
  title: string;
  theme: Theme;
  patternId: string;
  customBackground?: string; // Base64 or URL
  font: 'sans' | 'serif' | 'mono';
}

export type GenerationMode = 'text' | 'background';