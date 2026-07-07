'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import './Contact.css';

const INITIAL = { name: '', email: '', phone: '', interest: '', message: '' };

function validatePhone(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return 'Phone number is required.';
  if (!/^\+?[\d\s\-().]+$/.test(trimmed))
    return 'Phone number can only contain digits, spaces, +, -, ( or ).';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7)  return 'Phone number is too short (minimum 7 digits).';
  if (digits.length > 15) return 'Phone number is too long (maximum 15 digits).';
  return null;
}

export default function Contact() {
  const [form, setForm]             = useState(INITIAL);
  const [status, setStatus]         = useState('idle');
  const [errorMsg, setErrorMsg]     = useState('');
  const [phoneError, setPhoneError] = useState('');

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
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) { setPhoneError(phoneErr); document.getElementById('c-phone')?.focus(); return; }
    setStatus('loading'); setErrorMsg(''); setPhoneError('');
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone.trim(), interest: form.interest, message: form.message }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus('error'); setErrorMsg(data.error || 'Something went wrong.'); return; }
      gsap.to('.contact-form', { opacity:0, y:-20, duration:0.4, onComplete: () => setStatus('success') });
    } catch { setStatus('error'); setErrorMsg('Network error — please try again.'); }
  };

  useEffect(() => {
    if (status === 'success') gsap.from('.success-msg', { opacity:0, y:20, duration:0.6 });
  }, [status]);

  return (
    <section className="contact-section" id="contact" aria-label="Contact us">
      <div className="contact-inner">

        {/* Left */}
        <div className="contact-left" data-aos="fade-right" data-aos-duration="900">
          <div className="contact-img-wrap">
            <Image src="/trust.jpeg" alt="Trust Real Estate office" fill className="contact-img" sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            <div className="contact-img-overlay" />
          </div>
          <div className="contact-info">
            <p className="section-tag" style={{ marginBottom:'32px' }}>Get In Touch</p>
            <h2 className="contact-heading">Let's Find Your<br /><em>Perfect Property</em></h2>
            <p className="contact-desc">Reach out for a private consultation. Our advisors are available six days a week.</p>
            <div className="contact-details">
              {[
                { icon:'✦', label:'Phone',  val:'+92 317 7255555',  href:'tel:+923177255555' },
                { icon:'◈', label:'Email',  val:'shadnan72@gmail.com', href:'mailto:shadnan72@gmail.com' },
                { icon:'◉', label:'Office', val:'Kalma Garden, Plaza Street no.2, near Shopping Club, Commercial Market Sahiwal', href:null },
              ].map(d => (
                <div key={d.label} className="contact-detail-item">
                  <span className="detail-icon" aria-hidden="true">{d.icon}</span>
                  <div>
                    <p className="detail-label">{d.label}</p>
                    {d.href ? <a href={d.href} className="detail-value">{d.val}</a> : <p className="detail-value">{d.val}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="contact-right" data-aos="fade-left" data-aos-duration="900" data-aos-delay="100">
          {status === 'success' ? (
            <div className="success-msg" role="alert">
              <div className="success-icon" aria-hidden="true">✦</div>
              <h3 className="success-heading">Thank You</h3>
              <p className="success-text">Your enquiry has been received. A Trust advisor will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <h3 className="form-heading">Schedule a Consultation</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c-name" className="form-label">Full Name</label>
                  <input id="c-name" name="name" type="text" className="form-input" placeholder="Your name"
                    value={form.name} onChange={handleChange} required aria-required="true" disabled={status==='loading'} />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email" className="form-label">Email</label>
                  <input id="c-email" name="email" type="email" className="form-input" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required aria-required="true" disabled={status==='loading'} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c-phone" className="form-label">
                    Phone <span className="form-required" aria-hidden="true">*</span>
                  </label>
                  <input id="c-phone" name="phone" type="tel"
                    className={`form-input ${phoneError ? 'form-input--error' : ''}`}
                    placeholder="+92 317 000 0000" value={form.phone}
                    onChange={handleChange} onBlur={handlePhoneBlur}
                    required aria-required="true"
                    aria-describedby={phoneError ? 'phone-error' : undefined}
                    disabled={status==='loading'} />
                  {phoneError && <p id="phone-error" className="field-error" role="alert">{phoneError}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="c-interest" className="form-label">I'm Interested In</label>
                  <select id="c-interest" name="interest" className="form-input form-select"
                    value={form.interest} onChange={handleChange} disabled={status==='loading'}>
                    <option value="">Select type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="rental">Luxury Rental</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-message" className="form-label">Message</label>
                <textarea id="c-message" name="message" className="form-input form-textarea"
                  placeholder="Tell us about your requirements..." rows={5}
                  value={form.message} onChange={handleChange} disabled={status==='loading'} />
              </div>
              {status === 'error' && <p className="form-error" role="alert">{errorMsg}</p>}
              <button type="submit"
                className={`form-submit ${status==='loading' ? 'form-submit--loading' : ''}`}
                disabled={status==='loading'} aria-busy={status==='loading'}>
                {status==='loading' ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
