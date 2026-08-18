import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, 
  MapPin, Wind, Zap, Droplets, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioLightboxProps {
  isOpen: boolean;
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onOpenQuote?: (service: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const PortfolioLightbox: React.FC<PortfolioLightboxProps> = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
  onOpenQuote,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Reset zoom when switching items
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !currentItem) return null;

  const CategoryIcon = 
    currentItem.category === 'climatizacion' ? Wind :
    currentItem.category === 'electricidad' ? Zap : Droplets;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizador de imagen: ${currentItem.title}`}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Top Header Controls Bar */}
      <header
        className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/80 to-transparent text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Index & Category Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 bg-white/10 px-2.5 py-1 rounded-md">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B116B] text-white text-xs font-mono font-bold tracking-wider border border-white/20">
            <CategoryIcon className="w-3.5 h-3.5 text-sky-300" />
            <span>{currentItem.categoryLabel}</span>
          </span>
        </div>

        {/* Center: Title (Hidden on small mobile) */}
        <div className="hidden md:block text-center truncate max-w-md px-4">
          <p className="text-sm font-bold text-white truncate">{currentItem.title}</p>
          <p className="text-xs text-slate-400 truncate flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {currentItem.location}
          </p>
        </div>

        {/* Right Action Icons: Zoom, Fullscreen, Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isZoomed ? 'Reducir zoom' : 'Ampliar zoom'}
            aria-label={isZoomed ? 'Reducir zoom' : 'Ampliar zoom'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-1"
            title="Cerrar (Esc)"
            aria-label="Cerrar visor a pantalla completa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Center Stage: Main Image & Navigation Controls */}
      <main
        className="relative flex-grow flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Fullscreen Image */}
        <div
          className={`relative max-w-full max-h-[62vh] sm:max-h-[68vh] transition-all duration-300 ease-out flex items-center justify-center ${
            isZoomed ? 'scale-125 sm:scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            key={currentItem.id}
            src={currentItem.image}
            alt={`Trabajo realizado AXA: ${currentItem.title}`}
            className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Siguiente fotografía"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom Panel: Details & Thumbnails Carousel */}
      <footer
        className="relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent p-4 sm:p-6 text-white border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto space-y-4">
          
          {/* Metadata & Actions row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-white">{currentItem.location}</span>
                <span className="text-white/40">·</span>
                <span className="text-slate-300">{currentItem.description}</span>
              </div>

              {/* Technical Specifications Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">TÉCNICA:</span>
                {currentItem.technicalSpecs.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/15"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Consultation Button */}
            {onOpenQuote && (
              <button
                type="button"
                onClick={() => {
                  const cat = currentItem.category;
                  onClose();
                  onOpenQuote(cat);
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-white text-[#0B116B] text-xs font-extrabold uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg shrink-0"
              >
                <span>CONSULTAR ESTE SERVICIO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Thumbnail Preview Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-2 scrollbar-thin scrollbar-thumb-white/20">
            {items.map((thumb, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => {
                    setIsZoomed(false);
                    onNavigate(idx);
                  }}
                  className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-400 scale-105 shadow-[0_0_12px_rgba(56,189,248,0.6)] ring-2 ring-sky-400/50'
                      : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                  }`}
                  aria-label={`Ver foto ${idx + 1}: ${thumb.title}`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.title}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-sky-400/15" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </footer>
    </div>
  );
};
