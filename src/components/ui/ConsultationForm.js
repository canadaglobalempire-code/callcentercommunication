'use client';

import { useState } from 'react';
import styles from './ConsultationForm.module.css';

const initialFormData = {
  name: '',
  email: '',
  company: '',
  website: '',
  phone: '',
  needs: '',
};

function validateForm(data) {
  const errors = {};

  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.company.trim()) errors.company = 'Company name is required.';

  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[\d\s()+-]{7,20}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!data.needs.trim()) errors.needs = 'Please describe your needs.';

  return errors;
}

export default function ConsultationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
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
        body: JSON.stringify({ ...formData, formType: 'consultation' }),
      });

      const result = await res.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Unable to submit the form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.form}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className={styles.successTitle}>Request Received!</h3>
          <p className={styles.successText}>
            Thank you for your interest. We will reach out within one business day
            to schedule your free consultation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.formTitle}>Request Your Free Consultation</h3>
      <p className={styles.formSubtitle}>
        Fill in your details and we will be in touch shortly.
      </p>

      {serverError && <div className={styles.formError}>{serverError}</div>}

      <div className={styles.field}>
        <label htmlFor="cons-name" className={styles.label}>
          Name<span className={styles.required}>*</span>
        </label>
        <input
          id="cons-name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cons-email" className={styles.label}>
          Email<span className={styles.required}>*</span>
        </label>
        <input
          id="cons-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
        />
        {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cons-company" className={styles.label}>
          Company<span className={styles.required}>*</span>
        </label>
        <input
          id="cons-company"
          name="company"
          type="text"
          className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
        />
        {errors.company && <p className={styles.errorMsg}>{errors.company}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cons-website" className={styles.label}>
          Website <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="cons-website"
          name="website"
          type="text"
          className={`${styles.input} ${errors.website ? styles.inputError : ''}`}
          value={formData.website}
          onChange={handleChange}
          placeholder="yourcompany.com"
        />
        {errors.website && <p className={styles.errorMsg}>{errors.website}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cons-phone" className={styles.label}>
          Phone<span className={styles.required}>*</span>
        </label>
        <input
          id="cons-phone"
          name="phone"
          type="tel"
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cons-needs" className={styles.label}>
          Brief Description of Your Needs
          <span className={styles.required}>*</span>
        </label>
        <textarea
          id="cons-needs"
          name="needs"
          className={`${styles.textarea} ${errors.needs ? styles.inputError : ''}`}
          value={formData.needs}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us what you are looking for in a call center partner"
        />
        {errors.needs && <p className={styles.errorMsg}>{errors.needs}</p>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} />
            Submitting...
          </>
        ) : (
          <>
            Get My Free Consultation
            <svg className={styles.submitIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
