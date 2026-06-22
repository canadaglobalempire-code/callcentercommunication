import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
import styles from './Footer.module.css';

const services = [
  { label: 'Inbound Call Center', href: '/services/inbound-call-center-services' },
  { label: 'Outbound Call Center', href: '/services/outbound-call-center-services' },
  { label: 'BPO Services', href: '/services/business-process-outsourcing' },
  { label: 'Automated Services', href: '/services/interactive-automated-services' },
  { label: 'Reporting', href: '/services/responsiveness-reporting' },
  { label: 'Multilingual Agents', href: '/services/multilingual-call-center-services' },
];

const industries = [
  { label: 'Healthcare', href: '/industries/healthcare-call-center-services' },
  { label: 'Banking', href: '/industries/banking-call-center-services' },
  { label: 'Insurance', href: '/industries/insurance-call-center-services' },
  { label: 'Telecommunications', href: '/industries/telecommunications-call-center-services' },
  { label: 'Retail', href: '/industries/retail-call-center-services' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Free Consultation', href: '/free-consultation' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const SOCIAL_META = {
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  twitter: {
    label: 'Twitter',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  facebook: {
    label: 'Facebook',
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
};

export default function Footer() {
  const socialLinks = Object.entries(siteConfig.social)
    .filter(([key, url]) => url && SOCIAL_META[key])
    .map(([key, url]) => ({ key, url, ...SOCIAL_META[key] }));

  return (
    <footer className={styles.footer}>
      {/* Main Columns */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLogo}>
              <Image
                src="/images/logo.png"
                alt="Call Center Communications"
                width={180}
                height={48}
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.tagline}>
              The World&rsquo;s Premiere Call Center Outsourcing Brokerage.
              Connecting businesses with vetted contact center providers since
              1996.
            </p>
            {/* Social Icons — only rendered when a real URL is configured */}
            {socialLinks.length > 0 && (
              <div className={styles.social}>
                {socialLinks.map((social) => (
                  <a
                    key={social.key}
                    href={social.url}
                    className={styles.socialIcon}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <ul className={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <ul className={styles.linkList}>
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Industries</h4>
            <ul className={styles.linkList}>
              {industries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/industries"
                  className={`${styles.footerLink} ${styles.viewAll}`}
                >
                  View All Industries
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.container}>
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; 2026 Call Center Communications. All Rights Reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <span className={styles.legalSep}>|</span>
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
