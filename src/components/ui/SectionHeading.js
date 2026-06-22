import styles from './SectionHeading.module.css';

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  light = false,
}) {
  const wrapperClasses = [
    styles.wrapper,
    styles[align],
    light ? styles.light : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
