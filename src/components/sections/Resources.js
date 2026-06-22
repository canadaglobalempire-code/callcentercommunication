import Link from 'next/link';
import Image from 'next/image';
import styles from './Resources.module.css';

const featured = {
  image: '/images/cc-management.jpg',
  category: 'Pricing Guide',
  title: 'The 2026 Call Center Pricing Playbook',
  description:
    'A region-by-region breakdown of true outsourcing costs — including hourly rates, hidden fees, and what a fair quote looks like for your service mix.',
  cta: 'Read the playbook',
  href: '/blog',
  readTime: '12 min read',
};

const secondary = [
  {
    icon: 'rfp',
    category: 'Template',
    title: 'Free RFP Template',
    description:
      'The battle-tested RFP used by Fortune 500 buyers to evaluate providers.',
    cta: 'Download',
    href: '/blog',
  },
  {
    icon: 'trends',
    category: 'Market Report',
    title: 'BPO Trends 2026',
    description:
      'AI adoption rates, nearshore growth, and what they mean for CX strategy.',
    cta: 'Read report',
    href: '/blog',
  },
  {
    icon: 'checklist',
    category: 'Checklist',
    title: 'Vendor Vetting Checklist',
    description:
      'The 14-point evaluation framework our advisors use on every provider.',
    cta: 'Get checklist',
    href: '/blog',
  },
];

const icons = {
  rfp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  trends: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 6-7" />
      <path d="M14 6h6v6" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="m8 11 2 2 4-4M8 17h8" />
    </svg>
  ),
};

export default function Resources() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Insights & Guides</span>
            <h2 className={styles.heading}>
              The outsourcing playbook,
              <br />
              free for the taking.
            </h2>
          </div>
          <p className={styles.subtext}>
            Pricing data, templates, and frameworks we&rsquo;ve built across 500+
            client engagements. Use them whether you work with us or not.
          </p>
        </div>

        <div className={styles.layout}>
          <Link href={featured.href} className={styles.featured}>
            <div className={styles.featuredImageWrap}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.featuredImage}
              />
              <span className={styles.featuredBadge}>{featured.category}</span>
            </div>
            <div className={styles.featuredBody}>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.featuredMeta}>
                <span className={styles.cta}>
                  {featured.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className={styles.readTime}>{featured.readTime}</span>
              </div>
            </div>
          </Link>

          <div className={styles.list}>
            {secondary.map((r) => (
              <Link key={r.title} href={r.href} className={styles.listItem}>
                <span className={styles.listIcon}>{icons[r.icon]}</span>
                <div className={styles.listBody}>
                  <span className={styles.listCategory}>{r.category}</span>
                  <h4 className={styles.listTitle}>{r.title}</h4>
                  <p className={styles.listDesc}>{r.description}</p>
                  <span className={styles.listCta}>
                    {r.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
