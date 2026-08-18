import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Clock, Wrench } from 'lucide-react';
import { FAQS } from '../data/axaData';
import { COMPANY_INFO } from '../data/axaData';

interface FaqSectionProps {
  onOpenQuote: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuote }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todas las preguntas' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'plazos', label: 'Tiempos de Respuesta' },
    { id: 'garantias', label: 'Garantías' },
    { id: 'general', label: 'Presupuestos y Cobertura' },
  ];

  const filteredFaqs = activeCategory === 'todos'
    ? FAQS
    : FAQS.filter((faq) => faq.category === activeCategory || (activeCategory === 'general' && faq.category === 'general'));

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 bg-[#F8FAFD] border-t border-slate-200 scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B116B]/10 border border-[#0B116B]/20 text-[#0B116B] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>RESPUESTAS DIRECTAS</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight mb-4"
          >
            Preguntas Frecuentes
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Resolvemos tus dudas sobre nuestros servicios de climatización, electricidad y fontanería en Tarragona, tiempos de atención técnica y condiciones de garantía.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Filtrar preguntas por categoría">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B116B] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <article
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#0B116B]/40 shadow-lg ring-1 ring-[#0B116B]/20'
                    : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0B116B] cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <span className="shrink-0 p-2 rounded-lg bg-slate-100 text-[#0B116B] mt-0.5 sm:mt-0">
                        {faq.category === 'servicios' && <Wrench className="w-4 h-4" />}
                        {faq.category === 'plazos' && <Clock className="w-4 h-4" />}
                        {faq.category === 'garantias' && <ShieldCheck className="w-4 h-4" />}
                        {faq.category === 'general' && <HelpCircle className="w-4 h-4" />}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#0B116B] leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'bg-[#0B116B] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100"
                  >
                    <div className="pt-4 space-y-3">
                      <p>{faq.answer}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-medium">
                          {faq.categoryLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Quick Contact & Assistance Prompt */}
        <aside className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0B116B] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#131CA8]/50">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              ¿Tienes otra duda sobre tu instalación?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Nuestro equipo técnico en Rambla Nova 124 (Tarragona) responderá rápidamente y sin compromiso.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              id="faq-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>

            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B116B] text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm"
              id="faq-presupuesto-btn"
            >
              <span>Pedir Presupuesto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

      </div>
    </section>
  );
};
