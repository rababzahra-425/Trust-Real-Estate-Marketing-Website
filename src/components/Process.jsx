'use client';
import './Process.css';

const steps = [
  { num:'01', title:'Consultation',       desc:'We talk with you to understand your needs, budget, and goals.' },
  { num:'02', title:'Property Selection', desc:'We choose the best properties that match what you are looking for.' },
  { num:'03', title:'Property Visit',     desc:'We arrange a visit so you can see the property at a time that suits you.' },
  { num:'04', title:'Easy Buying Process',desc:'We help you with all the paperwork and guide you until the property is yours.' },
];

export default function Process() {
  return (
    <section className="process-section" aria-label="Our process">
      <div className="process-inner">

        <div className="process-heading-block" data-aos="fade-right" data-aos-duration="800">
          <p className="section-tag">How It Works</p>
          <h2 className="process-title">A Journey Crafted<br /><em>Around You</em></h2>
          <p className="process-subtitle">Four deliberate steps. Zero compromise. One extraordinary outcome.</p>
        </div>

        <div className="process-steps" role="list">
          {steps.map((s, i) => (
            <div key={s.num} className="process-step" role="listitem"
              data-aos="fade-left"
              data-aos-delay={i * 120}
              data-aos-duration="700">
              <div className="step-connector" aria-hidden="true">
                <div className="step-num">{s.num}</div>
                {i < steps.length - 1 && <div className="step-line" />}
              </div>
              <div className="step-content">
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
