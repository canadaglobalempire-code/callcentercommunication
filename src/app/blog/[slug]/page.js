import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import ReadingProgress from '@/components/blog/ReadingProgress';
import FAQ from '@/components/sections/FAQ';
import { blogPosts } from '@/data/blogPosts';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { renderMarkdown } from '@/lib/markdown';
import styles from './page.module.css';

/* ===== Static params ===== */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ===== Dynamic metadata ===== */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return genMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
  });
}

function initial(name = '') {
  return (name.trim()[0] || 'C').toUpperCase();
}

function cleanUrl(url = '') {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/* Editorial photo rotation for ranked-company panels (no per-company logos available).
   A company can override with its own `image` field. */
const COMPANY_IMAGES = [
  '/images/hd-office-team.jpg',
  '/images/cc-diverse-team.jpg',
  '/images/agents-team-row.jpg',
  '/images/cc-team-huddle.jpg',
  '/images/cc-support-team.jpg',
  '/images/internet-office-team-meeting.jpg',
  '/images/cc-team-desk.jpg',
  '/images/hd-agents-row.jpg',
  '/images/cc-management.jpg',
  '/images/team-collaboration.jpg',
  '/images/cc-team-work.jpg',
  '/images/cc-discussion.jpg',
];

/* ===== Page ===== */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const words = post.content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 200));
  const dateText = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const hasRanking = post.companies?.length > 0;

  /* ===== Structured data (Article + additive FAQPage / ItemList) ===== */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Call Center Communications' },
  };
  const faqSchema =
    post.faq?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;
  const itemListSchema = hasRanking
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: post.companies.map((c) => ({
          '@type': 'ListItem',
          position: c.rank,
          name: c.name,
        })),
      }
    : null;

  /* ===== Shared article body (sections self-gate on data) ===== */
  const body = (
    <>
      <div className={styles.prose}>{renderMarkdown(post.content)}</div>

      {hasRanking && post.comparisonTable && (
        <section id="at-a-glance" className={styles.wide}>
          <h2 className={styles.sectionTitle}>
            {post.comparisonTable.title || 'At a glance'}
          </h2>
          <div className={styles.tableShell}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {post.comparisonTable.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {post.comparisonTable.rows.map((r, i) => (
                    <tr key={i}>
                      <td className={styles.tdName}>
                        <a href={`#company-${i + 1}`} className={styles.tdLink}>
                          <span className={styles.tdRank}>#{i + 1}</span>
                          {r.company}
                        </a>
                      </td>
                      <td>{r.bestFor}</td>
                      <td>{r.industries}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {hasRanking && (
        <section className={styles.ranking}>
          {post.companies.map((c) => {
            const img = c.image || COMPANY_IMAGES[(c.rank - 1) % COMPANY_IMAGES.length];
            return (
              <article id={`company-${c.rank}`} className={styles.company} key={c.rank}>
                <div className={styles.companyBody}>
                  <h3 className={styles.companyName}>{c.name}</h3>

                  <ul className={styles.facts}>
                    <li>
                      <span className={styles.factK}>Headquarters</span>
                      <span className={styles.factV}>{c.hq}</span>
                    </li>
                    {c.founded && (
                      <li>
                        <span className={styles.factK}>Founded</span>
                        <span className={styles.factV}>{c.founded}</span>
                      </li>
                    )}
                    {c.website && (
                      <li>
                        <span className={styles.factK}>Website</span>
                        <span className={styles.factV}>
                          <a href={c.website} target="_blank" rel="noopener noreferrer">
                            {cleanUrl(c.website)}
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>

                  <p className={styles.bestFor}>
                    <span className={styles.tag}>Best for</span>
                    {c.bestFor}
                  </p>

                  <p className={styles.blurb}>{c.blurb}</p>

                  {c.capabilities?.length > 0 && (
                    <div className={styles.caps}>
                      <span className={styles.capsLabel}>Key capabilities</span>
                      <ul className={styles.capsList}>
                        {c.capabilities.map((cap, i) => (
                          <li key={i}>{cap}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <figure className={styles.companyMedia}>
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 800px"
                      className={styles.companyImg}
                    />
                    <span className={styles.rankPill}>#{c.rank}</span>
                  </figure>

                  <dl className={styles.specs}>
                    <div className={styles.specRow}>
                      <dt>Industries served</dt>
                      <dd>{c.industries}</dd>
                    </div>
                    {c.clients && (
                      <div className={styles.specRow}>
                        <dt>Notable clients</dt>
                        <dd>{c.clients}</dd>
                      </div>
                    )}
                    {c.pricing && (
                      <div className={styles.specRow}>
                        <dt>Typical pricing</dt>
                        <dd>{c.pricing}</dd>
                      </div>
                    )}
                    {c.strengths && (
                      <div className={styles.specRow}>
                        <dt>Strengths</dt>
                        <dd>{c.strengths}</dd>
                      </div>
                    )}
                    {c.weaknesses && (
                      <div className={styles.specRow}>
                        <dt>Watch-outs</dt>
                        <dd>{c.weaknesses}</dd>
                      </div>
                    )}
                  </dl>

                  {c.whyStandOut && (
                    <p className={styles.why}>
                      <strong>Why they stand out — </strong>
                      {c.whyStandOut}
                    </p>
                  )}

                  <Link href="/free-consultation" className={styles.companyCta}>
                    Request a proposal
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {post.faq?.length > 0 && (
        <FAQ
          id="faq"
          variant="embedded"
          items={post.faq.map((f) => ({
            question: f.q,
            answer: renderMarkdown(f.a),
          }))}
          title="Frequently asked questions"
          showEyebrow={false}
          showCta={false}
        />
      )}

      {post.closing && (
        <div className={styles.prose}>{renderMarkdown(post.closing)}</div>
      )}

      <div className={styles.author}>
        <span className={styles.authorAvatar} aria-hidden="true">
          {initial(post.author)}
        </span>
        <div className={styles.authorText}>
          <span className={styles.authorLabel}>Written by</span>
          <span className={styles.authorName}>{post.author}</span>
        </div>
        <Link href="/free-consultation" className={styles.authorLink}>
          Get expert advice
        </Link>
      </div>
    </>
  );

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {itemListSchema && <JsonLd data={itemListSchema} />}
      <ReadingProgress />

      {/* ===== Hero ===== */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.crumbs}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.category },
              ]}
            />
          </div>
          <span className={styles.kicker}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.dek}>{post.excerpt}</p>
          <div className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true">
              {initial(post.author)}
            </span>
            <div className={styles.bylineText}>
              <span className={styles.bylineName}>{post.author}</span>
              <span className={styles.bylineMeta}>
                {dateText} <span className={styles.dot} aria-hidden="true" /> {readingTime} min read
              </span>
            </div>
          </div>
        </div>

        <figure className={styles.heroFigure}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1240px"
            className={styles.heroImg}
          />
        </figure>
      </header>

      {/* ===== Body ===== */}
      {hasRanking ? (
        <div className={styles.article}>
          <aside className={styles.toc}>
            <span className={styles.tocLabel}>In this guide</span>
            <nav className={styles.tocNav}>
              {post.comparisonTable && (
                <a href="#at-a-glance" className={styles.tocLink}>
                  At a glance
                </a>
              )}
              {post.companies.map((c) => (
                <a key={c.rank} href={`#company-${c.rank}`} className={styles.tocLink}>
                  <span className={styles.tocRank}>#{c.rank}</span>
                  {c.name}
                </a>
              ))}
              {post.faq?.length > 0 && (
                <a href="#faq" className={styles.tocLink}>
                  FAQ
                </a>
              )}
            </nav>
            <div className={styles.tocCta}>
              <span className={styles.tocCtaTitle}>Need help choosing?</span>
              <p className={styles.tocCtaText}>
                Get matched with vetted call center partners — free.
              </p>
              <Link href="/free-consultation" className={styles.tocCtaBtn}>
                Free consultation
              </Link>
            </div>
          </aside>
          <div className={styles.main}>{body}</div>
        </div>
      ) : (
        <div className={styles.articleSimple}>
          <div className={styles.mainSimple}>{body}</div>
        </div>
      )}

      {/* ===== CTA band ===== */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            <span className={styles.ctaTitleLine}>Not sure which provider fits?</span>
            <span className={styles.ctaTitleLine}>We will match you.</span>
          </h2>
          <p className={styles.ctaCopy}>
            Our brokerage service is free. Tell us your needs and get matched with
            vetted call center partners in days.
          </p>
          <Button href="/free-consultation" size="lg">
            Get your free consultation
          </Button>
        </div>
      </section>

      {/* ===== Related ===== */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHead}>
              <h2 className={styles.relatedHeading}>Keep reading</h2>
              <Link href="/blog" className={styles.relatedAll}>
                All articles
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <article key={r.slug} className={styles.relatedCard}>
                  <Link href={`/blog/${r.slug}`} className={styles.relatedLink}>
                    <div className={styles.relatedFigure}>
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className={styles.relatedImg}
                      />
                    </div>
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedCategory}>{r.category}</span>
                      <h3 className={styles.relatedTitle}>{r.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
