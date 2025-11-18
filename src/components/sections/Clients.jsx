import React, { useEffect, useMemo, useRef } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent";

export default function ClientsMarquee() {
  const userClients = STRATEGIX_DATA?.clientsList ?? STRATEGIX_DATA?.clients?.list;
  const baseClients = useMemo(() => {
    if (Array.isArray(userClients) && userClients.length > 0) {
      return userClients.slice(0, 20);
    }
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
      logo: "", 
      alt: `Client ${i + 1} logo`,
    }));
  }, [userClients]);

  
  const duplicated = useMemo(() => [...baseClients, ...baseClients], [baseClients]);

  const rowARef = useRef(null);
  const rowBRef = useRef(null);

  useEffect(() => {
    if (!rowARef.current || !rowBRef.current) return;

    const computeAndApply = () => {
      const elA = rowARef.current;
      const elB = rowBRef.current;
      const containerWidth = elA.parentElement.getBoundingClientRect().width || window.innerWidth;

  
      const oneWidthA = elA.scrollWidth / 2;
      const oneWidthB = elB.scrollWidth / 2;

   
      const pxPerSec = Math.max(55, Math.round(containerWidth * 0.12));

   
      const durA = Math.max(8, oneWidthA / pxPerSec);
      const durB = Math.max(8, oneWidthB / pxPerSec);

     
      const avgDuration = Math.max(8, Math.round(((durA + durB) / 2) * 100) / 100);

      
      elA.style.animation = `marquee-left ${avgDuration}s linear infinite`;
      elA.style.animationTimingFunction = "linear";
      elA.style.animationPlayState = "running";
      elA.style.animationDirection = "normal";

      elB.style.animation = `marquee-left ${avgDuration}s linear infinite`;
      elB.style.animationTimingFunction = "linear";
      elB.style.animationPlayState = "running";
      elB.style.animationDirection = "reverse";

   
      elA.style.willChange = "transform";
      elB.style.willChange = "transform";
    };

 
    computeAndApply();

   
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(computeAndApply, 120);
    };
    window.addEventListener("resize", onResize);

    const imgs = [...rowARef.current.querySelectorAll("img"), ...rowBRef.current.querySelectorAll("img")];
    let loaded = 0;
    if (imgs.length === 0) {
      computeAndApply();
    } else {
      imgs.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener(
            "load",
            () => {
              loaded++;
              if (loaded >= imgs.length) computeAndApply();
            },
            { once: true }
          );
        }
      });
      if (loaded >= imgs.length) computeAndApply();
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [duplicated]);

  const renderItem = (c, idx) => {
    const hasLogo = !!c.logo;
    return (
      <div
        key={`${c.id ?? idx}-${idx}`}
        className="marquee-item flex-shrink-0 flex items-center justify-center"
        style={{
          minWidth: 140,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <div className="w-full max-w-[160px] flex items-center justify-center bg-white rounded-lg p-2 ">
          {hasLogo ? (
            <img
              src={c.logo}
              alt={c.alt ?? c.name}
              className="max-h-12 md:max-h-14 object-contain block"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-10 md:h-12 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400">
              Add logo (SVG/PNG)
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        /* move exactly half the duplicated content */
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { display:flex; align-items:center; }
        .marquee-item img{ display:block; max-width:100%; }
        .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
        .no-scrollbar::-webkit-scrollbar{ display:none; }
      `}</style>

      <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: 1400 }}>
          <div className="text-center mb-6">
            <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">OUR CLIENTS</p>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mt-2">
              Trusted by <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">{STRATEGIX_DATA?.brand?.name ?? "Global Brands"}</span>
            </h3>
          
          </div>

          {/* ROW A */}
          <div
            className="overflow-hidden rounded-xl   bg-emerald/60 mb-4 no-scrollbar"
            onMouseEnter={() => { if (rowARef.current) rowARef.current.style.animationPlayState = "paused"; }}
            onMouseLeave={() => { if (rowARef.current) rowARef.current.style.animationPlayState = "running"; }}
            onTouchStart={() => { if (rowARef.current) rowARef.current.style.animationPlayState = "paused"; }}
            onTouchEnd={() => { if (rowARef.current) rowARef.current.style.animationPlayState = "running"; }}
          >
            <div
              ref={rowARef}
              className="marquee"
              style={{
                width: "fit-content",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: "running",
                gap: 0,
                padding: "12px",
              }}
            >
              {duplicated.map((c, idx) => renderItem(c, idx))}
            </div>
          </div>

          {/* ROW B (same duplicated content, animation direction reversed) */}
          <div
            className="overflow-hidden rounded-xl  bg-emerald/60 no-scrollbar"
            onMouseEnter={() => { if (rowBRef.current) rowBRef.current.style.animationPlayState = "paused"; }}
            onMouseLeave={() => { if (rowBRef.current) rowBRef.current.style.animationPlayState = "running"; }}
            onTouchStart={() => { if (rowBRef.current) rowBRef.current.style.animationPlayState = "paused"; }}
            onTouchEnd={() => { if (rowBRef.current) rowBRef.current.style.animationPlayState = "running"; }}
          >
            <div
              ref={rowBRef}
              className="marquee"
              style={{
                width: "fit-content",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: "running",
                gap: 0,
                padding: "12px",
              }}
            >
              {duplicated.map((c, idx) => renderItem(c, idx))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
