import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBanner from '@/components/sections/CtaBanner';
import { caseStudies } from '@/data/caseStudies';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Case Studies',
  description:
    'Explore proven results from our call center outsourcing partnerships. Real case studies showcasing measurable improvements in customer service, cost savings, and operational efficiency.',
  path: '/case-studies',
});

const industryLabels = {
  healthcare: 'Healthcare',
  banking: 'Financial Services',
  insurance: 'Insurance',
  telecommunications: 'Telecommunications',
  retail: 'Retail',
  ecommerce: 'Ecommerce',
  technology: 'Technology',
  automotive: 'Automotive',
  airlines: 'Airlines',
  travel: 'Travel & Hospitality',
  government: 'Government',
  energy: 'Energy & Utilities',
  'cable-media': 'Cable & Media',
  disaster: 'Disaster Recovery',
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Case Studies' },
              ]}
            />
          </div>
          <h1 className={styles.heroTitle}>Case Studies</h1>
          <p className={styles.heroSubtitle}>
            Proven results from real outsourcing partnerships. See how
            businesses across industries have transformed their customer
            operations with the right call center partner.
          </p>
        </div>
      </section>

      {/* ===== Case Studies Grid ===== */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {caseStudies.map((study) => (
              <article key={study.slug} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.industryBadge}>
                    {industryLabels[study.industry] || study.industry}
                  </span>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <p className={styles.cardChallenge}>{study.challenge}</p>
                  <div className={styles.statPills}>
                    {study.results.slice(0, 3).map((result, i) => (
                      <span key={i} className={styles.statPill}>
                        {result}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className={styles.readLink}
                  >
                    Read Case Study &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CtaBanner />
    </>
  );
}
