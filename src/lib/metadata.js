const SITE_NAME = 'Call Center Communications';
const SITE_URL = 'https://callcentercommunications.com';

/* The default share image. A page that names its own ogImage uses that instead;
   without this a page that builds its own openGraph block would silently drop
   og:image, because Next replaces the object rather than merging into it. */
export const DEFAULT_OG_IMAGE = '/images/call-center-team.jpg';

export function generateMetadata({ title, description, path = '', ogImage }) {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: image, width: 1600, height: 1066 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
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
