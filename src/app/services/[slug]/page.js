import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import IndustryCarousel from '@/components/ui/IndustryCarousel';
import CtaBanner from '@/components/sections/CtaBanner';
import FAQ from '@/components/sections/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

/* ===== Static Params ===== */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ===== Dynamic Metadata ===== */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return genMeta({
    title: service.seoTitle || service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

/* ===== Service Icons ===== */
const serviceIcons = {
  inbound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      <path d="M14.5 2v6" />
      <path d="M11.5 5l3 3 3-3" />
    </svg>
  ),
  outbound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      <path d="M14.5 8V2" />
      <path d="M11.5 5l3-3 3 3" />
    </svg>
  ),
  bpo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <circle cx="12" cy="15" r="2" />
      <path d="M9.5 15a2.5 2.5 0 0 1 5 0" />
    </svg>
  ),
  automated: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="9" cy="16" r="1" />
      <circle cx="15" cy="16" r="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <path d="M12 2v2" />
      <path d="M7 4l1.5 1.5" />
      <path d="M17 4l-1.5 1.5" />
    </svg>
  ),
  reporting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 17V13" />
      <path d="M12 17V9" />
      <path d="M17 17V7" />
    </svg>
  ),
  multilingual: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2Z" />
      <path d="M18 18l2 2" />
      <path d="M20 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    </svg>
  ),
};

