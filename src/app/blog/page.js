import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { blogPosts } from '@/data/blogPosts';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Blog',
  description:
    'Expert insights on call center outsourcing, BPO strategy, and customer experience. Stay informed with the latest industry news and practical guidance from Call Center Communications.',
  path: '/blog',
});

function getInitial(name = '') {
  return (name.trim()[0] || 'C').toUpperCase();
}

function readingTime(content = '') {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* ===== Header band ===== */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCrumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog' },
              ]}
            />
          </div>
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1 className={styles.heroTitle}>Latest Insights</h1>
          <p className={styles.heroSubtitle}>
            Expert perspectives on call center outsourcing, BPO, and customer
            experience strategy — from the team that matches businesses with
            the right providers.
          </p>
        </div>
      </header>

      {/* ===== Featured post (split card) ===== */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredImageWrap}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 900px) 100vw, 600px"
                className={styles.featuredImage}
                priority
              />
              <span className={styles.featuredFlag}>Featured</span>
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.categoryPill}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.featuredMeta}>
                <span className={styles.avatar} aria-hidden="true">
                  {getInitial(featured.author)}
                </span>
                <div className={styles.metaInfo}>
                  <span className={styles.metaAuthor}>{featured.author}</span>
                  <span className={styles.metaLine}>
                    <span>{formatDate(featured.date)}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{readingTime(featured.content)} min read</span>
                  </span>
                </div>
              </div>
              <span className={styles.featuredCta}>
                Read article
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== All articles grid ===== */}
      {rest.length > 0 && (
      <section className={styles.grid}>
        <div className={styles.gridInner}>
          <div className={styles.gridHead}>
            <h2 className={styles.gridHeading}>All articles</h2>
            <span className={styles.gridCount}>
              {rest.length} more {rest.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
          <div className={styles.postsGrid}>
            {rest.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardCategory}>{post.category}</span>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardMeta}>
                      <span>{formatDate(post.date)}</span>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span>{readingTime(post.content)} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ===== CTA Band ===== */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Not sure which provider fits? We will match you.
          </h2>
          <p className={styles.ctaCopy}>
            Our brokerage service is free. Tell us your needs and get matched
            with vetted call center partners in days.
          </p>
          <Button href="/free-consultation" size="lg">
            Get Your Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
