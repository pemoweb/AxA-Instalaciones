export type ServiceId = 'climatizacion' | 'electricidad' | 'fontaneria' | 'otro';

export interface ServiceDetail {
  id: 'climatizacion' | 'electricidad' | 'fontaneria';
  number: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  features: string[];
  pillars: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  image: string;
  secondaryImage: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'climatizacion' | 'electricidad' | 'fontaneria';
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  technicalSpecs: string[];
}

export interface WhyAxaItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessItem {
  number: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  nombre: string;
  telefono: string;
  email: string;
  servicio: ServiceId;
  mensaje: string;
  politicaAceptada: boolean;
}
