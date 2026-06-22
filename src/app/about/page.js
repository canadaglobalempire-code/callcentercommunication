import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import CtaBanner from '@/components/sections/CtaBanner';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'About Us',
  description:
    'Learn about Call Center Communications — nearly 30 years of connecting businesses with vetted call center providers worldwide. Free outsourcing brokerage.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'About Us' },
              ]}
            />
          </div>
          <h1 className={styles.heroTitle}>About Call Center Communications</h1>
          <p className={styles.heroSubtitle}>
            For nearly three decades we have served as a trusted bridge between
            businesses and vetted call center providers, delivering expert
            guidance at no cost to our clients.
          </p>
        </div>
      </section>

      {/* ===== Story ===== */}
      <section className={styles.story}>
        <div className={styles.storyContainer}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImageWrap}>
              <Image
                src="/images/about-img.jpg"
                alt="Call Center Communications team collaborating"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className={styles.storyContent}>
              <h2>More Than a Brokerage</h2>
              <span className={styles.storyAccent} aria-hidden="true" />
              <p>
                Call Center Communications is more than a call center brokerage.
                For almost thirty years we have proudly connected our clients to
                call centers offering a range of services including inbound and
                outbound call handling, business process outsourcing, multilingual
                support, and interactive automation. Our free brokerage model means
                businesses of every size can access our expertise without financial
                risk.
              </p>
              <p>
                What started as a focused effort to simplify call center sourcing
                has grown into one of the industry&rsquo;s most trusted advisory
                practices. We have helped hundreds of organizations — from
                fast-growing startups to Fortune 500 enterprises — find providers
                that match their operational needs, budget requirements, and
                long-term growth plans. Every recommendation we make is grounded in
                deep provider knowledge and genuine understanding of the client&rsquo;s
                business.
              </p>
              <p>
                Our consultants bring decades of collective experience across
                fourteen industries, allowing us to anticipate challenges that
                first-time outsourcers rarely see coming. We negotiate on your
                behalf, manage the transition process, and continue to monitor
                performance long after the contract is signed. That is why clients
                come back to us again and again — and why providers trust us to
                send them well-prepared, qualified opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission / Values ===== */}
      <section className={styles.mission}>
        <div className={styles.missionContainer}>
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide every recommendation and partnership"
          />
          <div className={styles.valuesGrid}>
            {/* Innovation & Adaptability */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v4" />
                  <path d="m16.2 7.8 2.9-2.9" />
                  <path d="M18 12h4" />
                  <path d="m16.2 16.2 2.9 2.9" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.9-2.9" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.9 2.9" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Innovation &amp; Adaptability</h3>
              <p className={styles.valueDesc}>
                The contact center landscape evolves constantly. We stay ahead of
                emerging technologies — from AI-powered IVR to omnichannel
                platforms — so our clients always benefit from the most current
                solutions available.
              </p>
            </div>

            {/* Privacy & Security */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Privacy &amp; Security</h3>
              <p className={styles.valueDesc}>
                Your data and your customers&rsquo; data deserve the highest level of
                protection. We only partner with providers that maintain rigorous
                compliance standards including HIPAA, PCI-DSS, and SOC 2
                certifications.
              </p>
            </div>

            {/* Unbiased Expertise */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                  <path d="M12 6v8" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Unbiased Expertise</h3>
              <p className={styles.valueDesc}>
                Because our service is free to clients, we have no financial
                incentive to steer you toward a particular provider. Our
                recommendations are driven solely by fit, capability, and your
                long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>30+</div>
              <div className={styles.statLabel}>Years of Experience</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100s</div>
              <div className={styles.statLabel}>of Clients Served</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>Global</div>
              <div className={styles.statLabel}>Provider Network</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>14</div>
              <div className={styles.statLabel}>Industries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== What Makes Us Different ===== */}
      <section className={styles.different}>
        <div className={styles.differentContainer}>
          <SectionHeading
            title="What Makes Us Different"
            subtitle="Six reasons businesses choose Call Center Communications over going it alone"
          />
          <div className={styles.differentGrid}>
            {/* Cost Effective */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Cost Effective</h3>
                <p>
                  Our brokerage service is completely free — no fees, no hidden
                  charges, no catch.
                </p>
              </div>
            </div>

            {/* Experienced */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Experienced</h3>
                <p>
                  Nearly 30 years of industry knowledge powering every
                  recommendation.
                </p>
              </div>
            </div>

            {/* Ethical */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Ethical</h3>
                <p>
                  Unbiased guidance — we match you to the best provider, not the
                  highest bidder.
                </p>
              </div>
            </div>

            {/* Adaptable */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Adaptable</h3>
                <p>
                  Solutions for every scale — from small businesses to enterprise
                  operations.
                </p>
              </div>
            </div>

            {/* Strategic */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Strategic</h3>
                <p>
                  We plan for your growth — recommending providers that scale with
                  your roadmap.
                </p>
              </div>
            </div>

            {/* Fast Launching */}
            <div className={styles.diffItem}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className={styles.diffContent}>
                <h3>Fast Launching</h3>
                <p>
                  Pre-vetted providers mean shorter ramp-up — go live in weeks, not
                  months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CtaBanner />
    </>
  );
}
