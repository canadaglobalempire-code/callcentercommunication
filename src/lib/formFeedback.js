// Shared lead-form behaviour: one email subject for every inquiry form, the
// thank-you copy, and the "jump to the first red field" helper.

export const INQUIRY_SUBJECT = 'Call Center Communications – Website Inquiry';

export const INVALID_BANNER = 'Please complete the highlighted fields below.';

// After a successful submit the thank-you shows, then the empty form comes back.
export const RESET_AFTER_MS = 6000;

export function thankYouText(name) {
  const first = String(name || '').trim().split(/\s+/)[0];
  return `${first ? `Thanks, ${first}!` : 'Thanks!'} Your inquiry has been received. One of our representatives will reach out to you.`;
}

// Runs after React paints the error classes: scroll the first invalid field
// into view and focus it (PhoneField/radio groups carry the class on a wrapper).
export function focusFirstInvalid(form, errorClass) {
  requestAnimationFrame(() => {
    const el = form?.querySelector(`.${errorClass}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const target = el.matches('input, select, textarea')
      ? el
      : el.querySelector('input:not([type="hidden"]), select, textarea');
    target?.focus({ preventScroll: true });
  });
}
