// Client helpers for the splitforms embed.js partial-lead tracker. The tracker
// injects a hidden sf_sid input; it must reach /api/submit with the real lead so
// the partial is closed. Everything here is optional: a blocked script is a no-op.

// Public form key (the same one the API route posts with); only identifies the form.
export const SPLITFORMS_FORM_KEY =
  process.env.NEXT_PUBLIC_SPLITFORMS_ACCESS_KEY || '02fe823953ca465db5d4da1b5c0fd6a0';

export function partialSessionId(form) {
  const value = form?.elements?.namedItem?.('sf_sid')?.value;
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value) ? value : undefined;
}

export function partialLeadDone(form) {
  try {
    window.splitforms?.done?.(form);
  } catch {
    /* The lead has already been delivered. */
  }
}
