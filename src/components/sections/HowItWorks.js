import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    number: '01',
    title: 'Tell Us Your Needs',
    description:
      'Share your requirements, call volume, and business goals. We\'ll design a custom matching strategy.',
  },
  {
    number: '02',
    title: 'Get Matched with Providers',
    description:
      'We search our vetted network and introduce you to qualified call center partners that fit your criteria.',
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description:
      'Your new team integrates with your business. We stay available to ensure everything runs smoothly.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <h2 className={styles.heading}>
              Three steps to your
              <br />
              <span className="kw">ideal partner</span>
            </h2>
            <p className={styles.subtext}>
              Our process is free, fast, and designed to find you the right call center partner — not just any partner.
            </p>

            <div className={styles.steps}>
              {STEPS.map((step, i) => (
                <div key={step.number} className={styles.step}>
                  <div className={styles.numberColumn}>
                    <span className={styles.number}>{step.number}</span>
                    {i < STEPS.length - 1 && <span className={styles.connector} aria-hidden="true" />}
                  </div>
                  <div className={styles.stepText}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" href="/free-consultation">
              Start Your Free Consultation
            </Button>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/hd-office-team.jpg"
              alt="Professional call center team working in a modern office environment"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
