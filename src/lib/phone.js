// Combined phone value: "+" dial code followed by national digits, e.g. "+14035551234".
export const PHONE_PATTERN = /^\+\d{7,15}$/;

export function isValidPhone(value) {
  return typeof value === 'string' && PHONE_PATTERN.test(value.trim());
}
