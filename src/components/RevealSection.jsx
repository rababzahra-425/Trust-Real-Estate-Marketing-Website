'use client';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './RevealSection.css';

import img1 from '../../public/img1.webp';
import img2 from '../../public/img2.webp';
import img3 from '../../public/img3.webp';
import img4 from '../../public/img4.webp';
import img5 from '../../public/img5.webp';
import img6 from '../../public/img6.webp';
import img7 from '../../public/img7.webp';
import img8 from '../../public/img8.webp';

const TRAIL_IMGS = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
];
const POOL_SIZE = 14;

export default function RevealSection() {
  const sectionRef = useRef(null);
  const poolRef = useRef([]);
  const poolIndexRef = useRef(0);
  const lastPos = useRef({ x: -9999, y: -9999 });
  const throttleRef = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    TRAIL_IMGS.forEach(src => { const i = new Image(); i.src = src; });
    for (let i = 0; i < POOL_SIZE; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'rs-trail-wrap';
      const img = document.createElement('img');
      img.src = TRAIL_IMGS[i % TRAIL_IMGS.length];
      img.alt = ''; img.draggable = false; img.loading = 'eager';
      wrap.appendChild(img);
      container.appendChild(wrap);
      poolRef.current.push(wrap);
      gsap.set(wrap, { opacity: 0, scale: 0.65, pointerEvents: 'none' });
    }
    return () => { poolRef.current.forEach(el => el.remove()); poolRef.current = []; };
  }, []);

  const spawnAt = useCallback((x, y) => {
    const wrap = poolRef.current[poolIndexRef.current % POOL_SIZE];
    poolIndexRef.current++;
    const rect = sectionRef.current.getBoundingClientRect();
    const lx = x - rect.left, ly = y - rect.top;
    const ox = (Math.random() - .5) * 60, oy = (Math.random() - .5) * 40;
    const rot = (Math.random() - .5) * 16;
    const initScale = 0.55 + Math.random() * .2;
    const peakScale = 0.88 + Math.random() * .18;
    gsap.killTweensOf(wrap);
    gsap.set(wrap, { left: lx + ox - 75, top: ly + oy - 100, scale: initScale, rotation: rot, opacity: 0, y: 0, zIndex: 4 });
    gsap.to(wrap, { opacity: 0.82, scale: peakScale, duration: 0.22, ease: 'power2.out' });
    gsap.to(wrap, {
      opacity: 0, scale: initScale - .05, y: 28, duration: 1.0, ease: 'power3.in', delay: 0.32,
      onComplete: () => gsap.set(wrap, { y: 0 })
    });
  }, []);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x, dy = e.clientY - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) return;
      lastPos.current = { x: e.clientX, y: e.clientY };
      if (throttleRef.current) return;
      throttleRef.current = setTimeout(() => { throttleRef.current = null; }, 85);
      spawnAt(e.clientX, e.clientY);
    };
    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, [spawnAt]);

  useEffect(() => {
    // Dynamic import to refresh AOS calculations once the section is mounted
    import('aos').then(AOS => {
      AOS.default.refresh();
    });
  }, []);

  return (
    <section ref={sectionRef} className="rs-section" id="about" aria-label="About Trust Real Estate">
      <div className="rs-geo" aria-hidden="true">
        <div className="rs-geo-ring rs-geo-ring--1" />
        <div className="rs-geo-ring rs-geo-ring--2" />
        <div className="rs-geo-ring rs-geo-ring--3" />
        <div className="rs-geo-vline rs-geo-vline--l" />
        <div className="rs-geo-vline rs-geo-vline--r" />
        <div className="rs-geo-hline" />
      </div>

      <div className="rs-content">
        <p className="rs-tag section-tag" data-aos="fade-down" data-aos-duration="700">Elite Real Estate Marketing</p>
        <h2 className="rs-heading" data-aos="fade-up" data-aos-delay="150" data-aos-duration="800">
          We Provide Complete Sales,<br />
          <em>Marketing & Digital Marketing for Your Colony.</em>
        </h2>
        <div className="rs-divider" aria-hidden="true" data-aos="fade-up" data-aos-delay="280" data-aos-duration="600" />
        <p className="rs-body" data-aos="fade-up" data-aos-delay="350" data-aos-duration="700">
          At <strong>Trust Real Estate Marketing</strong>, we help housing societies and real estate
          communities grow through strategic marketing, property sales, and digital solutions.
        </p>
        <p className="rs-body" data-aos="fade-up" data-aos-delay="430" data-aos-duration="700">
          From brand positioning and lead generation to <strong className='text'>digital campaigns</strong> and <strong>sales support</strong>,
          we provide end-to-end solutions that help societies reach <strong className="text">more buyers</strong> and <strong className="text">accelerate growth.</strong>
        </p>
        <Link
          href="/#services"
          className="rs-cta btn-primary"
          data-aos="fade-up" data-aos-delay="550" data-aos-duration="600"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Discover More Services
        </Link>
        <p className="rs-hint" aria-hidden="true" data-aos="fade-in" data-aos-delay="800">✦ &nbsp; Move your cursor to explore our portfolio</p>
      </div>

      <div className="corner corner-tl" aria-hidden="true" />
      <div className="corner corner-tr" aria-hidden="true" />
      <div className="corner corner-bl" aria-hidden="true" />
      <div className="corner corner-br" aria-hidden="true" />
    </section>
  );
}
