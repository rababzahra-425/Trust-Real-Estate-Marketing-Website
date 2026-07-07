'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import './Navbar.css';

const links = [
  { label: 'Home', id: 'home', route: null },
  { label: 'About Us', id: 'about', route: '/about' },
  { label: 'Team', id: 'team', route: '/team' },
  { label: 'Contact Us', id: 'contact', route: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15
    });
  }, []);

  const handleLink = (e, link) => {
    setMenuOpen(false);
    const isAnchor = !link.route || link.route.startsWith('/#');
    if (isAnchor && pathname === '/') {
      e.preventDefault();
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(link.id);
    }
  };

  const handleLogo = (e) => {
    setMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={handleLogo} aria-label="Trust Real Estate home">
          <Image src="/logo_r.png" alt="" width={40} height={42} className="nav-logo-img" aria-hidden="true" />
          <div className="nav-logo-text">
            <span className="logo-text">TRUST</span>
            <span className="logo-sub">REAL ESTATE</span>
          </div>
        </Link>

        <ul className="nav-links" role="list">
          {links.map(link => (
            <li key={link.id}>
              <Link
                href={link.route || '/'}
                className={`nav-link ${(link.route && !link.route.startsWith('/#') && pathname === link.route) || ((!link.route || link.route.startsWith('/#')) && activeLink === link.id) ? 'active' : ''}`}
                onClick={(e) => handleLink(e, link)}
                aria-current={link.route && pathname === link.route ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contact"
          className="nav-cta"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get In Touch
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          {links.map(link => (
            <Link key={link.id} href={link.route || '/'} className="mobile-link" onClick={(e) => handleLink(e, link)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="nav-cta mobile-cta"
            onClick={(e) => {
              setMenuOpen(false);
              if (pathname === '/') {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  );
}