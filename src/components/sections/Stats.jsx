// src/components/CoreValues.jsx
import React, { useEffect, useRef, useState } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent"; // make sure path is correct
import { X } from "lucide-react";

/**
 * CoreValues (updated)
 * - Professional circular badges
 * - Modal shows clicked item + full "OBSTACLES WE TACKLE" content from STRATEGIX_DATA.obstacles
 * - Better spacing, subtle glow, keyboard accessible
 */

const values = [
  // (kept your original small set — you can replace / merge with data from STRATEGIX_DATA if needed)
  {
    key: "integrity",
    title: "INTEGRITY",
    value: "INTEGRITY",
    description:
      "We uphold the highest standards of honesty and strong moral principles in all our actions and decisions.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 via-purple-600 to-fuchsia-600",
    ringGradient: "from-purple-400 via-purple-500 to-fuchsia-500",
    dotColor: "bg-purple-400",
  },
  {
    key: "goals",
    title: "GOALS",
    value: "GOALS",
    description:
      "We set ambitious yet achievable objectives that drive us forward and measure our success.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-500 via-orange-600 to-amber-600",
    ringGradient: "from-orange-400 via-orange-500 to-amber-500",
    dotColor: "bg-orange-400",
  },
  {
    key: "innovation",
    title: "INNOVATION",
    value: "INNOVATION",
    description:
      "We embrace creativity and new ideas to continuously improve and stay ahead of the curve.",
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    ringGradient: "from-lime-400 via-green-400 to-emerald-500",
    dotColor: "bg-lime-400",
  },
  {
    key: "quality",
    title: "QUALITY",
    value: "QUALITY",
    description:
      "We deliver excellence in every project, ensuring the highest standards in our work and services.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 via-indigo-600 to-purple-600",
    ringGradient: "from-blue-400 via-indigo-500 to-purple-500",
    dotColor: "bg-blue-400",
  },
  {
    key: "excellence",
    title: "EXCELLENCE",
    value: "EXCELLENCE",
    description:
      "We strive for outstanding achievements and consistently exceed expectations in everything we do.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    ringGradient: "from-pink-400 via-rose-400 to-red-400",
    dotColor: "bg-pink-400",
  },
];

export default function CoreValues() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Intersector to animate in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ESC key to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (item) => {
    setActive(item);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActive(null);
    document.body.style.overflow = "";
  };

  // Use obstacles from STRATEGIX_DATA (the PDF data you have)
  const obstacles = STRATEGIX_DATA?.obstacles ?? [];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      aria-label="Core values"
    >
      {/* subtle background pattern */}
      <div className="absolute inset-0 opacity-6 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide">
            OBSTACLES WE TACKLE
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Click any badge to read more. Below you'll also find a consolidated list of obstacles we address (from your PDF).
          </p>
        </div>

        {/* Horizontal connector (desktop) */}
        <div className="relative">
          <div className="hidden lg:block absolute top-28 left-16 right-16 h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>

          {/* badges row */}
          <div className="flex justify-center items-start gap-6 md:gap-10 lg:gap-16 mb-8 flex-wrap">
            {values.map((v, i) => (
              <div
                key={v.key}
                className="flex flex-col items-center relative"
                style={{
                  transform: inView ? "translateY(0) scale(1)" : "translateY(18px) scale(.95)",
                  opacity: inView ? 1 : 0,
                  transition: "all 600ms cubic-bezier(.2,.9,.3,1)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* top dotted connector (desktop) */}
                <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-slate-600 rounded" />
                </div>

                {/* Circular professional badge */}
                <button
                  onClick={() => openModal(v)}
                  className="relative rounded-full p-1 focus:outline-none"
                  aria-label={`Open ${v.title}`}
                  title={v.title}
                >
                  {/* outer thin ring */}
                  <div
                    className={`rounded-full flex items-center justify-center`}
                    style={{
                      width: 88,
                      height: 88,
                      padding: 6,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                      boxShadow: "0 12px 30px rgba(2,6,23,0.6)",
                      borderRadius: 9999,
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* colored inner ring (from v.ringGradient) via inline radial */}
                    <div
                      className="rounded-full overflow-hidden flex items-center justify-center"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 9999,
                        padding: 2,
                        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.02), transparent 30%)`,
                      }}
                    >
                      {/* image glass */}
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25))",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={v.img}
                          alt={v.title}
                          className="w-full h-full object-cover opacity-90 mix-blend-overlay"
                        />
                        {/* subtle colored overlay using v.ringGradient via inline style for exact hue feel */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              v.ringGradient
                                ? `linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`
                                : "transparent",
                            opacity: 0.7,
                            mixBlendMode: "overlay",
                            borderRadius: 9999,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* small label under badge */}
                  <span className="mt-3 block text-xs text-slate-300 text-center w-28">{v.title}</span>
                </button>

                {/* vertical connector to cards below (desktop) */}
                <div className="hidden lg:block w-0.5 h-12 bg-gradient-to-b from-slate-600 to-transparent my-3" />
              </div>
            ))}
          </div>

          {/* small dot connectors row (desktop) */}
          <div className="hidden lg:flex justify-center items-center gap-8 mb-10">
            {values.map((v, i) => (
              <div key={`dot-${v.key}`} className="relative flex items-center">
                <div className={`${v.dotColor} w-3 h-3 rounded-full shadow-lg`} />
                {i < values.length - 1 && <div className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-slate-600 to-slate-600/60" />}
              </div>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {values.map((v, i) => (
              <div
                key={`card-${v.key}`}
                className="group"
                style={{
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  opacity: inView ? 1 : 0,
                  transition: "all 600ms cubic-bezier(.2,.9,.3,1)",
                  transitionDelay: `${(i * 80) + 240}ms`,
                }}
              >
                <div
                  onClick={() => openModal(v)}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/40 rounded-xl p-3 sm:p-4 h-full hover:border-slate-600 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base mb-2 text-center">{v.title}</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed text-center">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: shows clicked item + full OBSTACLES list from STRATEGIX_DATA.obstacles */}
      {modalOpen && active && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 pt-24">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-4xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl border border-slate-700/40 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-white/6 shadow-lg">
                    <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{active.value}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* active description */}
              <div className="mt-6 mb-6">
                <p className="text-slate-300 leading-relaxed">{active.description}</p>
              </div>

              {/* Separator */}
              <div className="border-t border-slate-700/40 my-4" />

              {/* Obstacles list (from PDF data) */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">OBSTACLES WE TACKLE</h4>
                <div className="space-y-4">
                  {obstacles.length ? (
                    obstacles.map((ob, idx) => (
                      <div key={idx} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800/50 border border-white/6">
                            {/* small colored dot using value mapping if possible, otherwise neutral */}
                            <div className="w-3 h-3 rounded-full bg-indigo-400" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{ob.title}</div>
                            <div className="text-sm text-slate-300 mt-1">{ob.description}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400">No obstacles data found in STRATEGIX_DATA.obstacles.</p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <a
                  href="#contact"
                  onClick={closeModal}
                  className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow"
                >
                  Talk to us
                </a>
                <button onClick={closeModal} className="px-4 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-white/3">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
