import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { blogPosts } from '@/data/blogPosts';
import { caseStudies } from '@/data/caseStudies';
import { siteConfig } from '@/data/siteConfig';

const BASE_URL = siteConfig.url.replace(/\/$/, '');

/**
 * Dynamic XML sitemap — served at /sitemap.xml
 * Stays in sync with the data files: add a service/industry/post/case study
 * and it automatically appears here.
 */
export default function sitemap() {
  const lastModified = new Date();

  // Static, hand-curated pages with intentional priorities.
  const staticRoutes = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/industries', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-consultation', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/24-7-call-center-services', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/medical-answering-service', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/case-studies', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ].map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Detail pages generated from the data layer.
  const collection = (items, prefix, changeFrequency, priority) =>
    items.map((item) => ({
      url: `${BASE_URL}${prefix}/${item.slug}`,
      lastModified,
      changeFrequency,
      priority,
    }));

  return [
    ...staticRoutes,
    ...collection(services, '/services', 'monthly', 0.8),
    ...collection(industries, '/industries', 'monthly', 0.8),
    ...collection(caseStudies, '/case-studies', 'monthly', 0.6),
    ...collection(blogPosts, '/blog', 'monthly', 0.6),
  ];
}