/* ===== Industry Icons ===== */
const industryIcons = {
  healthcare: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  banking: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 7l9-4 9 4" />
      <path d="M8 11v4" />
      <path d="M12 11v4" />
      <path d="M16 11v4" />
    </svg>
  ),
  insurance: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
  telecommunications: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  ),
  retail: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2Z" />
    </svg>
  ),
  technology: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  ),
  automotive: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  airlines: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h5" />
      <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-4" />
      <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />
      <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" />
    </svg>
  ),
  government: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
      <line x1="2" y1="18" x2="22" y2="18" />
    </svg>
  ),
  energy: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  'cable-media': (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  disaster: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

/* ===== Benefit Icons ===== */
const benefitIcons = [
  <svg key="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
    <path d="M12 6v8" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
];

/* ===== Overview Content ===== */
const overviewContent = {
  inbound: [
    'Inbound call center services form the backbone of customer-facing operations for businesses of every size. When a customer picks up the phone, sends a chat message, or reaches out on social media, that moment is your chance to build trust and loyalty. The providers in our network understand that every inbound interaction is an opportunity — not just to resolve an issue, but to strengthen the relationship between your brand and your customer.',
    'Our vetted inbound partners bring deep expertise in high-volume environments where quality cannot be compromised. From 24/7 technical support desks staffed by certified professionals to dedicated retail order processing teams trained on your product catalog, these providers operate as a true extension of your brand. They bring the infrastructure, the talent, and the operational expertise while you retain full control over service standards and customer outcomes.',
    'Whether you need omnichannel coverage spanning phone, email, live chat, text, and social media, or specialized support for a single high-priority channel, Call Center Communications matches you with providers whose capabilities and culture align with your business goals.',
  ],
  outbound: [
    'Outbound call center operations drive proactive customer engagement that directly impacts your bottom line. Unlike inbound services that respond to customer-initiated contact, outbound campaigns reach customers and prospects on your terms — generating leads, closing sales, recovering revenue, and gathering market intelligence.',
    'The outbound specialists in our network bring deep expertise in B2B and B2C sales environments, with agents trained in consultative selling, objection handling, and compliance-first practices. Whether you need appointment setters filling your sales team\'s calendar, fundraising professionals engaging donors, or collections agents recovering outstanding accounts, we match you with providers whose track record speaks for itself.',
    'Every outbound campaign is built on data-driven strategy. Our partners leverage advanced dialing technology, CRM integrations, and real-time analytics to optimize contact rates, conversion metrics, and campaign ROI. With rigorous quality assurance programs and full regulatory compliance, you can scale outbound operations with confidence.',
  ],
  bpo: [
    'Business Process Outsourcing liberates your organization from the operational weight of repetitive, labor-intensive back-office tasks. When your team is buried in data entry, document processing, or content moderation, they are not focused on the core activities that drive your business forward. BPO changes that equation.',
    'Call Center Communications connects you with BPO providers who combine human expertise with technology-driven workflows. Whether you need thousands of invoices processed daily, multilingual document translations delivered on deadline, or vast datasets cleansed and standardized for analytics, our vetted partners maintain the accuracy and throughput your business demands. Every provider operates under strict quality control protocols with built-in audit trails.',
    'Modern BPO goes far beyond basic data entry. Our partners deliver sophisticated services including image sorting and classification, form processing with intelligent data extraction, content moderation across text and visual media, and document format conversion. With scalable staffing models and secure data handling practices, you can outsource with confidence.',
  ],
  automated: [
    'Interactive and automated services modernize customer engagement at scale. By combining intelligent IVR systems, AI-powered avatars, and unified omnichannel platforms, businesses can resolve routine inquiries instantly while directing complex issues to live agents who have the full context they need.',
    'The providers in our network are at the forefront of contact center automation. From sophisticated IVR systems that handle common requests without agent intervention to avatar-based lead generation tools that engage website visitors around the clock, these solutions multiply your capacity without multiplying your headcount.',
    'Omnichannel customer support ties every channel together into a unified experience. Customers move between phone, email, chat, SMS, and social media without repeating themselves, and agents see the full interaction history in one view. The result is faster resolution times, higher satisfaction scores, and significantly lower cost per contact.',
  ],
  reporting: [
    'Visibility into your outsourced operations is not a luxury — it is a necessity. Without real-time data and responsive account management, even the best call center partnership can drift off course. Responsiveness and reporting services ensure you always know exactly how your programs are performing.',
    'Call Center Communications prioritizes providers who deliver transparency at every level. From daily campaign tracking reports to granular performance metrics on individual agents, you receive the data you need to make informed decisions. Real-time analytics platforms give you live visibility into call volumes, handle times, conversion rates, and dozens of other KPIs that matter to your business.',
    'Beyond the data, high-touch account management means you always have a responsive partner who understands your goals. Dedicated account managers conduct regular performance reviews, recommend optimization strategies, and ensure your programs continuously improve. When you need answers, you get them fast.',
  ],
  multilingual: [
    'In a global marketplace, language barriers are not just inconvenient — they are expensive. Every customer who cannot get help in their preferred language is a loyalty risk, a missed sale, or a negative review waiting to happen. Multilingual call center support removes that barrier entirely.',
    'Call Center Communications connects you with providers staffed by professionally trained multilingual agents across dozens of languages. From Spanish and French to Mandarin, Arabic, Portuguese, and beyond, our partners recruit native and near-native speakers who combine language fluency with deep product knowledge and customer service expertise. Cultural sensitivity training ensures agents navigate regional customs and communication styles with ease.',
    'Whether you need full multilingual support around the clock or targeted language capabilities for specific markets and campaigns, our providers build flexible staffing models to match your requirements. Multilingual agents support inbound and outbound programs alike — from customer care to technical support to sales campaigns conducted in-language for higher response rates.',
  ],
};

/* ===== Short names for headings ===== */
const shortNames = {
  inbound: 'Inbound Services',
  outbound: 'Outbound Services',
  bpo: 'BPO',
  automated: 'Automation',
  reporting: 'Reporting',
  multilingual: 'Multilingual Support',
};

/* Map the keyword URL slug back to the short content key used by the
   icon/overview/shortName lookups above. */
const SERVICE_KEY = {
  'inbound-call-center-services': 'inbound',
  'outbound-call-center-services': 'outbound',
  'business-process-outsourcing': 'bpo',
  'interactive-automated-services': 'automated',
  'responsiveness-reporting': 'reporting',
  'multilingual-call-center-services': 'multilingual',
};
const svcKey = (s) => SERVICE_KEY[s] || s;
const indKey = (s) => s.replace('-call-center-services', '');

/* ===== FAQ generator ===== */
function buildFaqs(service, shortName) {
  const topFeatures = service.features.slice(0, 4).join(', ');
  return [
    {
      question: `What does ${service.title} include?`,
      answer: `${service.shortDescription} Our vetted partners deliver capabilities such as ${topFeatures}, and more — tailored to your specific volume and requirements.`,
    },
    {
      question: `How much does it cost to outsource ${shortName}?`,
      answer:
        'Our matching service is 100% free to companies that have a need. Provider pricing varies by location, volume, and complexity — onshore, nearshore, and offshore options each carry different rates. We help you compare quotes so you get the best service for the best price.',
    },
    {
      question: `How do you vet ${shortName} providers?`,
      answer:
        'Every provider in our network is pre-vetted for compliance, infrastructure, quality-assurance processes, and proven track record before we ever recommend them. We only match you with partners we would trust ourselves.',
    },
    {
      question: `Can I scale ${shortName} up or down?`,
      answer:
        'Yes. Our partners build flexible staffing models so you can ramp up for seasonal peaks or product launches and scale back during slower periods — without the cost and risk of hiring in-house.',
    },
    {
      question: 'How quickly can I get started?',
      answer:
        'Most businesses receive qualified provider matches within days of their initial consultation. Tell us about your needs and we move quickly while still ensuring the right fit.',
    },
    {
      question: `What locations do your ${shortName} providers cover?`,
      answer:
        'Our network spans onshore (USA/Canada), nearshore (Latin America), and offshore (Asia, Europe, Africa). We help you choose the location strategy that best balances your budget, time zones, and quality requirements.',
    },
  ];
}

/* ===== Page Component ===== */
export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedIndustries = industries.filter((ind) =>
    service.relatedIndustries.includes(ind.slug)
  );

  // Related industries first, then the rest — shown in a carousel.
  const carouselIndustries = [
    ...relatedIndustries,
    ...industries.filter(
      (ind) => !service.relatedIndustries.includes(ind.slug)
    ),
  ].map((ind) => ({
    slug: ind.slug,
    title: ind.title,
    icon: industryIcons[indKey(ind.slug)],
  }));

  const otherServices = services.filter((s) => s.slug !== slug);

  const shortName = shortNames[svcKey(slug)] || service.title;
  const faqs = buildFaqs(service, shortName);

  const processSteps = [
    {
      title: 'Tell us your needs',
      text: `Share your goals, volume, and requirements for ${shortName.toLowerCase()}. It takes just a few minutes.`,
    },
    {
      title: 'We match you',
      text: 'We hand-pick pre-vetted providers from our global network that fit your budget, location, and quality standards.',
    },
    {
      title: 'Compare & choose',
      text: 'Review curated matches, compare quotes, and choose the partner you trust — with our guidance at every step.',
    },
  ];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Call Center Communications',
    },
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <div className={styles.heroBreadcrumbs}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: service.title },
                ]}
              />
            </div>
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeIcon}>
                {serviceIcons[svcKey(slug)]}
              </span>
              Call Center Service
            </span>
            <h1 className={styles.heroTitle}>{service.title}</h1>
            <p className={styles.heroDescription}>{service.shortDescription}</p>
            <ul className={styles.heroBullets}>
              {[
                'Hand-matched to pre-vetted, compliant providers',
                '100% free — no cost and no obligation to you',
                'Onshore, nearshore & offshore options matched in days',
              ].map((point) => (
                <li key={point}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <Button href="/free-consultation" size="lg">
                Get a Free Quote
              </Button>
              <a href="#whats-included" className={styles.heroTextLink}>
                See what&apos;s included
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.heroFloatCard}>
              <span className={styles.heroFloatIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <span className={styles.heroFloatTitle}>Pre-Vetted Providers</span>
                <span className={styles.heroFloatText}>Matched in days, not weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Overview ===== */}
      <section className={styles.overview}>
        <div className={styles.overviewContainer}>
          <div className={styles.overviewMain}>
            <span className={styles.eyebrow}>Overview</span>
            <h2 className={styles.overviewTitle}>About {service.title}</h2>
            <div className={styles.overviewContent}>
              {(overviewContent[svcKey(slug)] || service.description.split('\n\n')).map(
                (paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                )
              )}
            </div>
          </div>

          <aside className={styles.overviewAside}>
            <div className={styles.asideCard}>
              <h3 className={styles.asideTitle}>Key Capabilities</h3>
              <ul className={styles.asideList}>
                {service.features.slice(0, 6).map((feature) => (
                  <li key={feature}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="/free-consultation" size="sm" className={styles.asideCta}>
                Get Matched Free
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Features Grid ===== */}
      <section id="whats-included" className={styles.features}>
        <div className={styles.featuresContainer}>
          <SectionHeading
            eyebrow="What's Included"
            title="Capabilities Built for Your Operation"
            subtitle={`Everything our ${shortName} providers deliver — as a dedicated extension of your team.`}
          />
          <div className={styles.featuresGrid}>
            {service.features.map((feature) => (
              <div key={feature} className={styles.featureItem}>
                <span className={styles.featureCheck}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={styles.featureName}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <section className={styles.benefits}>
        <div className={styles.benefitsContainer}>
          <SectionHeading
            eyebrow="The Payoff"
            title={`Why Outsource ${shortName}?`}
            subtitle="Measurable advantages that outsourcing delivers for your organization."
          />
          <div className={styles.benefitsGrid}>
            {service.benefits.map((benefit, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  {benefitIcons[i % benefitIcons.length]}
                </div>
                <p className={styles.benefitText}>{benefit}</p>
                <span className={styles.benefitNumber} aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Split: How We Match You ===== */}
      <section className={styles.process}>
        <div className={styles.processContainer}>
          <div className={styles.processImageWrapper}>
            <Image
              src={service.processImage || '/images/cc-discussion.jpg'}
              alt="Call Center Communications advisory team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.processImage}
            />
          </div>
          <div className={styles.processText}>
            <span className={styles.eyebrow}>How It Works</span>
            <h2 className={styles.processTitle}>
              How We Match You With the Right Provider
            </h2>
            <p className={styles.processLede}>
              We&apos;re a free brokerage built by former BPO executives. Instead of
              guessing, you get matched with vetted {shortName.toLowerCase()} providers
              who fit your exact needs — fast.
            </p>
            <ol className={styles.steps}>
              {processSteps.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <div>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span className={styles.stepText}>{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <Button href="/free-consultation">Get Matched Free</Button>
          </div>
        </div>
      </section>

      {/* ===== Industries (carousel) ===== */}
      <section className={styles.industries}>
        <div className={styles.industriesContainer}>
          <SectionHeading
            eyebrow="Who We Serve"
            title={`Industries That Use ${service.title}`}
            subtitle="We serve businesses across every sector — slide through to find yours."
          />
          <IndustryCarousel items={carouselIndustries} />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ
        items={faqs}
        title={`${service.title} FAQs`}
        subtitle={`Common questions about outsourcing ${shortName.toLowerCase()} with Call Center Communications.`}
        showCta={false}
      />

      {/* ===== Custom CTA ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaPattern} aria-hidden="true" />
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>
            Need {service.title}? Let&apos;s Find Your Perfect Provider.
          </h2>
          <p className={styles.ctaText}>
            Schedule your free consultation today. We&apos;ll match you with
            vetted providers who specialize in exactly what you need.
          </p>
          <Button
            variant="secondary"
            size="lg"
            href="/free-consultation"
            className={styles.ctaButton}
          >
            Get Your Free Consultation
          </Button>
        </div>
      </section>

      {/* ===== Related Services ===== */}
      <section className={styles.relatedServices}>
        <div className={styles.relatedContainer}>
          <SectionHeading
            eyebrow="Keep Exploring"
            title="Our Other Services"
            subtitle="Comprehensive solutions across every aspect of call center operations."
          />
          <div className={styles.relatedGrid}>
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedIcon}>
                  {serviceIcons[svcKey(s.slug)]}
                </div>
                <span className={styles.relatedName}>{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
