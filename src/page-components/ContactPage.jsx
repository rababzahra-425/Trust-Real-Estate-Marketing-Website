'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import './ContactPage.css';

const INITIAL_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

// ── Phone validation (shared logic) ─────────────────────
function validatePhone(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return 'Phone number is required.';
  if (!/^\+?[\d\s\-().]+$/.test(trimmed))
    return 'Phone number can only contain digits, spaces, +, -, ( or ).';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7) return 'Phone number is too short (minimum 7 digits).';
  if (digits.length > 15) return 'Phone number is too long (maximum 15 digits).';
  return null;
}

const channels = [
  {
    id: 'phone', label: 'Phone', value: '+92 317 725 5555', sub: 'Mon – Sat, 9am – 7pm', href: 'tel:+923177255555',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
  },
  {
    id: 'email', label: 'Email', value: 'hello@trustrealestate.pk', sub: 'We reply within 24 hours', href: 'mailto:hello@trustrealestate.pk',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
  },
  {
    id: 'instagram', label: 'Instagram', value: '@trustrealestatepk', sub: 'Follow for exclusive listings', href: 'https://www.instagram.com/trustrealestatemarketing',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  },
  {
    id: 'facebook', label: 'Facebook', value: 'Trust Real Estate PK', sub: 'Like & stay updated', href: 'https://www.facebook.com/share/1915FqG7Wc/',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  },
  {
    id: 'whatsapp', label: 'WhatsApp', value: '+92 317 725 5555', sub: 'Chat with us directly', href: 'https://wa.me/923177255555',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  },
  {
    id: 'location', label: 'Office', value: 'Sahiwal, Punjab, Pakistan', sub: 'Kalma Garden, Plaza Street no.2', href: 'https://maps.google.com/?q=Sahiwal+Pakistan',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
  },
];

