import React from 'react';
import { AxaLogo } from './AxaLogo';

export const BrandSection: React.FC = () => {
  return (
    <section
      id="marca-axa"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#0B116B] text-white overflow-hidden flex items-center justify-center border-y border-[#1823B8]/40"
    >
      {/* Background Subtle Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
        <span className="text-4xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-widest text-white whitespace-nowrap">
          CLIMATIZACIÓN · ELECTRICIDAD · FONTANERÍA
        </span>
      </div>

      {/* Technical Schematic CAD Overlay Lines & Geometry */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="technical-cad-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(255, 255, 255, 0.6)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#technical-cad-grid)" />

        {/* Blueprint Circuit & Piping Geometric Lines */}
        <g stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" fill="none">
          {/* Top Left Schematic */}
          <path d="M 50 80 L 180 80 L 220 120 L 350 120" />
          <circle cx="50" cy="80" r="3" fill="#FFFFFF" />
          <circle cx="350" cy="120" r="3" fill="#FFFFFF" />

          {/* Bottom Right Schematic */}
          <path d="M 90% 80% L 75% 80% L 70% 65% L 55% 65%" />
          <circle cx="90%" cy="80%" r="3" fill="#FFFFFF" />
          <circle cx="55%" cy="65%" r="3" fill="#FFFFFF" />

          {/* Vertical Technical Dimension Line */}
          <line x1="80" y1="20%" x2="80" y2="80%" strokeDasharray="4 4" stroke="rgba(255,255,255,0.3)" />
          <line x1="72" y1="20%" x2="88" y2="20%" stroke="rgba(255,255,255,0.5)" />
          <line x1="72" y1="80%" x2="88" y2="80%" stroke="rgba(255,255,255,0.5)" />
        </g>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Technical Sub-Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-200">
            IDENTIDAD CORPORATIVA TÉCNICA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* Central Brand Emblem */}
        <div className="flex flex-col items-center justify-center">
          <AxaLogo size="hero" variant="white" className="drop-shadow-2xl" />
        </div>

        {/* Technical Dimensions / Subtitle */}
        <div className="mt-8 pt-8 border-t border-white/15 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <span className="tracking-widest uppercase">TARRAGONA · RAMBLA NOVA 124</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="tracking-widest uppercase">3 ESPECIALIDADES TÉCNICAS</span>
        </div>

      </div>
    </section>
  );
};
