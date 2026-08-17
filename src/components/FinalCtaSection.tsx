import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';
import { AxaLogo } from './AxaLogo';

interface FinalCtaProps {
  onOpenQuote: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="cta-final"
      className="relative py-24 sm:py-32 bg-[#0B116B] text-white overflow-hidden"
    >
      {/* Background Gradients & Technical Lighting */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1823B8]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#070C4D] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Stamp */}
        <div className="flex justify-center mb-8">
          <AxaLogo size="md" variant="white" className="opacity-95" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          ¿NECESITAS UNA INSTALACIÓN?
        </h2>

        {/* Text */}
        <p className="text-lg sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          Cuéntanos qué necesitas y hablemos de tu proyecto.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[48px] px-8 py-4 rounded-xl text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B116B] bg-white hover:bg-slate-100 shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
            id="final-cta-solicitar-presupuesto"
          >
            <span>SOLICITAR PRESUPUESTO</span>
            <ArrowRight className="w-4 h-4 text-[#0B116B]" />
          </button>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-200"
            id="final-cta-whatsapp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP</span>
          </a>
        </div>

        {/* Sub-note */}
        <p className="mt-8 text-xs font-mono text-slate-300 tracking-wider uppercase">
          TARRAGONA · CLIMATIZACIÓN · ELECTRICIDAD · FONTANERÍA
        </p>

      </div>
    </section>
  );
};
