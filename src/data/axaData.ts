import { ServiceDetail, PortfolioItem, WhyAxaItem, ProcessItem, FaqItem } from '../types';

export const COMPANY_INFO = {
  name: 'Instalaciones AXA',
  shortName: 'AXA',
  tagline: 'SOMOS ESPECIALISTAS.',
  subTagline: 'Climatización, electricidad y fontanería para hogares, negocios y proyectos.',
  secondaryConcept: 'Tres especialidades. Una solución profesional.',
  location: {
    street: 'Rambla Nova 124',
    postalCode: '43001',
    city: 'Tarragona',
    country: 'España',
    fullAddress: 'Rambla Nova 124, 43001 Tarragona, España',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rambla+Nova+124+43001+Tarragona+Spain',
  },
  instagram: {
    handle: '@instalaciones_axa',
    url: 'https://www.instagram.com/instalaciones_axa/',
  },
  specialtiesText: 'Climatización · Electricidad · Fontanería',
  phone: '+58 412 084 5704',
  phoneRaw: '+584120845704',
  phoneTelUrl: 'tel:+584120845704',
  whatsappNumber: '+58 412 084 5704',
  whatsappUrl: 'https://wa.me/584120845704?text=Hola%20Instalaciones%20AXA%2C%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20un%20proyecto%20de%20instalaci%C3%B3n.',
};

export const SERVICES_DATA: Record<'climatizacion' | 'electricidad' | 'fontaneria', ServiceDetail> = {
  climatizacion: {
    id: 'climatizacion',
    number: '01',
    badge: 'ESPECIALIDAD 01',
    title: 'Climatización',
    headline: 'CONFORT TODO EL AÑO.',
    description: 'Soluciones profesionales de climatización adaptadas a cada espacio y necesidad.',
    features: ['Instalación', 'Mantenimiento', 'Reparación', 'Soluciones de climatización'],
    pillars: [
      {
        title: 'Instalación',
        description: 'Montaje técnico y puesta en marcha optimizada para viviendas, locales y espacios de trabajo.',
      },
      {
        title: 'Mantenimiento',
        description: 'Revisiones preventivas y puestas a punto para garantizar la máxima eficiencia energética.',
      },
      {
        title: 'Reparación',
        description: 'Diagnóstico preciso y resolución de incidencias en sistemas de climatización.',
      },
      {
        title: 'Soluciones de climatización',
        description: 'Estudios de distribución térmica y confort a medida para cada tipo de inmueble.',
      },
    ],
    ctaText: 'CONSULTAR CLIMATIZACIÓN',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
  },
  electricidad: {
    id: 'electricidad',
    number: '02',
    badge: 'ESPECIALIDAD 02',
    title: 'Electricidad',
    headline: 'ELECTRICIDAD CON PRECISIÓN.',
    description: 'Soluciones eléctricas profesionales para viviendas, negocios y proyectos.',
    features: ['Instalaciones', 'Reparaciones', 'Mantenimiento', 'Mejoras eléctricas'],
    pillars: [
      {
        title: 'Instalaciones',
        description: 'Cuadros de distribución, cableado técnico y canalizaciones con rigurosa seguridad.',
      },
      {
        title: 'Reparaciones',
        description: 'Localización y reparación de averías en redes y circuitos eléctricos.',
      },
      {
        title: 'Mantenimiento',
        description: 'Supervisión periódica para asegurar el cumplimiento normativo y la continuidad del suministro.',
      },
      {
        title: 'Mejoras eléctricas',
        description: 'Adecuación de instalaciones existentes, optimización de potencia y modernización técnica.',
      },
    ],
    ctaText: 'CONSULTAR ELECTRICIDAD',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80',
  },
  fontaneria: {
    id: 'fontaneria',
    number: '03',
    badge: 'ESPECIALIDAD 03',
    title: 'Fontanería',
    headline: 'SOLUCIONES DE FONTANERÍA.',
    description: 'Trabajos de fontanería realizados con atención al detalle y buscando soluciones funcionales y duraderas.',
    features: ['Instalaciones', 'Reparaciones', 'Mantenimiento', 'Mejoras'],
    pillars: [
      {
        title: 'Instalaciones',
        description: 'Redes de distribución de agua sanitaria, bajantes, desagües y grifería técnica.',
      },
      {
        title: 'Reparaciones',
        description: 'Intervención rápida en fugas, roturas y sustitución de elementos deteriorados.',
      },
      {
        title: 'Mantenimiento',
        description: 'Control de presiones, descalcificación y conservación preventiva de canalizaciones.',
      },
      {
        title: 'Mejoras',
        description: 'Renovación integral de circuitos hidráulicos y adaptación a nuevas normativas.',
      },
    ],
    ctaText: 'CONSULTAR FONTANERÍA',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80',
  },
};

export const WHY_AXA: WhyAxaItem[] = [
  {
    number: '01',
    title: 'ESPECIALISTAS',
    description: 'Tres áreas técnicas en una misma empresa.',
  },
  {
    number: '02',
    title: 'CALIDAD',
    description: 'Cuidamos cada detalle del trabajo.',
  },
  {
    number: '03',
    title: 'SOLUCIONES',
    description: 'Buscamos una solución adaptada a cada necesidad.',
  },
  {
    number: '04',
    title: 'CERCANÍA',
    description: 'Comunicación clara y atención personalizada.',
  },
];

