import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES KO "public/investbeans/" FOLDER MEIN RAKH DO (project root ke andar)
// Example structure:
//   your-project/
//     public/
//       investbeans/
//         img1.png
//         img2.png
//         img3.png
//         img4.png
//         img5.png
//     src/
//       ...
// ─────────────────────────────────────────────────────────────────────────────
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

// ── Animated Counter Hook ─────────────────────────────────────────────────────
const useCounter = (target, duration = 1.8, shouldStart = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) { setCount(0); return; }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);
  return count;
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ numeric, suffix, label, shouldStart }) => {
  const count = useCounter(numeric, 1.8, shouldStart);
  return (
    <div className="ib-stat group relative bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 text-center hover:border-emerald-500/40 hover:bg-slate-800/70 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <p className="text-3xl sm:text-4xl font-black text-white mb-1 tabular-nums relative z-10">
        {count}{suffix}
      </p>
      <p className="text-xs text-slate-500 font-bold tracking-widest uppercase relative z-10">{label}</p>
    </div>
  );
};

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 border-2 border-slate-700 rounded-full" />
      <div className="absolute inset-0 border-2 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// ── Browser Bar ───────────────────────────────────────────────────────────────
const BrowserBar = ({ label }) => (
  <div className="flex-shrink-0 bg-slate-800/90 px-3 py-2 flex items-center gap-1.5 border-b border-slate-700/50">
    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 flex-shrink-0" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 flex-shrink-0" />
    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 flex-shrink-0" />
    <span className="ml-2 text-xs text-slate-500 font-mono truncate">{label}</span>
  </div>
);

// ── Gallery Card ──────────────────────────────────────────────────────────────
const GalleryCard = ({ img, loaded, onLoad, accentColor, imgHeight, className }) => (
  <div
    className={
      'ib-gallery-card group relative rounded-2xl overflow-hidden border border-slate-700/40 ' +
      'hover:border-' + accentColor + '-500/40 ' +
      'transition-all duration-500 cursor-pointer shadow-xl shadow-black/40 flex flex-col ' +
      (className || '')
    }
  >
    <BrowserBar label={img.label} />
    <div className="relative overflow-hidden bg-slate-900 flex-1" style={{ minHeight: imgHeight }}>
      {!loaded && <Spinner />}
      <img
        src={img.src}
        alt={img.label}
        onLoad={onLoad}
        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 z-10">
        <span
          className={
            'text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ' +
            'text-' + accentColor + '-400 bg-' + accentColor + '-500/20 border border-' + accentColor + '-500/30'
          }
        >
          {img.label}
        </span>
      </div>
    </div>
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const InvestBeansShowcase = () => {
  const sectionRef = useRef(null);
  const heroRef    = useRef(null);
  const galleryRef = useRef(null);
  const statsRef   = useRef(null);

  const [activeImg,    setActiveImg]    = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [statsVisible, setStatsVisible] = useState(false);

  const markLoaded = (i) => setLoadedImages((prev) => ({ ...prev, [i]: true }));

  // Pre-load all images
  useEffect(() => {
    IMAGES.forEach((imgObj, i) => {
      const image = new window.Image();
      image.src = imgObj.src;
      image.onload  = () => markLoaded(i);
      image.onerror = () => markLoaded(i);
      if (image.complete) markLoaded(i);
    });
  }, []);

  // GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ib-hero-line', {
        y: 80, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.ib-tag', {
        scale: 0.6, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.ib-tags-row', start: 'top 88%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.ib-gallery-card', {
        y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.ib-stat', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter:     () => setStatsVisible(true),
        onLeaveBack: () => setStatsVisible(false),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-rotate
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
            backgroundImage:
              'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
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
        <div ref={heroRef} className="mb-16 sm:mb-24">
          <div className="ib-hero-line flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-emerald-500/60" />
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Case Study</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-emerald-500/60" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="ib-hero-line text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
                Invest
                <span
                  className="block"
                  style={{ WebkitTextStroke: '2px', WebkitTextStrokeColor: 'rgb(52 211 153)', color: 'transparent' }}
                >
                  Beans
                </span>
              </h2>
              <p className="ib-hero-line text-slate-400 text-base sm:text-lg leading-relaxed max-w-md mb-8">
                A full-stack stock intelligence platform featuring live market data,
                TradingView-powered charts, heatmaps, and India + US market dashboards —
                all in a sleek dark UI.
              </p>
              <div className="ib-tags-row flex flex-wrap gap-2">
                {TAGS.map((tag, i) => (
                  <span key={i} className="ib-tag px-3 py-1.5 text-xs font-bold tracking-wider text-emerald-400 border border-emerald-500/30 rounded-full bg-emerald-500/10 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Auto-slider */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-2xl scale-110" />
              <div className="ib-hero-line relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/50">
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
                <div className="relative overflow-hidden bg-slate-900" style={{ height: '280px' }}>
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
                      {!loadedImages[i] && <Spinner />}
                      <img
                        src={img.src}
                        alt={img.label}
                        onLoad={() => markLoaded(i)}
                        className="w-full h-full object-cover object-top"
                        style={{ opacity: loadedImages[i] ? 1 : 0, transition: 'opacity 0.5s ease' }}
                      />
                    </div>
                  ))}
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
            <StatCard key={i} {...stat} shouldStart={statsVisible} />
          ))}
        </div>

        {/* ── GALLERY ── */}
        <div ref={galleryRef}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-transparent" />
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">All Screens</span>
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-500/40 to-transparent" />
          </div>

          {/* Row 1 — equal height via grid rows */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4" style={{ gridAutoRows: '260px' }}>
            <GalleryCard
              img={IMAGES[0]}
              loaded={loadedImages[0]}
              onLoad={() => markLoaded(0)}
              accentColor="emerald"
              imgHeight="210px"
              className="md:col-span-3"
            />
            <GalleryCard
              img={IMAGES[1]}
              loaded={loadedImages[1]}
              onLoad={() => markLoaded(1)}
              accentColor="teal"
              imgHeight="210px"
              className="md:col-span-2"
            />
          </div>

          {/* Row 2 — equal height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ gridAutoRows: '240px' }}>
            {IMAGES.slice(2).map((img, i) => (
              <GalleryCard
                key={i}
                img={img}
                loaded={loadedImages[i + 2]}
                onLoad={() => markLoaded(i + 2)}
                accentColor={i === 1 ? 'teal' : 'emerald'}
                imgHeight="190px"
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 sm:mt-24 relative rounded-3xl overflow-hidden border border-slate-700/40">
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