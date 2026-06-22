import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import CtaBanner from '@/components/sections/CtaBanner';
import { services } from '@/data/services';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Our Services',
  description:
    'Explore comprehensive call center outsourcing services — inbound, outbound, BPO, automation, reporting, and multilingual support. Call Center Communications matches you with the right provider.',
  path: '/services',
});

const SERVICE_KEY = {
  'inbound-call-center-services': 'inbound',
  'outbound-call-center-services': 'outbound',
  'business-process-outsourcing': 'bpo',
  'interactive-automated-services': 'automated',
  'responsiveness-reporting': 'reporting',
  'multilingual-call-center-services': 'multilingual',
};
const svcKey = (s) => SERVICE_KEY[s] || s;

const serviceIcons = {
  inbound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      <path d="M14.5 2v6" />
      <path d="M11.5 5l3 3 3-3" />
    </svg>
  ),
  outbound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      <path d="M14.5 8V2" />
      <path d="M11.5 5l3-3 3 3" />
    </svg>
  ),
  bpo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <circle cx="12" cy="15" r="2" />
      <path d="M9.5 15a2.5 2.5 0 0 1 5 0" />
    </svg>
  ),
  automated: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="9" cy="16" r="1" />
      <circle cx="15" cy="16" r="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <path d="M12 2v2" />
      <path d="M7 4l1.5 1.5" />
      <path d="M17 4l-1.5 1.5" />
    </svg>
  ),
  reporting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 17V13" />
      <path d="M12 17V9" />
      <path d="M17 17V7" />
    </svg>
  ),
  multilingual: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2Z" />
      <path d="M18 18l2 2" />
      <path d="M20 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Our Services' },
              ]}
            />
          </div>
          <span className={styles.heroBadge}>Call Center Services</span>
          <h1 className={styles.heroTitle}>
            Complete Outsourcing{' '}
            <span className={styles.accent}>Solutions</span>
          </h1>
          <p className={styles.heroSubtitle}>
            No matter how big or small your company is, outsourcing your customer
            service saves you time and money. Call Center Communications makes sure
            your customers&apos; needs are fulfilled with only the most professional
            providers — matched to your exact requirements.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>6</span>
              <span className={styles.heroStatLabel}>Core Service Lines</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>200+</span>
              <span className={styles.heroStatLabel}>Vetted Providers</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>100%</span>
              <span className={styles.heroStatLabel}>Free to Use</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services Grid ===== */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesContainer}>
          <SectionHeading
            title="Comprehensive Outsourcing Solutions"
            subtitle="From frontline customer support to back-office processing, we connect you with providers who deliver results"
          />
          <div className={styles.grid}>
            {services.map((service) => (
              <div key={service.slug} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    {serviceIcons[svcKey(service.slug)]}
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                </div>
                <p className={styles.cardDescription}>
                  {service.shortDescription}
                </p>
                <div className={styles.featuresList}>
                  {service.features.slice(0, 6).map((feature) => (
                    <span key={feature} className={styles.featureTag}>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
                <Button href={`/services/${service.slug}`} size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CtaBanner />
    </>
  );
}
