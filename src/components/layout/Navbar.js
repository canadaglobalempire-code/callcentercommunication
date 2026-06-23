'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

const services = [
  { label: 'Automated Services', href: '/services/interactive-automated-services', desc: 'IVR, AI avatars & omnichannel platforms', icon: 'automated' },
  { label: 'BPO Services', href: '/services/business-process-outsourcing', desc: 'Back-office processing & data management', icon: 'bpo' },
  { label: 'Inbound Call Center', href: '/services/inbound-call-center-services', desc: 'Customer support, order processing & helpdesk', icon: 'inbound' },
  { label: 'Multilingual Agents', href: '/services/multilingual-call-center-services', desc: 'Support in 30+ languages worldwide', icon: 'multilingual' },
  { label: 'Outbound Call Center', href: '/services/outbound-call-center-services', desc: 'Lead generation, sales & appointment setting', icon: 'outbound' },
  { label: 'Reporting', href: '/services/responsiveness-reporting', desc: 'Real-time analytics & account management', icon: 'reporting' },
];

const industries = [
  { label: 'Airlines', href: '/industries/airlines-call-center-services' },
  { label: 'Automotive', href: '/industries/automotive-call-center-services' },
  { label: 'Banking', href: '/industries/banking-call-center-services' },
  { label: 'Cable & Media', href: '/industries/cable-media-call-center-services' },
  { label: 'Disaster & Emergency', href: '/industries/disaster-call-center-services' },
  { label: 'Ecommerce', href: '/industries/ecommerce-call-center-services' },
  { label: 'Energy', href: '/industries/energy-call-center-services' },
  { label: 'Government', href: '/industries/government-call-center-services' },
  { label: 'Healthcare', href: '/industries/healthcare-call-center-services' },
  { label: 'Insurance', href: '/industries/insurance-call-center-services' },
  { label: 'Real Estate', href: '/industries/real-estate-call-center-services' },
  { label: 'Retail', href: '/industries/retail-call-center-services' },
  { label: 'Technology', href: '/industries/technology-call-center-services' },
  { label: 'Telecommunications', href: '/industries/telecommunications-call-center-services' },
  { label: 'Travel', href: '/industries/travel-call-center-services' },
];

