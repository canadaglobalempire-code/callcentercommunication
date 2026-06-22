import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './PopularLocations.module.css';

const locations = [
  { name: 'Philippines', image: '/images/agents-working.jpg', agents: '150K+' },
  { name: 'United States', image: '/images/america.jpg', agents: '200K+' },
  { name: 'India', image: '/images/agents-team-row.jpg', agents: '300K+' },
  { name: 'Mexico', image: '/images/cc-team-collab.jpg', agents: '80K+' },
  { name: 'Colombia', image: '/images/cc-diverse-team.jpg', agents: '60K+' },
  { name: 'South Africa', image: '/images/cc-team-desk.jpg', agents: '45K+' },
  { name: 'Canada', image: '/images/cc-team-huddle.jpg', agents: '50K+' },
  { name: 'Jamaica', image: '/images/cc-support-team.jpg', agents: '25K+' },
  { name: 'Puerto Rico', image: '/images/cc-team-meeting.jpg', agents: '20K+' },
];

export default function PopularLocations() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="Popular Outsourcing Locations"
          subtitle="We connect you with top call center providers across the globe"
        />
        <div className={styles.grid}>
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href="/free-consultation"
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={loc.image}
                  alt={`Call center agents in ${loc.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{loc.name}</h3>
                <span className={styles.cardMeta}>{loc.agents} agents available</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
