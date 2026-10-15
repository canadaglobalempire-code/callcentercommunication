import { COUNTRIES, DIAL_CODES } from './countries.js';

// Whatever was typed -> "+digits" (max 4 digits); empty stays empty so the field can be cleared.
export function normaliseDial(raw) {
  if (!raw) return '';
  return `+${String(raw).replace(/\D/g, '').slice(0, 4)}`;
}

// Valid only on an exact match with a dial code in the country list (+000, +999, +0 are not).
export function isValidDial(dial) {
  return DIAL_CODES.has(dial);
}

// Still being typed: empty/"+" or a strict prefix of a real code (e.g. "+3" on the way to "+380").
export function isPartialDial(dial) {
  if (!dial || dial === '+') return true;
  if (isValidDial(dial)) return false;
  for (const code of DIAL_CODES) if (code.startsWith(dial)) return true;
  return false;
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
