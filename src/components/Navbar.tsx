import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { AxaLogo } from './AxaLogo';
import { COMPANY_INFO } from '../data/axaData';

interface NavbarProps {
  onOpenQuote: (service?: 'climatizacion' | 'electricidad' | 'fontaneria') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#especialidades' },
    { name: 'Trabajos', href: '#trabajos' },
    { name: 'Nosotros', href: '#por-que-axa' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B116B]/95 backdrop-blur-md shadow-xl shadow-black/15 py-3.5 border-b border-white/10'
          : 'bg-gradient-to-b from-[#060a40]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1"
            aria-label="Instalaciones AXA - Inicio"
            id="nav-brand-logo"
          >
            <AxaLogo size="sm" variant="white" className="transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 tracking-wide hover:underline underline-offset-8 decoration-white/40"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200"
              aria-label="Hablar por WhatsApp con Instalaciones AXA"
              id="nav-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-[#0B116B] bg-white hover:bg-slate-100 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              id="nav-quote-cta"
            >
              <span>SOLICITAR PRESUPUESTO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0B116B] border-b border-white/15 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-2 pb-4 border-b border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="min-h-[44px] flex items-center text-base font-semibold text-white/90 hover:text-white px-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full min-h-[48px] px-4 bg-white text-[#0B116B] font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg flex items-center justify-center gap-2"
                id="mobile-menu-quote-btn"
              >
                <span>SOLICITAR PRESUPUESTO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] px-4 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
                id="mobile-menu-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4" />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>

            <div className="text-xs text-white/60 text-center pt-2">
              <p className="font-medium text-white/80">{COMPANY_INFO.location.fullAddress}</p>
              <p className="mt-1">{COMPANY_INFO.specialtiesText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subtle & Elegant Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-sky-300 to-white transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(147,197,253,0.6)]"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de navegación de la página"
        />
      </div>
    </header>
  );
};
