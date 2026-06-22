const SITE_NAME = 'Call Center Communications';
const SITE_URL = 'https://callcentercommunications.com';

export function generateMetadata({ title, description, path = '', ogImage }) {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
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
