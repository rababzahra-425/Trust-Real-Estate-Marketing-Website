'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import './TeamPage.css';

const directors = [
  {
    id: 'd1', name: 'Sheikh Muhammad Azam', role: 'Founder & Chief Executive Officer',
    bio: 'With over 12 years of distinguished experience in the real estate industry, Muhammad Azam is the visionary driving force behind Trust Real Estate Marketing. He has successfully managed major property portfolios, forged strategic marketing alliances, and helped thousands of clients secure high-yield investments.',
    email: 'Azamsheikh22@gmail.com', fb: 'https://www.facebook.com/share/1Jyta3U783/?mibextid=wwXIfr',
    img: '/director_1_rrr-r.png',
    quote: '"Trust is not just our name — it is our standard."'
  },
  {
    id: 'd2', name: 'Sheikh Adnan Haidry', role: 'Co-Founder & Director of Operations',
    bio: 'Bringing over 8 years of specialized expertise in property consultancy and strategic marketing, Sheikh Adnan plays a pivotal role in driving the growth of Trust Real Estate Marketing. His dynamic, client-centric approach ensures that every project is executed with modern marketing strategies and absolute precision.',
    email: 'shadnan72@gmail.com', fb: 'https://www.facebook.com/share/18oQ5QKa1L/',
    img: '/director2_.png',
    quote: '"Luxury is in the detail — and we never miss one."'
  },
];

const specialists = [
  {
    id: 's1', name: 'Rana Shahid Sultan', role: 'Sales Manager',
    bio: 'Shahid has closed over 200 premium residential deals across Lahore, Islamabad, and Karachi. His instinct for client needs, deep knowledge of neighbourhood values, and relentless follow-through make him the most trusted name on our sales floor.',
    email: 'rs4249841@gmail.com', fb: 'https://www.facebook.com/share/193Cjzcb4v/',
    img: '/sales_manager_r.png',
  },
  {
    id: 's2', name: 'Hasnain Jaffar', role: 'Digital Marketing Manager',
    bio: "Husnain leads Trust's digital presence across platforms — crafting campaigns that bring the right buyers to the right properties. He specialises in luxury property marketing, drone photography coordination, and data-driven lead generation.",
    email: 'husnainjaffar36@gmail.com', fb: 'https://www.facebook.com/share/1Aw2ctpruJ/',
    img: '/image.png',
  },
];

const lawyers = [
  {
    id: 'l1', name: 'Rana Muhammad Rizwan Arshad Advocate', role: 'Legal Counsel — Contracts & Disputes',
    bio: 'Called to the Bar with 20 years of specialisation in Pakistani property law, handles all contractual negotiations, dispute resolutions, and regulatory compliance for Trust Real Estate. With a reputation for precision and composure, she protects our clients',
    email: 'ranarizwankhan548@gmail.com', fb: 'https://www.facebook.com/share/1C2WzQGEh3/?mibextid=wwXIfr',
    img: "/lawyer_1.png",
  }
  // { id:'l2', name:'Advocate Amna Rizvi', role:'Legal Counsel — ',
  //   bio:"Amna handles all contractual negotiations, dispute resolutions, and regulatory compliance for Trust Real Estate. With a reputation for precision and composure, she protects our clients' interests at every legal junction.",
  //   email:'amna.legal@trustrealestate.pk', insta:'#',
  //   img:'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80' },
];

