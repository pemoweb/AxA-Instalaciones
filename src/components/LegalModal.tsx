import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/axaData';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'cookies' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white text-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#0B116B] text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0B116B]">
            {type === 'privacy' ? 'Política de Privacidad' : 'Política de Cookies'}
          </h3>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed border-t border-slate-100 pt-4">
          {type === 'privacy' ? (
            <>
              <p>
                En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), <strong>Instalaciones AXA</strong>, con domicilio en {COMPANY_INFO.location.fullAddress}, le informa de que los datos facilitados a través de nuestros formularios serán tratados con la exclusiva finalidad de gestionar su solicitud de presupuesto y prestarle la atención requerida.
              </p>
              <p>
                <strong>Responsable del tratamiento:</strong> Instalaciones AXA.<br />
                <strong>Finalidad:</strong> Atención a consultas y elaboración de propuestas de servicios de climatización, electricidad y fontanería.<br />
                <strong>Legitimación:</strong> Consentimiento explícito del interesado al remitir el formulario.<br />
                <strong>Destinatarios:</strong> No se cederán datos a terceros salvo obligación legal.
              </p>
              <p>
                Puede ejercitar sus derechos de acceso, rectificación, supresión y demás derechos aplicables comunicándolo por escrito a nuestra dirección física o a través de nuestros canales oficiales de contacto.
              </p>
            </>
          ) : (
            <>
              <p>
                Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias para el correcto funcionamiento de la navegación, seguridad y visualización de mapas y recursos esenciales.
              </p>
              <p>
                No se emplean cookies de seguimiento comercial invasivo ni se comercializan datos con terceras entidades publicitarias.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0B116B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#070C4D] transition-colors inline-flex items-center justify-center"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
