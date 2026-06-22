import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { industries } from '@/data/industries';
import { services } from '@/data/services';
import CtaBanner from '@/components/sections/CtaBanner';
import styles from './page.module.css';

/* Qualitative capability highlights per industry — no invented metrics. */
const industryHighlights = {
  healthcare: ['HIPAA-aware workflows', 'Trusted by leading providers', 'Around-the-clock patient support'],
  banking: ['Redundant, secure infrastructure', 'PCI-DSS compliant partners', 'Faster account servicing'],
  insurance: ['Licensed agent capacity', 'Strong first-call resolution', 'Streamlined claims handling'],
  telecommunications: ['Proven churn reduction', 'High-volume call handling', 'Reliable network support'],
  retail: ['Revenue-focused support teams', 'Cart recovery expertise', 'Around-the-clock shopping support'],
  ecommerce: ['High customer satisfaction', 'Multilingual support available', 'Cost-efficient scaling'],
  technology: ['Tier 1 through Tier 3 coverage', 'Strong CSAT track record', 'Lower support overhead'],
  automotive: ['Lead-conversion expertise', 'Rapid response times', 'Around-the-clock dealer support'],
  airlines: ['High-volume call capacity', 'Multilingual agents available', 'Around-the-clock flight support'],
  travel: ['Accurate booking handling', 'Multilingual support available', 'Cost-efficient scaling'],
  government: ['US-based agents available', 'FedRAMP-compliant partners', 'Around-the-clock citizen support'],
  energy: ['High service availability', 'Cost-efficient operations', 'Around-the-clock outage response'],
  'cable-media': ['Faster issue resolution', 'Cost-efficient scaling', 'Around-the-clock subscriber support'],
  disaster: ['Surge agent capacity', 'Rapid deployment', 'Around-the-clock crisis response'],
};

/* ── Static params for all 14 industries ── */

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

/* ── Dynamic metadata ── */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};

  // SEO-optimized titles for key industries
  const seoTitles = {
    healthcare: 'Healthcare Call Center Services | Medical Answering & Patient Support',
    banking: 'Banking Call Center Services | Financial Customer Support Solutions',
    insurance: 'Insurance Call Center Services | Claims & Policyholder Support',
    telecommunications: 'Telecommunications Call Center | Telecom Customer Support',
    retail: 'Retail Call Center Services | Customer Care & Order Taking',
    ecommerce: 'Ecommerce Call Center Services | Online Store Customer Support',
    technology: 'Technical Support Outsourcing | Software & SaaS Customer Service',
    government: 'Government Call Center Services | Citizen Engagement Solutions',
    energy: 'Energy & Utilities Call Center | Utility Customer Support',
    travel: 'Travel & Hospitality Call Center | Booking & Guest Services',
  };

  const title = seoTitles[slug.replace('-call-center-services', '')] || `${industry.title} Call Center Solutions | Call Center Communications`;

  return {
    title,
    description: `${industry.shortDescription} ${industry.tagline}. Connect with vetted call center providers specializing in ${industry.title} operations.`,
    openGraph: {
      title,
      description: `${industry.shortDescription} ${industry.tagline}.`,
      url: `https://callcentercommunications.com/industries/${slug}`,
      siteName: 'Call Center Communications',
      type: 'website',
    },
    alternates: {
      canonical: `https://callcentercommunications.com/industries/${slug}`,
    },
  };
}

