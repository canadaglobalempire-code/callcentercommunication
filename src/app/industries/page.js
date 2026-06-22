import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBanner from '@/components/sections/CtaBanner';
import { industries } from '@/data/industries';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Industries We Serve',
  description:
    'Specialized call center outsourcing solutions across every industry sector. From healthcare and banking to technology and government, we pair your business with the call center partner best suited to serve your customers.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Industries' },
              ]}
            />
          </div>
          <span className={styles.heroBadge}>Industries We Serve</span>
          <h1 className={styles.heroTitle}>
            Expertise Across{' '}
            <span className={styles.accent}>Every Sector</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Call Center Communications is the leading expert in outsourcing
            referral services. We pair your business with the company best suited
            to serve your customers&apos; needs. No matter what sector
            you&apos;re in, we know the right people.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>14+</span>
              <span className={styles.heroStatLabel}>Industries Served</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>200+</span>
              <span className={styles.heroStatLabel}>Vetted Providers</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>30</span>
              <span className={styles.heroStatLabel}>Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries Grid ── */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className={styles.card}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{industry.title}</h3>
                  <p className={styles.cardTagline}>{industry.tagline}</p>
                  <span className={styles.cardLink}>
                    Learn More <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBanner />
    </>
  );
}
