import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// Put images in: public/docpad/
// img1.png = Login page
// img2.png = Select Hospital
// img3.png = Dashboard (full)
// img4.png = New OPD Visit - Patient Lookup
// img5.png = Patient already exists modal
// img6.png = Patient Profile - Current Encounter
// img7.png = Patient Profile - Summary / Health Timeline
// img8.png = Patient Profile - Medications / Vitals
// ─────────────────────────────────────────────────────────────────────
const IMAGES = [
  { src: '/docpad/img1.png', label: 'Secure Login', tag: 'Auth' },
  { src: '/docpad/img2.png', label: 'Hospital Select', tag: 'Onboarding' },
  { src: '/docpad/img3.png', label: 'Clinical Dashboard', tag: 'Dashboard' },
  { src: '/docpad/img4.png', label: 'OPD Patient Lookup', tag: 'OPD Flow' },
  { src: '/docpad/img5.png', label: 'Patient Found Modal', tag: 'UX' },
  { src: '/docpad/img6.png', label: 'Patient Encounter', tag: 'Clinical' },
  { src: '/docpad/img7.png', label: 'Health Timeline', tag: 'Records' },
  { src: '/docpad/img8.png', label: 'Vitals & History', tag: 'Records' },
];

const TAGS = ['React.js', 'Node.js', 'HIPAA Concepts', 'Multi-Hospital', 'OPD Workflow', 'Clinical UI'];

const STATS = [
  { numeric: 8,   suffix: '+', label: 'App Modules' },
  { numeric: 3,   suffix: '',  label: 'Workflow Steps' },
  { numeric: 100, suffix: '%', label: 'Responsive' },
  { numeric: 1,   suffix: '',  label: 'Unified Platform' },
];

const FEATURES = [
  {
    icon: '🏥',
    title: 'Multi-Hospital Support',
    desc: 'Doctors switch between facilities with one click. Hospital-scoped data stays isolated and secure.',
  },
  {
    icon: '🔍',
    title: 'Smart Patient Lookup',
    desc: 'Search by Mobile, Aadhaar, or ABHA ID. Instant deduplication prevents double registration.',
  },
  {
    icon: '📋',
    title: 'OPD Encounter Flow',
    desc: '3-step guided flow: lookup → registration → encounter. Chief complaint, vitals, and prescriptions in one place.',
  },
  {
    icon: '📈',
    title: 'Health Timeline',
    desc: 'Visual encounter history across OPD, IPD, Surgery, Emergency, and Follow-up visits on a single timeline.',
  },
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
    <div className="group relative rounded-2xl p-6 text-center overflow-hidden transition-all duration-500"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'rgba(99,102,241,0.08)' }} />
      <p className="text-3xl sm:text-4xl font-black text-white mb-1 tabular-nums relative z-10">
        {count}{suffix}
      </p>
      <p className="text-xs font-bold tracking-widest uppercase relative z-10"
        style={{ color: 'rgba(165,180,252,0.7)' }}>{label}</p>
    </div>
  );
};

// ── Browser Chrome ────────────────────────────────────────────────────
const BrowserChrome = ({ url = 'docpad.app', isLight = false }) => (
  <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 border-b"
    style={{
      background: isLight ? '#f8faff' : 'rgba(15,16,36,0.95)',
      borderColor: isLight ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.08)'
    }}>
    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#ff5f57' }} />
    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#febc2e' }} />
    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#28c840' }} />
    <div className="ml-2 flex-1 flex items-center gap-1.5 rounded-md px-2.5 py-1"
      style={{ background: isLight ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)', maxWidth: '200px' }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#6366f1' }} />
      <span className="text-xs font-mono truncate" style={{ color: isLight ? '#6366f1' : 'rgba(165,180,252,0.6)' }}>{url}</span>
    </div>
    <span className="ml-auto text-xs font-bold" style={{ color: '#6366f1' }}>LIVE</span>
  </div>
);

// ── Gallery Card ──────────────────────────────────────────────────────
const GalleryCard = ({ img, isLight = false, style = {}, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  return (
    <div
      style={{ ...style, border: '1px solid rgba(99,102,241,0.2)' }}
      className={'group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-xl flex flex-col ' + className}
    >
      <BrowserChrome url="docpad-y0a2.onrender.com" isLight={isLight} />
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: '180px', background: isLight ? '#f0f4ff' : '#0a0b1a' }}>
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(99,102,241,0.15)' }} />
              <div className="absolute inset-0 rounded-full animate-spin" style={{ border: '2px solid transparent', borderTopColor: '#6366f1' }} />
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-2">
            <span className="text-2xl">🏥</span>
            <span className="text-xs" style={{ color: 'rgba(165,180,252,0.5)' }}>{img.label}</span>
          </div>
        )}
        <img
          src={img.src}
          alt={img.label}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
          style={{ opacity: loaded && !error ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,11,26,0.9), transparent)' }} />
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
            {img.tag}
          </span>
          <span className="text-xs font-semibold text-white">{img.label}</span>
        </div>
      </div>
    </div>
  );
};

