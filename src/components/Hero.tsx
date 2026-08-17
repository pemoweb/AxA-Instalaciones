import React from 'react';
import { ArrowRight, MessageSquare, MapPin, ShieldCheck, Zap, Droplets, Wind, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';
import { AxaLogo } from './AxaLogo';

interface HeroProps {
  onOpenQuote: (service?: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-[#070C4D] text-white pt-24 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Background Photography with Deep AXA Blue Corporate Duotone Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=85"
          alt="Instalaciones técnicas profesionales en Tarragona"
          className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-110"
        />
        {/* Technical Blueprint & Radial Light Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060A40] via-[#0B116B]/90 to-[#060A40]/80" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1823B8]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0B116B]/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Small Location / Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-100 uppercase">
                INSTALACIONES PROFESIONALES · TARRAGONA
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              SOMOS <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                ESPECIALISTAS.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-normal max-w-2xl leading-relaxed mb-8 sm:mb-10">
              Climatización, electricidad y fontanería para hogares, negocios y proyectos.
            </p>

            {/* CTA Group */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center gap-3 min-h-[48px] px-8 py-4 rounded-xl text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B116B] bg-white hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                id="hero-primary-quote-cta"
              >
                <span>SOLICITAR PRESUPUESTO</span>
                <ArrowRight className="w-4 h-4 text-[#0B116B]" />
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-200 text-center"
                id="hero-secondary-whatsapp-cta"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>

            {/* Quick Specialties Technical Indicators */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/15 w-full max-w-xl">
              <button
                onClick={() => scrollToSection('#climatizacion')}
                className="group text-left p-2.5 min-h-[44px] rounded-lg hover:bg-white/5 transition-colors flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  <span className="text-xs text-slate-400 font-mono">01</span>
                </div>
                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-slate-100">
                  Climatización
                </span>
              </button>

              <button
                onClick={() => scrollToSection('#electricidad')}
                className="group text-left p-2.5 min-h-[44px] rounded-lg hover:bg-white/5 transition-colors flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  <span className="text-xs text-slate-400 font-mono">02</span>
                </div>
                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-slate-100">
                  Electricidad
                </span>
              </button>

              <button
                onClick={() => scrollToSection('#fontaneria')}
                className="group text-left p-2.5 min-h-[44px] rounded-lg hover:bg-white/5 transition-colors flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  <span className="text-xs text-slate-400 font-mono">03</span>
                </div>
                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-slate-100">
                  Fontanería
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Technical Brand Seal & Location Visual Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
              
              {/* Brand Logo Presentation */}
              <div className="pb-6 border-b border-white/15">
                <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-3">
                  IDENTIDAD OFICIAL
                </p>
                <AxaLogo size="md" variant="white" />
              </div>

              {/* Core Attributes */}
              <div className="py-6 space-y-3.5 text-xs sm:text-sm text-slate-300 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-slate-100 shrink-0" />
                  <span>Tres especialidades técnicas en Tarragona</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-slate-100 shrink-0" />
                  <span>Atención técnica directa y personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-100 shrink-0" />
                  <span className="font-semibold text-white">Rambla Nova 124 · 43001 Tarragona</span>
                </div>
              </div>

              {/* Bottom Quick Trigger */}
              <div className="pt-5 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase">UBICACIÓN CENTRAL</span>
                  <span className="text-xs font-bold text-slate-100">Tarragona · Rambla Nova 124</span>
                </div>
                <a
                  href="#tarragona"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#tarragona');
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Ver mapa de Tarragona"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
