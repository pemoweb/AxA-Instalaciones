import React, { useState } from 'react';
import { X, Send, CheckCircle, MessageSquare, AlertCircle, Wind, Zap, Droplets, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';
import { ServiceId } from '../types';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError('Por favor indica tu nombre.');
      return;
    }
    if (!telefono.trim() && !email.trim()) {
      setError('Facilita al menos un teléfono o correo electrónico.');
      return;
    }
    if (!politicaAceptada) {
      setError('Debes aceptar la política de privacidad.');
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNombre('');
    setTelefono('');
    setEmail('');
    setMensaje('');
    setPoliticaAceptada(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#0B116B] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#0B116B]">
                ¡Presupuesto Solicitado!
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                Hemos recibido tu solicitud para <strong>{servicio.toUpperCase()}</strong>. Nos pondremos en contacto contigo a la brevedad.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="min-h-[44px] px-8 py-3 rounded-xl bg-[#0B116B] text-white text-xs font-bold uppercase tracking-wider shadow hover:bg-[#070C4D] transition-colors inline-flex items-center justify-center"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#0B116B] uppercase">
                INSTALACIONES AXA · TARRAGONA
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B116B] mt-1">
                Solicitar Presupuesto
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Completa tus datos y la especialidad requerida.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Specialty Selection Pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Especialidad *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setServicio('climatizacion')}
                  className={`min-h-[50px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    servicio === 'climatizacion'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Wind className="w-4 h-4" />
                  <span>Climatización</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServicio('electricidad')}
                  className={`min-h-[50px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    servicio === 'electricidad'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Electricidad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServicio('fontaneria')}
                  className={`min-h-[50px] p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    servicio === 'fontaneria'
                      ? 'bg-[#0B116B] text-white border-[#0B116B] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  <span>Fontanería</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombre completo *
              </label>
              <input
                type="text"
                id="modal-name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B116B]"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-tel" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="modal-tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="600 000 000"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B116B]"
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B116B]"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label htmlFor="modal-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descripción breve del trabajo
              </label>
              <textarea
                id="modal-msg"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Indica qué tipo de trabajo o reforma necesitas..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B116B]"
              />
            </div>

            {/* Privacy */}
            <div className="flex items-center gap-3 min-h-[44px]">
              <input
                type="checkbox"
                id="modal-privacy"
                checked={politicaAceptada}
                onChange={(e) => setPoliticaAceptada(e.target.checked)}
                className="w-5 h-5 text-[#0B116B] rounded border-slate-300 focus:ring-[#0B116B] cursor-pointer"
              />
              <label htmlFor="modal-privacy" className="text-xs text-slate-600 leading-tight cursor-pointer select-none">
                Acepto el tratamiento de mis datos para la gestión del presupuesto.
              </label>
            </div>

            {/* Actions */}
            <button
              type="submit"
              className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#0B116B] hover:bg-[#070C4D] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>ENVIAR SOLICITUD</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
