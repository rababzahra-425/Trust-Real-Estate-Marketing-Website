// 'use client';
// import { useState } from 'react';
// import './Properties.css';

// const properties = [
//   { id: 1, title: 'The Meridian Penthouse', location: 'DHA Phase 6, Lahore', price: '₨ 4.8 Crore', type: 'Residential', beds: 5, area: '8,200 sq ft', status: 'Available', img: '/100marla.png' },
//   { id: 2, title: 'Villa Solara', location: 'Bahria Town, Islamabad', price: '₨ 3.2 Crore', type: 'Residential', beds: 4, area: '6,500 sq ft', status: 'Available', img: '/villa_solara.png' },
//   { id: 3, title: 'The Crown Plaza', location: 'Gulberg, Lahore', price: '₨ 12 Crore', type: 'Commercial', beds: null, area: '18,000 sq ft', status: 'Limited', img: '/crown_plaza.png' },
//   { id: 4, title: 'Azure Residence', location: 'E-7, Islamabad', price: '₨ 2.9 Crore', type: 'Residential', beds: 4, area: '5,800 sq ft', status: 'Available', img: '/azure_residence.png' },
//   { id: 5, title: 'Heritage Manor', location: 'Model Town, Lahore', price: '₨ 6.5 Crore', type: 'Residential', beds: 6, area: '11,000 sq ft', status: 'Available', img: '/heritage_manor.png' },
//   { id: 6, title: 'The Obsidian Tower', location: 'Clifton, Karachi', price: '₨ 18 Crore', type: 'Commercial', beds: null, area: '32,000 sq ft', status: 'New', img: '/obsidian_tower.png' },
// ];

// export default function Properties() {
//   const [filter, setFilter] = useState('All');
//   const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter);

//   return (
//     <section className="properties-section" id="properties" aria-label="Properties">
//       <div className="properties-inner">

//         <div className="properties-head">
//           <div className="prop-head-left" data-aos="fade-right">
//             <p className="section-tag">Our Portfolio</p>
//             <h2 className="prop-title">Curated for the<br /><em>Exceptional Few</em></h2>
//           </div>
//           <div className="prop-filters" role="group" aria-label="Filter properties" data-aos="fade-left">
//             {['All', 'Residential', 'Commercial'].map(f => (
//               <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
//                 onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>
//             ))}
//           </div>
//         </div>

//         <div className="prop-grid">
//           {filtered.map((p, i) => (
//             <article key={p.id} className="prop-card" data-cursor
//               data-aos="fade-up"
//               data-aos-delay={i * 80}
//               data-aos-duration="650">
//               <div className="prop-img-wrap">
//                 <img src={p.img} alt={p.title} className="prop-img" />
//                 <div className="prop-img-overlay" />
//                 <span className={`prop-status status-${p.status.toLowerCase()}`}>{p.status}</span>
//                 <span className="prop-type-badge">{p.type}</span>
//               </div>
//               <div className="prop-info">
//                 <div className="prop-meta-row">
//                   <span className="prop-location">📍 {p.location}</span>
//                   {p.beds && <span className="prop-beds">{p.beds} Beds</span>}
//                 </div>
//                 <h3 className="prop-name">{p.title}</h3>
//                 <div className="prop-bottom">
//                   <span className="prop-area">{p.area}</span>
//                   <span className="prop-price">{p.price}</span>
//                 </div>
//                 <button className="prop-cta" aria-label={`Enquire about ${p.title}`}>Enquire Now</button>
//               </div>
//             </article>
//           ))}
//         </div>

//         <div className="prop-cta-row" data-aos="fade-up" data-aos-delay="100">
//           <button className="btn-ghost"
//             onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
//             View Full Portfolio
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }







'use client';
import { useState } from 'react';
import Image from 'next/image';
import './Properties.css';

const properties = [

  { id: 1, title: 'The Premium First Deal', type: 'Residential', marla: '10 Marla in Society', img: '/1stdeall.png' },
  { id: 2, title: 'Milestone: The 100-Marla Mega Deal', type: 'Residential', marla: '100+ Marla', img: '/100marla.png' },
  // { id: 3, title: 'The Crown Plaza', type: 'Commercial', marla: '80 Marla', img: '/crown_plaza.png' },
  // { id: 4, title: 'Azure Residence', type: 'Residential', marla: '10 Marla', img: '/azure_residence.png' },
  // { id: 5, title: 'Heritage Manor', type: 'Residential', marla: '20 Marla', img: '/heritage_manor.png' },
  // { id: 6, title: 'The Obsidian Tower', type: 'Commercial', marla: '150 Marla', img: '/obsidian_tower.png' },
];

export default function Properties() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter);

  return (
    <section className="properties-section" id="properties" aria-label="Properties">
      <div className="properties-inner">

        <div className="properties-head">
          <div className="prop-head-left" data-aos="fade-right">
            <p className="section-tag">Our Portfolio</p>
            <h2 className="prop-title">Curated for the<br /><em>Exceptional Few</em></h2>
          </div>
          <div className="prop-filters" role="group" aria-label="Filter properties" data-aos="fade-left">
            {['All', 'Residential', 'Commercial'].map(f => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)} aria-pressed={filter === f}>{f}</button>
            ))}
          </div>
        </div>

        <div className="prop-grid">
          {filtered.map((p, i) => (
            <article key={p.id} className="prop-card" data-cursor
              data-aos="fade-up"
              data-aos-delay={i * 80}
              data-aos-duration="650">
              <div className="prop-img-wrap">
                <Image src={p.img} alt={p.title} fill className="prop-img" sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                <div className="prop-img-overlay" />
                <span className="prop-type-badge">{p.type}</span>
              </div>
              <div className="prop-info">
                <h3 className="prop-name">{p.title}</h3>
                <div className="prop-bottom">
                  <span className="prop-area">{p.marla}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}