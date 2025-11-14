import React, { useRef, useEffect, useState } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent";

export const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null); 
  const imgRef = useRef(null); 
  const floatRef = useRef(null); 
  const rafRef = useRef(null);
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

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let mouseX = 0,
      mouseY = 0,
      cx = 0,
      cy = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width; // 0..1
      mouseY = (e.clientY - rect.top) / rect.height; // 0..1
      scheduleUpdate();
    };

    const onLeave = () => {
      mouseX = 0.5;
      mouseY = 0.5;
      scheduleUpdate();
    };

    const scheduleUpdate = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        // target center offset (-0.5..0.5)
        const tx = (mouseX - 0.5);
        const ty = (mouseY - 0.5);

        // image translate & rotate for depth (subtle)
        if (imgRef.current) {
          const imgTx = tx * 10; // px
          const imgTy = ty * 10;
          const rotY = tx * 3; // deg
          const rotX = -ty * 3;
          imgRef.current.style.transform = `translate3d(${imgTx}px, ${imgTy}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        }

        // floating card moves slightly stronger
        if (floatRef.current) {
          const floatTx = tx * -16;
          const floatTy = ty * -10;
          floatRef.current.style.transform = `translate3d(${floatTx}px, ${floatTy}px, 0)`;
        }
      });
    };

    // init center
    mouseX = 0.5;
    mouseY = 0.5;
    scheduleUpdate();

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", scheduleUpdate);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", scheduleUpdate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 relative z-20 transition-all duration-900 section-offset ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071026] via-[#07172b] to-[#071026] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: PDF content only */}
          <div>
            <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
              {STRATEGIX_DATA.about.title}
            </h2>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {STRATEGIX_DATA.about.title}
            </h3>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {STRATEGIX_DATA.about.description}
            </p>

            <div className="glass-card border rounded-2xl p-5 max-w-xl shadow-soft">
              <h4 className="text-base font-semibold text-sky-300 mb-2">Social Media Evolution</h4>
              <p className="text-slate-300 text-sm">{STRATEGIX_DATA.about.socialMedia}</p>
            </div>
          </div>

          {/* RIGHT: image block with parallax */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="relative w-full max-w-md transform-gpu transition-all duration-700 group"
              aria-hidden="true"
            >
              {/* soft frame */}
              <div className="rounded-2xl p-1 bg-gradient-to-br from-white/3 to-transparent shadow-soft">
                <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-white/6">
                  {/* image (replace with PDF image if available) */}
                  <img
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1000&q=80&auto=format&fit=crop"
                    alt="About visual"
                    className="w-full h-72 object-cover transition-transform duration-700 will-change-transform"
                    style={{ transform: "translate3d(0,0,0) scale(1.03)" }}
                  />

                  {/* depth overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25 pointer-events-none" />

                  {/* floating small card */}
                  <div
                    ref={floatRef}
                    className="absolute -left-6 -bottom-6 w-56 p-3 rounded-xl bg-gradient-to-br from-sky-700/10 to-transparent border border-white/6 shadow-soft transition-transform duration-400 will-change-transform"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >
                    <div className="text-xs text-sky-200 font-semibold">From the PDF</div>
                    <div className="mt-1 text-sm text-slate-200 truncate">{STRATEGIX_DATA.about.title}</div>
                  </div>
                </div>
              </div>

            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-sky-600/40 rounded-3xl blur-3xl -z-10 opacity-70"></div> </div>
          </div>
        </div>
      </div>
    </section>
  );
};
