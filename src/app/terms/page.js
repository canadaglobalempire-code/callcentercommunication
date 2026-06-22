import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { generateMetadata as genMeta } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = genMeta({
  title: 'Terms of Service',
  description:
    'Read the Call Center Communications terms of service. Understand the terms and conditions for using our call center outsourcing brokerage services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <h1 className={styles.heading}>Terms of Service</h1>
      <p className={styles.lastUpdated}>Last updated: January 1, 2026</p>

      <p className={styles.text}>
        Welcome to Call Center Communications. By accessing or using our website
        and services, you agree to be bound by these Terms of Service. Please
        read them carefully before using our services.
      </p>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Agreement to Terms</h2>
        <p className={styles.text}>
          By accessing our website at callcentercommunications.com or engaging our
          brokerage services, you agree to be bound by these Terms of Service and
          all applicable laws and regulations. If you do not agree with any of
          these terms, you are prohibited from using or accessing our services.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Service Description</h2>
        <p className={styles.text}>
          Call Center Communications operates as a free call center outsourcing
          brokerage service. We connect businesses with pre-vetted call center
          providers based on stated requirements. Our services include:
        </p>
        <ul className={styles.list}>
          <li>
            Providing free consultations to understand your call center
            outsourcing needs
          </li>
          <li>
            Matching your requirements with qualified call center providers from
            our network
          </li>
          <li>
            Facilitating introductions between your business and matched providers
          </li>
          <li>
            Offering guidance and educational content about call center
            outsourcing best practices
          </li>
        </ul>
        <p className={styles.text}>
          Our brokerage service is provided at no cost to you. We are compensated
          by the call center providers in our network.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>No Guarantee of Results</h2>
        <p className={styles.text}>
          While we strive to match businesses with high-quality call center
          providers, Call Center Communications does not guarantee specific
          outcomes, performance levels, or results from any provider
          relationship. The ultimate success of an outsourcing engagement depends
          on many factors beyond our control, including the scope of work,
          management practices, market conditions, and the individual provider&rsquo;s
          execution.
        </p>
        <p className={styles.text}>
          We recommend conducting your own due diligence before entering into any
          agreement with a call center provider, including reviewing contracts,
          visiting facilities (where feasible), and verifying references
          independently.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>User Obligations</h2>
        <p className={styles.text}>When using our services, you agree to:</p>
        <ul className={styles.list}>
          <li>
            Provide accurate, current, and complete information when submitting
            inquiries or consultation requests
          </li>
          <li>
            Use our website and services only for lawful purposes and in
            accordance with these terms
          </li>
          <li>
            Not attempt to gain unauthorized access to any portion of our website
            or systems
          </li>
          <li>
            Not use our services to transmit spam, malware, or any harmful content
          </li>
          <li>
            Not misrepresent your identity or affiliation with any person or
            organization
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Intellectual Property</h2>
        <p className={styles.text}>
          All content on the Call Center Communications website, including text,
          graphics, logos, images, and software, is the property of Call Center
          Communications or its content suppliers and is protected by United
          States and international copyright, trademark, and other intellectual
          property laws. You may not reproduce, distribute, modify, create
          derivative works of, publicly display, or otherwise exploit any content
          from our website without prior written consent.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Limitation of Liability</h2>
        <p className={styles.text}>
          To the fullest extent permitted by applicable law, Call Center
          Communications shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly, or any loss of data,
          use, goodwill, or other intangible losses resulting from:
        </p>
        <ul className={styles.list}>
          <li>Your use or inability to use our services</li>
          <li>
            Any conduct or content of any third party, including call center
            providers in our network
          </li>
          <li>
            Unauthorized access, use, or alteration of your information
          </li>
          <li>
            Any other matter relating to our services
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Governing Law</h2>
        <p className={styles.text}>
          These Terms of Service shall be governed by and construed in accordance
          with the laws of the United States, without regard to conflict of law
          principles. Any disputes arising from these terms or your use of our
          services shall be resolved in the appropriate courts within the
          jurisdiction where Call Center Communications maintains its principal
          place of business.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Contact Us</h2>
        <p className={styles.text}>
          If you have questions about these Terms of Service, please reach out
          through our contact form.
        </p>
      </div>
    </div>
  );
}
