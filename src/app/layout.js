import { Geist } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/data/siteConfig';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata = {
  title: {
    default: 'Call Center Brokerage | Free Outsourcing Provider Matching Service',
    template: '%s | Call Center Communications'
  },
  description: 'Leading call center brokerage connecting businesses with vetted call center providers. Free matching service for inbound, outbound, BPO, & multilingual support. Get matched in days with pre-screened partners.',
  metadataBase: new URL('https://callcentercommunications.com'),
  openGraph: {
    siteName: 'Call Center Communications',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Call Center Communications',
  url: 'https://callcentercommunications.com',
  description: siteConfig.description,
  foundingDate: siteConfig.founded,
  ...(siteConfig.email ? { email: siteConfig.email } : {}),
  sameAs: Object.values(siteConfig.social).filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <JsonLd data={organizationSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
