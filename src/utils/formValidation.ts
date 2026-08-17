export interface FormErrors {
  nombre?: string;
  telefono?: string;
  email?: string;
  servicio?: string;
  politicaAceptada?: string;
  general?: string;
}

export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  if (!trimmed) return false;
  // Standard RFC-5322 compliant regex for web forms
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
};

export const isValidPhone = (phone: string): boolean => {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  // Strip non-digit characters
  const digitsOnly = trimmed.replace(/\D/g, '');
  // Must have between 9 and 15 digits (standard Spanish or international format)
  if (digitsOnly.length < 9 || digitsOnly.length > 15) {
    return false;
  }
  // Validate standard allowed phone characters: +, digits, spaces, dashes, dots, parentheses
  const validPhoneFormat = /^[+]?[\d\s\-().]{9,20}$/;
  return validPhoneFormat.test(trimmed);
};

export const validateQuoteForm = (data: {
  nombre: string;
  telefono: string;
  email: string;
  servicio?: string;
  politicaAceptada: boolean;
}): FormErrors => {
  const errors: FormErrors = {};

  // Validate Name
  const trimmedName = data.nombre.trim();
  if (!trimmedName) {
    errors.nombre = 'Por favor, introduce tu nombre o el de tu empresa.';
  } else if (trimmedName.length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres.';
  } else if (/^\d+$/.test(trimmedName)) {
    errors.nombre = 'El nombre no puede contener únicamente números.';
  }

  // Validate Phone & Email (At least one contact method must be provided and valid)
  const hasPhone = data.telefono.trim().length > 0;
  const hasEmail = data.email.trim().length > 0;

  if (!hasPhone && !hasEmail) {
    errors.telefono = 'Facilita al menos un número de teléfono o un correo electrónico.';
    errors.email = 'Facilita al menos un número de teléfono o un correo electrónico.';
  } else {
    if (hasPhone && !isValidPhone(data.telefono)) {
      errors.telefono = 'Introduce un teléfono válido (mínimo 9 dígitos, ej: 600 123 456).';
    }
    if (hasEmail && !isValidEmail(data.email)) {
      errors.email = 'Introduce un correo electrónico válido (ej: contacto@empresa.com).';
    }
  }

  // Validate Privacy Policy
  if (!data.politicaAceptada) {
    errors.politicaAceptada = 'Debes aceptar la política de privacidad para gestionar tu solicitud.';
  }

  return errors;
};
