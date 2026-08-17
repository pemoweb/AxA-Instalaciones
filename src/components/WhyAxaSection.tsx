import React from 'react';
import { WHY_AXA } from '../data/axaData';
import { Layers, ShieldCheck, Wrench, Users } from 'lucide-react';

export const WhyAxaSection: React.FC = () => {
  const icons = [Layers, ShieldCheck, Wrench, Users];

  return (
    <section id="por-que-axa" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
            NUESTRO COMPROMISO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight">
            PROFESIONALIDAD EN CADA INSTALACIÓN.
          </h2>
          <div className="w-16 h-1 bg-[#0B116B] mt-4 rounded-full" />
        </div>

        {/* 4 Clean Value Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_AXA.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.number}
                className="relative p-7 sm:p-8 rounded-2xl bg-[#F8FAFD] border border-slate-200/90 hover:border-[#0B116B] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-mono font-bold text-[#0B116B]">
                      {item.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#0B116B]/10 text-[#0B116B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0B116B] tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0B116B]" />
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    INSTALACIONES AXA
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
