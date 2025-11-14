// src/components/services/ServicesWheel.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  Target,
  MessageCircle,
  Code,
  BarChart3,
  Rocket,
  X,
} from "lucide-react";

/**
 * Polished Services Wheel
 * - Professional iconography (lucide-react)
 * - Glassy circles, soft halo, subtle rings
 * - Smooth rotation via requestAnimationFrame (keeps your original pattern)
 * - Responsive (wheel on md+, grid on mobile)
 * - Keeps color palette from your `services` definitions (gradient names preserved)
 *
 * Paste this file to replace your existing ServicesWheel.jsx
 */

const services = [
  {
    key: "traffic",
    title: "Digital Marketing",
    shortDesc: "Drive Quality Traffic",
    fullDesc:
      "We improve acquisition and quality traffic through targeted ads, SEO and conversion-focused landing experiences. We A/B test messaging and channels until we find consistent, repeatable wins.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 to-fuchsia-600",
    colorHex: "#7C3AED",
    iconKey: "trending-up",
  },
  {
    key: "brand",
    title: "Brand Strategy",
    shortDesc: "Build Brand Experience",
    fullDesc:
      "We craft cohesive brand experiences that encourage engagement: creative direction, on-site personalization and storytelling that connects with customers across touchpoints to increase trust and lifetime value.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-500 to-amber-600",
    colorHex: "#F59E0B",
    iconKey: "target",
  },
  {
    key: "support",
    title: "Customer Support",
    shortDesc: "Enhance Engagement",
    fullDesc:
      "Many leads go cold due to slow or unclear responses. We design support flows, automation and conversational copy to turn queries into conversions while keeping the experience human.",
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
    gradient: "from-lime-500 to-emerald-600",
    colorHex: "#84CC16",
    iconKey: "message-circle",
  },
  {
    key: "web",
    title: "Web Development",
    shortDesc: "Build Digital Products",
    fullDesc:
      "We build fast, accessible websites and apps optimized for conversion and retention — fast loading pages, clear CTAs and experiment hooks to continuously improve outcomes.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-purple-600",
    colorHex: "#3B82F6",
    iconKey: "code",
  },
  {
    key: "analytics",
    title: "Data Analytics",
    shortDesc: "Make Data-Driven Decisions",
    fullDesc:
      "Custom indicators and dashboards — combine historical data, signals and monitoring to help users make better data-driven decisions and optimize performance.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gradient: "from-pink-500 to-rose-600",
    colorHex: "#EC4899",
    iconKey: "bar-chart",
  },
  {
    key: "scale",
    title: "Growth Strategy",
    shortDesc: "Scale Your Business",
    fullDesc:
      "We design processes, automation and channel mixes that are repeatable and scalable — so growth isn't one-off but sustainable across months and years.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-500 to-blue-600",
    colorHex: "#6366F1",
    iconKey: "rocket",
  },
];

const ICON_MAP = {
  "trending-up": TrendingUp,
  target: Target,
  "message-circle": MessageCircle,
  code: Code,
  "bar-chart": BarChart3,
  rocket: Rocket,
};

