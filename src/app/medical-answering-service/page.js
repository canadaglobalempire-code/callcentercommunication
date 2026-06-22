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
  title: 'Medical Answering Service | HIPAA-Compliant Healthcare Call Center',
  description: 'Professional medical answering service with HIPAA-compliant call center solutions. 24/7 healthcare support, appointment scheduling, and patient communication services.',
  path: '/medical-answering-service',
});

const MEDICAL_FEATURES = [
  {
    title: 'HIPAA-Compliant Operations',
    description: 'Every call handler trained on PHI protection, secure data handling, and healthcare privacy regulations.',
  },
  {
    title: '24/7 Availability',
    description: 'Round-the-clock coverage ensures patients always reach a live professional, never an automated system.',
  },
  {
    title: 'Appointment Scheduling',
    description: 'Real-time scheduling integration with your practice management system for accurate, up-to-date booking.',
  },
  {
    title: 'Triage Protocols',
    description: 'Medical protocols trained agents who know when to escalate urgent calls versus routine inquiries.',
  },
  {
    title: 'Bilingual Support',
    description: 'Spanish and other language capabilities to serve diverse patient populations effectively.',
  },
  {
    title: 'Disaster Recovery',
    description: 'Redundant systems and backup protocols ensure service continuity during emergencies and outages.',
  },
];

const BENEFITS = [
  {
    stat: 'HIPAA',
    label: 'Fully Compliant',
  },
  {
    stat: '24/7/365',
    label: 'Live Coverage',
  },
  {
    stat: 'Rapid',
    label: 'Answer Times',
  },
  {
    stat: 'Healthcare',
    label: 'Specialists',
  },
];

const MEDICAL_FAQ = [
  {
    question: 'Is your medical answering service HIPAA-compliant?',
    answer: 'Yes, absolutely. Every provider in our healthcare network maintains full HIPAA compliance. All call agents complete PHI training, secure data handling protocols are in place, and Business Associate Agreements (BAAs) are standard. We verify compliance through regular audits and certifications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    question: 'Can you handle appointment scheduling for my practice?',
    answer: 'Yes, appointment scheduling is one of our core services. Our agents integrate directly with your practice management system (Epic, Cerner, Athena, etc.) to schedule, reschedule, and cancel appointments in real-time. Patients get immediate confirmation, and your calendar stays current.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    question: 'How do you handle urgent medical calls versus routine questions?',
    answer: 'Our medical call center agents follow triage protocols you define. Urgent calls based on your criteria (symptoms, timing, caller type) are escalated immediately to your on-call provider or designated line. Routine calls — prescription refills, billing questions, appointments — are handled according to your workflows and documented for next-business-day follow-up.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    question: 'Do you offer bilingual medical answering services?',
    answer: 'Yes, bilingual capabilities are available including Spanish-language agents. For practices serving diverse communities, we can match you with providers who offer multiple languages to ensure effective communication with all your patients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    question: 'What size medical practices do you work with?',
    answer: 'We serve healthcare organizations of every size — from solo practitioners and small clinics to multi-location medical groups, hospitals, and health systems. Our provider network includes specialists for low-volume programs as well as large-scale operations handling thousands of calls daily.',
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
    question: 'How much does a medical answering service cost?',
    answer: 'Pricing varies based on call volume, service level, and requirements. Most practices pay between $300-$1,500 monthly depending on minutes used. Dedicated agent options start around $2,500/month for high-volume or complex programs. We provide transparent quotes with no hidden fees, and our service is completely free to you — we earn from provider partnerships.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Call Center Communications - Medical Answering Services',
  description: 'HIPAA-compliant medical answering service and healthcare call center solutions',
  url: '/medical-answering-service',
};

export default function MedicalAnsweringServicePage() {
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
                { label: 'Medical Answering Service' },
              ]}
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.heroBadge}>Healthcare Solutions</span>
              <h1 className={styles.heroTitle}>
                Medical Answering Service That Protects Patients & Practice
              </h1>
              <p className={styles.heroDescription}>
                HIPAA-compliant call center solutions for medical practices, hospitals,
                and healthcare organizations. 24/7 professional coverage, appointment
                scheduling, and patient communication — all fully compliant.
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
              <div className={styles.heroCard}>
                <div className={styles.heroCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className={styles.heroCardContent}>
                  <div className={styles.heroCardTitle}>HIPAA-Compliant</div>
                  <div className={styles.heroCardText}>Every call handled with full healthcare privacy compliance</div>
                </div>
              </div>
              <div className={styles.heroCard}>
                <div className={styles.heroCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.heroCardContent}>
                  <div className={styles.heroCardTitle}>24/7 Live Answer</div>
                  <div className={styles.heroCardText}>Patients always reach a professional, never voicemail</div>
                </div>
              </div>
              <div className={styles.heroCard}>
                <div className={styles.heroCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className={styles.heroCardContent}>
                  <div className={styles.heroCardTitle}>Appointment Scheduling</div>
                  <div className={styles.heroCardText}>Real-time integration with your practice management system</div>
                </div>
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
            title="Healthcare Call Center Features"
            subtitle="Comprehensive medical answering services designed for patient satisfaction and practice efficiency"
          />
          <div className={styles.featuresGrid}>
            {MEDICAL_FEATURES.map((feature, index) => (
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
          <h2 className={styles.ctaTitle}>Ready to Transform Your Practice Communication?</h2>
          <p className={styles.ctaText}>
            Schedule your free consultation today. No commitment, no cost — just expert
            guidance on medical answering services for your healthcare organization.
          </p>
          <Button variant="secondary" size="lg" href="/free-consultation">
            Get Your Free Consultation
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={MEDICAL_FAQ}
        title="Medical Answering Service FAQ"
        subtitle="Common questions about healthcare call center solutions"
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Form */}
      <ContactForm />
    </>
  );
}
