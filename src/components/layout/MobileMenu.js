'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileMenu.module.css';

const DROPDOWN_TABS = [
  { key: 'services', label: 'Services', href: '/services' },
  { key: 'industries', label: 'Industries', href: '/industries' },
];

export default function MobileMenu({
  isOpen,
  onClose,
  services = [],
  industries = [],
  navLinks = [],
}) {
  const [activeTab, setActiveTab] = useState('services');
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const regularLinks = navLinks.filter((link) => !link.dropdown);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (typeof document === 'undefined') return;

    previousFocusRef.current = document.activeElement;
    const panel = panelRef.current;

    const getFocusable = () => {
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    };

    const focusTimer = window.setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else {
        const focusable = getFocusable();
        if (focusable.length > 0) focusable[0].focus();
      }
    }, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (panel && !panel.contains(activeEl)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey) {
        if (activeEl === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === 'function') {
        previous.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const activeTabMeta = DROPDOWN_TABS.find((tab) => tab.key === activeTab);
  const activeLinks = activeTab === 'services' ? services : industries;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.panelHeader}>
          <Link href="/" onClick={handleLinkClick} className={styles.logoLink}>
            <Image
              src="/images/logo.png"
              alt="Call Center Communications"
              width={160}
              height={42}
              className={styles.logoImg}
            />
          </Link>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.nav} aria-label="Mobile navigation">
          <ul className={styles.navList}>
            {regularLinks.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.tabSection}>
            <div className={styles.tabList} role="tablist" aria-label="Browse by category">
              {DROPDOWN_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`mobile-tab-${tab.key}`}
                  aria-selected={activeTab === tab.key}
                  aria-controls={`mobile-panel-${tab.key}`}
                  className={`${styles.tabButton} ${
                    activeTab === tab.key ? styles.tabButtonActive : ''
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id={`mobile-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`mobile-tab-${activeTab}`}
              className={styles.tabPanel}
            >
              <Link
                href={activeTabMeta?.href || '/'}
                className={styles.viewAllLink}
                onClick={handleLinkClick}
              >
                View all {activeTabMeta?.label.toLowerCase()}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <div className={styles.subLinks}>
                {activeLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={styles.subLink}
                    onClick={handleLinkClick}
                  >
                    <span className={styles.subLinkLabel}>{sub.label}</span>
                    {sub.desc ? (
                      <span className={styles.subLinkDesc}>{sub.desc}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.panelFooter}>
          <Link
            href="/free-consultation"
            className={styles.ctaButton}
            onClick={handleLinkClick}
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