export default function ServicesWheel() {
  // rotation state (degrees)
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const wheelRef = useRef(null);
  const rafRef = useRef(null);
  const lastRef = useRef(performance.now());

  // responsive radius based on wheel box
  const [radius, setRadius] = useState(160);
  useEffect(() => {
    const compute = () => {
      if (!wheelRef.current) return;
      const rect = wheelRef.current.getBoundingClientRect();
      const minDim = Math.min(rect.width, rect.height);
      // make icons sit closer: 36% of minDim
      const r = Math.max(minDim * 0.34, 60);
      setRadius(r);
    };
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 100);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // smooth continuous rotation; pauses on hover (isPaused)
  useEffect(() => {
    lastRef.current = performance.now();
    const loop = (time) => {
      const delta = time - lastRef.current;
      lastRef.current = time;
      if (!isPaused) {
        // rotation speed: degrees per ms -> tune multiplier
        setRotation((r) => (r + delta * 0.01) % 360);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  // keyboard escape closes modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedService(null);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (s) => {
    setSelectedService(s);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "";
  };

  const total = services.length;

  // compute position of icon around circle
  const posFor = (i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2; // start top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, a: (angle * 180) / Math.PI };
  };

  return (
    <section className="relative min-h-[75vh] py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* faint patterned BG image (blurred) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
          filter: "blur(3px) saturate(.9)",
        }}
      />

      {/* overlay to keep contrast (slate/indigo toned) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-2">
            WHAT WE OFFER
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            OUR SERVICES
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Hover to pause, tap to open details. We keep the wheel subtle and professional.
          </p>
        </div>

        {/* desktop wheel */}
        <div className="hidden md:block">
          <div
            className="relative mx-auto w-[480px] h-[480px] lg:w-[640px] lg:h-[640px]"
            ref={wheelRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-hidden="true"
          >
            {/* soft halo behind wheel (uses first service color) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-60 pointer-events-none z-0"
              style={{
                width: "56%",
                height: "56%",
                background: `radial-gradient(circle at 35% 30%, ${services[0].colorHex}22, transparent 30%)`,
                filter: "blur(44px)",
              }}
            />

            {/* center glossy disk */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/6 flex flex-col items-center justify-center shadow-2xl z-10">
              <div className="text-2xl lg:text-3xl text-indigo-200 mb-1">⚡</div>
              <div className="text-xs text-slate-300 font-semibold">SERVICES</div>
            </div>

            {/* rotating group (we rotate the container; icons counter-rotate visually by inverse transform) */}
            <div
              className="absolute inset-0 z-20"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isPaused ? "none" : "transform 120ms linear",
              }}
            >
              {/* subtle rings */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/6"
                style={{
                  width: "72%",
                  height: "72%",
                  opacity: 0.06,
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-white/10"
                style={{
                  width: "62%",
                  height: "62%",
                  opacity: 0.04,
                }}
              />

              {services.map((s, i) => {
                const p = posFor(i);
                const Icon = ICON_MAP[s.iconKey] || TrendingUp;
                return (
                  <button
                    key={s.key}
                    onClick={() => openModal(s)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    aria-label={s.title}
                    title={s.title}
                    style={{
                      transform: `translate(${p.x}px, ${p.y}px) rotate(${-rotation}deg)`,
                      transition: isPaused ? "none" : "transform 120ms linear",
                    }}
                  >
                    {/* professional icon circle */}
                    <div
                      className="relative flex items-center justify-center rounded-full"
                      style={{
                        width: 68,
                        height: 68,
                        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.04)",
                        boxShadow: "0 10px 28px rgba(2,6,23,0.6)",
                      }}
                    >
                      {/* outer colored ring */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          padding: 6,
                          boxSizing: "border-box",
                          background: `conic-gradient(from 0deg, ${s.colorHex}33, transparent 35%)`,
                          maskImage: "radial-gradient(circle, black 56%, transparent 58%)",
                          opacity: 0.9,
                        }}
                        aria-hidden="true"
                      />

                      {/* inner glass */}
                      <div className="relative w-[52px] h-[52px] rounded-full bg-slate-900/85 flex items-center justify-center">
                        <Icon size={22} className="text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]" />
                      </div>

                      {/* subtle focus ring fallback (keyboard) */}
                    </div>

                    {/* label (tiny, neat) */}
                    <div className="mt-2 text-xs text-slate-300 text-center w-20">
                      {s.title.split(" ")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile grid (keeps professional styling) */}
        <div className="md:hidden grid grid-cols-2 gap-4 max-w-md mx-auto">
          {services.map((s) => {
            const Icon = ICON_MAP[s.iconKey] || TrendingUp;
            return (
              <button
                key={s.key}
                onClick={() => openModal(s)}
                className={`relative overflow-hidden rounded-xl p-[2px] group`}
                style={{
                  background: `linear-gradient(135deg, ${s.colorHex}22, transparent 40%)`,
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <div className="bg-slate-900/95 rounded-xl p-4 h-full flex flex-col items-center justify-center shadow-md">
                  <div
                    className="rounded-full mb-3 flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 56,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white text-center">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-1 text-center">{s.shortDesc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 max-w-3xl w-full bg-slate-900 rounded-2xl border border-white/6 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                <img src={selectedService.img} alt={selectedService.title} className="w-full h-48 md:h-full object-cover" />
              </div>
              <div className="p-6 md:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-300 mb-1">{selectedService.shortDesc}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedService.title}</h3>
                    <p className="text-sm text-slate-400">{selectedService.shortDesc}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/8 flex items-center justify-center transition"
                    aria-label="Close"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">{selectedService.fullDesc}</p>

                <div className="flex gap-3">
                  <a
                    href="#contact"
                    onClick={closeModal}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow"
                  >
                    Get Started
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg border border-white/6 text-slate-200 hover:bg-white/3"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* keyboard focus ring small style */}
      <style>{`
        section [role="button"]:focus-visible, section button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 6px rgba(99,102,241,0.08);
        }
      `}</style>
    </section>
  );
}
