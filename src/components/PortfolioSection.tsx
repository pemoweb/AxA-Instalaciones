import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/axaData';
import { PortfolioItem } from '../types';
import { ZoomIn, MapPin, Wind, Zap, Droplets } from 'lucide-react';
import { PortfolioLightbox } from './PortfolioLightbox';

interface PortfolioSectionProps {
  onOpenQuote?: (service: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenQuote }) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'climatizacion' | 'electricidad' | 'fontaneria'>('todos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeFilter === 'todos'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'climatizacion', label: 'Climatización', icon: Wind },
    { id: 'electricidad', label: 'Electricidad', icon: Zap },
    { id: 'fontaneria', label: 'Fontanería', icon: Droplets },
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="trabajos" className="py-20 lg:py-28 bg-[#F4F6FB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
              GALERÍA TÉCNICA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight">
              EL TRABAJO HABLA POR NOSOTROS.
            </h2>
            <div className="w-16 h-1 bg-[#0B116B] mt-4 rounded-full" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0B116B] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0B116B] hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <article
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
                tabIndex={0}
                role="button"
                aria-label={`Ampliar imagen del proyecto: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenLightbox(index);
                  }
                }}
              >
                {/* Image */}
                <figure className={`relative w-full ${isLarge ? 'h-72 sm:h-96' : 'h-72'} overflow-hidden bg-slate-100 m-0`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A40]/90 via-[#060A40]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-[#0B116B] text-white text-xs font-mono font-bold tracking-wider shadow-md">
                      {item.categoryLabel}
                    </span>
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Technical Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/15">
                      {item.technicalSpecs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>

      </div>

      {/* Full-screen Lightbox with Zoom & Carousel */}
      <PortfolioLightbox
        isOpen={lightboxOpen}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
};