// ── Feature Card ──────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group rounded-2xl p-5 transition-all duration-400"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.12)' }}>
    <div className="text-2xl mb-3">{icon}</div>
    <h4 className="font-bold text-white text-sm mb-2 tracking-tight">{title}</h4>
    <p className="text-xs leading-relaxed" style={{ color: 'rgba(165,180,252,0.65)' }}>{desc}</p>
  </div>
);

// ── MAIN ─────────────────────────────────────────────────────────────
const DocPadShowcase = () => {
  const sectionRef  = useRef(null);
  const statsRef    = useRef(null);

  const [activeImg,    setActiveImg]    = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [sliderLoaded, setSliderLoaded] = useState({});

  const markSlider = (i) => setSliderLoaded((p) => ({ ...p, [i]: true }));

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 0px)', () => {
      const animate = (selector, vars, triggerEl) => {
        const els = sectionRef.current ? sectionRef.current.querySelectorAll(selector) : [];
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: vars.y || 0 });
        gsap.to(els, {
          opacity: 1, y: 0,
          duration: vars.duration || 0.9,
          stagger: vars.stagger || 0,
          ease: vars.ease || 'power3.out',
          delay: vars.delay || 0,
          clearProps: 'all',
          scrollTrigger: { trigger: triggerEl, start: 'top 88%', once: true },
        });
      };

      const sec = sectionRef.current;
      animate('.dp-eyebrow',      { duration: 0.7 }, sec);
      animate('.dp-title',        { y: 50, duration: 0.9, stagger: 0.08 }, sec);
      animate('.dp-desc',         { y: 30, duration: 0.8, delay: 0.2 }, sec);
      animate('.dp-tag',          { y: 20, duration: 0.5, stagger: 0.05, delay: 0.25 }, sec);
      animate('.dp-slider-wrap',  { y: 50, duration: 1, delay: 0.1 }, sec);
      animate('.dp-stat-card',    { y: 40, duration: 0.8, stagger: 0.1 }, statsRef.current);
      animate('.dp-feature-card', { y: 40, duration: 0.7, stagger: 0.1 }, sec);
      animate('.dp-gallery-row',  { y: 60, duration: 0.9, stagger: 0.15 }, sec);
      animate('.dp-cta',          { y: 40, duration: 0.8 }, sec);

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
    const t = setInterval(() => setActiveImg((p) => (p + 1) % IMAGES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: 'linear-gradient(135deg, #05061a 0%, #090b24 50%, #05061a 100%)' }}
    >
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* Glows */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
        {/* Vertical accent line */}
        <div className="absolute top-0 left-1/3 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #6366f1, transparent)', transform: 'rotate(-8deg)', transformOrigin: 'top center' }} />
        {/* Cross marks */}
        <div className="absolute top-24 right-24 w-4 h-4 opacity-20" style={{ color: '#6366f1' }}>+</div>
        <div className="absolute bottom-32 left-20 w-4 h-4 opacity-20" style={{ color: '#818cf8' }}>+</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ HERO SECTION ══ */}
        <div className="mb-20 sm:mb-28">

          {/* Eyebrow */}
          <div className="dp-eyebrow flex items-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5))' }} />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-indigo-300">Case Study</span>
            </div>
            <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(99,102,241,0.5))' }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* ── LEFT ── */}
            <div>
              {/* Title */}
              <div className="mb-6">
                <h2 className="dp-title font-black leading-none tracking-tight text-white"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                  Doc
                </h2>
                <h2
                  className="dp-title font-black leading-none tracking-tight"
                  style={{
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                    WebkitTextStroke: '2px #6366f1',
                    color: 'transparent',
                  }}
                >
                  Pad
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-0.5 w-12" style={{ background: '#6366f1' }} />
                  <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'rgba(165,180,252,0.7)' }}>
                    Clinical Suite
                  </span>
                </div>
              </div>

              <p className="dp-desc text-base sm:text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: 'rgba(203,213,255,0.65)' }}>
                A secure clinical workspace for hospital staff. OPD workflow,
                patient records, health timelines, and multi-hospital support —
                all in one HIPAA-inspired platform.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag, i) => (
                  <span key={i}
                    className="dp-tag px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full"
                    style={{ color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Role badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {['Doctor', 'Staff', 'Admin'].map((role, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-lg">
                      {['🩺', '🏥', '⚙️'][i]}
                    </span>
                    <span className="text-xs font-bold text-white">{role}</span>
                    <span className="text-xs" style={{ color: 'rgba(165,180,252,0.5)' }}>Portal</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Slider ── */}
            <div className="dp-slider-wrap relative">
              {/* Glow behind slider */}
              <div className="absolute inset-0 rounded-3xl opacity-30 scale-110 blur-3xl"
                style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }} />

              {/* Phone + browser frame hybrid */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 0 0 1px rgba(99,102,241,0.1), 0 32px 64px rgba(0,0,0,0.6)' }}>
                <BrowserChrome url="docpad-y0a2.onrender.com" isLight={false} />

                {/* Slides */}
                <div className="relative overflow-hidden" style={{ height: '300px', background: '#050614' }}>
                  {IMAGES.map((img, i) => (
                    <div key={i} className="absolute inset-0 transition-all duration-700"
                      style={{
                        opacity: activeImg === i ? 1 : 0,
                        transform: activeImg === i ? 'scale(1)' : 'scale(1.03)',
                        zIndex: activeImg === i ? 1 : 0,
                      }}>
                      {!sliderLoaded[i] && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(99,102,241,0.2)' }} />
                            <div className="absolute inset-0 rounded-full animate-spin" style={{ border: '2px solid transparent', borderTopColor: '#6366f1' }} />
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
                      <button key={i} onClick={() => setActiveImg(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: activeImg === i ? '18px' : '5px',
                          height: '5px',
                          background: activeImg === i ? '#6366f1' : 'rgba(165,180,252,0.3)',
                        }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating label chip */}
              <div className="absolute -bottom-5 -right-4 rounded-xl px-4 py-2 shadow-xl z-10"
                style={{ background: 'rgba(10,11,30,0.95)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <p className="text-xs font-mono" style={{ color: 'rgba(165,180,252,0.5)' }}>Currently viewing</p>
                <p className="text-sm font-bold text-indigo-300">{IMAGES[activeImg].label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ STATS ══ */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20 sm:mb-28">
          {STATS.map((stat, i) => (
            <div key={i} className="dp-stat-card">
              <StatCard {...stat} shouldStart={statsVisible} />
            </div>
          ))}
        </div>

        {/* ══ FEATURES ══ */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.4), transparent)' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(165,180,252,0.5)' }}>Key Features</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.4), transparent)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="dp-feature-card">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ GALLERY ══ */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.4), transparent)' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(165,180,252,0.5)' }}>All Screens</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(99,102,241,0.4), transparent)' }} />
          </div>

          {/* Row 1: 2 big cards */}
          <div className="dp-gallery-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div style={{ height: '280px' }}>
              <GalleryCard img={IMAGES[0]} className="h-full" />
            </div>
            <div style={{ height: '280px' }}>
              <GalleryCard img={IMAGES[2]} className="h-full" />
            </div>
          </div>

          {/* Row 2: 3 equal cards */}
          <div className="dp-gallery-row grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[IMAGES[3], IMAGES[4], IMAGES[5]].map((img, i) => (
              <div key={i} style={{ height: '240px' }}>
                <GalleryCard img={img} className="h-full" />
              </div>
            ))}
          </div>

          {/* Row 3: wide + narrow */}
          <div className="dp-gallery-row grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3" style={{ height: '240px' }}>
              <GalleryCard img={IMAGES[6]} className="h-full" />
            </div>
            <div className="md:col-span-2" style={{ height: '240px' }}>
              <GalleryCard img={IMAGES[7]} className="h-full" />
            </div>
          </div>
        </div>

        {/* ══ CTA ══ */}
        <div className="dp-cta relative rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(99,102,241,0.25)' }}>
          {/* Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(9,11,36,0.8) 50%, rgba(129,140,248,0.1) 100%)' }} />
          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.6), transparent)' }} />
          {/* Decorative circle */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

          <div className="relative px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#818cf8' }}>Built by Strategix</p>
              <h4 className="text-2xl sm:text-3xl font-black text-white">Want a clinical platform like this?</h4>
              <p className="text-sm mt-1" style={{ color: 'rgba(165,180,252,0.6)' }}>Healthcare, SaaS, Dashboards — we build it all.</p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 font-black text-sm tracking-wider uppercase rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
            >
              Lets Build It
            </a>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(129,140,248,0.5), transparent)' }} />
        </div>

      </div>
    </section>
  );
};

export default DocPadShowcase;