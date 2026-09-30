const SITE_NAME = 'Call Center Communications';
const SITE_URL = 'https://callcentercommunications.com';

export function generateMetadata({ title, description, path = '', ogImage }) {
  const url = `${SITE_URL}${path}`;
  // Preserve the owner's published ranked-company pages exactly.
  const protectedPage = !path || path === '/' || /\/(?:top-\d+|best-)[^/]*$/.test(path);
  const descriptions = {
    '/blog': 'Expert insights on call center outsourcing, BPO strategy and customer experience. Read practical guidance from Call Center Communications.',
    '/case-studies': 'Explore call center outsourcing case studies showing improvements in customer service, cost savings and operational efficiency.',
    '/free-consultation': 'Get a free call center consultation from industry veterans. No cost or obligation: expert guidance to find your outsourcing partner.',
    '/industries': 'Compare specialized call center providers for healthcare, banking, technology, government and more. Find a partner suited to your customers.',
    '/industries/government-call-center-services': 'Accessible citizen engagement for government agencies. Compare vetted call center providers for public inquiries, outreach and support.',
    '/services': 'Compare inbound, outbound, BPO, automation, reporting and multilingual call center services. Get free matching with vetted providers.',
    '/services/inbound-call-center-services': 'Compare inbound call center providers for customer support, order handling and overflow coverage. Free matching based on your volume and needs.',
    '/24-7-call-center-services': 'Compare 24/7 call center services for live customer support, after-hours calls and overflow coverage. Find a provider for continuous availability.',
    '/medical-answering-service': 'Compare medical answering services for HIPAA-compliant healthcare support, appointment scheduling and patient communication, available 24/7.',
  };
  const titles = {
    '/services/outbound-call-center-services': 'Outbound Call Center Services: Lead Generation and Sales',
    '/services/responsiveness-reporting': 'Call Center Reporting and Performance Analytics',
    '/blog/onshore-nearshore-offshore-call-centers': 'Onshore vs Nearshore vs Offshore Call Centers (2026)',
  };
  Object.assign(titles, {
    '/industries/banking-call-center-services': 'Banking Call Center Services: Financial Customer Support',
    '/industries/ecommerce-call-center-services': 'Ecommerce Call Center Services: Online Store Support',
    '/industries/government-call-center-services': 'Government Call Center Services: Citizen Support',
    '/industries/healthcare-call-center-services': 'Healthcare Call Center Services and Medical Answering',
    '/industries/insurance-call-center-services': 'Insurance Call Center Services: Claims and Policy Support',
    '/industries/technology-call-center-services': 'Technical Support Outsourcing for Software and SaaS',
    '/case-studies/ecommerce-seasonal-scaling-success': 'Ecommerce Holiday Scaling with Outsourced Support',
    '/case-studies/financial-services-compliance-excellence': 'Financial Services Compliance Outsourcing Case Study',
    '/case-studies/healthcare-patient-support-transformation': 'Healthcare Patient Support Outsourcing Case Study',
    '/medical-answering-service': 'Medical Answering Service: HIPAA-Compliant Call Support',
  });
  const conciseTitle = titles[path] ?? title;
  const brandedTitle = `${conciseTitle} | ${SITE_NAME}`;
  const pageTitle = protectedPage ? title : (brandedTitle.length <= 60 ? brandedTitle : conciseTitle);
  const pageDescription = protectedPage ? description : (descriptions[path] ?? description);
  const socialTitle = protectedPage ? `${title} | ${SITE_NAME}` : pageTitle;
  const image = protectedPage ? ogImage : (ogImage || '/images/cc-agent-pro.jpg');

  return {
    title: protectedPage ? title : { absolute: pageTitle },
    description: pageDescription,
    openGraph: {
      title: socialTitle,
      description: pageDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: 'summary_large_image',
      ...(!protectedPage && { images: [image] }),
      title: socialTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
