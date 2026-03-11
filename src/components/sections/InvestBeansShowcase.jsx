import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// Put images in:  public/investbeans/img1.png ... img5.png
// ─────────────────────────────────────────────────────────────────────
const IMAGES = [
  { src: '/investbeans/img1.png', label: 'Hero — BeansIndex' },
  { src: '/investbeans/img2.png', label: 'Market Dashboard' },
  { src: '/investbeans/img3.png', label: 'Live Stock Charts' },
  { src: '/investbeans/img4.png', label: 'Market Heatmap' },
  { src: '/investbeans/img5.png', label: 'Global Markets' },
];

const TAGS = ['React.js', 'TradingView', 'Live Data', 'Responsive', 'Dark UI', 'Stock Analytics'];

const STATS = [
  { numeric: 5,   suffix: '+', label: 'Dashboard Modules' },
  { numeric: 15,  suffix: 'm', label: 'Delayed Live Data' },
  { numeric: 100, suffix: '%', label: 'Responsive' },
  { numeric: 2,   suffix: '',  label: 'Market Modes' },
];

// ── Counter Hook ──────────────────────────────────────────────────────
const useCounter = (target, duration = 1.8, shouldStart = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) { setCount(0); return; }
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);
  return count;
};

// ── Stat Card ─────────────────────────────────────────────────────────
const StatCard = ({ numeric, suffix, label, shouldStart }) => {
  const count = useCounter(numeric, 1.8, shouldStart);
  return (
    <div className="group relative bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 text-center hover:border-emerald-500/40 hover:bg-slate-800/70 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <p className="text-3xl sm:text-4xl font-black text-white mb-1 tabular-nums relative z-10">{count}{suffix}</p>
      <p className="text-xs text-slate-500 font-bold tracking-widest uppercase relative z-10">{label}</p>
    </div>
  );
};

// ── Browser Bar ───────────────────────────────────────────────────────
const BrowserBar = ({ label }) => (
  <div className="flex-shrink-0 bg-slate-800/90 px-3 py-2 flex items-center gap-1.5 border-b border-slate-700/50">
    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 flex-shrink-0" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 flex-shrink-0" />
    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 flex-shrink-0" />
    <span className="ml-2 text-xs text-slate-500 font-mono truncate">{label}</span>
  </div>
);

