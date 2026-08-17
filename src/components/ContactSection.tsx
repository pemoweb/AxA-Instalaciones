import React, { useState } from 'react';
import { Send, CheckCircle, MapPin, Instagram, ShieldCheck, MessageSquare, AlertCircle, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';
import { ContactFormData, ServiceId } from '../types';

interface ContactSectionProps {
  initialService?: ServiceId;
  onOpenPrivacyModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'climatizacion',
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    telefono: '',
    email: '',
    servicio: initialService,
    mensaje: '',
    politicaAceptada: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nombre.trim()) {
      setErrorMessage('Por favor, indica tu nombre.');
      return;
    }
    if (!formData.telefono.trim() && !formData.email.trim()) {
      setErrorMessage('Por favor, facilita al menos un teléfono o email de contacto.');
      return;
    }
    if (!formData.politicaAceptada) {
      setErrorMessage('Debes aceptar la política de privacidad para continuar.');
      return;
    }

    setIsSubmitting(true);
    // Simulate brief processing for professional UX feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      servicio: 'climatizacion',
      mensaje: '',
      politicaAceptada: false,
    });
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-[#F4F6FB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-3">
            ATENCIÓN AL CLIENTE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight">
            CONTACTO DIRECTO.
          </h2>
          <div className="w-16 h-1 bg-[#0B116B] mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-lg">
            
            {isSubmitted ? (
              <div className="py-12 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-[#0B116B] text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#0B116B]">
                    ¡Solicitud recibida!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                    Gracias, <strong>{formData.nombre}</strong>. Hemos registrado tu consulta para el servicio de{' '}
                    <strong className="capitalize">{formData.servicio}</strong>. Nos pondremos en contacto contigo a la mayor brevedad.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#0B116B] bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center justify-center"
                  >
                    Enviar otra consulta
                  </button>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp directo</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="quote-contact-form">
                
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-[#0B116B]">
                    Solicitud de Presupuesto
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Rellena los datos de tu proyecto y te responderemos con una propuesta personalizada.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Nombre */}
                  <div className="sm:col-span-2">
                    <label htmlFor="nombre" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre o empresa"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Teléfono de contacto"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Servicio Selector */}
                  <div className="sm:col-span-2">
                    <label htmlFor="servicio" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Servicio requerido *
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={(e) => setFormData({ ...formData, servicio: e.target.value as ServiceId })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:border-transparent text-sm bg-white transition-all font-medium text-slate-800"
                    >
                      <option value="climatizacion">❄️ Climatización</option>
                      <option value="electricidad">⚡ Electricidad</option>
                      <option value="fontaneria">💧 Fontanería</option>
                      <option value="otro">Otro tipo de proyecto técnico</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Detalles del proyecto o mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Explícanos brevemente qué necesitas (tipo de instalación, ubicación aproximada, reforma o avería)..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B116B] focus:border-transparent text-sm transition-all resize-y"
                    />
                  </div>

                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-center gap-3 pt-2 min-h-[44px]">
                  <input
                    type="checkbox"
                    id="politica"
                    name="politica"
                    checked={formData.politicaAceptada}
                    onChange={(e) => setFormData({ ...formData, politicaAceptada: e.target.checked })}
                    className="w-5 h-5 text-[#0B116B] rounded border-slate-300 focus:ring-[#0B116B] cursor-pointer"
                  />
                  <label htmlFor="politica" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                    Acepto la{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-[#0B116B] underline font-medium hover:text-[#1823B8] p-1"
                    >
                      política de privacidad
                    </button>{' '}
                    y el tratamiento de mis datos para la gestión del presupuesto.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-4 px-6 rounded-xl bg-[#0B116B] hover:bg-[#070C4D] text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-75"
                  id="submit-quote-form-btn"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <span>SOLICITAR PRESUPUESTO</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right Direct Contact Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Direct Info Card */}
            <div className="p-8 rounded-2xl bg-[#0B116B] text-white space-y-6 shadow-xl border border-[#131CA8]/50">
              <div>
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-widest block mb-2">
                  EMPRESA REGISTRADA
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  INSTALACIONES AXA
                </h3>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 pt-4 border-t border-white/15">
                <div className="p-2.5 rounded-lg bg-white/10 text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-300 uppercase">Ubicación</p>
                  <p className="text-base font-bold text-white mt-0.5">{COMPANY_INFO.location.street}</p>
                  <p className="text-sm text-slate-300">{COMPANY_INFO.location.postalCode} {COMPANY_INFO.location.city}</p>
                </div>
              </div>

              {/* 3 Specialties Badges */}
              <div className="pt-4 border-t border-white/15">
                <p className="text-xs font-mono text-slate-300 uppercase mb-3">Especialidades</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-100 font-medium">
                    <span>❄️</span>
                    <span>Climatización</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-100 font-medium">
                    <span>⚡</span>
                    <span>Electricidad</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-100 font-medium">
                    <span>💧</span>
                    <span>Fontanería</span>
                  </div>
                </div>
              </div>

              {/* Instagram Official Section */}
              <div className="pt-4 border-t border-white/15">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-slate-300 uppercase">Instagram Oficial</p>
                    <p className="text-sm font-bold text-white mt-0.5">{COMPANY_INFO.instagram.handle}</p>
                  </div>
                  <a
                    href={COMPANY_INFO.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-white text-[#0B116B] text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-md"
                    id="btn-ver-instagram"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>VER INSTAGRAM</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Quick WhatsApp Banner */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#0B116B]">¿Prefieres mensaje directo?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Escríbenos directamente por WhatsApp.</p>
              </div>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
