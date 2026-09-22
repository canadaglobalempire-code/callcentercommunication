// Links the first mention of a named law or standard to its primary source.
// Pass one `seen` Set per page so each source is linked once, on first mention.
const SOURCES = [
  { id: 'hipaa', pattern: /\bHIPAA\b/, href: 'https://www.hhs.gov/hipaa/index.html' },
  { id: 'tcpa', pattern: /\bTCPA\b/, href: 'https://www.law.cornell.edu/uscode/text/47/227' },
  { id: 'pci', pattern: /\bPCI[ -]DSS\b/, href: 'https://www.pcisecuritystandards.org/' },
  { id: 'fdcpa', pattern: /\bFDCPA\b/, href: 'https://www.ftc.gov/legal-library/browse/rules/fair-debt-collection-practices-act-text' },
  { id: 'regf', pattern: /\bRegulation F\b/, href: 'https://www.consumerfinance.gov/rules-policy/regulations/1006/' },
  { id: 'glba', pattern: /\b(?:GLBA|Gramm-Leach-Bliley Act)\b/, href: 'https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act' },
  { id: 'ferpa', pattern: /\bFERPA\b/, href: 'https://studentprivacy.ed.gov/ferpa' },
  { id: 'ccpa', pattern: /\bCCPA\b/, href: 'https://oag.ca.gov/privacy/ccpa' },
];

export function citeSources(text, seen) {
  if (typeof text !== 'string') return text;
  const hits = SOURCES.flatMap((source) => {
    if (seen.has(source.id)) return [];
    const match = source.pattern.exec(text);
    return match ? [{ source, start: match.index, end: match.index + match[0].length }] : [];
  }).sort((a, b) => a.start - b.start);
  if (!hits.length) return text;

  const nodes = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    seen.add(hit.source.id);
    nodes.push(text.slice(cursor, hit.start));
    nodes.push(
      <a key={hit.source.id} href={hit.source.href} target="_blank" rel="noopener noreferrer" className="cite-link">
        {text.slice(hit.start, hit.end)}
      </a>
    );
    cursor = hit.end;
  }
  nodes.push(text.slice(cursor));
  return nodes;
}