// ── Gallery Card ──────────────────────────────────────────────────────
const GalleryCard = ({ img, accentColor = 'emerald', style = {}, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  return (
    <div
      style={style}
      className={
        'group relative rounded-2xl overflow-hidden border border-slate-700/40 ' +
        'transition-all duration-500 cursor-pointer shadow-xl shadow-black/40 flex flex-col ' +
        className
      }
    >
      <BrowserBar label={img.label} />
      <div className="relative flex-1 bg-slate-900 overflow-hidden" style={{ minHeight: '200px' }}>
        {/* Spinner while loading */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-slate-700 rounded-full" />
              <div className="absolute inset-0 border-2 border-t-emerald-400 border-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
        {/* Error fallback */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-slate-600 text-lg">?</span>
            </div>
            <span className="text-xs text-slate-600">{img.label}</span>
          </div>
        )}
        <img
          src={img.src}
          alt={img.label}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          style={{ opacity: loaded && !error ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 z-10">
          <span className={'text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-' + accentColor + '-400 bg-' + accentColor + '-500/20 border border-' + accentColor + '-500/30'}>
            {img.label}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────────
const InvestBeansShowcase = () => {
  const sectionRef = useRef(null);
  const statsRef   = useRef(null);

  const [activeImg,    setActiveImg]    = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [sliderLoaded, setSliderLoaded] = useState({});

  const markSlider = (i) => setSliderLoaded((p) => ({ ...p, [i]: true }));

  // ── GSAP: use fromTo + once:true + clearProps so elements are never stuck invisible
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 0px)', () => {

      // Helper — safe animate that always ends visible
      const animate = (selector, vars, triggerEl) => {
        const els = sectionRef.current ? sectionRef.current.querySelectorAll(selector) : [];
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: vars.y || 0 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: vars.duration || 0.9,
          stagger: vars.stagger || 0,
          ease: vars.ease || 'power3.out',
          delay: vars.delay || 0,
          clearProps: 'all', // remove inline styles after animation — prevents stuck states
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 88%',
            once: true, // fire once, never reverse — content stays visible
          },
        });
      };

      const sec = sectionRef.current;
      animate('.ib-eyebrow',     { duration: 0.8 }, sec);
      animate('.ib-title',       { y: 60, duration: 1, stagger: 0.1 }, sec);
      animate('.ib-desc',        { y: 40, duration: 0.8, delay: 0.2 }, sec);
      animate('.ib-tag',         { y: 20, duration: 0.5, stagger: 0.06, delay: 0.3 }, sec);
      animate('.ib-slider-wrap', { y: 50, duration: 1, delay: 0.1 }, sec);
      animate('.ib-stat-card',   { y: 40, duration: 0.8, stagger: 0.1 }, statsRef.current);
      animate('.ib-gallery-row', { y: 60, duration: 0.9, stagger: 0.15 }, sec);
      animate('.ib-cta',         { y: 40, duration: 0.8 }, sec);

      // Counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => setStatsVisible(true),
      });
    });

    return () => mm.revert();
  }, []);

  // Auto-rotate slider
  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % IMAGES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
          style={{ transform: 'rotate(12deg)', transformOrigin: 'top center' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div className="mb-16 sm:mb-24">
          {/* Eyebrow */}
          <div className="ib-eyebrow flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-emerald-500/60" />
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Case Study</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-emerald-500/60" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <h2 className="ib-title text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-2">
                Invest
              </h2>
              <h2
                className="ib-title text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
                style={{ WebkitTextStroke: '2px', WebkitTextStrokeColor: 'rgb(52 211 153)', color: 'transparent' }}
              >
                Beans
              </h2>
              <p className="ib-desc text-slate-400 text-base sm:text-lg leading-relaxed max-w-md mb-8">
                A full-stack stock intelligence platform featuring live market data,
                TradingView-powered charts, heatmaps, and India + US market dashboards —
                all in a sleek dark UI.
              </p>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag, i) => (
                  <span key={i} className="ib-tag px-3 py-1.5 text-xs font-bold tracking-wider text-emerald-400 border border-emerald-500/30 rounded-full bg-emerald-500/10 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — slider */}
            <div className="ib-slider-wrap relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-2xl scale-110" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/50">
                {/* Browser top bar */}
                <div className="bg-slate-800/90 px-4 py-2.5 flex items-center gap-2 border-b border-slate-700/60">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <div className="ml-3 flex-1 bg-slate-700/50 rounded-md px-3 py-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-400 text-xs font-mono">investbeans.com</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">LIVE</span>
                </div>

                {/* Slides */}
                <div className="relative bg-slate-900 overflow-hidden" style={{ height: '280px' }}>
                  {IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        opacity: activeImg === i ? 1 : 0,
                        transform: activeImg === i ? 'scale(1)' : 'scale(1.04)',
                        zIndex: activeImg === i ? 1 : 0,
                      }}
                    >
                      {/* Spinner */}
                      {!sliderLoaded[i] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 border-2 border-slate-700 rounded-full" />
                            <div className="absolute inset-0 border-2 border-t-emerald-400 border-transparent rounded-full animate-spin" />
                          </div>
                        </div>
                      )}
                      <img
                        src={img.src}
                        alt={img.label}
                        onLoad={() => markSlider(i)}
                        onError={() => markSlider(i)}
                        className="w-full h-full object-cover object-top"
                        style={{ opacity: sliderLoaded[i] ? 1 : 0, transition: 'opacity 0.5s ease' }}
                      />
                    </div>
                  ))}
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {IMAGES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: activeImg === i ? '20px' : '6px',
                          height: '6px',
                          backgroundColor: activeImg === i ? 'rgb(52 211 153)' : 'rgba(148 163 184 / 0.4)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating chip */}
              <div className="absolute -bottom-4 -right-4 bg-slate-800 border border-emerald-500/30 rounded-xl px-4 py-2 shadow-xl z-10">
                <p className="text-xs text-slate-400 font-mono">Currently viewing</p>
                <p className="text-sm font-bold text-emerald-400">{IMAGES[activeImg].label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 sm:mb-24">
          {STATS.map((stat, i) => (
            <div key={i} className="ib-stat-card">
              <StatCard {...stat} shouldStart={statsVisible} />
            </div>
          ))}
        </div>

        {/* ── GALLERY ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-transparent" />
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">All Screens</span>
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-500/40 to-transparent" />
          </div>

          {/* Row 1 */}
          <div className="ib-gallery-row grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-3" style={{ height: '260px' }}>
              <GalleryCard img={IMAGES[0]} accentColor="emerald" className="h-full" />
            </div>
            <div className="md:col-span-2" style={{ height: '260px' }}>
              <GalleryCard img={IMAGES[1]} accentColor="teal" className="h-full" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="ib-gallery-row grid grid-cols-1 sm:grid-cols-3 gap-4">
            {IMAGES.slice(2).map((img, i) => (
              <div key={i} style={{ height: '240px' }}>
                <GalleryCard img={img} accentColor={i === 1 ? 'teal' : 'emerald'} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ib-cta mt-16 sm:mt-24 relative rounded-3xl overflow-hidden border border-slate-700/40">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-slate-800/60 to-teal-500/10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="relative px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-2">Built by Strategix</p>
              <h4 className="text-2xl sm:text-3xl font-black text-white">Want something like this?</h4>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 font-black text-sm tracking-wider uppercase rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
            >
              Lets Build It
            </a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        </div>

      </div>
    </section>
  );
};

export default InvestBeansShowcase;