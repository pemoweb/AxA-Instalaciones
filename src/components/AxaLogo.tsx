import React from 'react';

interface AxaLogoProps {
  className?: string;
  variant?: 'white' | 'blue' | 'monochrome';
  withBackground?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
}

export const AxaLogo: React.FC<AxaLogoProps> = ({
  className = '',
  variant = 'white',
  withBackground = false,
  size = 'md',
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? '#FFFFFF' : '#0B116B';
  const starColor = isWhite ? '#0B116B' : '#FFFFFF';
  const starBg = isWhite ? '#FFFFFF' : '#0B116B';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
    hero: 'h-24 md:h-32',
  }[size];

  const svgContent = (
    <svg
      viewBox="0 0 280 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses} w-auto transition-transform duration-300 ${className}`}
      aria-label="Instalaciones AXA Logo"
    >
      {/* Wordmark: Axa */}
      <g>
        {/* Letter 'A' */}
        <path
          d="M28 84L60 12H81L113 84H91L83.5 66H57.5L50 84H28ZM63 50H78L70.5 30.5L63 50Z"
          fill={textColor}
        />

        {/* Letter 'x' */}
        <path
          d="M102 36H121L137.5 58L154 36H173L147.5 68L174 102H154L136.5 77L118 102H98L125.5 67L102 36Z"
          fill={textColor}
        />

        {/* Letter 'a' */}
        <path
          d="M208 34C226 34 238 46 238 66V102H221V89C216 97.5 205.5 102.5 193 102.5C176 102.5 164 91.5 164 75.5C164 59 177.5 49.5 205.5 49.5H220V48C220 40 214 36 205 36C196.5 36 189 39 184.5 44L173 33C181 24.5 193 19.5 208 34ZM220 63H207C192 63 184.5 67.5 184.5 75.5C184.5 83.5 192 88.5 202 88.5C213 88.5 220 81 220 71V63Z"
          fill={textColor}
        />

        {/* Distinct 4-point star inside the 'a' bowl center matching official brand image */}
        <g transform="translate(198, 70)">
          <path
            d="M 0 -14 Q 2 -2 14 0 Q 2 2 0 14 Q -2 2 -14 0 Q -2 -2 0 -14 Z"
            fill={starBg}
          />
          <path
            d="M 0 -10 Q 1.5 -1.5 10 0 Q 1.5 1.5 0 10 Q -1.5 1.5 -10 0 Q -1.5 -1.5 0 -10 Z"
            fill={starColor}
          />
        </g>
      </g>

      {/* Subtitle: INSTALACIONES */}
      <text
        x="137"
        y="122"
        textAnchor="middle"
        fill={textColor}
        fontSize="17.5"
        fontWeight="800"
        letterSpacing="0.30em"
        fontFamily="'Plus Jakarta Sans', 'Outfit', sans-serif"
      >
        INSTALACIONES
      </text>
    </svg>
  );

  if (withBackground) {
    return (
      <div className="inline-flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#000D76] shadow-lg border border-white/15">
        {svgContent}
      </div>
    );
  }

  return svgContent;
};