export const PROCESS_STEPS: ProcessItem[] = [
  {
    number: '01',
    title: 'CONTACTO',
    description: 'Cuéntanos qué necesitas.',
  },
  {
    number: '02',
    title: 'VALORACIÓN',
    description: 'Analizamos el trabajo.',
  },
  {
    number: '03',
    title: 'INSTALACIÓN',
    description: 'Realizamos el trabajo profesionalmente.',
  },
  {
    number: '04',
    title: 'RESULTADO',
    description: 'Entregamos una solución funcional y cuidada.',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'trabajo-1',
    title: 'Sistema de Climatización por Conductos',
    category: 'climatizacion',
    categoryLabel: 'Climatización',
    location: 'Tarragona Centro',
    description: 'Integración técnica de climatización centralizada con rejillas lineales y control de temperatura por zonas.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Instalación centralizada', 'Difusión lineal', 'Eficiencia energética'],
  },
  {
    id: 'trabajo-2',
    title: 'Cuadro Eléctrico Principal y Derivaciones',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    location: 'Rambla Nova, Tarragona',
    description: 'Reorganización y montaje de cuadro de protección magnetotérmica y diferencial con cableado ordenado.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Protección modular', 'Canalización técnica', 'Equilibrado de fases'],
  },
  {
    id: 'trabajo-3',
    title: 'Red de Distribución Hidráulica y Colectores',
    category: 'fontaneria',
    categoryLabel: 'Fontanería',
    location: 'Zona Eixample, Tarragona',
    description: 'Instalación de colectores sanitarios con tubería multicapa y válvulas de corte individual.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Tubería multicapa', 'Aislamiento térmico', 'Prueba de estanqueidad'],
  },
  {
    id: 'trabajo-4',
    title: 'Unidad Exterior de Climatización y Soportación',
    category: 'climatizacion',
    categoryLabel: 'Climatización',
    location: 'Tarragona',
    description: 'Fijación sobre bancada antivibratoria con línea frigorífica aislada y desagües directos.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Soportes antivibratorios', 'Líneas frigoríficas aisladas', 'Puesta en marcha'],
  },
  {
    id: 'trabajo-5',
    title: 'Instalación de Luminarias y Cuadro Secundario',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    location: 'Tarragona',
    description: 'Distribución de circuitos de fuerza e iluminación técnica en espacio comercial.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Circuitos dedicados', 'Canaleta técnica', 'Seguridad en cuadro'],
  },
  {
    id: 'trabajo-6',
    title: 'Montaje de Grupos de Presión y Saneamiento',
    category: 'fontaneria',
    categoryLabel: 'Fontanería',
    location: 'Tarragona',
    description: 'Renovación de bajantes y batería de contadores con acceso técnico optimizado.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80',
    technicalSpecs: ['Valvulería de latón', 'Control de presión', 'Mantenimiento accesible'],
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué servicios realiza Instalaciones AXA en Tarragona?',
    answer: 'Somos especialistas técnicos en tres áreas fundamentales: Climatización (instalación de aire acondicionado tipo Split, conductos, cassette, recargas de gas R32/R410A y mantenimiento preventivo), Electricidad (baja tensión, sustitución y ampliación de cuadros eléctricos, cableado, boletines CIE y legalizaciones) y Fontanería (instalaciones completas de agua sanitaria, grupos de presión, termos, descalcificadores y reparación de fugas).',
    category: 'servicios',
    categoryLabel: 'Servicios',
  },
  {
    id: 'faq-2',
    question: '¿Cuál es el tiempo de respuesta habitual para presupuestos y averías?',
    answer: 'Para solicitudes de presupuesto respondemos habitualmente en un plazo inferior a 24 horas laborables. En situaciones de urgencias o averías críticas (cortes eléctricos, fugas de agua o paradas de climatización) priorizamos la intervención técnica directa en Tarragona y municipios cercanos según disponibilidad.',
    category: 'plazos',
    categoryLabel: 'Tiempos de Respuesta',
  },
  {
    id: 'faq-3',
    question: '¿Qué garantías ofrecéis en los trabajos e instalaciones?',
    answer: 'Todos nuestros trabajos cuentan con garantía profesional de instalación conforme a la normativa vigente (REBT para electricidad, RITE para climatización y CTE para fontanería). Además, todos los equipos, componentes y maquinaria instalada disponen de la garantía oficial del fabricante (habitualmente de 2 a 3 años según marca).',
    category: 'garantias',
    categoryLabel: 'Garantías',
  },
  {
    id: 'faq-4',
    question: '¿Emitís boletines eléctricos y certificados de instalación oficiales?',
    answer: 'Sí. Como técnicos instaladores autorizados, tramitamos el Certificado de Instalación Eléctrica en Baja Tensión (CIE o boletín eléctrico), memorias técnicas de diseño, aumentos de potencia, altas de nuevos suministros y legalizaciones ante la administración y compañías distribuidoras.',
    category: 'servicios',
    categoryLabel: 'Servicios',
  },
  {
    id: 'faq-5',
    question: '¿El presupuesto tiene algún coste o compromiso?',
    answer: 'No. Todos nuestros presupuestos son 100% gratuitos y sin ningún tipo de compromiso. Evaluamos los requerimientos técnicos de tu vivienda, local o comunidad, desglosamos las partidas de mano de obra y materiales con total transparencia y te asesoramos para elegir la opción más eficiente.',
    category: 'general',
    categoryLabel: 'Presupuestos',
  },
  {
    id: 'faq-6',
    question: '¿Cuál es vuestra zona de cobertura técnica?',
    answer: 'Nuestra sede está ubicada en Rambla Nova 124 (Tarragona). Prestamos servicio en toda la ciudad de Tarragona y su área metropolitana, así como en Reus, Salou, Cambrils, Vila-seca, Torredembarra y resto de poblaciones del Camp de Tarragona.',
    category: 'general',
    categoryLabel: 'Cobertura',
  },
];

