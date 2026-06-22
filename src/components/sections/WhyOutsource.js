import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './WhyOutsource.module.css';

const REASONS = [
  {
    number: '01',
    title: 'Significant Cost Savings',
    description: 'Reduce operational costs by 40-60% compared to in-house operations. No capital expenditure on infrastructure, technology, or recruitment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Scalability on Demand',
    description: 'Scale your team up or down instantly to match seasonal peaks, product launches, or changing market conditions without long-term commitments.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Access to Expert Talent',
    description: 'Tap into trained professionals with specialized skills in healthcare, finance, technology, and more—without the recruitment burden.',
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
    number: '04',
    title: 'Focus on Core Business',
    description: 'Redirect internal resources to revenue-generating activities while experts handle your customer communication and support operations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    number: '05',
    title: '24/7/365 Coverage',
    description: 'Provide round-the-clock support across all time zones with teams that never sleep—holidays, weekends, and after-hours included.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Advanced Technology',
    description: 'Leverage enterprise-grade telephony, CRM integrations, and analytics platforms without the capital investment and maintenance overhead.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function WhyOutsource() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Why Outsource?"
          title={<>The <span className="kw">Strategic Advantage</span> of Partnering with Experts</>}
          subtitle="Leading businesses worldwide leverage call center outsourcing to reduce costs, improve service quality, and scale faster. Here's why it works."
        />

        <div className={styles.grid}>
          {REASONS.map((reason) => (
            <div key={reason.number} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{reason.number}</span>
                <div className={styles.icon}>{reason.icon}</div>
              </div>
              <h3 className={styles.title}>{reason.title}</h3>
              <p className={styles.description}>{reason.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <span className={styles.ctaEyebrow}>Get Started</span>
          <h2 className={styles.ctaTitle}>
            Ready to transform your <span className="kw">customer operations</span>?
          </h2>
          <p className={styles.ctaText}>
            Get matched with pre-vetted call center providers in days — not months, and always free for clients.
          </p>
          <Button href="/free-consultation" size="lg" variant="primary">
            Get Your Free Match
          </Button>
        </div>
      </div>
    </section>
  );
}
