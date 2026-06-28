import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroImg from '../assets/trust.jpeg';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', {
        opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power3.out',
      });
      gsap.from('.hero-title span', {
        opacity: 0, y: 60, stagger: 0.15, duration: 1.2, delay: 0.6, ease: 'power3.out',
      });
      gsap.from('.hero-subtitle', {
        opacity: 0, y: 20, duration: 1, delay: 1.4, ease: 'power2.out',
      });
      gsap.from('.hero-actions', {
        opacity: 0, y: 20, duration: 0.8, delay: 1.7, ease: 'power2.out',
      });
      gsap.from('.hero-stats-row', {
        opacity: 0, y: 20, duration: 0.8, delay: 2, ease: 'power2.out',
      });
      gsap.from('.scroll-hint', { opacity: 0, duration: 1, delay: 2.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home" aria-label="Hero section">

      {/* Full-bleed background — trust.jpeg shown completely */}
      <div className="hero-bg">
        <img
          src={heroImg}
          alt="Trust Real Estate — luxury property"
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
        <div className="hero-overlay-gradient" />
      </div>

      {/* Subtle gold column grid */}
      <div className="hero-grid" aria-hidden="true">
        {[...Array(5)].map((_, i) => <div key={i} className="grid-col" />)}
      </div>

      {/* Main content */}
      <div className="hero-content">
        {/* <p className="hero-eyebrow section-tag">Est. 2005 &nbsp;·&nbsp; Pakistan's Finest</p> */}

        {/* <h1 className="hero-title">
          <span>Where Luxury</span>
          <span className="italic">Meets Legacy</span>
        </h1>

        <p className="hero-subtitle">
          Curated premium properties for those who demand nothing less than extraordinary.
          Your vision of an exceptional life — realized.
        </p> */}
        <p className="hero-eyebrow section-tag">Elite Investment Marketing</p>

  <h1 className="hero-title">
    <span>Where Trust</span>
    <span className="italic">Secures Value</span>
  </h1>

  <p className="hero-subtitle">
    Architecting the future of premium property investments. At Trust Real Estate Marketing, 
    we don't just showcase spaces — we strategically position elite developments to turn 
    vision into high-yield tangible assets.
  </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Story
          </button>
        </div>

        {/* <div className="hero-stats-row" role="list">
          {[
            { num: '500+', label: 'Properties Sold' },
            { num: '18+',  label: 'Years Experience' },
            { num: '₨ 2B+', label: 'Total Value' },
            { num: '99%',  label: 'Client Satisfaction' },
          ].map(s => (
            <div key={s.label} className="hero-stat" role="listitem">
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-hint" aria-label="Scroll down">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
      </div>

      {/* Corner marks */}
      <div className="corner corner-tl" aria-hidden="true" />
      <div className="corner corner-tr" aria-hidden="true" />
      <div className="corner corner-bl" aria-hidden="true" />
      <div className="corner corner-br" aria-hidden="true" />
    </section>
  );
}
