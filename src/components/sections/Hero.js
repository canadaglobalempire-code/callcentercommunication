'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import TrustBar from './TrustBar';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.blob} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Thinking About Outsourcing?</span>
          <h1 className={styles.title}>
            The World&apos;s Premiere Call Center{' '}
            <span className={styles.highlight}>Outsourcing Brokerage</span>
          </h1>
          <p className={styles.subtitle}>
            Connect with vetted call center providers for inbound, outbound, BPO, and multilingual services. Tell us about your call center outsourcing needs and we&apos;ll match you with the right partner — completely <strong>FREE</strong>. Get matched in days, not weeks.
          </p>
          <p className={styles.regions}>ONSHORE &mdash; NEARSHORE &mdash; OFFSHORE</p>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              href="/free-consultation"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              }
              iconPosition="left"
            >
              Find a Call Center
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#about"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/cc-agent-smile.jpg"
              alt="Smiling call center agent wearing a headset"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          </div>

          <div className={styles.floatCard}>
            <span className={styles.floatIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <div>
              <span className={styles.floatTitle}>Vetted &amp; Trusted</span>
              <span className={styles.floatText}>Matched in days, not weeks</span>
            </div>
          </div>

          <div className={styles.floatPill}>
            <span className={styles.pulse} aria-hidden="true" />
            24/7/365 Service
          </div>
        </div>
      </div>

      <div className={styles.trustWrapper}>
        <div className={styles.trustInner}>
          <TrustBar />
        </div>
      </div>
    </section>
  );
}
