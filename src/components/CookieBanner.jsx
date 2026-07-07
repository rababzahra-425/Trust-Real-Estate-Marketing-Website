'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './CookieBanner.css';

const COOKIE_KEY = 'trust_re_cookie_consent';

// ── Helper: read/write consent from localStorage ──────────
function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveConsent(preferences) {
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString(),
    }));
  } catch { /* storage unavailable */ }
}

// ── Apply consent to analytics scripts ───────────────────
function applyConsent({ analytics, preferences }) {
  if (typeof window === 'undefined') return;

  // Google Analytics — only load if analytics consent is given
  if (analytics) {
    if (!window.__gaLoaded) {
      window.__gaLoaded = true;
      // Placeholder: replace GA_MEASUREMENT_ID with your real ID
      // const s = document.createElement('script');
      // s.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      // s.async = true;
      // document.head.appendChild(s);
      // window.dataLayer = window.dataLayer || [];
      // window.gtag = function(){ window.dataLayer.push(arguments); };
      // window.gtag('js', new Date());
      // window.gtag('config', 'GA_MEASUREMENT_ID');
      console.info('[Trust RE] Analytics cookies enabled');
    }
  } else {
    // Clear any existing GA cookies
    ['_ga', '_gid', '_gat'].forEach(name => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    });
    console.info('[Trust RE] Analytics cookies disabled');
  }

  if (preferences) {
    console.info('[Trust RE] Preference cookies enabled');
  }
}

// ── Component ─────────────────────────────────────────────
export default function CookieBanner() {
  const [show, setShow]           = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs]         = useState({ essential: true, analytics: false, preferences: false });

  // On mount — check if user already decided
  useEffect(() => {
    const saved = getConsent();
    if (saved) {
      // Already consented — apply saved prefs silently
      applyConsent(saved);
    } else {
      // Show banner after a short delay so page content loads first
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { essential: true, analytics: true, preferences: true };
    saveConsent(consent);
    applyConsent(consent);
    setShow(false);
  };

  const handleRejectAll = () => {
    const consent = { essential: true, analytics: false, preferences: false };
    saveConsent(consent);
    applyConsent(consent);
    setShow(false);
  };

  const handleSave = () => {
    saveConsent(prefs);
    applyConsent(prefs);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="true" aria-label="Cookie preferences">
      <div className="cookie-inner">

        {/* Icon + heading */}
        <div className="cookie-header">
          <span className="cookie-icon" aria-hidden="true">◈</span>
          <div>
            <h2 className="cookie-title">We use cookies</h2>
            <p className="cookie-subtitle">
              Trust Real Estate uses cookies to enhance your experience, analyse site usage, and
              remember your preferences.{' '}
              <Link href="/privacy-policy#cookies" className="cookie-link">Learn more</Link>
            </p>
          </div>
        </div>

        {/* Cookie type toggles — shown when details expanded */}
        {showDetails && (
          <div className="cookie-details" role="group" aria-label="Cookie categories">

            {/* Essential — always on */}
            <div className="cookie-row">
              <div className="cookie-row-info">
                <span className="cookie-row-name">Essential Cookies</span>
                <span className="cookie-row-desc">Required for the website to function properly. Cannot be disabled.</span>
              </div>
              <div className="cookie-toggle cookie-toggle--locked" aria-label="Essential cookies always on">
                <span className="toggle-on">Always On</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="cookie-row">
              <div className="cookie-row-info">
                <span className="cookie-row-name">Analytics Cookies</span>
                <span className="cookie-row-desc">Help us understand how visitors interact with the website so we can improve it.</span>
              </div>
              <label className="cookie-toggle" aria-label="Toggle analytics cookies">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={e => setPrefs(v => ({ ...v, analytics: e.target.checked }))}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            {/* Preferences */}
            <div className="cookie-row">
              <div className="cookie-row-info">
                <span className="cookie-row-name">Preference Cookies</span>
                <span className="cookie-row-desc">Remember your settings and choices to personalise your experience.</span>
              </div>
              <label className="cookie-toggle" aria-label="Toggle preference cookies">
                <input
                  type="checkbox"
                  checked={prefs.preferences}
                  onChange={e => setPrefs(v => ({ ...v, preferences: e.target.checked }))}
                />
                <span className="toggle-slider" />
              </label>
            </div>

          </div>
        )}

        {/* Actions */}
        <div className="cookie-actions">
          <button className="cookie-btn cookie-btn--ghost"
            onClick={() => setShowDetails(v => !v)}
            aria-expanded={showDetails}>
            {showDetails ? 'Hide Options' : 'Manage Preferences'}
          </button>

          {showDetails ? (
            <button className="cookie-btn cookie-btn--outline" onClick={handleSave}>
              Save My Preferences
            </button>
          ) : (
            <button className="cookie-btn cookie-btn--outline" onClick={handleRejectAll}>
              Reject Non-Essential
            </button>
          )}

          <button className="cookie-btn cookie-btn--primary" onClick={handleAcceptAll}>
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
