const SPLITFORMS_URL = 'https://splitforms.com/api/submit';

export async function submitToSplitForms({ subject, fields }) {
  const accessKey = process.env.SPLITFORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('SPLITFORMS_ACCESS_KEY is not configured');
  }

  const formData = new FormData();
  formData.set('access_key', accessKey);
  formData.set('subject', subject);

  for (const [key, value] of Object.entries(fields)) {
    if (value != null && String(value).trim() !== '') {
      formData.set(key, String(value).trim());
    }
  }

  const res = await fetch(SPLITFORMS_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  const json = await res.json();
  return { ok: res.ok, ...json };
}

export function buildContactSummary(data) {
  const lines = Object.entries(data)
    .filter(([key, value]) => key !== 'formType' && value != null && String(value).trim() !== '')
    .map(([key, value]) => `${formatFieldLabel(key)}: ${value}`);

  return lines.join('\n');
}

function formatFieldLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}
