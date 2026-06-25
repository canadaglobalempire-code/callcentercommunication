import { siteConfig } from '@/data/siteConfig';

const BASE_URL = siteConfig.url.replace(/\/$/, '');

/**
 * robots.txt — served at /robots.txt
 * Allows crawling of the whole site, blocks API routes, and points
 * crawlers to the sitemap.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
