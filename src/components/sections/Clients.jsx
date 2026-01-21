import React, { useEffect, useMemo, useRef } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent";

export default function ClientsMarquee() {
  const userClients = STRATEGIX_DATA?.clientsList ?? STRATEGIX_DATA?.clients?.list;

  const baseClients = useMemo(() => {
    if (Array.isArray(userClients) && userClients.length > 0) {
      return userClients;
    }
    return Array.from({ length: 30 }, (_, i) => ({
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
      const containerWidth = elA.parentElement?.getBoundingClientRect().width || window.innerWidth;

      const oneWidthA = elA.scrollWidth / 2;
      const oneWidthB = elB.scrollWidth / 2;

      // Slightly slower minimum on mobile → feels more natural
      const pxPerSec = Math.max(45, Math.round(containerWidth * 0.09 + 20));

      const durA = Math.max(10, oneWidthA / pxPerSec);
      const durB = Math.max(10, oneWidthB / pxPerSec);

      const avgDuration = Math.max(10, Math.round(((durA + durB) / 2) * 100) / 100);

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
      t = setTimeout(computeAndApply, 150);
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
          minWidth: "clamp(100px, 22vw, 140px)", // responsive min width
          paddingLeft: "clamp(8px, 2vw, 12px)",
          paddingRight: "clamp(8px, 2vw, 12px)",
        }}
      >
        <div
          className="
            w-full max-w-[clamp(120px,28vw,160px)] 
            flex items-center justify-center 
            bg-white rounded-lg p-[clamp(6px,1.5vw,8px)] 
            shadow-lg hover:scale-105 transition-transform duration-300
          "
        >
          {hasLogo ? (
            <img
              src={c.logo}
              alt={c.alt ?? c.name}
              className="max-h-[clamp(48px,10vw,80px)] md:max-h-20 lg:max-h-24 w-auto object-contain block"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-10 md:h-12 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] sm:text-xs text-slate-400">
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
        @keyframes marquee-left {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .marquee-item img {
          display: block;
          max-width: 100%;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Optional: nice fade edges – looks modern & hides seam better on mobile */
        .marquee-wrapper {
          position: relative;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
      `}</style>

      <section id="clients" className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-10 sm:py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-10" style={{ maxWidth: "1600px" }}>
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 uppercase">
              OUR CLIENTS
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3">
              Trusted by{" "}
              <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {baseClients.length}+ Global Brands
              </span>
            </h3>
            <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base px-2 sm:px-0">
              We cater to a global audience with excellence
            </p>
          </div>

          {/* ROW A */}
          <div
            className="marquee-wrapper overflow-hidden rounded-xl bg-slate-800/20 backdrop-blur-sm border border-emerald-500/10 mb-4 sm:mb-6 no-scrollbar"
            onMouseEnter={() => rowARef.current && (rowARef.current.style.animationPlayState = "paused")}
            onMouseLeave={() => rowARef.current && (rowARef.current.style.animationPlayState = "running")}
            onTouchStart={() => rowARef.current && (rowARef.current.style.animationPlayState = "paused")}
            onTouchEnd={() => rowARef.current && (rowARef.current.style.animationPlayState = "running")}
          >
            <div
              ref={rowARef}
              className="marquee"
              style={{
                width: "fit-content",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: "running",
                padding: "clamp(12px, 3vw, 16px) 0",
              }}
            >
              {duplicated.map((c, idx) => renderItem(c, idx))}
            </div>
          </div>

          {/* ROW B */}
          <div
            className="marquee-wrapper overflow-hidden rounded-xl bg-slate-800/20 backdrop-blur-sm border border-emerald-500/10 no-scrollbar"
            onMouseEnter={() => rowBRef.current && (rowBRef.current.style.animationPlayState = "paused")}
            onMouseLeave={() => rowBRef.current && (rowBRef.current.style.animationPlayState = "running")}
            onTouchStart={() => rowBRef.current && (rowBRef.current.style.animationPlayState = "paused")}
            onTouchEnd={() => rowBRef.current && (rowBRef.current.style.animationPlayState = "running")}
          >
            <div
              ref={rowBRef}
              className="marquee"
              style={{
                width: "fit-content",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: "running",
                padding: "clamp(12px, 3vw, 16px) 0",
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