function DirectorCard({ member, index }) {
  const imgRef = useRef(null);
  return (
    <article className="dir-card"
      onMouseEnter={() => gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })}
      aria-label={`${member.name}, ${member.role}`}>
      <div className="dir-img-wrap">
        <Image ref={imgRef} src={member.img} alt={member.name} fill className="dir-img" sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'contain' }} />
        <div className="dir-img-overlay" /><div className="dir-img-gradient" />
        <span className="dir-index" aria-hidden="true">0{index + 1}</span>
      </div>
      <div className="dir-body">
        <div className="dir-head">
          <div><p className="dir-role">{member.role}</p><h3 className="dir-name">{member.name}</h3></div>
          <div className="dir-actions">
            <a href={`mailto:${member.email}`} className="dir-action-btn" aria-label={`Email ${member.name}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
            {member.fb ? (
              <a href={member.fb} target="_blank" rel="noopener noreferrer" className="dir-action-btn" aria-label={`Facebook of ${member.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            ) : (
              <a href={member.insta} target="_blank" rel="noopener noreferrer" className="dir-action-btn" aria-label={`Instagram of ${member.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <blockquote className="dir-quote">{member.quote}</blockquote>
        <p className="dir-bio">{member.bio}</p>
        <div className="dir-divider" aria-hidden="true" />
        <p className="dir-email-display">{member.email}</p>
      </div>
    </article>
  );
}

function MemberCard({ member, tier }) {
  const imgRef = useRef(null);
  return (
    <article className={`member-card member-card--${tier}`}
      onMouseEnter={() => gsap.to(imgRef.current, { scale: 1.07, duration: 0.55, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: 'power2.out' })}
      aria-label={`${member.name}, ${member.role}`}>
      <div className="mc-img-wrap">
        <Image ref={imgRef} src={member.img} alt={member.name} fill className="mc-img" sizes="180px" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="mc-overlay" />
      </div>
      <div className="mc-body">
        <p className="mc-role">{member.role}</p>
        <h3 className="mc-name">{member.name}</h3>
        <p className="mc-bio">{member.bio}</p>
        <div className="mc-links">
          <a href={`mailto:${member.email}`} className="mc-link" aria-label={`Email ${member.name}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {member.email}
          </a>
          {member.fb ? (
            <a href={member.fb} target="_blank" rel="noopener noreferrer" className="mc-icon-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          ) : (
            <a href={member.insta} target="_blank" rel="noopener noreferrer" className="mc-icon-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          )}
        </div>
        <div className="mc-bottom-line" aria-hidden="true" />
      </div>
    </article>
  );
}

function TierDivider({ label, icon }) {
  return (
    <div className="tier-divider" aria-label={label}>
      <div className="tier-line" aria-hidden="true" />
      <h2 className="tier-label">
        <span className="tier-icon" aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </h2>
      <div className="tier-line" aria-hidden="true" />
    </div>
  );
}

export default function TeamPage() {
  const router = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.tp-header-text > *', { opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.15 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="tp-page">
      <header className="tp-header">
        <div className="tp-header-bg-img-wrap">
          <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=75"
            alt="Professional real estate advisors meeting at Trust Real Estate office in Sahiwal" fill priority className="tp-header-bg-img" sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div className="tp-header-overlay" /><div className="tp-header-gradient" />
        </div>
        <div className="tp-header-text">
          <p className="section-tag">The People Behind the Promise</p>
          <h1 className="tp-title">Meet the<br /><em>Trust Team</em></h1>
          <p className="tp-subtitle">Six dedicated professionals — directors, marketers, sales experts, and legal counsel — united by one standard: yours.</p>
        </div>
        <div className="corner corner-tl" aria-hidden="true" />
        <div className="corner corner-tr" aria-hidden="true" />
        <div className="corner corner-bl" aria-hidden="true" />
        <div className="corner corner-br" aria-hidden="true" />
      </header>

      <div className="tp-main">
        <TierDivider label="Board of Directors" icon="◈" />
        <section className="tp-tier" aria-label="Directors">
          <div className="dir-grid">
            {directors.map((m, i) => (
              <div key={m.id} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-duration="800" data-aos-delay={i * 100}>
                <DirectorCard member={m} index={i} />
              </div>
            ))}
          </div>
        </section>

        <TierDivider label="Marketing & Sales" icon="✦" />
        <section className="tp-tier" aria-label="Marketing and Sales">
          <div className="member-grid">
            {specialists.map((m, i) => (
              <div key={m.id} data-aos="fade-up" data-aos-delay={i * 120} data-aos-duration="700">
                <MemberCard member={m} tier="specialist" />
              </div>
            ))}
          </div>
        </section>

        <TierDivider label="Legal Counsel" icon="⚖" />
        <section className="tp-tier" aria-label="Legal team">
          <div className="member-grid">
            {lawyers.map((m, i) => (
              <div key={m.id} data-aos="fade-up" data-aos-delay={i * 120} data-aos-duration="700">
                <MemberCard member={m} tier="lawyer" />
              </div>
            ))}
          </div>
        </section>

        <div className="tp-join-cta" data-aos="zoom-in" data-aos-duration="700" data-aos-offset="100">
          <div className="tp-join-inner">
            <p className="section-tag" style={{ marginBottom: '16px' }}>Careers</p>
            <h2 className="tp-join-heading">Exceptional people belong<br /><em>at exceptional places.</em></h2>
            <p className="tp-join-body">We're always looking for talented, driven individuals who share our commitment to excellence. If that sounds like you, we'd love to hear from you.</p>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
