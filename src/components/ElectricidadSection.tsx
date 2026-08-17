import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Cpu } from 'lucide-react';
import { SERVICES_DATA } from '../data/axaData';

interface ServiceSectionProps {
  onOpenQuote: (service: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const ElectricidadSection: React.FC<ServiceSectionProps> = ({ onOpenQuote }) => {
  const data = SERVICES_DATA.electricidad;

  return (
    <section id="electricidad" className="py-20 lg:py-28 bg-[#F8FAFD] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Image Composition (reversing layout for visual rhythm) */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <figure className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 m-0">
              <img
                src={data.image}
                alt="Instalaciones eléctricas y cuadros en Tarragona"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A40]/70 via-transparent to-transparent" />
              
              {/* Technical Indicator Badge */}
              <figcaption className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-lg text-[#0B116B]">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-[#0B116B]" />
                  <span className="text-xs font-mono font-bold tracking-wider">ELECTRICIDAD AXA</span>
                </div>
                <p className="text-xs text-slate-600">
                  Instalaciones de potencia, cuadros y circuitos con precisión y máxima seguridad.
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Right Text & Technical Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            
            {/* Service Header Badge */}
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-md bg-[#0B116B] text-white text-xs font-mono font-bold tracking-wider">
                {data.number}
              </span>
              <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase">
                ELECTRICIDAD TÉCNICA
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight mb-4">
                {data.headline}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {data.description}
              </p>
            </div>

            {/* 4 Pillars Grid: Instalaciones, Reparaciones, Mantenimiento, Mejoras eléctricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {data.pillars.map((pillar, index) => (
                <article
                  key={index}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0B116B]/40 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B116B] shrink-0" />
                    <h3 className="text-base font-bold text-[#0B116B]">{pillar.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuote('electricidad')}
                className="inline-flex items-center justify-center gap-3 min-h-[48px] px-8 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase text-white bg-[#0B116B] hover:bg-[#070C4D] shadow-lg hover:shadow-xl transition-all duration-200"
                id="cta-consultar-electricidad"
              >
                <span>{data.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
