import React from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';
import { images } from '../../data/siteContent';

export default function ChromaGrid({ items }) {
  const data = items?.length ? items : [
    { title: 'Alex Rivera', subtitle: 'Full Stack Dev', image: images.portfolio[0], url: '#' },
    { title: 'Jordan Chen', subtitle: 'DevOps', image: images.portfolio[1], url: '#' },
    { title: 'Morgan Blake', subtitle: 'UI/UX', image: images.portfolio[2], url: '#' }
  ];

  return (
    <div className="chroma-grid" onMouseMove={(e) => { /* optional pointer interactions (kept minimal) */ }}>
      {data.map((d, i) => (
        <article key={i} className="chroma-card" onClick={() => window.open(d.url || '#', '_blank')}>
          <div><img src={d.image} alt={d.title} loading="lazy" /></div>
          <div className="chroma-info">
            <h3 className="text-lg font-semibold">{d.title}</h3>
            <p className="text-sm text-slate-400">{d.subtitle}</p>
          </div>
        </article>
      ))}
      <div className="chroma-overlay" />
    </div>
  );
}
