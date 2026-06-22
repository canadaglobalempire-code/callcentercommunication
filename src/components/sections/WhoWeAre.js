import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './WhoWeAre.module.css';

const SERVICES = [
  'Lead Generation',
  'Inbound & Outbound Sales',
  'Customer Service',
  'Help Desk & Technical Support',
  'Order Taking & Processing',
  'Collections & Telemarketing',
  'Back Office Processing',
  '24/7/365 Coverage',
];

const STATS = [
  { value: '200+', label: 'Vetted Providers' },
  { value: '14', label: 'Industries Served' },
  { value: '100%', label: 'Free Service' },
];

function Check() {
  return (
    <span className={styles.check} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export default function WhoWeAre() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.headingWrap}>
              <SectionHeading
                align="left"
                eyebrow="About Us"
                title={<>Nearly 30 years connecting businesses with the <span className="kw">right call center partners</span></>}
                subtitle="We're a brokerage — not a provider. Our only goal is matching you with vetted partners at the best price, with honest advice you can trust."
              />
            </div>

            <ul className={styles.servicesList}>
              {SERVICES.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" href="/about">
              Learn More About Us
            </Button>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/about-us.jpg"
              alt="Call Center Communications advisory team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
