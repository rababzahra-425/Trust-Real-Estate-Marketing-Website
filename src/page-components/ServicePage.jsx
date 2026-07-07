'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { servicesData } from '@/data/servicesData';
import './ServicePage.css';

export default function ServicePageClient({ slug }) {
  const router     = useRouter();
  const pageRef    = useRef(null);

  const service    = servicesData.find(s => s.slug === slug);
  const currentIdx = servicesData.findIndex(s => s.slug === slug);
  const prev       = servicesData[currentIdx - 1] || null;
  const next       = servicesData[currentIdx + 1] || null;

  useEffect(() => {
    if (!service) { router.push('/'); return; }
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      gsap.from('.sp-hero-tag',    { opacity:0, y:20, duration:0.7, ease:'power3.out', delay:0.2 });
      gsap.from('.sp-hero-title',  { opacity:0, y:44, duration:0.9, ease:'power3.out', delay:0.35 });
      gsap.from('.sp-hero-tagline',{ opacity:0, y:20, duration:0.7, ease:'power3.out', delay:0.52 });
      gsap.from('.sp-hero-stats',  { opacity:0, y:20, duration:0.7, ease:'power3.out', delay:0.7 });
    }, pageRef);

    const els = pageRef.current?.querySelectorAll('.sp-animate');
    if (els) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            gsap.from(e.target, { opacity:0, y:36, duration:0.75, ease:'power3.out' });
            io.unobserve(e.target);
          }
        });
      }, { threshold:0.1 });
      els.forEach(el => io.observe(el));
      return () => { ctx.revert(); io.disconnect(); };
    }
    return () => ctx.revert();
  }, [slug, service, router]);

  if (!service) return null;

  return (
    <div ref={pageRef} className="sp-page">

      {/* ── Hero ── */}
      <header className="sp-hero">
        <div className="sp-hero-bg">
          <Image src={service.heroImg} alt="" fill priority className="sp-hero-img" sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="sp-hero-overlay" />
          <div className="sp-hero-gradient" />
        </div>
        <div className="sp-hero-grid" aria-hidden="true">
          {[...Array(5)].map((_,i) => <div key={i} className="sp-grid-col" />)}
        </div>
        <div className="sp-hero-content">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="sp-bread-link">Home</Link>
            <span className="sp-bread-sep" aria-hidden="true">→</span>
            <Link href="/#services" className="sp-bread-link">Services</Link>
            <span className="sp-bread-sep" aria-hidden="true">→</span>
            <span className="sp-bread-current">{service.title}</span>
          </nav>
          <p className="sp-hero-tag section-tag">{service.tag} &nbsp;·&nbsp; Our Services</p>
          <h1 className="sp-hero-title">{service.title}</h1>
          <p className="sp-hero-tagline">{service.tagline}</p>
          <div className="sp-hero-stats" role="list">
            {[service.stat1, service.stat2, service.stat3].map(s => (
              <div key={s.label} className="sp-stat" role="listitem">
                <strong>{s.num}</strong><span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="corner corner-tl" aria-hidden="true" />
        <div className="corner corner-tr" aria-hidden="true" />
        <div className="corner corner-bl" aria-hidden="true" />
        <div className="corner corner-br" aria-hidden="true" />
      </header>

      {/* ── Overview + Highlights ── */}
      <section className="sp-overview-section" aria-label="Service overview">
        <div className="sp-overview-inner">
          <div className="sp-overview-left sp-animate">
            <p className="section-tag" style={{ marginBottom:'16px' }}>Overview</p>
            <h2 className="sp-section-title">What We Do<br /><em>for You</em></h2>
            <div className="sp-gold-line" />
            <div className="sp-overview-body">
              {service.overview.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <Link href="/contact" className="btn-primary">Get Started →</Link>
          </div>
          <div className="sp-highlights sp-animate" aria-label="Key highlights">
            <h3 className="sp-highlights-heading">Why Choose Trust</h3>
            <ul className="sp-highlights-list">
              {service.highlights.map((h,i) => (
                <li key={i}><span className="sp-hl-icon" aria-hidden="true">✦</span>{h}</li>
              ))}
            </ul>
            <div className="sp-side-img-wrap">
              <Image src={service.img} alt={service.imgAlt || service.title} fill className="sp-side-img" sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
              <div className="sp-side-img-overlay" />
              <span className="sp-side-tag" aria-hidden="true">{service.icon}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="sp-process-section" aria-label="Service process">
        <div className="sp-process-inner">
          <div className="sp-process-head sp-animate">
            <p className="section-tag" style={{ marginBottom:'16px' }}>How It Works</p>
            <h2 className="sp-section-title">Your Journey,<br /><em>Step by Step</em></h2>
            <div className="sp-gold-line" />
          </div>
          <div className="sp-steps-grid">
            {service.steps.map(step => (
              <div key={step.num} className="sp-step sp-animate">
                <div className="sp-step-num">{step.num}</div>
                <div className="sp-step-body">
                  <h3 className="sp-step-title">{step.title}</h3>
                  <p className="sp-step-desc">{step.desc}</p>
                </div>
                <div className="sp-step-line" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="sp-cta-section" aria-label="Call to action">
        <div className="sp-cta-bg">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=75"
            alt="" fill className="sp-cta-bg-img" sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="sp-cta-overlay" />
        </div>
        <div className="sp-cta-content sp-animate">
          <p className="section-tag" style={{ marginBottom:'16px' }}>Ready to Begin?</p>
          <h2 className="sp-cta-title">
            Let's talk about your<br /><em>{service.title.toLowerCase()}.</em>
          </h2>
          <p className="sp-cta-body">Speak to one of our advisors today — no obligation, just honest guidance.</p>
          <div className="sp-cta-actions">
            <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
            <Link href="/team" className="btn-ghost">Meet Our Team</Link>
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="sp-other-section" aria-label="Other services">
        <div className="sp-other-inner">
          <p className="section-tag" style={{ marginBottom:'16px', textAlign:'center' }}>Explore More</p>
          <h2 className="sp-section-title sp-section-title--center sp-animate">Our Other <em>Services</em></h2>
          <div className="sp-other-grid">
            {servicesData.filter(s => s.slug !== slug).slice(0, 3).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="sp-other-card sp-animate" aria-label={s.title}>
                <div className="sp-other-img-wrap">
                  <Image src={s.img} alt={s.imgAlt || s.title} fill className="sp-other-img" sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className="sp-other-overlay" />
                </div>
                <div className="sp-other-body">
                  <span className="sp-other-tag">{s.tag}</span>
                  <h3 className="sp-other-title">{s.title}</h3>
                  <p className="sp-other-desc">{s.desc}</p>
                  <span className="sp-other-link">Learn More →</span>
                </div>
                <div className="sp-other-line" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="sp-nav-row">
            {prev
              ? <Link href={`/services/${prev.slug}`} className="sp-nav-btn">← {prev.title}</Link>
              : <div />}
            {next
              ? <Link href={`/services/${next.slug}`} className="sp-nav-btn">{next.title} →</Link>
              : <div />}
          </div>
        </div>
      </section>

    </div>
  );
}
