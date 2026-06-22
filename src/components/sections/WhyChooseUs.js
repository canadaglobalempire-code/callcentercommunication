import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './WhyChooseUs.module.css';

const features = [
  {
    title: '100% Free Service',
    description:
      'No cost, no commission, no hidden fees. Our brokerage service is completely free.',
  },
  {
    title: '30 Years of Expertise',
    description:
      'Founded by former BPO executives who know the industry inside and out.',
  },
  {
    title: 'PCI-Compliant Providers Only',
    description:
      'Every partner meets the highest security and compliance standards.',
  },
  {
    title: 'Omnichannel & AI-Ready',
    description:
      'Modern solutions across voice, chat, email, social, and AI.',
  },
  {
    title: 'Unbiased Matching',
    description:
      'We’re a brokerage, not a provider. Our only goal is finding your best fit.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/team-collaboration.jpg"
              alt="Call Center Communications team collaborating to find the best provider match"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.heading}>
              Why companies trust us to find their partner
            </h2>
            <div className={styles.features}>
              {features.map((feature) => (
                <div key={feature.title} className={styles.featureItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3 4.3l-6.8 6.8L3 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className={styles.featureText}>
                    <span className={styles.featureTitle}>{feature.title}</span>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" href="/about">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