/* ── Inline SVG icons ── */

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Page component ── */

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  /* Related services filtered by slug */
  const relatedServices = services.filter((s) =>
    industry.relatedServices.includes(s.slug)
  );

  const otherIndustries = industries
    .filter((i) => i.slug !== slug)
    .sort((a, b) => {
      const order = ['healthcare', 'banking', 'insurance', 'retail', 'ecommerce', 'technology', 'automotive', 'telecommunications', 'airlines', 'travel', 'government', 'energy', 'cable-media', 'disaster'];
      const base = (s) => s.replace('-call-center-services', '');
      return order.indexOf(base(a.slug)) - order.indexOf(base(b.slug));
    })
    .slice(0, 4);

  /* Qualitative highlights for the "Did You Know?" band */
  const highlights = industryHighlights[slug.replace('-call-center-services', '')] || [
    'Pre-vetted, compliant providers',
    'Around-the-clock coverage available',
    'Cost-efficient scaling',
  ];

  const faqItems = [
    { question: `What call center services does Call Center Communications offer for the ${industry.title} industry?`, answer: `We connect ${industry.title.toLowerCase()} companies with pre-vetted call center providers specializing in ${industry.title.toLowerCase()} support — including customer service, technical support, order processing, and more. Our matching service is 100% free.` },
    { question: 'How quickly can you match me with a provider?', answer: 'Most businesses receive qualified provider matches within 7-10 days of their initial consultation. Our 30+ years of industry relationships allow us to move quickly.' },
    { question: 'Is there any cost to use your service?', answer: 'No. Call Center Communications is completely free for businesses seeking call center services. We earn revenue through partnerships with providers in our network.' },
    { question: 'What locations do your providers cover?', answer: 'Our network spans onshore (US/Canada), nearshore (Latin America), and offshore (Asia, Europe, Africa). We help you determine the best location strategy for your budget and quality requirements.' },
    { question: `Are your ${industry.title.toLowerCase()} providers compliant and secure?`, answer: `Yes. Every provider we recommend is pre-vetted for the compliance and data-security standards the ${industry.title.toLowerCase()} sector requires — including PCI-DSS where applicable, redundant infrastructure, and documented quality-assurance processes.` },
    { question: 'Can you scale support up or down as our needs change?', answer: 'Absolutely. Our partners build flexible staffing models so you can ramp up for seasonal peaks, product launches, or growth — and scale back during quieter periods, without the cost and risk of hiring in-house.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.title} Call Center Solutions`,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: 'Call Center Communications',
    },
    areaServed: 'Worldwide',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ── a) Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <div className={styles.heroBreadcrumbs}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Industries', href: '/industries' },
                  { label: industry.title },
                ]}
              />
            </div>
            <span className={styles.heroBadge}>Industry Expertise</span>
            <h1 className={styles.heroTitle}>
              {industry.title} Call Center Solutions
            </h1>
            <p className={styles.heroTagline}>{industry.tagline}</p>
            <Button variant="primary" size="lg" href="/free-consultation">
              Get Your Free Consultation
            </Button>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <Image
                src={industry.image}
                alt={industry.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.heroFloatCard}>
              <span className={styles.heroFloatIcon} aria-hidden="true">
                <CheckIcon />
              </span>
              <div>
                <span className={styles.heroFloatTitle}>Industry Specialists</span>
                <span className={styles.heroFloatText}>Vetted for your sector</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── b) Challenges ── */}
      <section className={styles.challenges}>
        <div className={styles.challengesContainer}>
          <SectionHeading
            title={`Challenges in the ${industry.title} Industry`}
            subtitle="The obstacles that make expert call center support essential"
          />
          <div className={styles.challengesGrid}>
            {industry.challenges.map((challenge, idx) => (
              <div key={idx} className={styles.challengeCard}>
                <div className={styles.challengeIcon}>
                  <WarningIcon />
                </div>
                <p className={styles.challengeText}>{challenge}</p>
              </div>
            ))}
          </div>
          <p className={styles.challengeNote}>
            These challenges demand a call center partner with deep{' '}
            {industry.title.toLowerCase()} expertise, proven processes, and the
            ability to scale with your business. That is exactly what Call Center
            Communications delivers.
          </p>
        </div>
      </section>

      {/* ── c) Solutions ── */}
      <section className={styles.solutions}>
        <div className={styles.solutionsContainer}>
          <SectionHeading
            title={`How We Help ${industry.title} Companies`}
            subtitle="Proven solutions tailored to your industry's unique requirements"
          />
          <div className={styles.solutionsGrid}>
            {industry.solutions.map((solution, idx) => (
              <div key={idx} className={styles.solutionCard}>
                <div className={styles.solutionIcon}>
                  <CheckIcon />
                </div>
                <span className={styles.solutionText}>{solution}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── d) Related Services ── */}
      {relatedServices.length > 0 && (
        <section className={styles.services}>
          <div className={styles.servicesContainer}>
            <SectionHeading
              title={`Services for the ${industry.title} Industry`}
              subtitle="Explore the call center services most relevant to your sector"
            />
            <div className={styles.servicesGrid}>
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceImageWrapper}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>
                      {service.shortDescription}
                    </p>
                    <span className={styles.serviceLink}>
                      Learn More <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── e) Highlights ── */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <p className={styles.statsLabel}>What Sets Our {industry.title} Partners Apart</p>
          <div className={styles.statsGrid}>
            {highlights.map((highlight, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statIcon} aria-hidden="true">
                  <CheckIcon />
                </span>
                <p className={styles.statDesc}>{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── f) FAQ ── */}
      <section className={styles.faq}>
        <div className={styles.faqContainer}>
          <SectionHeading
            title={`${industry.title} Call Center FAQ`}
            subtitle="Common questions about call center services for your industry"
          />
          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── g) CTA Banner ── */}
      <CtaBanner
        title={`Ready to Transform Your ${industry.title} Customer Experience?`}
        text={`Schedule your free consultation today. No commitment, no cost — just expert guidance tailored to the ${industry.title.toLowerCase()} industry.`}
        buttonText="Get Your Free Consultation"
      />

      {/* ── g) Related Industries ── */}
      <section className={styles.related}>
        <div className={styles.relatedContainer}>
          <SectionHeading
            title="Explore Other Industries"
            subtitle="Discover how we support businesses across every sector"
          />
          <div className={styles.relatedGrid}>
            {otherIndustries.map((other) => (
              <Link
                key={other.slug}
                href={`/industries/${other.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImageWrapper}>
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className={styles.relatedImage}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <h3 className={styles.relatedTitle}>{other.title}</h3>
                  <p className={styles.relatedTagline}>{other.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
