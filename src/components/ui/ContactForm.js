'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

const CALL_PURPOSE_OPTIONS = [
  'Sales',
  'Appointment Setting',
  'Lead Generation',
  'Market Research',
  'Customer Service',
  'Customer Retention',
  'Database Update',
  'Other',
];

const AGENT_COUNT_OPTIONS = ['5-25', '25-50', '50-100', '100+'];

const initialFormData = {
  companyName: '',
  name: '',
  title: '',
  phone: '',
  email: '',
  website: '',
  callDirection: '',
  callLength: '',
  productService: '',
  monthlyCallVolume: '',
  callPurpose: '',
  agentCount: '',
};

function validateForm(data) {
  const errors = {};

  if (!data.companyName.trim()) errors.companyName = 'Company name is required.';
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.title.trim()) errors.title = 'Title is required.';

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[\d\s()+-]{7,20}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.website.trim()) errors.website = 'Website is required.';
  if (!data.callLength.trim()) errors.callLength = 'Anticipated call length is required.';
  if (!data.productService.trim()) errors.productService = 'This field is required.';
  if (!data.monthlyCallVolume.trim()) errors.monthlyCallVolume = 'Monthly call estimate is required.';

  return errors;
}

export default function ContactForm() {
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
        body: JSON.stringify({ ...formData, formType: 'contact' }),
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
          <h3 className={styles.successTitle}>Thank You!</h3>
          <p className={styles.successText}>
            Your message has been received. A member of our team will contact you
            shortly to discuss your call center needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.formTitle}>Tell Us About Your Needs</h2>
      <p className={styles.formSubtitle}>
        Fill out the form below and we will get back to you with a customized
        outsourcing solution.
      </p>

      {serverError && <div className={styles.formError}>{serverError}</div>}

      {/* Row: Company / Name */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="companyName" className={styles.label}>
            Company Name<span className={styles.required}>*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your company name"
          />
          {errors.companyName && <p className={styles.errorMsg}>{errors.companyName}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name<span className={styles.required}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        </div>
      </div>

      {/* Row: Title / Phone */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            Title<span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            value={formData.title}
            onChange={handleChange}
            placeholder="Your job title"
          />
          {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number<span className={styles.required}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
        </div>
      </div>

      {/* Row: Email / Website */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email Address<span className={styles.required}>*</span>
          </label>
          <input
            id="email"
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
          <label htmlFor="website" className={styles.label}>
            Website<span className={styles.required}>*</span>
          </label>
          <input
            id="website"
            name="website"
            type="text"
            className={`${styles.input} ${errors.website ? styles.inputError : ''}`}
            value={formData.website}
            onChange={handleChange}
            placeholder="yourcompany.com"
          />
          {errors.website && <p className={styles.errorMsg}>{errors.website}</p>}
        </div>
      </div>

      {/* Call Direction */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          Does your program require inbound calls, outbound calls, or both?
        </legend>
        <div className={styles.radioGroup}>
          {['Inbound', 'Outbound', 'Both'].map((option) => (
            <label
              key={option}
              className={`${styles.radioLabel} ${formData.callDirection === option ? styles.radioLabelChecked : ''}`}
            >
              <input
                type="radio"
                name="callDirection"
                value={option}
                checked={formData.callDirection === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Call Length */}
      <div className={styles.field}>
        <label htmlFor="callLength" className={styles.label}>
          What is the anticipated length of the call (in minutes)?
          <span className={styles.required}>*</span>
        </label>
        <input
          id="callLength"
          name="callLength"
          type="text"
          className={`${styles.input} ${errors.callLength ? styles.inputError : ''}`}
          value={formData.callLength}
          onChange={handleChange}
          placeholder="e.g., 5-10 minutes"
        />
        {errors.callLength && <p className={styles.errorMsg}>{errors.callLength}</p>}
      </div>

      {/* Product / Service */}
      <div className={styles.field}>
        <label htmlFor="productService" className={styles.label}>
          What product or service do you provide to your customers?
          <span className={styles.required}>*</span>
        </label>
        <textarea
          id="productService"
          name="productService"
          className={`${styles.textarea} ${errors.productService ? styles.inputError : ''}`}
          value={formData.productService}
          onChange={handleChange}
          rows={3}
          placeholder="Describe your product or service"
        />
        {errors.productService && (
          <p className={styles.errorMsg}>{errors.productService}</p>
        )}
      </div>

      {/* Row: Monthly Volume / Call Purpose */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="monthlyCallVolume" className={styles.label}>
            Estimated inbound/outbound calls per month?
            <span className={styles.required}>*</span>
          </label>
          <input
            id="monthlyCallVolume"
            name="monthlyCallVolume"
            type="text"
            className={`${styles.input} ${errors.monthlyCallVolume ? styles.inputError : ''}`}
            value={formData.monthlyCallVolume}
            onChange={handleChange}
            placeholder="e.g., 5,000"
          />
          {errors.monthlyCallVolume && (
            <p className={styles.errorMsg}>{errors.monthlyCallVolume}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="callPurpose" className={styles.label}>
            What is the purpose of the call?
          </label>
          <select
            id="callPurpose"
            name="callPurpose"
            className={styles.select}
            value={formData.callPurpose}
            onChange={handleChange}
          >
            <option value="">Select a purpose</option>
            {CALL_PURPOSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Agent Count */}
      <div className={styles.field}>
        <label htmlFor="agentCount" className={styles.label}>
          How many call center agents do you require?
        </label>
        <select
          id="agentCount"
          name="agentCount"
          className={styles.select}
          value={formData.agentCount}
          onChange={handleChange}
        >
          <option value="">Select a range</option>
          {AGENT_COUNT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} />
            Submitting...
          </>
        ) : (
          <>
            Submit Your Request
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
