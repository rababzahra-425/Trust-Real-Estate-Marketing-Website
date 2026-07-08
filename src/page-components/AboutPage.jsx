'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import './AboutPage.css';

const values = [
  { icon: '◈', title: 'Integrity', desc: 'We say what we mean and mean what we say. No hidden fees, no inflated valuations, no shortcuts.' },
  { icon: '✦', title: 'Excellence', desc: 'Every interaction, document, and property is handled at the highest possible standard. Always.' },
  { icon: '◇', title: 'Discretion', desc: 'Your financial and personal information stays private. We are trusted with more than just property.' },
  { icon: '◉', title: 'Partnership', desc: "We don't see ourselves as agents. We see ourselves as long-term partners in your prosperity." },
];

export default function AboutPage() {
  const pageRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.au-hero-tag', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      gsap.from('.au-hero-title', { opacity: 0, y: 44, duration: 0.9, ease: 'power3.out', delay: 0.35 });
      gsap.from('.au-hero-subtitle', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', delay: 0.55 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="au-page">

      <header className="au-hero">
        <div className="au-hero-bg">
          <Image src="/about_header.png" alt="Trust Real Estate boutique office showing luxury design elements" fill priority className="au-hero-bg-img" sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="au-hero-overlay" />
          <div className="au-hero-gradient" />
        </div>
        <div className="au-hero-grid" aria-hidden="true">
          {[...Array(5)].map((_, i) => <div key={i} className="au-grid-col" />)}
        </div>
        <div className="au-hero-content">
          <p className="au-hero-tag section-tag">Our Story</p>
          <h1 className="au-hero-title">Two Decades of<br /><em>Earned Trust</em></h1>
          <p className="au-hero-subtitle">Built on integrity, refined by experience, and driven by a genuine desire to make extraordinary living accessible to the right people.</p>
        </div>
        <div className="corner corner-tl" aria-hidden="true" />
        <div className="corner corner-tr" aria-hidden="true" />
        <div className="corner corner-bl" aria-hidden="true" />
        <div className="corner corner-br" aria-hidden="true" />
      </header>

      <section className="au-story-section" aria-label="Our story">
        <div className="au-story-inner">
          <div className="au-story-left" data-aos="fade-right" data-aos-duration="800">
            <p className="section-tag">Who We Are</p>
            <h2 className="au-section-title">Not just agents.<br /><em>Your advisors for life.</em></h2>
            <div className="au-gold-line" />
          </div>
          <div className="au-story-right">
            {[
              'Trust Real Estate was founded on a simple yet profound conviction: that property investment deserves absolute honesty, expert guidance, and a partnership built on genuine friendship. While our newly established corporate office brings a fresh, modern home for our services in Sahiwal, our roots in the Pakistan real estate landscape run deep, backed by over two decades of hands-on market experience.',
              "Over the years, our core values have only grown stronger. We have built our reputation not on the size of our firm, but on the uncompromised standard of our services and the hard-won knowledge we bring to every transaction. ",
              "Today, Trust Real Estate stands as a premier boutique property firm dedicated to protecting your investments and guiding you through your most important financial decisions with clarity and care.",
              // "Over two decades, that conviction has not changed — only grown stronger. We've expanded across Pakistan, assembled a team of dedicated specialists, and built a reputation that speaks entirely through our clients' results.",
              // "Today, Trust Real Estate is one of Pakistan's most respected boutique property firms — not because of our size, but because of our standard. Every transaction we handle reflects 20 years of hard-won knowledge, care, and unwavering commitment to the people who trust us with their most important decisions.",
            ].map((p, i) => (
              <div key={i} className="au-story-block" data-aos="fade-left" data-aos-delay={i * 120} data-aos-duration="700"><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="au-values-section" aria-label="Our values">
        <div className="au-values-inner">
          <div className="au-section-header" data-aos="fade-up">
            <p className="section-tag">What We Stand For</p>
            <h2 className="au-section-title">Principles that guide<br /><em>everything we do</em></h2>
            <div className="au-gold-line" />
          </div>
          <div className="au-values-grid" role="list">
            {values.map((v, i) => (
              <div key={v.title} className="au-value-card" role="listitem"
                data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="650">
                <span className="au-value-icon" aria-hidden="true">{v.icon}</span>
                <h3 className="au-value-title">{v.title}</h3>
                <p className="au-value-desc">{v.desc}</p>
                <div className="au-card-line" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="au-why-section" aria-label="Why choose Trust Real Estate">
        <div className="au-why-bg">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=75" alt="Modern luxury property exterior with pool representing investment opportunities" fill className="au-why-bg-img" sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="au-why-overlay" />
        </div>
        <div className="au-why-content">
          <p className="section-tag" data-aos="fade-up">Why Trust</p>
          <h2 className="au-why-title" data-aos="fade-up" data-aos-delay="100">The difference is in<br /><em>the detail.</em></h2>
          <ul className="au-why-list">
            {[
              'Personalised service — one dedicated advisor from start to finish',
              'Full legal due diligence on every property, no exceptions',
              'Access to off-market listings not available elsewhere',
              'Transparent pricing with no hidden costs, ever',
              "Post-sale support — we don't disappear after the deal closes",
              'Verified clients only — protecting both buyers and sellers',
            ].map((item, i) => (
              <li key={item} data-aos="fade-right" data-aos-delay={i * 80} data-aos-duration="600">
                <span className="au-why-check" aria-hidden="true">✦</span>{item}
              </li>
            ))}
          </ul>
          <div className="au-why-actions" data-aos="fade-up" data-aos-delay="200">
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/team" className="btn-ghost">Meet the Team</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
