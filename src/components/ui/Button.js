import Link from 'next/link';
import styles from './Button.module.css';

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  className = '',
  ...rest
}) {
  // Default to an arrow icon so every button stays visually engaging.
  const resolvedIcon = icon === null ? null : icon || defaultIcon;
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    resolvedIcon ? styles.hasIcon : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {resolvedIcon && iconPosition === 'left' && (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <span>{children}</span>
      {resolvedIcon && iconPosition === 'right' && (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
