'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileMenu.module.css';

export default function MobileMenu({
  isOpen,
  onClose,
  services = [],
  industries = [],
  navLinks = [],
}) {
  const [expandedSection, setExpandedSection] = useState(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedSection(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Focus management: move focus in on open, trap Tab, close on Escape,
     and restore focus to the trigger on close. */
  useEffect(() => {
    if (!isOpen) return;

    if (typeof document === 'undefined') return;

    // Remember what was focused so we can restore it when the menu closes.
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

    // Move focus to the close button (or first focusable) once the panel mounts.
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

      // Keep focus inside the panel.
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
      // Restore focus to the element that opened the menu (e.g. the hamburger).
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === 'function') {
        previous.focus();
      }
    };
  }, [isOpen, onClose]);

  const toggleSection = useCallback((section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  }, []);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const getSubLinks = (key) => {
    if (key === 'services') return services;
    if (key === 'industries') return industries;
    return [];
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel Header */}
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

        {/* Nav Links */}
        <nav className={styles.nav} aria-label="Mobile navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.navItem}>
                {link.dropdown ? (
                  <>
                    <button
                      className={styles.accordionTrigger}
                      onClick={() => toggleSection(link.dropdown)}
                      aria-expanded={expandedSection === link.dropdown}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`${styles.accordionChevron} ${
                          expandedSection === link.dropdown
                            ? styles.accordionChevronOpen
                            : ''
                        }`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className={`${styles.accordionContent} ${
                        expandedSection === link.dropdown
                          ? styles.accordionContentOpen
                          : ''
                      }`}
                    >
                      <div className={styles.subLinks}>
                        <Link
                          href={link.href}
                          className={styles.viewAllLink}
                          onClick={handleLinkClick}
                        >
                          View All {link.label}
                        </Link>
                        {getSubLinks(link.dropdown).map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={styles.subLink}
                            onClick={handleLinkClick}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
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
