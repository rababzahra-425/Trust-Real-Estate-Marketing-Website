'use client';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { servicesData } from '@/data/servicesData';
import './Footer.css';

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Contact Us', href: '/contact' },
];
const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/trustrealestatemarketing?igsh=MW9obnd0eXA0cmFjOA==', abbr: 'IG' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1915FqG7Wc/', abbr: 'FB' },
  { label: 'WhatsApp', href: 'https://wa.me/923177255555', abbr: 'WA' },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <footer className="footer" role="contentinfo">
      <div className="line" />
      <div className="footer-body">
        <div className="footer-inner">

          {/* Brand */}
          <div className="footer-brand" data-aos="fade-up" data-aos-duration="700">
            <Link href="/" className="footer-logo" aria-label="Back to home">
              <Image src="/logo_r.png" alt="" width={42} height={44} className="footer-logo-img" aria-hidden="true" />
              <div className="footer-logo-text">
                <span className="f-logo-text">TRUST</span>
                <span className="f-logo-sub">REAL ESTATE</span>
              </div>
            </Link>
            <p className="footer-tagline">Curating extraordinary living experiences across Pakistan. Built on integrity. Driven by excellence.</p>
            <div className="footer-contact-quick">
              <a href="tel:+923177255555" className="fq-item"><span className="fq-icon" aria-hidden="true">✆</span>+92 317 725 5555</a>
              <a href="mailto:info@trustmarketing.pk" className="fq-item"><span className="fq-icon" aria-hidden="true">✉</span>info@trustmarketing.pk</a>
              <span className="fq-item"><span className="fq-icon" aria-hidden="true">◉</span>Kalma Garden, Plaza Street no.2, near Shopping Club, Commercial Market Sahiwal, 57000</span>
            </div>
            <div className="footer-socials" role="list" aria-label="Social media links">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-link" aria-label={`Follow us on ${s.label}`} role="listitem">{s.abbr}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
            <h3 className="footer-col-heading">Our Services</h3>
            <ul role="list">
              {servicesData.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="footer-link">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200" data-aos-duration="700">
            <h3 className="footer-col-heading">Company</h3>
            <ul role="list">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => {
                      if (link.href === '/#contact' && pathname === '/') {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter" data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
            <h3 className="footer-col-heading">Stay Informed</h3>
            <p className="newsletter-desc">Exclusive listings, market insights, and curated investment opportunities — delivered privately to your inbox.</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()} aria-label="Newsletter signup">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" placeholder="Your email address" className="nl-input" />
              <button type="submit" className="nl-btn" aria-label="Subscribe">→</button>
            </form>
            <p className="nl-note">No spam. Unsubscribe at any time.</p>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright">© {new Date().getFullYear()} Trust Real Estate. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy" className="footer-policy-link">Privacy Policy</Link>
            <span className="footer-divider" aria-hidden="true">·</span>
            <Link href="/privacy-policy#terms" className="footer-policy-link">Terms of Service</Link>
            <span className="footer-divider" aria-hidden="true">·</span>
            <Link href="/privacy-policy#cookies" className="footer-policy-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