const serviceIcons = {
  inbound: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/><path d="M14.5 2v6"/><path d="M11.5 5l3 3 3-3"/></svg>,
  outbound: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/><path d="M14.5 8V2"/><path d="M11.5 5l3-3 3 3"/></svg>,
  bpo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>,
  automated: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="16" r="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  reporting: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 17V13"/><path d="M12 17V9"/><path d="M17 17V5"/></svg>,
  multilingual: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', dropdown: 'services' },
  { label: 'Industries', href: '/industries', dropdown: 'industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function MegaPanelHeader({ title, viewAllHref, onClose }) {
  return (
    <div className={styles.megaTopBar}>
      <h2 className={styles.megaPanelTitle}>{title}</h2>
      <div className={styles.megaTopActions}>
        <Link href={viewAllHref} className={styles.megaViewAll} onClick={onClose}>
          View all {title.toLowerCase()}
          {arrowIcon}
        </Link>
        <button type="button" className={styles.megaClose} onClick={onClose} aria-label={`Close ${title} menu`}>
          {closeIcon}
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const shellRef = useRef(null);
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);
  const megaCloseTimerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(72);

  const isMegaOpen = openDropdown !== null;

  const clearMegaCloseTimer = useCallback(() => {
    if (megaCloseTimerRef.current) {
      clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  }, []);

  const closeMega = useCallback(() => {
    clearMegaCloseTimer();
    setOpenDropdown(null);
  }, [clearMegaCloseTimer]);

  const showDropdown = useCallback((key) => {
    clearMegaCloseTimer();
    setOpenDropdown(key);
  }, [clearMegaCloseTimer]);

  const scheduleMegaClose = useCallback(() => {
    clearMegaCloseTimer();
    megaCloseTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 280);
  }, [clearMegaCloseTimer]);

  const toggleDropdown = useCallback((key) => {
    clearMegaCloseTimer();
    setOpenDropdown((current) => (current === key ? null : key));
  }, [clearMegaCloseTimer]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: '-50px 0px 0px 0px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const header = headerRef.current;
    if (!header) return undefined;

    const updateHeaderHeight = () => {
      setHeaderHeight(header.offsetHeight);
    };

    updateHeaderHeight();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateHeaderHeight)
        : null;

    resizeObserver?.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (!isMegaOpen) return undefined;

    const handleClickOutside = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) {
        closeMega();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMega();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMegaOpen, closeMega]);

  useEffect(() => () => clearMegaCloseTimer(), [clearMegaCloseTimer]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const headerClasses = [
    styles.header,
    scrolled ? styles.scrolled : styles.transparent,
    isMegaOpen ? styles.headerMegaOpen : '',
  ].join(' ');

  const panelStyle = {
    top: headerHeight,
    maxHeight: `calc(100vh - ${headerHeight}px)`,
  };

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
        }}
      />

      <div className={styles.headerShell} ref={shellRef}>
        <header className={headerClasses} ref={headerRef}>
          <div className={styles.container}>
            <Link href="/" className={styles.logoLink} aria-label="Home">
              <Image
                src="/images/logo.png"
                alt="Call Center Communications"
                width={180}
                height={48}
                priority
                className={styles.logoImg}
              />
            </Link>

            <nav className={styles.nav} aria-label="Main navigation">
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li
                    key={link.label}
                    className={styles.navItem}
                    onMouseEnter={link.dropdown ? () => showDropdown(link.dropdown) : undefined}
                    onMouseLeave={link.dropdown ? scheduleMegaClose : undefined}
                  >
                    {link.dropdown ? (
                      <button
                        type="button"
                        className={`${styles.navTrigger} ${
                          openDropdown === link.dropdown ? styles.navTriggerOpen : ''
                        }`}
                        aria-expanded={openDropdown === link.dropdown}
                        aria-controls={`mega-menu-${link.dropdown}`}
                        onClick={() => toggleDropdown(link.dropdown)}
                      >
                        {link.label}
                        <svg
                          className={`${styles.chevron} ${
                            openDropdown === link.dropdown ? styles.chevronOpen : ''
                          }`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link href={link.href} className={styles.navLink} onClick={closeMega}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.actions}>
              <Link href="/free-consultation" className={styles.ctaButton} onClick={closeMega}>
                Free Consultation
                <svg
                  className={styles.ctaIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <button
              className={styles.hamburger}
              onClick={toggleMobile}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </header>

        {isMegaOpen && (
          <button
            type="button"
            className={styles.megaBackdrop}
            aria-label="Close menu"
            onClick={closeMega}
            onMouseEnter={clearMegaCloseTimer}
            onMouseLeave={scheduleMegaClose}
          />
        )}

        <div
          id="mega-menu-services"
          className={`${styles.megaPanel} ${openDropdown === 'services' ? styles.megaPanelOpen : ''}`}
          role="region"
          aria-label="Services menu"
          aria-hidden={openDropdown !== 'services'}
          onMouseEnter={clearMegaCloseTimer}
          onMouseLeave={scheduleMegaClose}
          style={panelStyle}
        >
          <div className={styles.megaPanelContainer}>
            <MegaPanelHeader title="Services" viewAllHref="/services" onClose={closeMega} />
            <div className={styles.megaBody}>
              <div className={styles.megaMain}>
                <div className={styles.megaServicesGrid}>
                  {services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.megaServiceCard}
                      onClick={closeMega}
                    >
                      <span className={styles.megaServiceIcon}>
                        {serviceIcons[item.icon]}
                      </span>
                      <span className={styles.megaServiceText}>
                        <span className={styles.megaServiceName}>{item.label}</span>
                        <span className={styles.megaServiceDesc}>{item.desc}</span>
                      </span>
                      <svg className={styles.megaCardArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
              <aside className={styles.megaAside}>
                <p className={styles.megaAsideEyebrow}>Free advisory</p>
                <h3 className={styles.megaAsideTitle}>Not sure which service fits?</h3>
                <p className={styles.megaAsideText}>
                  Tell us your needs and we&rsquo;ll match you with vetted providers — at no cost.
                </p>
                <Link href="/free-consultation" className={styles.megaAsideCta} onClick={closeMega}>
                  Get free consultation
                </Link>
              </aside>
            </div>
          </div>
        </div>

        <div
          id="mega-menu-industries"
          className={`${styles.megaPanel} ${openDropdown === 'industries' ? styles.megaPanelOpen : ''}`}
          role="region"
          aria-label="Industries menu"
          aria-hidden={openDropdown !== 'industries'}
          onMouseEnter={clearMegaCloseTimer}
          onMouseLeave={scheduleMegaClose}
          style={panelStyle}
        >
          <div className={styles.megaPanelContainer}>
            <MegaPanelHeader title="Industries" viewAllHref="/industries" onClose={closeMega} />
            <div className={styles.megaBody}>
              <div className={styles.megaMain}>
                <div className={styles.megaIndustriesGrid}>
                  {industries.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.megaIndustryLink}
                      onClick={closeMega}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <aside className={styles.megaAside}>
                <p className={styles.megaAsideEyebrow}>Industry expertise</p>
                <h3 className={styles.megaAsideTitle}>Don&rsquo;t see your industry?</h3>
                <p className={styles.megaAsideText}>
                  We work across 14+ sectors. Our team can find specialists for your niche.
                </p>
                <Link href="/contact" className={styles.megaAsideCta} onClick={closeMega}>
                  Talk to an expert
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        services={services}
        industries={industries}
        navLinks={navLinks}
      />
    </>
  );
}
