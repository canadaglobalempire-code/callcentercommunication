import Button from '@/components/ui/Button';
import styles from './CtaBanner.module.css';

export default function CtaBanner({
  title = 'Ready to Find Your Ideal Call Center Partner?',
  text = 'Tell us about your needs and we’ll match you with a vetted contact center provider. This service is 100% free to companies that have a need.',
  buttonText = 'Find a Call Center',
  buttonHref = '/free-consultation',
}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.content}>
          <span className={styles.eyebrow}>ONSHORE &mdash; NEARSHORE &mdash; OFFSHORE</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              href={buttonHref}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
