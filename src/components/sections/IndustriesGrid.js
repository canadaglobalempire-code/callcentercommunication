import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { industries } from '@/data/industries';
import { industryIcons } from '@/lib/industryIcons';
import styles from './IndustriesGrid.module.css';

export default function IndustriesGrid() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Industries We Serve"
          title={<>Expertise across <span className="kw">every industry</span></>}
          subtitle="No matter your sector, we know the right partners to deliver specialized customer relationship management, with trained agents and compliance for your vertical."
        />
        <div className={styles.grid}>
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className={styles.card}
            >
              <div className={styles.iconCircle}>
                {industryIcons[industry.slug.replace('-call-center-services', '')]}
              </div>
              <h3 className={styles.cardTitle}>{industry.title}</h3>
              <p className={styles.cardTagline}>{industry.tagline}</p>
              <span className={styles.cardLink}>
                Learn more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
