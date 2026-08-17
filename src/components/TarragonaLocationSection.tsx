import React from 'react';
import { MapPin, Navigation, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';

interface TarragonaSectionProps {
  onContactClick: () => void;
}

export const TarragonaLocationSection: React.FC<TarragonaSectionProps> = ({ onContactClick }) => {
  return (
    <section id="tarragona" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text and Direct Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
                UBICACIÓN CENTRAL
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight mb-4">
                ESTAMOS EN TARRAGONA.
              </h2>
              <div className="w-16 h-1 bg-[#0B116B] mt-4 mb-6 rounded-full" />
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Ubicados en el eje principal de la ciudad para atender de forma rápida y eficaz cualquier necesidad técnica en climatización, electricidad y fontanería.
              </p>
            </div>

            {/* Address Card */}
            <address className="not-italic p-6 sm:p-8 rounded-2xl bg-[#F8FAFD] border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#0B116B] text-white shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                    DIRECCIÓN
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0B116B] mt-1">
                    {COMPANY_INFO.location.street}
                  </p>
                  <p className="text-base font-semibold text-slate-700">
                    {COMPANY_INFO.location.postalCode} {COMPANY_INFO.location.city}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    {COMPANY_INFO.location.country}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-mono text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#0B116B]" />
                <span>Cobertura en Tarragona y área metropolitana</span>
              </div>
            </address>

            {/* Action Buttons: CÓMO LLEGAR & CONTACTAR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={COMPANY_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase text-white bg-[#0B116B] hover:bg-[#070C4D] shadow-md hover:shadow-xl transition-all duration-200 text-center"
                id="btn-como-llegar"
              >
                <Navigation className="w-4 h-4" />
                <span>CÓMO LLEGAR</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase text-[#0B116B] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all duration-200 text-center"
                id="btn-contactar-location"
              >
                <span>CONTACTAR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Map Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-[380px] sm:h-[460px]">
              {/* Google Maps Embed iframe with Rambla Nova 124 Tarragona */}
              <iframe
                title="Ubicación de Instalaciones AXA en Rambla Nova 124 Tarragona"
                src="https://maps.google.com/maps?q=Rambla+Nova+124,+43001+Tarragona,+Spain&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Floating Marker Pill */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0B116B] text-white shadow-xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <p className="text-xs font-bold leading-none">INSTALACIONES AXA</p>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">Rambla Nova 124, Tarragona</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
