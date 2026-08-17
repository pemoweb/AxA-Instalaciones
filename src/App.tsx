import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialtiesOverview } from './components/SpecialtiesOverview';
import { ClimatizacionSection } from './components/ClimatizacionSection';
import { ElectricidadSection } from './components/ElectricidadSection';
import { FontaneriaSection } from './components/FontaneriaSection';
import { BrandSection } from './components/BrandSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyAxaSection } from './components/WhyAxaSection';
import { ProcessSection } from './components/ProcessSection';
import { TarragonaLocationSection } from './components/TarragonaLocationSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { LegalModal } from './components/LegalModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ServiceId } from './types';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<ServiceId>('climatizacion');
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'cookies' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const handleOpenQuote = (service?: 'climatizacion' | 'electricidad' | 'fontaneria') => {
    if (service) {
      setSelectedQuoteService(service);
    }
    setQuoteModalOpen(true);
  };

  const handleScrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#0B116B] selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Single Page Content Flow */}
      <main className="flex-grow">
        {/* 01. Hero */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* 02. Specialties 3-Pillar Overview */}
        <SpecialtiesOverview onSelectService={handleOpenQuote} />

        {/* 03. Service Deep Dive: Climatización */}
        <ClimatizacionSection onOpenQuote={handleOpenQuote} />

        {/* 04. Service Deep Dive: Electricidad */}
        <ElectricidadSection onOpenQuote={handleOpenQuote} />

        {/* 05. Service Deep Dive: Fontanería */}
        <FontaneriaSection onOpenQuote={handleOpenQuote} />

        {/* 06. Technical Brand Block with CAD Schematics */}
        <BrandSection />

        {/* 07. Portfolio / Bento Trabajos Realizados */}
        <PortfolioSection onOpenQuote={handleOpenQuote} />

        {/* 08. Por Qué AXA */}
        <WhyAxaSection />

        {/* 09. Proceso de Trabajo */}
        <ProcessSection />

        {/* 10. Tarragona Location & Map */}
        <TarragonaLocationSection onContactClick={handleScrollToContact} />

        {/* 11. Final Conversion CTA */}
        <FinalCtaSection onOpenQuote={() => handleOpenQuote()} />

        {/* 12. Modern Contact Form & Direct Channels */}
        <ContactSection
          initialService={selectedQuoteService}
          onOpenPrivacyModal={() => setLegalModalState({ isOpen: true, type: 'privacy' })}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalState({ isOpen: true, type: 'privacy' })}
        onOpenCookies={() => setLegalModalState({ isOpen: true, type: 'cookies' })}
      />

      {/* Mobile Sticky Quick Action Bar (LLAMAR | WHATSAPP | PRESUPUESTO) */}
      <MobileBottomBar onOpenQuote={() => handleOpenQuote()} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedQuoteService}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState({ isOpen: false, type: null })}
      />
    </div>
  );
}
