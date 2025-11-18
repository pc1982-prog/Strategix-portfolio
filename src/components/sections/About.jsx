import React, { useRef, useEffect, useState } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent";

export const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.18 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative z-20 py-20 bg-gradient-to-b from-slate-950 to-slate-900 transition-all duration-900 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              {STRATEGIX_DATA.about.title}
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Transforming Digital <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Presence</span>
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {STRATEGIX_DATA.about.description}
            </p>
            <div className="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6 shadow-lg">
              <h4 className="text-base font-semibold text-emerald-400 mb-3">Social Media Evolution</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {STRATEGIX_DATA.about.socialMedia}
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
                alt="Team collaboration"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};