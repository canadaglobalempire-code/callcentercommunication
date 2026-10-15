import { DIAL_CODES } from '../components/PhoneField/countries.js';

// Combined phone value: "+" dial code followed by national digits, e.g. "+14035551234".
// 7-15 digits in total, and it must start with a dial code from the country list.
export const PHONE_PATTERN = /^\+\d{7,15}$/;

export function isKnownDial(dial) {
  return DIAL_CODES.has(dial);
}

export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!PHONE_PATTERN.test(v)) return false;
  for (const dial of DIAL_CODES) if (v.startsWith(dial)) return true;
  return false;
}