export default function ContactPage() {
  const router = useRouter();
  const pageRef = useRef(null);

  // ── All state at top — before any useEffect ──────────────
  const [form, setForm] = useState(INITIAL_FORM);
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // ── Entrance animations ───────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.cp-header-text > *', { opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Animate success state ─────────────────────────────────
  useEffect(() => {
    if (status === 'success') gsap.from('.cp-success', { opacity: 0, y: 20, duration: 0.6 });
  }, [status]);

  // ── Handlers ─────────────────────────────────────────────
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(v => ({ ...v, [name]: value }));
    if (name === 'phone') setPhoneError('');
  };

  const handlePhoneBlur = () => {
    const err = validatePhone(form.phone);
    if (err) setPhoneError(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Client-side phone validation
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      document.getElementById('cp-phone')?.focus();
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setPhoneError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone.trim(),
          interest: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        return;
      }

      gsap.to('.cp-form', {
        opacity: 0, y: -16, duration: 0.35,
        onComplete: () => setStatus('success'),
      });

    } catch {
      setStatus('error');
      setErrorMsg('Network error — please check your connection and try again.');
    }
  };

  const isLoading = status === 'loading';

  // ── Render ────────────────────────────────────────────────
  return (
    <div ref={pageRef} className="cp-page">

      {/* Hero header */}
      <header className="cp-header">
        <div className="cp-header-bg">
          <Image src="/contact_header.png"
            alt="" fill priority className="cp-header-bg-img" sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="cp-header-bg-overlay" />
          <div className="cp-header-bg-gradient" />
        </div>
        <div className="cp-header-text">
          <p className="section-tag">Get In Touch</p>
          <h1 className="cp-title">Let's Start a<br /><em>Conversation</em></h1>
          <p className="cp-subtitle">Whether you're buying, selling, or simply exploring — our advisors are ready to guide you with complete discretion.</p>
        </div>
        <div className="corner corner-tl" aria-hidden="true" />
        <div className="corner corner-tr" aria-hidden="true" />
        <div className="corner corner-bl" aria-hidden="true" />
        <div className="corner corner-br" aria-hidden="true" />
      </header>

      <div className="cp-main">

        {/* Channel cards */}
        <section className="cp-channels-section" aria-label="Contact channels">
          <div className="cp-channels-grid">
            {channels.map((ch, i) => (
              <a key={ch.id} href={ch.href}
                target={ch.id !== 'phone' && ch.id !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`cp-channel-card cp-channel-card--${ch.id}`}
                aria-label={`${ch.label}: ${ch.value}`}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                data-aos-duration="650">
                <div className="cp-ch-icon">{ch.icon}</div>
                <div className="cp-ch-body">
                  <span className="cp-ch-label">{ch.label}</span>
                  <span className="cp-ch-value">{ch.value}</span>
                  <span className="cp-ch-sub">{ch.sub}</span>
                </div>
                <span className="cp-ch-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Form + Map */}
        <section className="cp-lower" aria-label="Contact form and location">
          <div className="cp-lower-inner">

            {/* Form */}
            <div className="cp-form-wrap" data-aos="fade-right" data-aos-duration="800" data-aos-offset="80">
              <div className="cp-form-header">
                <p className="section-tag">Send a Message</p>
                <h2 className="cp-form-title">We'll get back to you<br /><em>within 24 hours</em></h2>
              </div>

              {status === 'success' ? (
                <div className="cp-success" role="alert">
                  <div className="cp-success-icon" aria-hidden="true">✦</div>
                  <h3>Thank You</h3>
                  <p>Your message has been received. A Trust advisor will be in touch within 24 hours.</p>
                  <button className="cp-success-reset"
                    onClick={() => { setStatus('idle'); setForm(INITIAL_FORM); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="cp-form" onSubmit={handleSubmit} noValidate>

                  <div className="cp-field-row">
                    {['name', 'email'].map(f => (
                      <div key={f} className={`cp-field ${focused === f ? 'is-focused' : ''} ${form[f] ? 'has-value' : ''}`}>
                        <label htmlFor={`cp-${f}`}>{f === 'name' ? 'Full Name' : 'Email Address'}</label>
                        <input id={`cp-${f}`} name={f} type={f === 'email' ? 'email' : 'text'}
                          placeholder={f === 'name' ? 'Your full name' : 'your@email.com'}
                          value={form[f]} onChange={handleChange}
                          onFocus={() => setFocused(f)} onBlur={() => setFocused('')}
                          required aria-required="true" disabled={isLoading} />
                      </div>
                    ))}
                  </div>

                  <div className="cp-field-row">
                    <div className={`cp-field ${focused === 'phone' ? 'is-focused' : ''} ${form.phone ? 'has-value' : ''} ${phoneError ? 'has-error' : ''}`}>
                      <label htmlFor="cp-phone">
                        Phone Number <span className="cp-required" aria-hidden="true">*</span>
                      </label>
                      <input id="cp-phone" name="phone" type="tel"
                        placeholder="+92 317 000 0000"
                        value={form.phone} onChange={handleChange}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => { setFocused(''); handlePhoneBlur(); }}
                        required aria-required="true"
                        aria-describedby={phoneError ? 'cp-phone-error' : undefined}
                        disabled={isLoading} />
                      {phoneError && (
                        <p id="cp-phone-error" className="cp-field-error" role="alert">{phoneError}</p>
                      )}
                    </div>
                    <div className={`cp-field cp-field--select ${focused === 'subject' ? 'is-focused' : ''} ${form.subject ? 'has-value' : ''}`}>
                      <label htmlFor="cp-subject">I'm Interested In</label>
                      <select id="cp-subject" name="subject" value={form.subject} onChange={handleChange}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                        disabled={isLoading}>
                        <option value="">Select a service</option>
                        {['Property Buying', 'Property Selling', 'Real Estate Consultancy', 'Investment Advisory', 'Property Marketing', 'Property Rentals', 'General Enquiry'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={`cp-field cp-field--full ${focused === 'message' ? 'is-focused' : ''} ${form.message ? 'has-value' : ''}`}>
                    <label htmlFor="cp-message">Your Message</label>
                    <textarea id="cp-message" name="message" rows={6}
                      placeholder="Tell us about your requirements, budget, or any questions you have..."
                      value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                      disabled={isLoading} />
                  </div>

                  {status === 'error' && (
                    <p className="cp-form-error" role="alert">{errorMsg}</p>
                  )}

                  <button type="submit"
                    className={`cp-submit ${isLoading ? 'cp-submit--loading' : ''}`}
                    disabled={isLoading} aria-busy={isLoading}>
                    {isLoading
                      ? 'Sending…'
                      : <><span>Send Enquiry</span><span className="cp-submit-arrow" aria-hidden="true">→</span></>}
                  </button>

                </form>
              )}
            </div>

            {/* Map + office info */}
            <div className="cp-map-wrap" data-aos="fade-left" data-aos-duration="800" data-aos-offset="80">
              <div className="cp-map-header">
                <p className="section-tag">Our Office</p>
                <h2 className="cp-map-title">Visit Us</h2>
              </div>
              <div className="cp-map-frame">
                <iframe title="Trust Real Estate office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108977.39!2d72.2!3d30.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b4d9f1a1a1a1b%3A0x0!2sSahiwal%2C+Punjab%2C+Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Maps showing Sahiwal, Pakistan" />
                <div className="cp-map-overlay-pin" aria-hidden="true">
                  <div className="pin-dot" /><div className="pin-ring" />
                </div>
              </div>

              <div className="cp-office-details">
                {[
                  { icon: '◉', label: 'Address', val: 'Kalma Garden, Plaza Street no.2, near Shopping Club, Commercial Market Sahiwal, 57000', link: null },
                  { icon: '◷', label: 'Working Hours', val: 'Monday – Saturday: 9:00 AM – 7:00 PM', val2: 'Sunday: By Appointment Only', link: null },
                  { icon: '✆', label: 'Hotline', val: '+92 317 725 5555', link: 'tel:+923177255555' },
                ].map(d => (
                  <div key={d.label} className="cp-office-item">
                    <span className="cp-office-icon" aria-hidden="true">{d.icon}</span>
                    <div>
                      <p className="cp-office-label">{d.label}</p>
                      {d.link
                        ? <a href={d.link} className="cp-office-val cp-office-val--link">{d.val}</a>
                        : <p className="cp-office-val">{d.val}</p>}
                      {d.val2 && <p className="cp-office-val cp-office-val--muted">{d.val2}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cp-social-row">
                <p className="cp-social-label">Follow Our Journey</p>
                <div className="cp-socials">
                  {[
                    {
                      label: 'Instagram', href: 'https://www.instagram.com/trustrealestatemarketing',
                      svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                    },
                    {
                      label: 'Facebook', href: 'https://www.facebook.com/share/1915FqG7Wc/',
                      svg: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    },
                    {
                      label: 'WhatsApp', href: 'https://wa.me/923177255555',
                      svg: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="cp-social-btn" aria-label={s.label}>
                      {s.svg}<span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
