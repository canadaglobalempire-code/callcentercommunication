'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TrustBar.module.css';

const DEFAULT_STATS = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Clients Served' },
  { value: 200, suffix: '+', label: 'Vetted Providers' },
  { value: 14, suffix: '', label: 'Industries Covered' },
];

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function TrustBar({ stats = DEFAULT_STATS, standalone = false }) {
  const barRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounts();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function animateCounts() {
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setCounts(stats.map((stat) => Math.round(eased * stat.value)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const classes = [styles.trustBar, standalone ? styles.standalone : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={barRef} className={classes}>
      {stats.map((stat, i) => (
        <div key={stat.label} className={styles.stat}>
          <div className={styles.value}>
            {counts[i]}
            {stat.suffix}
          </div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
