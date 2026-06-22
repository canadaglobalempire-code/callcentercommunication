import ConsultationForm from '@/components/ui/ConsultationForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/data/siteConfig';
import { testimonials } from '@/data/testimonials';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Free Consultation',
  description:
    'Get a free call center consultation from industry veterans with 30 years of experience. No cost, no obligation — just expert guidance to find your ideal outsourcing partner.',
  path: '/free-consultation',
});

export default function FreeConsultationPage() {
  const testimonial = testimonials[0];

  const consultationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Call Center Consultation',
    description:
      'Get a free call center consultation from industry veterans with 30 years of experience. No cost, no obligation — just expert guidance to find your ideal outsourcing partner.',
    url: `${siteConfig.url}/free-consultation`,
    mainEntity: {
      '@type': 'Service',
      name: 'Free Call Center Consultation',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      description:
        'Free, no-obligation consultation to match businesses with vetted call center providers.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Completely free brokerage service',
      },
    },
  };

  return (
    <>
      <JsonLd data={consultationJsonLd} />

      <nav style={{ padding: '120px 24px 0', maxWidth: '1280px', margin: '0 auto' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Free Consultation' },
          ]}
        />
      </nav>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* ===== Left: Heading + Form ===== */}
            <div className={styles.left}>
              <h1 className={styles.title}>
                Get Your Free Call Center Consultation
              </h1>
              <span className={styles.accent} aria-hidden="true" />
              <p className={styles.subtitle}>
                No cost. No obligation. Just expert guidance from industry
                veterans who have been matching businesses with the right call
                center partners for nearly three decades.
              </p>
              <ConsultationForm />
            </div>

            {/* ===== Right: Trust Points + Testimonial ===== */}
            <div className={styles.right}>
              {/* Trust Card: 100% Free */}
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <h3>100% Free</h3>
                  <p>
                    Our brokerage service costs you nothing. We earn from
                    provider partnerships, so our guidance is always in your best
                    interest.
                  </p>
                </div>
              </div>

              {/* Trust Card: 30 Years Experience */}
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <h3>30 Years Experience</h3>
                  <p>
                    Founded by former BPO executives with decades of industry
                    knowledge. We have seen it all and know what works.
                  </p>
                </div>
              </div>

              {/* Trust Card: PCI-Compliant Partners */}
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className={styles.trustContent}>
                  <h3>PCI-Compliant Partners</h3>
                  <p>
                    Every provider in our network meets the highest security
                    standards, including PCI-DSS, HIPAA, and SOC 2
                    certifications.
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className={styles.testimonial}>
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteIcon} aria-hidden="true">
                    &ldquo;
                  </div>
                  <p className={styles.quoteText}>{testimonial.quote}</p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorName}>
                      {testimonial.author}
                    </span>
                    <span className={styles.authorTitle}>
                      {testimonial.title}, {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
