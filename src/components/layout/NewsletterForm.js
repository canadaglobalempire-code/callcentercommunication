'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), formType: 'newsletter' }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setMessage('Thanks — you are on the list.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to subscribe right now. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <p className={styles.newsletterSuccess} role="status">
        {message}
      </p>
    );
  }

  return (
    <div className={styles.newsletterFormWrap}>
      <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.newsletterInput}
          aria-label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
        />
        <button
          type="submit"
          className={styles.newsletterButton}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          <svg
            className={styles.newsletterIcon}
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
        </button>
      </form>
      {status === 'error' && (
        <p className={styles.newsletterError} role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
