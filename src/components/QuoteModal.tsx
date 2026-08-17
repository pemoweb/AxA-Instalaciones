import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, MessageSquare, AlertCircle, Wind, Zap, Droplets, ArrowRight, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';
import { ServiceId } from '../types';
import { validateQuoteForm, FormErrors } from '../utils/formValidation';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceId;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'climatizacion',
}) => {
  const [servicio, setServicio] = useState<ServiceId>(initialService);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [politicaAceptada, setPoliticaAceptada] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Synchronize specialty and reset state whenever modal is opened or initialService changes
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setServicio(initialService);
      }
      setErrors({});
      setTouched({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateQuoteForm({
      nombre,
      telefono,
      email,
      servicio,
      politicaAceptada,
    });
    setErrors(currentErrors);
  };

  const handleFieldChange = (field: 'nombre' | 'telefono' | 'email' | 'mensaje' | 'politica', value: any) => {
    if (field === 'nombre') setNombre(value);
    if (field === 'telefono') setTelefono(value);
    if (field === 'email') setEmail(value);
    if (field === 'mensaje') setMensaje(value);
    if (field === 'politica') setPoliticaAceptada(value);

    // Clear specific error if touched
    if (errors[field as keyof FormErrors] || errors.general) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field as keyof FormErrors];
        delete updated.general;
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      nombre: true,
      telefono: true,
      email: true,
      politicaAceptada: true,
    });

    const validationErrors = validateQuoteForm({
      nombre,
      telefono,
      email,
      servicio,
      politicaAceptada,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending with clear feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNombre('');
    setTelefono('');
    setEmail('');
    setMensaje('');
    setPoliticaAceptada(false);
    setErrors({});
    setTouched({});
    onClose();
  };

  const getServiceLabel = (serviceId: ServiceId) => {
    switch (serviceId) {
      case 'climatizacion':
        return 'Climatización';
      case 'electricidad':
        return 'Electricidad';
      case 'fontaneria':
        return 'Fontanería';
      default:
        return 'Instalaciones Técnicas';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-quote-title"
    >
      <div
        className="relative max-w-xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B116B]"
          aria-label="Cerrar ventana de presupuesto"
          id="btn-close-quote-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#0B116B] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#0B116B] uppercase block mb-1">
                SOLICITUD REGISTRADA
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B116B]">
                ¡Presupuesto Solicitado!
              </h3>
              <p className="text-sm text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
                Gracias <strong>{nombre}</strong>. Hemos registrado tu solicitud para el servicio de{' '}
                <strong className="text-[#0B116B] font-bold">{getServiceLabel(servicio)}</strong> en Tarragona.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5 max-w-md mx-auto">
              <p><strong>Especialidad:</strong> {getServiceLabel(servicio)}</p>
              {telefono && <p><strong>Teléfono:</strong> {telefono}</p>}
              {email && <p><strong>Email:</strong> {email}</p>}
              <p className="text-slate-500 pt-1 text-[11px]">Un técnico de Instalaciones AXA evaluará tu caso y te responderá con la mayor brevedad.</p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleReset}
                className="min-h-[44px] px-8 py-3 rounded-xl bg-[#0B116B] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#070C4D] transition-colors inline-flex items-center justify-center"
              >
                Aceptar y Cerrar
              </button>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#0B116B] uppercase">
                  INSTALACIONES AXA · TARRAGONA
                </span>
              </div>
              <h3 id="modal-quote-title" className="text-2xl sm:text-3xl font-extrabold text-[#0B116B]">
                Solicitar Presupuesto
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Completa tus datos y la especialidad requerida para tu proyecto.
              </p>
            </div>

            {/* General Error Banner */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Por favor, revisa los siguientes campos:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11.5px]">
                    {errors.nombre && <li>{errors.nombre}</li>}
                    {errors.telefono && <li>{errors.telefono}</li>}
                    {errors.email && <li>{errors.email}</li>}
                    {errors.politicaAceptada && <li>{errors.politicaAceptada}</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Specialty Selection Pills (Interactive & Pre-selected) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Especialidad Requerida *
                </label>
                <span className="text-[11px] font-medium text-[#0B116B] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Seleccionado: <strong>{getServiceLabel(servicio)}</strong>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3" role="radiogroup" aria-label="Especialidad">
                {/* 01. Climatización */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={servicio === 'climatizacion'}
                  onClick={() => {
                    setServicio('climatizacion');
                    if (errors.servicio) {
                      setErrors((prev) => ({ ...prev, servicio: undefined }));
                    }
                  }}
                  className={`min-h-[56px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all relative ${
                    servicio === 'climatizacion'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-md ring-2 ring-[#0B116B]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  id="modal-specialty-climatizacion"
                >
                  {servicio === 'climatizacion' && (
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 text-[#0B116B] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <Wind className={`w-4 h-4 ${servicio === 'climatizacion' ? 'text-sky-300' : 'text-[#0B116B]'}`} />
                  <span className="truncate">Climatización</span>
                </button>

                {/* 02. Electricidad */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={servicio === 'electricidad'}
                  onClick={() => {
                    setServicio('electricidad');
                    if (errors.servicio) {
                      setErrors((prev) => ({ ...prev, servicio: undefined }));
                    }
                  }}
                  className={`min-h-[56px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all relative ${
                    servicio === 'electricidad'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-md ring-2 ring-[#0B116B]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  id="modal-specialty-electricidad"
                >
                  {servicio === 'electricidad' && (
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 text-[#0B116B] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <Zap className={`w-4 h-4 ${servicio === 'electricidad' ? 'text-amber-300' : 'text-[#0B116B]'}`} />
                  <span className="truncate">Electricidad</span>
                </button>

                {/* 03. Fontanería */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={servicio === 'fontaneria'}
                  onClick={() => {
                    setServicio('fontaneria');
                    if (errors.servicio) {
                      setErrors((prev) => ({ ...prev, servicio: undefined }));
                    }
                  }}
                  className={`min-h-[56px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all relative ${
                    servicio === 'fontaneria'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-md ring-2 ring-[#0B116B]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  id="modal-specialty-fontaneria"
                >
                  {servicio === 'fontaneria' && (
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 text-[#0B116B] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <Droplets className={`w-4 h-4 ${servicio === 'fontaneria' ? 'text-cyan-300' : 'text-[#0B116B]'}`} />
                  <span className="truncate">Fontanería</span>
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombre completo o Empresa *
              </label>
              <input
                type="text"
                id="modal-name"
                required
                value={nombre}
                onChange={(e) => handleFieldChange('nombre', e.target.value)}
                onBlur={() => handleBlur('nombre')}
                placeholder="Ej: Laura Morales / Reformas Tarraco"
                className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.nombre
                    ? 'border-red-400 bg-red-50/40 focus:ring-red-300'
                    : 'border-slate-200 focus:ring-[#0B116B]'
                }`}
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? 'modal-name-error' : undefined}
              />
              {errors.nombre && (
                <p id="modal-name-error" className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.nombre}</span>
                </p>
              )}
            </div>

            {/* Phone & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-tel" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="modal-tel"
                  value={telefono}
                  onChange={(e) => handleFieldChange('telefono', e.target.value)}
                  onBlur={() => handleBlur('telefono')}
                  placeholder="600 000 000"
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.telefono
                      ? 'border-red-400 bg-red-50/40 focus:ring-red-300'
                      : 'border-slate-200 focus:ring-[#0B116B]'
                  }`}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? 'modal-tel-error' : undefined}
                />
                {errors.telefono && (
                  <p id="modal-tel-error" className="text-red-600 text-[11px] mt-1.5 flex items-start gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{errors.telefono}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 bg-red-50/40 focus:ring-red-300'
                      : 'border-slate-200 focus:ring-[#0B116B]'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'modal-email-error' : undefined}
                />
                {errors.email && (
                  <p id="modal-email-error" className="text-red-600 text-[11px] mt-1.5 flex items-start gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Details Field */}
            <div>
              <label htmlFor="modal-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descripción breve del trabajo (opcional)
              </label>
              <textarea
                id="modal-msg"
                rows={3}
                value={mensaje}
                onChange={(e) => handleFieldChange('mensaje', e.target.value)}
                placeholder="Indica qué tipo de trabajo o reforma necesitas en Tarragona..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B116B] transition-all resize-y"
              />
            </div>

            {/* Privacy Checkbox */}
            <div>
              <div className="flex items-start gap-3 min-h-[38px]">
                <input
                  type="checkbox"
                  id="modal-privacy"
                  checked={politicaAceptada}
                  onChange={(e) => handleFieldChange('politica', e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-[#0B116B] rounded border-slate-300 focus:ring-[#0B116B] cursor-pointer"
                  aria-invalid={!!errors.politicaAceptada}
                />
                <label htmlFor="modal-privacy" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                  Acepto la política de privacidad y el tratamiento de mis datos para la gestión y elaboración del presupuesto.
                </label>
              </div>
              {errors.politicaAceptada && (
                <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium ml-8">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.politicaAceptada}</span>
                </p>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#0B116B] hover:bg-[#070C4D] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-75"
              id="modal-submit-btn"
            >
              {isSubmitting ? (
                <span className="inline-block animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>ENVIAR SOLICITUD DE PRESUPUESTO</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
