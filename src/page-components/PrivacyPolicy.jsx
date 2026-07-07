'use client';
import { useEffect } from 'react';
import './PrivacyPolicy.css';

const sections = [
  { id:'overview',  title:'Overview',
    content:'Trust Real Estate ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services. Please read it carefully.' },
  { id:'collection',title:'Information We Collect',
    bullets:['Personal identification information — name, email address, phone number, postal address.','Property interest details — type, budget range, preferred location.','Usage data — pages visited, time spent, referring URLs, browser type, and IP address.','Communications — messages sent via our contact form or email correspondence.','Newsletter subscription data — email address and subscription preferences.'] },
  { id:'use',       title:'How We Use Your Information',
    bullets:['To respond to enquiries and schedule property consultations.','To match you with suitable properties from our portfolio.','To send you relevant market insights, listings, and updates (with your consent).','To improve the performance and content of our website.','To comply with legal obligations under Pakistani law.','To prevent fraud and ensure the security of our services.'] },
  { id:'sharing',   title:'Information Sharing & Disclosure',
    content:'We do not sell, trade, or rent your personal information to any third party. We may share your data only in the following limited circumstances:',
    bullets:['With trusted service providers who assist in our business operations under strict confidentiality agreements.','With property developers or sellers, only to the extent necessary to facilitate a transaction you have initiated.','When required by law, court order, or government authority under applicable Pakistani law.','In the event of a business merger or acquisition, with the successor entity under the same privacy commitments.'] },
  { id:'cookies',   title:'Cookies & Tracking',
    content:'Our website uses cookies and similar technologies to enhance your experience. We use:',
    bullets:['Essential cookies — required for the website to function properly.','Analytics cookies — to understand how visitors interact with the site.','Preference cookies — to remember your settings and choices.'],
    footer:'You may disable cookies through your browser settings. Note that some features may not function correctly without cookies.' },
  { id:'retention', title:'Data Retention',
    content:'We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Enquiry data is typically retained for 3 years. Newsletter data is retained until you unsubscribe.' },
  { id:'rights',    title:'Your Rights',
    content:'You have the right to:',
    bullets:['Access the personal data we hold about you.','Request correction of inaccurate or incomplete data.','Request deletion of your personal data ("right to erasure").','Withdraw consent to marketing communications at any time.','Lodge a complaint with the relevant data protection authority.'],
    footer:'To exercise any of these rights, please contact us at privacy@trustrealestate.pk.' },
  { id:'security',  title:'Data Security',
    content:'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include SSL encryption, access controls, and regular security reviews.' },
  { id:'terms',     title:'Terms of Service',
    content:'By using this website, you agree to the following terms:',
    bullets:['All content on this website is for informational purposes only and does not constitute legal, financial, or property advice.','Property listings, prices, and availability are subject to change without notice.','You agree not to misuse this website or use it for any unlawful purpose.','Trust Real Estate reserves the right to modify or discontinue any part of the website at any time.'] },
  { id:'changes',   title:'Changes to This Policy',
    content:'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our website following any changes constitutes acceptance of the revised policy.' },
  { id:'contact-privacy', title:'Contact Us',
    content:'For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out:',
    bullets:['Email: privacy@trustrealestate.pk','Phone: +92 317 725 5555','Address: Kalma Garden, Plaza Street no.2, Commercial Market Sahiwal, Pakistan'] },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top:0, behavior:'instant' });
    const hash = window.location.hash?.replace('#','');
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 100);
  }, []);

  return (
    <div className="pp-page">
      <header className="pp-header">
        <div className="pp-header-content">
          <p className="section-tag">Legal</p>
          <h1 className="pp-title">Privacy Policy</h1>
          <p className="pp-meta">Trust Real Estate &nbsp;·&nbsp; Last updated: January 2025</p>
        </div>
      </header>

      <div className="pp-layout">
        <nav className="pp-sidebar" aria-label="Section navigation">
          <p className="pp-sidebar-heading">Contents</p>
          <ul>
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="pp-nav-link">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pp-content">
          {sections.map(s => (
            <section key={s.id} id={s.id} className="pp-section">
              <h2 className="pp-section-title">{s.title}</h2>
              {s.content && <p className="pp-body">{s.content}</p>}
              {s.bullets && (
                <ul className="pp-list">
                   {s.bullets.map((b,i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {s.footer && <p className="pp-body pp-footer-note">{s.footer}</p>}
            </section>
          ))}
          <div className="pp-closing">
            <div className="gold-line" />
            <p>Thank you for trusting Trust Real Estate with your information. We handle it with the same care and discretion we bring to every property we represent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
