import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Privacy Policy',
  description:
    'Read the Call Center Communications privacy policy. Learn how we collect, use, and protect your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last updated: January 1, 2026</p>

      <p className={styles.text}>
        Call Center Communications (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) is committed to protecting the privacy of our
        website visitors and clients. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you visit
        our website or engage our call center outsourcing brokerage services.
      </p>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Information We Collect</h2>
        <p className={styles.text}>
          We may collect the following types of information when you interact with
          our website or services:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Contact form data:</strong> Name, email address, phone number,
            company name, and any details you provide in the message field when
            submitting a contact form or consultation request.
          </li>
          <li>
            <strong>Usage data:</strong> Information automatically collected when
            you visit our website, including IP address, browser type, device
            information, pages visited, referring URLs, and time spent on pages.
          </li>
          <li>
            <strong>Communication data:</strong> Records of correspondence if you
            contact us directly via email or phone.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>How We Use Your Information</h2>
        <p className={styles.text}>We use the information we collect to:</p>
        <ul className={styles.list}>
          <li>
            Respond to your inquiries and provide our brokerage consultation
            services
          </li>
          <li>
            Match you with appropriate call center outsourcing providers based on
            your stated requirements
          </li>
          <li>
            Improve our website, services, and user experience
          </li>
          <li>
            Send relevant follow-up communications related to your inquiry
          </li>
          <li>
            Comply with legal obligations and enforce our terms of service
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Information Sharing</h2>
        <p className={styles.text}>
          We do not sell your personal information to third parties. We may share
          your information in the following limited circumstances:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>With matched providers:</strong> When you request a
            consultation, we share relevant information with pre-vetted call
            center providers to facilitate the matching process. This is done only
            with your consent as part of our brokerage service.
          </li>
          <li>
            <strong>Service providers:</strong> We may share information with
            third-party vendors who assist with website hosting, analytics, and
            communication tools, subject to confidentiality obligations.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose information if
            required by law, regulation, legal process, or governmental request.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Data Security</h2>
        <p className={styles.text}>
          We implement reasonable administrative, technical, and physical security
          measures to protect your personal information against unauthorized
          access, alteration, disclosure, or destruction. However, no method of
          electronic transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Cookies</h2>
        <p className={styles.text}>
          Our website may use cookies and similar tracking technologies to enhance
          your browsing experience, analyze site traffic, and understand where our
          visitors come from. You can control cookie settings through your browser
          preferences. Disabling cookies may affect certain features of our
          website.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Third-Party Links</h2>
        <p className={styles.text}>
          Our website may contain links to third-party websites or services that
          are not operated by us. We have no control over and assume no
          responsibility for the content, privacy policies, or practices of any
          third-party sites. We encourage you to review the privacy policy of
          every site you visit.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Changes to This Policy</h2>
        <p className={styles.text}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory reasons.
          The updated policy will be posted on this page with a revised &ldquo;Last
          updated&rdquo; date. We encourage you to review this page periodically.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Contact Us</h2>
        <p className={styles.text}>
          If you have questions about this Privacy Policy or how we handle your
          personal information, please reach out through our contact form.
        </p>
      </div>
    </div>
  );
}
