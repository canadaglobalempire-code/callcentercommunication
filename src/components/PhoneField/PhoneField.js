'use client';

import { useState } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY } from './countries';
import { normaliseDial, isValidDial, countryForDial, combinePhone } from './dial';
import styles from './PhoneField.module.css';

const DEFAULT_DIAL = COUNTRIES.find((c) => c.iso2 === DEFAULT_COUNTRY)?.dial || '+1';

// [flag][typeable dial code][chevron] joined to a tel input. An invisible native <select>
// covers the left group under the dial input: flag/chevron clicks open the list, the middle
// edits the code. Emits one combined value, e.g. "+14035551234", through
// onChange({ target: { name, value } }) so it plugs into the forms' existing handleChange.
export default function PhoneField({
  id,
  name = 'phone',
  onChange,
  inputClassName = '',
  invalid = false,
  placeholder = '(555) 123-4567',
  errorId,
}) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY); // '' when the typed code is unknown
  const [dial, setDial] = useState(DEFAULT_DIAL);
  const [national, setNational] = useState('');

  const dialInvalid = !isValidDial(dial);
  const flag = COUNTRIES.find((c) => c.iso2 === country)?.flag || '🌐';

  function emit(nextDial, nextNational) {
    onChange({ target: { name, value: combinePhone(nextDial, nextNational) } });
  }

  function handleDialChange(e) {
    const next = normaliseDial(e.target.value);
    setDial(next);
    setCountry(countryForDial(next, country)?.iso2 || '');
    emit(next, national);
  }

  function handleSelect(e) {
    const picked = COUNTRIES.find((c) => c.iso2 === e.target.value);
    if (!picked) return;
    setCountry(picked.iso2);
    setDial(picked.dial);
    emit(picked.dial, national);
  }

  return (
    <div className={styles.group}>
      <div
        className={`${inputClassName} ${styles.country} ${dialInvalid ? styles.dialInvalid : ''}`}
      >
        <select
          id={`${id}-country`}
          aria-label="Country calling code"
          className={styles.picker}
          value={country}
          onChange={handleSelect}
        >
          <option value="" hidden>
            🌐 Other
          </option>
          {COUNTRIES.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {`${c.flag} ${c.name} ${c.dial}`}
            </option>
          ))}
        </select>
        <span className={styles.flag} aria-hidden="true">
          {flag}
        </span>
        <input
          id={`${id}-dial`}
          type="text"
          inputMode="numeric"
          autoComplete="tel-country-code"
          maxLength={5}
          aria-label="Country dial code"
          aria-invalid={dialInvalid || undefined}
          className={styles.dial}
          value={dial}
          onChange={handleDialChange}
        />
        <span className={styles.chevron} aria-hidden="true" />
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && errorId ? errorId : undefined}
        className={`${inputClassName} ${styles.number}`}
        value={national}
        onChange={(e) => {
          setNational(e.target.value);
          emit(dial, e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
