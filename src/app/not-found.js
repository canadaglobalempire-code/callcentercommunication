import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './not-found.module.css';

export default function NotFound() {
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </div>
      <h1 className={styles.heading}>Page Not Found</h1>
      <p className={styles.text}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" size="lg">
        Return Home
      </Button>
      <Link href="/contact" style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>
        Contact Us
      </Link>
    </div>
  );
}
