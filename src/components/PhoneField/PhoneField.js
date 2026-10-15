'use client';

import { useState } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY } from './countries';
import styles from './PhoneField.module.css';

// Country selector (flag + dial code) joined to a tel input. Emits a single
// combined value, e.g. "+14035551234", through onChange({ target: { name, value } })
// so it plugs into the forms' existing handleChange.
export default function PhoneField({
  id,
  name = 'phone',
  onChange,
  inputClassName = '',
  invalid = false,
  placeholder = '(555) 123-4567',
  errorId,
}) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [national, setNational] = useState('');

  function emit(nextCountry, nextNational) {
    const dial = COUNTRIES.find((c) => c.iso2 === nextCountry)?.dial || '+1';
    const digits = nextNational.replace(/[\s().-]/g, '');
    onChange({ target: { name, value: digits ? `${dial}${digits}` : '' } });
  }

  return (
    <div className={styles.group}>
      <select
        id={`${id}-country`}
        aria-label="Country calling code"
        className={`${inputClassName} ${styles.country}`}
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          emit(e.target.value, national);
        }}
      >
        {COUNTRIES.map((c) => (
          <option key={c.iso2} value={c.iso2}>
            {c.iso2 === country ? `${c.flag} ${c.dial}` : `${c.flag} ${c.name} ${c.dial}`}
          </option>
        ))}
      </select>
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
          emit(country, e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
