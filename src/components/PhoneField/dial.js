import { COUNTRIES } from './countries.js';

export const DIAL_PATTERN = /^\+\d{1,4}$/;

// Whatever was typed -> "+digits" (max 4 digits); empty stays empty so the field can be cleared.
export function normaliseDial(raw) {
  if (!raw) return '';
  return `+${String(raw).replace(/\D/g, '').slice(0, 4)}`;
}

export function isValidDial(dial) {
  return DIAL_PATTERN.test(dial);
}

// Exact dial-code match. Keeps the current country if it shares the code (e.g. Canada on +1),
// otherwise the first in list order, so pinned countries win (US for +1, GB for +44).
export function countryForDial(dial, currentIso2) {
  const current = COUNTRIES.find((c) => c.iso2 === currentIso2);
  if (current && current.dial === dial) return current;
  return COUNTRIES.find((c) => c.dial === dial) || null;
}

// Combined value posted as "phone": "+<dial><digits>". An invalid dial code yields a value
// that fails isValidPhone (space kept in) so the form shows its normal error.
export function combinePhone(dial, national) {
  const digits = String(national || '').replace(/[\s().-]/g, '');
  if (!digits) return '';
  return isValidDial(dial) ? `${dial}${digits}` : `${dial || '+'} ${digits}`;
}
