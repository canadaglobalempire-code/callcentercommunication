import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blogPosts';
import styles from './BlogPreview.module.css';

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="Latest Insights"
          subtitle="Expert perspectives on call center outsourcing, customer experience, and industry trends."
        />

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <Link
                href={`/blog/${post.slug}`}
                className={styles.imageLink}
                aria-hidden="true"
                tabIndex={-1}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className={styles.image}
                  />
                </div>
              </Link>
              <div className={styles.body}>
                <span className={styles.category}>{post.category}</span>
                <h3 className={styles.title}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <time className={styles.date} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllLink}>
            View All Posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
