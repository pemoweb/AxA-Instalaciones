import React from 'react';
import { PROCESS_STEPS } from '../data/axaData';
import { PhoneCall, SearchCheck, Hammer, CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const stepIcons = [PhoneCall, SearchCheck, Hammer, CheckCircle];

  return (
    <section id="proceso" className="py-20 lg:py-28 bg-[#F4F6FB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
            MÉTODO DE TRABAJO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight">
            CÓMO TRABAJAMOS.
          </h2>
          <div className="w-16 h-1 bg-[#0B116B] mt-4 rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-300 -translate-y-6 z-0" aria-hidden="true" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 list-none p-0 m-0">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <li key={step.number}>
                  <article className="flex flex-col h-full bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="w-12 h-12 rounded-xl bg-[#0B116B] text-white flex items-center justify-center font-mono font-extrabold text-base shadow-md">
                        {step.number}
                      </span>
                      <div className="p-2.5 rounded-xl bg-slate-100 text-[#0B116B]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0B116B] tracking-tight mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
};
