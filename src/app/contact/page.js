import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/ui/ContactForm';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/data/siteConfig';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Contact Us',
  description:
    'Get a free consultation for call center outsourcing. Tell us about your needs and our team will match you with the ideal contact center partner at no cost.',
  path: '/contact',
});

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Call Center Communications',
    description:
      'Get a free consultation for call center outsourcing. Tell us about your needs and our team will match you with the ideal contact center partner at no cost.',
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      ...(siteConfig.email ? { email: siteConfig.email } : {}),
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Contact Us' },
              ]}
            />
          </div>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>Ready to outsource today?</p>
          <p className={styles.heroText}>
            Whether you are ready to make the move or still doing your due
            diligence, we are more than happy to talk. During our free
            consultation, we will discuss your needs, pain-points, and desired
            expectations. We will give you our unbiased feedback and help create
            your roadmap to success.
          </p>
        </div>
      </section>

      {/* ===== Two-Column Content ===== */}
      <section className={styles.content}>
        <div className={styles.contentContainer}>
          <div className={styles.grid}>
            {/* Left: Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right: Info Panel */}
            <aside className={styles.infoPanel}>
              {/* Get In Touch */}
              <div className={styles.infoCard}>
                <h2 className={styles.infoHeading}>Get In Touch</h2>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.infoLabel}>Email</p>
                    <p className={styles.infoValue}>
                      {siteConfig.email ? (
                        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                      ) : (
                        'Reach us using the form'
                      )}
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.infoLabel}>Phone</p>
                    <p className={styles.infoValue}>
                      Contact us via the form or email
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.infoLabel}>Response Time</p>
                    <p className={styles.infoValue}>
                      Within 1 business day
                    </p>
                  </div>
                </div>
              </div>

              {/* Worldwide */}
              <div className={styles.worldwideCard}>
                <div className={styles.worldwideContent}>
                  <div className={styles.worldwideIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <h3 className={styles.worldwideTitle}>
                    We Serve Clients Worldwide
                  </h3>
                  <p className={styles.worldwideText}>
                    Our provider network spans North America, Latin America,
                    Europe, Asia, and Africa. No matter where your customers are,
                    we can match you with the right call center partner.
                  </p>
                </div>
              </div>

              {/* What to Expect */}
              <div className={styles.expectCard}>
                <h3 className={styles.expectHeading}>What to Expect</h3>
                <ol className={styles.expectList}>
                  <li className={styles.expectItem}>
                    <span className={styles.expectNumber}>1</span>
                    <span className={styles.expectText}>
                      Free consultation call to understand your needs
                    </span>
                  </li>
                  <li className={styles.expectItem}>
                    <span className={styles.expectNumber}>2</span>
                    <span className={styles.expectText}>
                      Detailed needs assessment and requirements analysis
                    </span>
                  </li>
                  <li className={styles.expectItem}>
                    <span className={styles.expectNumber}>3</span>
                    <span className={styles.expectText}>
                      Curated provider matching from our vetted network
                    </span>
                  </li>
                  <li className={styles.expectItem}>
                    <span className={styles.expectNumber}>4</span>
                    <span className={styles.expectText}>
                      Introduction to your ideal call center partners
                    </span>
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
