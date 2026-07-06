'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow',    { opacity:0, y:30, duration:1,   delay:0.3, ease:'power3.out' });
      gsap.from('.hero-title span', { opacity:0, y:60, stagger:0.15, duration:1.2, delay:0.6, ease:'power3.out' });
      gsap.from('.hero-subtitle',   { opacity:0, y:20, duration:1,   delay:1.4, ease:'power2.out' });
      gsap.from('.hero-actions',    { opacity:0, y:20, duration:0.8, delay:1.7, ease:'power2.out' });
      gsap.from('.scroll-hint',     { opacity:0, duration:1, delay:2.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home" aria-label="Hero section">
      <div className="hero-bg">
        <Image src="/trust.jpeg" alt="Trust Real Estate — luxury property" fill priority className="hero-bg-img" sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="hero-overlay" />
        <div className="hero-overlay-gradient" />
      </div>

      <div className="hero-grid" aria-hidden="true">
        {[...Array(5)].map((_, i) => <div key={i} className="grid-col" />)}
      </div>

      <div className="hero-content">
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
          <Link href="/#services" className="btn-primary"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior:'smooth' });
              }
            }}>
            Our Services
          </Link>
          <Link href="/#about" className="btn-ghost"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior:'smooth' });
              }
            }}>
            Our Story
          </Link>
        </div>
      </div>

      <div className="scroll-hint" aria-label="Scroll down">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line"><div className="scroll-dot" /></div>
      </div>

      <div className="corner corner-tl" aria-hidden="true" />
      <div className="corner corner-tr" aria-hidden="true" />
      <div className="corner corner-bl" aria-hidden="true" />
      <div className="corner corner-br" aria-hidden="true" />
    </section>
  );
}
