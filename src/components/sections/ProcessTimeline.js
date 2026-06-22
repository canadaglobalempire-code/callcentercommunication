import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './ProcessTimeline.module.css';

const STEPS = [
  {
    step: '01',
    title: 'Share Your Requirements',
    description: 'Tell us about your call volume, industry, service needs, and quality standards. This takes just 5-10 minutes.',
    details: ['Call volume estimates', 'Service types needed', 'Industry requirements', 'Quality standards', 'Budget considerations'],
    duration: '5-10 min',
    color: '#f6780a',
  },
  {
    step: '02',
    title: 'We Find Your Matches',
    description: 'We search our pre-vetted network of 200+ providers and identify 3-5 that align with your specific needs.',
    details: ['Provider vetting', 'Capability matching', 'Location options', 'Pricing comparison', 'Cultural fit assessment'],
    duration: '1-2 days',
    color: '#f6780a',
  },
  {
    step: '03',
    title: 'Compare & Select',
    description: 'Review your curated matches, compare proposals, and choose the provider that feels right for your business.',
    details: ['Provider presentations', 'Detailed proposals', 'Client references', 'Pricing breakdown', 'SLA review'],
    duration: '3-5 days',
    color: '#f6780a',
  },
  {
    step: '04',
    title: 'Launch & Grow',
    description: 'Your new provider integrates with your business. We remain available to ensure success and help you scale.',
    details: ['Onboarding support', 'Integration assistance', 'Performance monitoring', 'Ongoing optimization', 'Scale as needed'],
    duration: '2-4 weeks',
    color: '#f6780a',
  },
];

const TIMELINE_INFO = {
  title: 'Most clients are matched within 7-10 days',
  subtitle: 'From initial consultation to provider selection—faster than going it alone',
};

export default function ProcessTimeline() {
  return (
    <section className={styles.section}>
      <div className={styles.decorativeBlob1} />
      <div className={styles.decorativeBlob2} />

      <div className={styles.container}>
        <SectionHeading
          eyebrow="How It Works"
          title="Your Path to the Perfect Call Center Partner"
          subtitle="A simple, transparent process that connects you with vetted providers in days—not months. And yes, it's completely free."
        />

        {/* Timeline Info Banner */}
        <div className={styles.timelineBanner}>
          <div className={styles.timelineBannerIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className={styles.timelineBannerContent}>
            <span className={styles.timelineBannerTitle}>{TIMELINE_INFO.title}</span>
            <span className={styles.timelineBannerSubtitle}>{TIMELINE_INFO.subtitle}</span>
          </div>
        </div>

        {/* Process Timeline */}
        <div className={styles.timeline}>
          {/* Timeline Line */}
          <div className={styles.timelineLine} />

          {STEPS.map((item, index) => (
            <div key={item.step} className={styles.timelineItem}>
              {/* Step Number Badge */}
              <div className={styles.stepBadge} style={{ backgroundColor: item.color }}>
                <span className={styles.stepNumber}>{item.step}</span>
              </div>

              {/* Step Card */}
              <div className={styles.stepCard}>
                <div className={styles.stepCardHeader}>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <div className={styles.stepDuration}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {item.duration}
                  </div>
                </div>

                <p className={styles.stepDescription}>{item.description}</p>

                <ul className={styles.stepDetails}>
                  {item.details.map((detail) => (
                    <li key={detail}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Connecting line for next step */}
                {index < STEPS.length - 1 && (
                  <div className={styles.nextStepArrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>Pre-Vetted Providers</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>7-10</span>
            <span className={styles.statLabel}>Days to Match</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Free Service</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>30+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to find your perfect call center partner?
          </p>
          <Button href="/free-consultation" size="lg" variant="primary">
            Start Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
