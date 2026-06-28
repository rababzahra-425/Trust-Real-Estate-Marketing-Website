import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';
import './Navbar.css';

const links = [
  { label: 'Home',       id: 'home',    route: null      },
  { label: 'About Us',   id: 'about',   route: '/about'  },
  { label: 'Team',       id: 'team',    route: '/team'   },
  { label: 'Contact Us', id: 'contact', route: '/contact'},
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef   = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (link) => {
    setMenuOpen(false);
    if (link.route) {
      navigate(link.route);
      return;
    }
    // If we're not on home page, navigate home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveLink(link.id);
  };

  const handleCTA = () => {
    setMenuOpen(false);
    navigate('/contact');
  };

  const handleLogo = () => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <button className="nav-logo" onClick={handleLogo} aria-label="Trust Real Estate — home">
          <img src={logoSvg} alt="" className="nav-logo-img" aria-hidden="true" />
          <div className="nav-logo-text">
            <span className="logo-text">TRUST</span>
            <span className="logo-sub">REAL ESTATE</span>
          </div>
        </button>

        <ul className="nav-links" role="list">
          {links.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${(link.route && location.pathname === link.route) || (!link.route && activeLink === link.id) ? 'active' : ''}`}
                onClick={() => handleLink(link)}
                aria-label={`Go to ${link.label}`}
                aria-current={link.route && location.pathname === link.route ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={handleCTA}>
          Get In Touch
        </button>

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
            <button key={link.id} className="mobile-link" onClick={() => handleLink(link)}>
              {link.label}
            </button>
          ))}
          <button className="nav-cta mobile-cta" onClick={handleCTA}>
            Get In Touch
          </button>
        </div>
      )}
    </nav>
  );
}
