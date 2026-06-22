'use client';

import { useId, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: 'How does Call Center Communications work?',
    answer:
      "We're a free outsourcing brokerage. You tell us your needs, and we match you with vetted call center providers from our global network. There's no cost to you — we earn from partnerships with providers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    question: 'Is the service really free?',
    answer:
      'Yes, 100% free for companies seeking call center services. Call Center Communications earns revenue through partnerships with providers in our network. You pay nothing for our consultation, matching, and introduction services.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    question: 'How do you vet your call center partners?',
    answer:
      'Every provider in our network must be PCI-compliant and certified by the PCI Security Standards Council. We verify redundant infrastructure, quality assurance processes, and track records before including any provider in our referral network.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    question: 'How quickly can I get matched with a provider?',
    answer:
      'Most businesses receive qualified provider matches within days of their initial consultation. Our 30 years of industry relationships allow us to move quickly while still ensuring the right fit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    question: 'Do you work with companies of all sizes?',
    answer:
      'Yes. Whether you need 5 agents or 500+, we work with businesses of every size across 14 industries. Our provider network includes specialists for small-volume programs as well as enterprise-scale operations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    question: 'What locations do you cover?',
    answer:
      'We connect businesses with call center providers onshore (USA/Canada), nearshore (Latin America), and offshore (Asia, Africa, Europe). We help you determine which location strategy best fits your budget and quality requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

function FaqItem({ item, index, isOpen, onToggle, baseId }) {
  const buttonId = `${baseId}-q-${index}`;
  const panelId = `${baseId}-a-${index}`;

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
          {item.icon ? (
            <span className={styles.questionIcon} aria-hidden="true">
              {item.icon}
            </span>
          ) : null}
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
          <p className={styles.answer}>{item.answer}</p>
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
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading eyebrow="FAQ" title={title} subtitle={subtitle} />

        <div className={styles.list}>
          {columns.map((column, columnIndex) => (
            <div className={styles.column} key={columnIndex}>
              {column.map((item, i) => {
                const index = columnIndex === 0 ? i : mid + i;
                return (
                  <FaqItem
                    key={index}
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => toggle(index)}
                    baseId={baseId}
                  />
                );
              })}
            </div>
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
