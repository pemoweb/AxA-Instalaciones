import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll progress percentage (0 to 100)
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }

      // Show button after scrolling down 350px
      if (scrollTop > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      id="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className={`fixed z-30 flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:ring-offset-2 ${
        // Positioning: elevated on mobile to prevent overlapping with the fixed MobileBottomBar
        'bottom-20 right-4 sm:right-6 lg:bottom-8 lg:right-8'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-6 pointer-events-none scale-90'
      }`}
    >
      <div className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B116B] text-white shadow-xl hover:bg-[#070C4D] flex items-center justify-center border border-white/20 hover:scale-105 active:scale-95 transition-all">
        {/* Subtle circular SVG progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeDasharray={131.95}
            strokeDashoffset={131.95 - (scrollProgress / 100) * 131.95}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 text-white" />
      </div>
    </button>
  );
};
