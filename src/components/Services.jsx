'use client';
import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '@/data/servicesData';
import './Services.css';

function ServiceCard({ s, index }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      data-aos-duration="700"
    >
      <Link href={`/services/${s.slug}`} className="service-card-link" style={{ textDecoration: 'none', display: 'block' }}>
        <article
          className="service-card"
          role="listitem"
          data-cursor
          tabIndex={0}
          aria-label={`${s.title} — Learn more`}
        >
          <div className="card-img-wrap">
            <Image src={s.img} alt={s.imgAlt || s.title} fill className="card-img" sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
            <div className="card-img-overlay" />
            <div className="card-img-tint" />
          </div>
          <div className="card-body">
            <div className="card-top-row">
              <span className="card-tag">{s.tag}</span>
              <span className="card-icon" aria-hidden="true">{s.icon}</span>
            </div>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-desc">{s.desc}</p>
            <div className="card-learn">
              <span>Learn More</span>
              <span className="card-arrow" aria-hidden="true">→</span>
            </div>
          </div>
          <div className="card-line" aria-hidden="true" />
        </article>
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section className="services-section" id="services" aria-label="Services">
      <div className="services-inner">

        <div className="services-heading-block" data-aos="fade-up">
          <p className="section-tag">What We Offer</p>
          <h2 className="services-title">Exceptional Service,<br /><em>At Every Turn</em></h2>
          <div className="gold-line" style={{ margin:'28px auto 0' }} />
        </div>

        <div className="services-grid" role="list">
          {servicesData.map((s, i) => <ServiceCard key={s.tag} s={s} index={i} />)}
        </div>

      </div>
    </section>
  );
}
