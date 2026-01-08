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
      <div className="relative h-[450px] sm:h-[500px] lg:h-[550px]">
        
        {/* Main Image - Left & Top (Larger) */}
        <div className="absolute top-0 left-0 w-[75%] sm:w-[72%] z-10">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
              alt="Team collaboration"
              className="w-full h-80 sm:h-96 lg:h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </div>
        </div>

        {/* Second Image - Right & Bottom (Smaller with Gradient Border) */}
        <div className="absolute bottom-0 right-0 w-[50%] sm:w-[48%] z-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{
            background: 'linear-gradient(to bottom,  #0f172a)',
            padding: '4px'
          }}>
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop"
                alt="Team meeting"
                className="w-full h-56 sm:h-64 lg:h-72 object-cover"
              />
              <div className="absolute inset-0 from-slate-950 " />
            </div>
          </div>
        </div>

      </div>
    </div>
        </div>
      </div>
    </section>
  );
};