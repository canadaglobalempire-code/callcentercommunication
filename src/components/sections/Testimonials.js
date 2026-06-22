'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.css';

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={styles.ratingStar}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  function scrollToCard(index) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
  }

  function move(dir) {
    const next = Math.min(
      Math.max(active + dir, 0),
      testimonials.length - 1
    );
    setActive(next);
    scrollToCard(next);
  }

  // Keep the active dot in sync when the user scrolls/swipes manually,
  // using an IntersectionObserver scoped to the carousel track.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>Testimonials</span>
            <h2 className={styles.heading}>What our <span className="kw">clients</span> say about us</h2>
            <p className={styles.subtitle}>
              See what our clients say about working with Call Center
              Communications to find their perfect call center partner.
            </p>
            <div className={styles.ratingSummary}>
              <span className={styles.ratingLabel}>What clients say</span>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => move(-1)}
              disabled={active === 0}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => move(1)}
              disabled={active === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.track} ref={trackRef}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card}>
              <div className={styles.rating} aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">
                  {t.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{t.author}</div>
                  <div className={styles.authorRole}>{t.title}</div>
                  <div className={styles.authorCompany}>{t.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => {
                setActive(i);
                scrollToCard(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-selected={i === active}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
