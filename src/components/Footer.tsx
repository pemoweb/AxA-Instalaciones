import React from 'react';
import { Instagram, MapPin, ArrowUp } from 'lucide-react';
import { AxaLogo } from './AxaLogo';
import { COMPANY_INFO } from '../data/axaData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenCookies }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer-axa" className="bg-[#070C4D] text-white pt-16 pb-24 lg:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <AxaLogo size="md" variant="white" />
            
            <p className="text-base font-semibold text-slate-200 mt-3">
              INSTALACIONES AXA
            </p>
            
            <p className="text-sm text-slate-300">
              {COMPANY_INFO.specialtiesText}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-mono">
              <MapPin className="w-3.5 h-3.5 text-slate-300" />
              <span>{COMPANY_INFO.location.street} · {COMPANY_INFO.location.city}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              SECCIONES
            </p>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick(e, '#inicio')}
                  className="min-h-[44px] flex items-center hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#especialidades"
                  onClick={(e) => handleNavClick(e, '#especialidades')}
                  className="min-h-[44px] flex items-center hover:text-white transition-colors"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#trabajos"
                  onClick={(e) => handleNavClick(e, '#trabajos')}
                  className="min-h-[44px] flex items-center hover:text-white transition-colors"
                >
                  Trabajos
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => handleNavClick(e, '#contacto')}
                  className="min-h-[44px] flex items-center hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Location */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              REDES SOCIALES
            </p>
            <a
              href={COMPANY_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold text-white transition-colors"
              id="footer-instagram-link"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>{COMPANY_INFO.instagram.handle}</span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Sigue nuestros proyectos y trabajos técnicos en Instagram.
            </p>
          </div>

        </div>

        {/* Sub-Footer Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Instalaciones AXA. Todos los derechos reservados.</p>
            <span className="hidden sm:inline text-slate-600">·</span>
            <p className="text-slate-300 font-medium flex items-center gap-1">
              Hecho con <span className="text-red-500 animate-pulse inline-block text-xs" aria-label="amor">❤️</span> por{' '}
              <span className="text-white font-bold tracking-wide">Mango Digital</span> en Tarragona
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenPrivacy}
              className="min-h-[44px] px-2 inline-flex items-center hover:text-white transition-colors"
            >
              Privacidad
            </button>
            <button
              onClick={onOpenCookies}
              className="min-h-[44px] px-2 inline-flex items-center hover:text-white transition-colors"
            >
              Cookies
            </button>
            <button
              onClick={scrollToTop}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
