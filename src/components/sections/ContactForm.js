'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

const SERVICE_OPTIONS = [
  'Inbound Call Center',
  'Outbound Call Center',
  'Business Process Outsourcing (BPO)',
  'Multilingual Support',
  'Automated/IVR Services',
  'Technical Support',
  'Customer Service',
  'Other / Not Sure',
];

const VOLUME_OPTIONS = [
  'Less than 1,000 calls/month',
  '1,000 - 5,000 calls/month',
  '5,000 - 10,000 calls/month',
  '10,000 - 25,000 calls/month',
  '25,000 - 50,000 calls/month',
  '50,000+ calls/month',
  'Not Sure Yet',
];

const HIGHLIGHTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Fast Matching',
    description: 'Get matched with providers within days, not weeks',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
    title: 'Pre-Vetted Partners',
    description: 'PCI-compliant, thoroughly vetted providers only',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Always Free for Clients',
    description: 'Providers pay our fee, so you never do',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Unbiased, Honest Advice',
    description: "We're a brokerage, not a provider — your best fit is our only goal",
  },
];

const PROCESS = [
  'Tell us your needs — call volume, services, languages, and budget.',
  'We match you with vetted providers that fit your exact criteria.',
  'You compare, choose, and launch — with our guidance the whole way.',
];

const INITIAL_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  website: '',
  serviceType: '',
  callVolume: '',
  message: '',
};

function validateForm(data) {
  const errors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required.';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!data.email.trim()) {
    errors.email = 'Work email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.company.trim()) errors.company = 'Company is required.';
  if (!data.website.trim()) errors.website = 'Website is required.';
  if (!data.serviceType) errors.serviceType = 'Please select a service.';
  if (!data.callVolume) errors.callVolume = 'Please select a call volume.';
  return errors;
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'lead' }),
      });
      const result = await res.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setServerError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Unable to submit the form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.successState}>
            <div className={styles.successIconWrapper}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h2 className={styles.successTitle}>Thank You!</h2>
            <p className={styles.successText}>
              Your request has been submitted. One of our experts will contact you within 24-48 hours to discuss your call center outsourcing needs.
            </p>
            <button
              className={styles.newRequestBtn}
              onClick={() => {
                setIsSubmitted(false);
                setErrors({});
                setServerError('');
                setFormData(INITIAL_DATA);
              }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.decorativeBlob} />

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Side - Content */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Contact Us</span>
            <h2 className={styles.heading}>Talk to an Expert</h2>
            <p className={styles.lede}>
              We will contact you to arrange your free consultation with a Call Center Communications
              expert regarding your call center and telemarketing outsourcing needs.
            </p>

            <div className={styles.highlights}>
              {HIGHLIGHTS.map((item, index) => (
                <div key={index} className={styles.highlightCard}>
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <div className={styles.highlightContent}>
                    <span className={styles.highlightTitle}>{item.title}</span>
                    <span className={styles.highlightDescription}>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.process}>
              <span className={styles.processLabel}>What happens next</span>
              <ol className={styles.processList}>
                {PROCESS.map((step, index) => (
                  <li key={index} className={styles.processItem}>
                    <span className={styles.processNumber}>{index + 1}</span>
                    <span className={styles.processText}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.trustBadge}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span>Your information is secure and never shared with third parties</span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {serverError && (
                <p className={styles.formError} role="alert">
                  {serverError}
                </p>
              )}
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="firstName" className={styles.formLabel}>
                    First name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`${styles.formInput} ${errors.firstName ? styles.inputError : ''}`}
                    placeholder="e.g. Maria"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
                </div>

                <div className={styles.formField}>
                  <label htmlFor="lastName" className={styles.formLabel}>
                    Last name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`${styles.formInput} ${errors.lastName ? styles.inputError : ''}`}
                    placeholder="e.g. Whitfield"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="email" className={styles.formLabel}>
                  Work email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="company" className={styles.formLabel}>
                    Company <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={`${styles.formInput} ${errors.company ? styles.inputError : ''}`}
                    placeholder="e.g. Brightline Logistics"
                    value={formData.company}
                    onChange={handleChange}
                    aria-invalid={!!errors.company}
                  />
                  {errors.company && <p className={styles.errorMsg}>{errors.company}</p>}
                </div>

                <div className={styles.formField}>
                  <label htmlFor="website" className={styles.formLabel}>
                    Website<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    className={`${styles.formInput} ${errors.website ? styles.inputError : ''}`}
                    placeholder="yourcompany.com"
                    value={formData.website}
                    onChange={handleChange}
                    aria-invalid={!!errors.website}
                  />
                  {errors.website && <p className={styles.errorMsg}>{errors.website}</p>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="serviceType" className={styles.formLabel}>
                    Service type <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    className={`${styles.formSelect} ${errors.serviceType ? styles.inputError : ''}`}
                    value={formData.serviceType}
                    onChange={handleChange}
                    aria-invalid={!!errors.serviceType}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && <p className={styles.errorMsg}>{errors.serviceType}</p>}
                </div>

                <div className={styles.formField}>
                  <label htmlFor="callVolume" className={styles.formLabel}>
                    Monthly call volume <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="callVolume"
                    name="callVolume"
                    className={`${styles.formSelect} ${errors.callVolume ? styles.inputError : ''}`}
                    value={formData.callVolume}
                    onChange={handleChange}
                    aria-invalid={!!errors.callVolume}
                  >
                    <option value="">Select volume</option>
                    {VOLUME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.callVolume && <p className={styles.errorMsg}>{errors.callVolume}</p>}
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="message" className={styles.formLabel}>
                  Tell us more <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.formTextarea}
                  placeholder="Industries, languages, timelines, anything you'd like us to know..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Talk to an Expert
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <p className={styles.disclaimer}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <span className={styles.disclaimerText}>
                  We&apos;ll never share your details. By submitting, you agree to our{' '}
                  <a href="/privacy-policy" className={styles.link}>privacy&nbsp;policy</a>.
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
