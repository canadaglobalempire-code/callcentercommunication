import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import styles from './ServicesGrid.module.css';

export default function ServicesGrid() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title={<>Complete call center <span className="kw">solutions</span></>}
          subtitle="Tailored services to handle every customer conversation, end to end."
        />
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.slug} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className={styles.learnMore}
                >
                  Learn More <span className={styles.arrow}>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Not sure which service is right for you?</p>
          <Button variant="primary" href="/free-consultation">
            Talk to a Specialist
          </Button>
        </div>
      </div>
    </section>
  );
}
