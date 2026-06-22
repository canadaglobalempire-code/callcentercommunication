import React from 'react';

function parseInline(text) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*|!?\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('!')) {
      const m = token.match(/\[([^\]]*)\]\(([^)]+)\)/);
      // eslint-disable-next-line @next/next/no-img-element
      nodes.push(<img key={key++} src={m[2]} alt={m[1]} loading="lazy" />);
    } else {
      const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      nodes.push(
        <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(md) {
  const lines = md.split('\n');
  const blocks = [];
  let list = null;
  let para = [];
  let key = 0;

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={key++}>{para.map((p, i) => <React.Fragment key={i}>{i > 0 ? ' ' : null}{parseInline(p)}</React.Fragment>)}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const Tag = list.type === 'ul' ? 'ul' : 'ol';
      blocks.push(
        <Tag key={key++}>
          {list.items.map((it, i) => (
            <li key={i}>{parseInline(it)}</li>
          ))}
        </Tag>
      );
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) {
      flushPara();
      flushList();
      blocks.push(<h3 key={key++}>{parseInline(m[1])}</h3>);
      continue;
    }
    if ((m = line.match(/^##\s+(.*)$/))) {
      flushPara();
      flushList();
      blocks.push(<h2 key={key++}>{parseInline(m[1])}</h2>);
      continue;
    }
    if ((m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) {
      flushPara();
      flushList();
      // eslint-disable-next-line @next/next/no-img-element
      blocks.push(<img key={key++} src={m[2]} alt={m[1]} loading="lazy" />);
      continue;
    }
    if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== 'ul') {
        flushList();
        list = { type: 'ul', items: [] };
      }
      list.items.push(m[1]);
      continue;
    }
    if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== 'ol') {
        flushList();
        list = { type: 'ol', items: [] };
      }
      list.items.push(m[1]);
      continue;
    }
    flushList();
    para.push(line.trim());
  }

  flushPara();
  flushList();
  return blocks;
}
