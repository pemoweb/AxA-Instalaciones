import React from 'react';
import { ArrowRight, Wind, Zap, Droplets } from 'lucide-react';
import { SERVICES_DATA } from '../data/axaData';

interface SpecialtiesOverviewProps {
  onSelectService: (serviceId: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const SpecialtiesOverview: React.FC<SpecialtiesOverviewProps> = ({ onSelectService }) => {
  const scrollToService = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const specialties = [
    {
      id: 'climatizacion' as const,
      number: '01',
      title: 'CLIMATIZACIÓN',
      tagline: 'Soluciones para disfrutar del confort durante todo el año.',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      target: '#climatizacion',
    },
    {
      id: 'electricidad' as const,
      number: '02',
      title: 'ELECTRICIDAD',
      tagline: 'Instalaciones y soluciones eléctricas profesionales.',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
      target: '#electricidad',
    },
    {
      id: 'fontaneria' as const,
      number: '03',
      title: 'FONTANERÍA',
      tagline: 'Soluciones de fontanería para viviendas y negocios.',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      target: '#fontaneria',
    },
  ];

  return (
    <section id="especialidades" className="py-20 lg:py-28 bg-[#F4F6FB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
            ÁREAS DE ACTUACIÓN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight leading-tight">
            TRES ESPECIALIDADES.<br />
            <span className="text-[#070C4D]">UNA SOLUCIÓN PROFESIONAL.</span>
          </h2>
          <div className="w-16 h-1 bg-[#0B116B] mt-5 rounded-full" />
        </div>

        {/* 3 Large Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Photo with Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={`Instalaciones AXA - ${item.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A40]/80 via-transparent to-transparent" />
                  
                  {/* Top Bar inside Card: Number + Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-[#0B116B] text-white text-xs font-mono font-bold tracking-wider shadow-md">
                      {item.number}
                    </span>
                    <div className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#0B116B] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B116B] tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 gap-2">
                    <button
                      onClick={() => scrollToService(item.target)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-bold text-slate-700 hover:text-[#0B116B] transition-colors"
                    >
                      <span>VER DETALLES</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => onSelectService(item.id)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#0B116B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#070C4D] transition-colors shadow-sm"
                    >
                      <span>CONSULTAR</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
