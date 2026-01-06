import { Pattern } from './types';

// SVG Data URIs for repeatable patterns
const patternSvgs = {
  dots: `data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E`,
  lines: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E`,
  grid: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E`,
  paper: `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E`,
  zigzag: `data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l-12 12H6.172zM24 12L36 0h3.656l-12 12H24z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E`,
  triangles: `data:image/svg+xml,%3Csvg width='36' height='72' viewBox='0 0 36 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
  waves: `data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c2.2 0 4 1.8 4 4s1.8 4 4 4 4-1.8 4-4 1.8-4 4-4v2c-1.1 0-2 .9-2 2s-.9 2-2 2-2-.9-2-2-.9-2-2-2V0z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E`,
  hex: `data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V10c0-5.523 4.477-10 10-10H0v40z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E`,
  topography: `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E`,
  cross: `data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zM1 5h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zM1 9h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM1 13h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM1 17h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E`,
};

export const PATTERNS: Pattern[] = [
  { id: 'custom', name: 'Custom AI', css: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' } },
  { id: 'paper', name: 'Paper', css: { backgroundColor: '#fdfbf7', backgroundImage: `url("${patternSvgs.paper}")` } },
  { id: 'dots', name: 'Dots', css: { backgroundColor: '#e0f2fe', backgroundImage: `url("${patternSvgs.dots}")` } },
  { id: 'lines', name: 'Lines', css: { backgroundColor: '#f0fdf4', backgroundImage: `url("${patternSvgs.lines}")` } },
  { id: 'grid', name: 'Grid', css: { backgroundColor: '#fff7ed', backgroundImage: `url("${patternSvgs.grid}")` } },
  { id: 'triangles', name: 'Triangles', css: { backgroundColor: '#f5f3ff', backgroundImage: `url("${patternSvgs.triangles}")` } },
  { id: 'zigzag', name: 'Zigzag', css: { backgroundColor: '#fff1f2', backgroundImage: `url("${patternSvgs.zigzag}")` } },
  { id: 'waves', name: 'Waves', css: { backgroundColor: '#ecfeff', backgroundImage: `url("${patternSvgs.waves}")` } },
  { id: 'hex', name: 'Hexagon', css: { backgroundColor: '#fdf2f8', backgroundImage: `url("${patternSvgs.hex}")` } },
  { id: 'topography', name: 'Topo', css: { backgroundColor: '#f0f9ff', backgroundImage: `url("${patternSvgs.topography}")` } },
  { id: 'cross', name: 'Cross', css: { backgroundColor: '#fafaf9', backgroundImage: `url("${patternSvgs.cross}")` } },
];

export const SAMPLE_TEXT = `## The Art of Simplicity

Simplicity is **not** about the absence of clutter, but the *presence of meaning*. In a world that constantly demands our attention, finding clarity is an act of rebellion.

> "Simplicity is the ultimate sophistication."
> — *Leonardo da Vinci*

### Key Principles
1.  **Remove the non-essential**: Strip away what doesn't matter.
2.  **Focus on value**: What truly adds joy or utility?
3.  **Iterate**: Simplicity is a process, not a destination.

When we strip away the excess, we are left with what truly matters. This applies to design, to writing, and to life itself.`;