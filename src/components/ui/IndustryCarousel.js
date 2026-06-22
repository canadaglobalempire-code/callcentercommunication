'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './IndustryCarousel.module.css';

export default function IndustryCarousel({ items }) {
  const trackRef = useRef(null);

  const scrollByDir = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => scrollByDir(-1)}
        aria-label="Previous industries"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className={styles.track} ref={trackRef}>
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/industries/${item.slug}`}
            className={styles.card}
          >
            <div className={styles.icon}>{item.icon}</div>
            <span className={styles.name}>{item.title}</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => scrollByDir(1)}
        aria-label="Next industries"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
