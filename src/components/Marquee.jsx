'use client';
import './Marquee.css';

const items = ['Trust Real Estate Marketing','✦','Kalma Garden','✦','Plaza Street no.2, near Shopping Club','✦','Commercial Market Sahiwal, 57000','✦'];

export default function Marquee() {
  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item === '✦' ? 'marquee-sep' : 'marquee-item'}>{item}</span>
        ))}
      </div>
    </div>
  );
}
