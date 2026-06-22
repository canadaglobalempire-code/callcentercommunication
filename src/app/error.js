'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h1 className={styles.heading}>Something Went Wrong</h1>
      <p className={styles.text}>
        We&apos;re sorry, an unexpected error occurred.
      </p>
      <Button onClick={() => reset()} size="lg">
        Try Again
      </Button>
      <Link href="/" style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>
        Return Home
      </Link>
    </div>
  );
}
