import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/axaData';
import { PortfolioItem } from '../types';
import { X, ZoomIn, MapPin, Tag, ChevronLeft, ChevronRight, Wind, Zap, Droplets } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'climatizacion' | 'electricidad' | 'fontaneria'>('todos');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === 'todos'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'climatizacion', label: 'Climatización', icon: Wind },
    { id: 'electricidad', label: 'Electricidad', icon: Zap },
    { id: 'fontaneria', label: 'Fontanería', icon: Droplets },
  ];

  const handleNextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
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
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image */}
                <div className={`relative w-full ${isLarge ? 'h-72 sm:h-96' : 'h-72'} overflow-hidden bg-slate-100`}>
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
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0B116B] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
              aria-label="Cerrar vista detallada"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
              aria-label="Trabajo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
              aria-label="Siguiente trabajo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-96 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 sm:p-8 bg-[#070C4D] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#0B116B] text-white text-xs font-mono font-bold tracking-wider border border-white/10">
                  {selectedItem.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{selectedItem.location}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase mr-2">ESPECIFICACIONES:</span>
                {selectedItem.technicalSpecs.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-white/10 text-white border border-white/15"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
