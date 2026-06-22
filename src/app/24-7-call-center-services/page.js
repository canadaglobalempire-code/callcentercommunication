import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import ContactForm from '@/components/sections/ContactForm';
import FAQ from '@/components/sections/FAQ';
import Testimonials from '@/components/sections/Testimonials';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: '24/7 Call Center Services | Round-the-Clock Customer Support',
  description: 'Professional 24/7 call center services with live agents, after-hours support, and round-the-clock coverage. Never miss a customer call with continuous availability.',
  path: '/24-7-call-center-services',
});

const CONTINUOUS_FEATURES = [
  {
    title: 'True 24/7/365 Coverage',
    description: 'Live agents answer every call, day or night, weekends, holidays — no voicemail, no automated systems, ever.',
  },
  {
    title: 'After-Hours Support',
    description: 'Professional coverage when your office closes. Overnight agents share context with your daytime team through integrated systems.',
  },
  {
    title: 'Disaster Recovery',
    description: 'Redundant infrastructure and backup protocols ensure service continuity during power outages, natural disasters, or emergencies.',
  },
  {
    title: 'Global Time Zones',
    description: 'Multi-location operations provide true follow-the-sun coverage with native speakers across continents.',
  },
  {
    title: 'Scalable Capacity',
    description: 'Instant scaling during unexpected volume spikes. No customer ever hears a busy signal or experiences long hold times.',
  },
  {
    title: 'Omnichannel Always-On',
    description: '24/7 support across phone, email, live chat, SMS, and social media — every channel, every hour.',
  },
];

const BENEFITS = [
  {
    stat: '24/7/365',
    label: 'Live Coverage',
  },
  {
    stat: 'Rapid',
    label: 'Answer Times',
  },
  {
    stat: 'SLA-Backed',
    label: 'Reliability',
  },
  {
    stat: 'Live Agents',
    label: 'No Voicemail',
  },
];

const CONTINUOUS_FAQ = [
  {
    question: 'What does 24/7 call center service actually mean?',
    answer: 'True 24/7 service means live agents answer every call, every hour of every day — including nights, weekends, and holidays. No voicemail systems, no automated menus, no "call us back during business hours" messages. Your customers always reach a professional representative who can help them immediately.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    question: 'How do after-hours call center services work?',
    answer: 'After-hours services work in step with your daytime team. We integrate with your CRM, ticketing system, and knowledge base so overnight agents have full context. Calls are handled according to your protocols, with urgent matters escalated per your instructions and routine items documented for next-day follow-up.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    question: 'Can 24/7 coverage handle my specific industry requirements?',
    answer: 'Absolutely. We match businesses with providers experienced in their industry — healthcare (HIPAA-compliant), legal, financial services, technology, retail, and more. Industry-specific protocols, compliance requirements, and terminology are built into agent training and quality monitoring.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    question: 'How much does 24/7 call center service cost?',
    answer: 'Pricing varies based on call volume, service complexity, and requirements. After-hours overflow typically starts at $500-$1,500 monthly. Dedicated 24/7 coverage ranges from $2,500-$10,000+ monthly depending on minutes and agent needs. We provide transparent quotes with no hidden fees, and our consultation is completely free.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    question: 'What happens during high volume spikes or emergencies?',
    answer: 'Our provider network maintains excess capacity and surge protocols. During unexpected volume spikes, additional agents are brought online within minutes. Disaster recovery systems with redundant infrastructure and backup locations ensure continuity during power outages, natural disasters, or local emergencies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    question: 'How do I get started with 24/7 call center services?',
    answer: 'Start with a free consultation. We assess your call volumes, patterns, service requirements, and budget. Then we match you with pre-vetted providers specializing in 24/7 operations. Implementation typically takes 2-4 weeks including system integration, agent training on your business, and go-live support. Our service is completely free to you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '24/7 Call Center Services',
  description: 'Round-the-clock customer support with live agents, after-hours coverage, and continuous availability',
  provider: {
    '@type': 'Organization',
    name: 'Call Center Communications',
  },
  areaServed: 'Worldwide',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: '/24-7-call-center-services',
  },
};

export default function ContinuousCoveragePage() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: '24/7 Call Center Services' },
              ]}
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.heroBadge}>Always Available</span>
              <h1 className={styles.heroTitle}>
                24/7 Call Center Services That Never Sleep
              </h1>
              <p className={styles.heroDescription}>
                Round-the-clock customer support with live agents answering every call,
                every hour of every day. After-hours coverage, overflow handling, and
                continuous availability — your customers never wait.
              </p>
              <div className={styles.heroCtas}>
                <Button variant="primary" size="lg" href="/free-consultation">
                  Get Your Free Consultation
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroClock}>
                <div className={styles.clockFace}>
                  <div className={styles.clockHand1} />
                  <div className={styles.clockHand2} />
                  <div className={styles.clockCenter} />
                </div>
                <div className={styles.clockLabel}>24/7 Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className={styles.statsBanner}>
        <div className={styles.statsContainer}>
          {BENEFITS.map((benefit, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{benefit.stat}</div>
              <div className={styles.statLabel}>{benefit.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <SectionHeading
            title="Continuous Coverage Features"
            subtitle="Comprehensive 24/7 call center capabilities that ensure every customer reaches a live agent"
          />
          <div className={styles.featuresGrid}>
            {CONTINUOUS_FEATURES.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Never Miss Another Customer Call</h2>
          <p className={styles.ctaText}>
            Schedule your free consultation today. We&rsquo;ll assess your coverage needs and
            match you with 24/7 providers who fit your budget and requirements.
          </p>
          <Button variant="secondary" size="lg" href="/free-consultation">
            Get Your Free Consultation
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={CONTINUOUS_FAQ}
        title="24/7 Call Center Services FAQ"
        subtitle="Common questions about round-the-clock customer support"
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Form */}
      <ContactForm />
    </>
  );
}
