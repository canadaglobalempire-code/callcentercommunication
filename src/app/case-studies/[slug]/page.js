import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBanner from '@/components/sections/CtaBanner';
import JsonLd from '@/components/seo/JsonLd';
import { caseStudies } from '@/data/caseStudies';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

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

/* ===== Static Params ===== */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

/* ===== Dynamic Metadata ===== */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  return genMeta({
    title: study.title,
    description: study.challenge.slice(0, 160),
    path: `/case-studies/${study.slug}`,
    ogImage: study.image,
  });
}

/* ===== Result Icons ===== */
const resultIcons = [
  <svg key="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>,
];

/* ===== Page Component ===== */
export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.challenge.slice(0, 160),
    publisher: { '@type': 'Organization', name: 'Call Center Communications' },
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: study.title },
              ]}
            />
          </div>
          <span className={styles.industryBadge}>
            {industryLabels[study.industry] || study.industry}
          </span>
          <h1 className={styles.heroTitle}>{study.title}</h1>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          {/* Challenge */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionLabel}>Challenge</div>
            <h2 className={styles.sectionTitle}>The Challenge</h2>
            <p className={styles.sectionText}>{study.challenge}</p>
          </div>

          {/* Solution */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionLabel}>Solution</div>
            <h2 className={styles.sectionTitle}>Our Solution</h2>
            <p className={styles.sectionText}>{study.solution}</p>
          </div>

          {/* Results */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionLabel}>Results</div>
            <h2 className={styles.sectionTitle}>The Results</h2>
            <div className={styles.resultsGrid}>
              {study.results.map((result, i) => (
                <div key={i} className={styles.resultCard}>
                  <div className={styles.resultIcon}>
                    {resultIcons[i % resultIcons.length]}
                  </div>
                  <div className={styles.resultText}>{result}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {study.testimonial && (
            <div className={styles.testimonial}>
              <span className={styles.quoteIcon} aria-hidden="true">
                &ldquo;
              </span>
              <p className={styles.quoteText}>
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>
              <div className={styles.quoteAttribution}>
                <span className={styles.quoteAuthor}>
                  {study.testimonial.author}
                </span>
                <span className={styles.quoteCompany}>
                  {study.testimonial.company}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CtaBanner />
    </>
  );
}
