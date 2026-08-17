import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';

interface MobileBottomBarProps {
  onOpenQuote: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenQuote }) => {
  return (
    <div
      id="mobile-action-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B116B] text-white border-t border-white/15 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-safe"
    >
      <div className="grid grid-cols-3 divide-x divide-white/15 h-14">
        {/* Call Trigger (scrolls to contact or opens modal) */}
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('#contacto');
            if (el) {
              const offset = 80;
              const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
              window.scrollTo({ top: pos, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
          id="mobile-bottom-call-btn"
        >
          <Phone className="w-4 h-4 text-slate-200" />
          <span className="text-[10px] font-bold tracking-wider uppercase">LLAMAR</span>
        </a>

        {/* WhatsApp Trigger */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
          id="mobile-bottom-whatsapp-btn"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-wider uppercase">WHATSAPP</span>
        </a>

        {/* Presupuesto Trigger */}
        <button
          type="button"
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center gap-1 bg-white text-[#0B116B] hover:bg-slate-100 active:bg-slate-200 transition-colors font-extrabold"
          id="mobile-bottom-presupuesto-btn"
        >
          <FileText className="w-4 h-4 text-[#0B116B]" />
          <span className="text-[10px] font-extrabold tracking-wider uppercase">PRESUPUESTO</span>
        </button>
      </div>
    </div>
  );
};
