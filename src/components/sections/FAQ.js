'use client';

import { useId, useMemo, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { DEFAULT_FAQ_ICONS, normalizeFaqItems } from './faqIcons';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: 'How does Call Center Communications work?',
    answer:
      "We're a free outsourcing brokerage. You tell us your needs, and we match you with vetted call center providers from our global network. There's no cost to you — we earn from partnerships with providers.",
    icon: DEFAULT_FAQ_ICONS[0],
  },
  {
    question: 'Is the service really free?',
    answer:
      'Yes, 100% free for companies seeking call center services. Call Center Communications earns revenue through partnerships with providers in our network. You pay nothing for our consultation, matching, and introduction services.',
    icon: DEFAULT_FAQ_ICONS[1],
  },
  {
    question: 'How do you vet your call center partners?',
    answer:
      'Every provider in our network must be PCI-compliant and certified by the PCI Security Standards Council. We verify redundant infrastructure, quality assurance processes, and track records before including any provider in our referral network.',
    icon: DEFAULT_FAQ_ICONS[2],
  },
  {
    question: 'How quickly can I get matched with a provider?',
    answer:
      'Most businesses receive qualified provider matches within days of their initial consultation. Our 30 years of industry relationships allow us to move quickly while still ensuring the right fit.',
    icon: DEFAULT_FAQ_ICONS[3],
  },
  {
    question: 'Do you work with companies of all sizes?',
    answer:
      'Yes. Whether you need 5 agents or 500+, we work with businesses of every size across 14 industries. Our provider network includes specialists for small-volume programs as well as enterprise-scale operations.',
    icon: DEFAULT_FAQ_ICONS[4],
  },
  {
    question: 'What locations do you cover?',
    answer:
      'We connect businesses with call center providers onshore (USA/Canada), nearshore (Latin America), and offshore (Asia, Africa, Europe). We help you determine which location strategy best fits your budget and quality requirements.',
    icon: DEFAULT_FAQ_ICONS[5],
  },
];

function FaqItem({ item, index, isOpen, onToggle, baseId }) {
  const buttonId = `${baseId}-q-${index}`;
  const panelId = `${baseId}-a-${index}`;
  const isStringAnswer = typeof item.answer === 'string';

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <h3 className={styles.questionHeading}>
        <button
          type="button"
          id={buttonId}
          className={styles.question}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className={styles.questionIcon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.questionText}>{item.question}</span>
          <span className={styles.toggle} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.answerWrapper}
      >
        <div className={styles.answerInner}>
          {isStringAnswer ? (
            <p className={styles.answer}>{item.answer}</p>
          ) : (
            <div className={styles.answer}>{item.answer}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQ({
  items = faqData,
  title = (<>Frequently Asked <span className="kw">Questions</span></>),
  subtitle = 'Everything you need to know about our services.',
  showCta = true,
  showEyebrow = true,
  id,
  variant = 'default',
}) {
  const [openIndices, setOpenIndices] = useState(() => new Set([0]));
  const baseId = useId();
  const normalizedItems = useMemo(() => normalizeFaqItems(items), [items]);

  const toggle = (index) => {
    setOpenIndices((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIndices(new Set(normalizedItems.map((_, index) => index)));
  };

  const collapseAll = () => {
    setOpenIndices(new Set());
  };

  const sectionClass = [
    styles.section,
    variant === 'embedded' ? styles.sectionEmbedded : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClass} id={id}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow={showEyebrow ? 'FAQ' : undefined}
          title={title}
          subtitle={subtitle}
        />

        <div className={styles.controls}>
          <button type="button" className={styles.controlBtn} onClick={expandAll}>
            Expand all
          </button>
          <span className={styles.controlDivider} aria-hidden="true" />
          <button type="button" className={styles.controlBtn} onClick={collapseAll}>
            Collapse all
          </button>
        </div>

        <div className={styles.list}>
          {normalizedItems.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndices.has(index)}
              onToggle={() => toggle(index)}
              baseId={baseId}
            />
          ))}
        </div>

        {showCta && (
          <div className={styles.cta}>
            <p className={styles.ctaText}>Still have questions? We&rsquo;re here to help.</p>
            <a href="/contact" className={styles.ctaButton}>
              Contact Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
