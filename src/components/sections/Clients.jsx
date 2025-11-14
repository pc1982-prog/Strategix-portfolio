// src/components/clients/ClientsWheelV2.jsx
import React, { useEffect, useRef, useState } from "react";
import { STRATEGIX_DATA } from "../../data/siteContent";

/**
 * ClientsWheelV2
 * - Modern/professional look inspired by agency portfolios
 * - Drag to rotate (pointer events) + inertia
 * - Hover/touch pauses rotation
 * - Logos stay visually upright (counter-rotation)
 * - Fully responsive (Tailwind only)
 *
 * Replace client.logo URLs with your real logos (public/ or hosted).
 */

export default function ClientsWheelV2() {
  const wheelRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastRef = useRef(performance.now());
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastPointerRef = useRef(null);

  const [rotation, setRotation] = useState(0); // degrees
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(160);
  const [badgeSize, setBadgeSize] = useState(60);
  const [active, setActive] = useState(null);

  // prefer real clients from STRATEGIX_DATA if present
  const clients =
    STRATEGIX_DATA?.clientsList ??
    (STRATEGIX_DATA?.clients?.list && STRATEGIX_DATA.clients.list.length > 0
      ? STRATEGIX_DATA.clients.list
      : Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Client ${i + 1}`,
          logo: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=60&ixid=${i +
            1}`,
          color: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"][i % 6],
          blurb: "Trusted partner",
        })));

  // compute radius & badge size responsive
  useEffect(() => {
    function compute() {
      const el = wheelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const minDim = Math.min(rect.width, rect.height);
      // radius proportion (keeps icons closer to ring)
      const r = Math.max(Math.floor(minDim * 0.34), 48);
      setRadius(r);
      // badge sizing
      if (minDim >= 900) setBadgeSize(92);
      else if (minDim >= 700) setBadgeSize(76);
      else if (minDim >= 520) setBadgeSize(64);
      else setBadgeSize(52);
    }
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 120);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // rotation loop + friction when not dragging
  useEffect(() => {
    lastRef.current = performance.now();
    const loop = (time) => {
      const dt = time - lastRef.current;
      lastRef.current = time;

      // if user is dragging, we don't apply inertia here (drag handler controls rotation)
      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.0001) {
        // apply velocity (deg/ms) scaled
        setRotation((r) => (r + velocityRef.current * dt) % 360);
        // friction
        velocityRef.current *= 0.96 ** (dt / 16); // tuned
        // small clamp to stop
        if (Math.abs(velocityRef.current) < 0.00002) velocityRef.current = 0;
      } else if (!draggingRef.current && velocityRef.current === 0 && !isPaused) {
        // idle auto-rotate slow
        setRotation((r) => (r + 0.01 * dt) % 360);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  // pointer events for drag & inertia
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const getAngle = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    };

    let lastAngle = null;
    let lastTime = null;

    const onPointerDown = (e) => {
      e.preventDefault();
      draggingRef.current = true;
      setIsPaused(true);
      el.setPointerCapture?.(e.pointerId);
      const angle = getAngle(e.clientX, e.clientY);
      lastAngle = angle;
      lastTime = performance.now();
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: lastTime };
    };

    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const angle = getAngle(e.clientX, e.clientY);
      const now = performance.now();
      const delta = angle - lastAngle;
      // normalize delta across -180..180
      let d = delta;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      // update rotation
      setRotation((r) => (r + d) % 360);
      // compute instantaneous velocity (deg per ms)
      const dt = Math.max(1, now - lastTime);
      velocityRef.current = d / dt;
      lastAngle = angle;
      lastTime = now;
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const onPointerUp = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setTimeout(() => setIsPaused(false), 300); // resume after small delay
      lastAngle = null;
      lastTime = null;
      el.releasePointerCapture?.(e.pointerId);
      // velocityRef.current already set by move; leave it for inertia loop
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    // also support touch fallback without pointer events
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // pause when mouse enters wheel (desktop) and resume on leave
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const onEnter = () => {
      setIsPaused(true);
    };
    const onLeave = () => {
      // only resume if not dragging
      if (!draggingRef.current) setIsPaused(false);
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // keyboard escape to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // compute position for item index
  const pos = (i, total) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angleDeg: (angle * 180) / Math.PI };
  };

  return (
    <>
      <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" aria-label="Clients">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-2">OUR CLIENTS</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Trusted by <span className="text-indigo-300">{STRATEGIX_DATA?.brand?.name ?? "Global Brands"}</span>
          </h2>

          <div className="flex justify-center">
            <div
              ref={wheelRef}
              className="relative touch-none select-none"
              style={{
                width: "min(88vw, 760px)",
                height: "min(88vw, 760px)",
                maxWidth: "760px",
                maxHeight: "760px",
                margin: "0 auto",
              }}
            >
              {/* thin SVG ring for crisp professional look */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" fill="none" />
                <circle cx="50" cy="50" r="34" stroke="rgba(255,255,255,0.03)" strokeDasharray="0.7 0.7" strokeWidth="0.35" fill="none" />
              </svg>

              {/* center hub (glass) */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center rounded-full"
                style={{
                  width: badgeSize * 1.6,
                  height: badgeSize * 1.6,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 18px 40px rgba(2,6,23,0.6)",
                }}
              >
                <div className="text-xs text-slate-300">Trusted By</div>
                <div className="mt-1 text-lg font-bold text-white">CLIENTS</div>
                <a href="#contact" className="mt-2 px-3 py-1 rounded-full text-xs bg-indigo-600/90 text-white">
                  Work with us
                </a>
              </div>

              {/* rotating group */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: draggingRef.current ? "none" : "transform 100ms linear",
                }}
              >
                {clients.map((c, i) => {
                  const { x, y } = pos(i, clients.length);
                  // counter-rotate logos so they stay upright
                  return (
                    <button
                      key={c.id ?? i}
                      onClick={() => setActive(c)}
                      aria-label={`Open ${c.name}`}
                      title={c.name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      style={{
                        transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                        transition: draggingRef.current ? "none" : "transform 120ms linear",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <div
                        className="relative rounded-full overflow-hidden flex items-center justify-center"
                        style={{
                          width: badgeSize,
                          height: badgeSize,
                          borderRadius: 9999,
                          background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                          border: "1px solid rgba(255,255,255,0.06)",
                          boxShadow: "0 8px 22px rgba(2,6,23,0.5)",
                        }}
                      >
                        {/* subtle colored ring stroke */}
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: -6,
                            borderRadius: 9999,
                            background: c.color ? `${c.color}22` : "transparent",
                            filter: "blur(6px)",
                            zIndex: 0,
                          }}
                        />
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="relative z-10 object-cover"
                          style={{ width: badgeSize - 8, height: badgeSize - 8, borderRadius: 9999 }}
                          loading="lazy"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-8 text-slate-400 max-w-2xl mx-auto">
            We partner with brands globally to deliver measurable results — click any logo to read a short case highlight.
          </p>
        </div>
      </section>

      {/* modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="relative z-10 w-full max-w-3xl bg-slate-900 rounded-2xl border border-white/6 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                <img src={active.logo} alt={active.name} className="w-full h-48 md:h-full object-cover" />
              </div>
              <div className="p-6 md:col-span-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{active.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{active.blurb ?? ""}</p>
                  </div>
                  <button onClick={() => setActive(null)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/8 flex items-center justify-center">
                    ✕
                  </button>
                </div>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  {active.description ?? "Client case description placeholder — replace with real case blurb or testimonial."}
                </p>
                <div className="mt-6 flex gap-3">
                  <a href="#contact" onClick={() => setActive(null)} className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium shadow">
                    Talk to us
                  </a>
                  <button onClick={() => setActive(null)} className="px-4 py-2 rounded-md border border-white/6 text-slate-200 hover:bg-white/4">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
