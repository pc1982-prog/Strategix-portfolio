import React, { useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

/**
 * HeroReveal
 * - background: blurred image (CSS)
 * - top layer: sharp image revealed by drawing circular holes into a mask canvas
 * - falling balls: animated circles that move down and reveal the sharp image where they touch
 *
 * Props:
 *  - img (string): path to background/sharp image
 */
export default function HeroReveal({ img = "/images/hero-bg.jpg" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const ballsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;
    let w = container.clientWidth;
    let h = container.clientHeight;
    canvas.width = w;
    canvas.height = h;

    // create some balls
    const colors = ["#ffffff", "#ffffff"];
    const balls = [];
    const n = 8; // number of falling balls
    for (let i = 0; i < n; i++) {
      balls.push({
        x: Math.random() * w,
        y: -Math.random() * h - Math.random() * 200,
        r: 30 + Math.random() * 50,
        vy: 1 + Math.random() * 2.5,
        vx: -0.6 + Math.random() * 1.2,
        rot: Math.random() * Math.PI * 2,
      });
    }
    ballsRef.current = balls;

    let raf;
    const draw = () => {
      // clear mask
      ctx.clearRect(0, 0, w, h);

      // Fill with opaque (so top image is hidden by default)
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      // Draw circles (holes) where we want to reveal the image -> use globalCompositeOperation = 'destination-out'
      ctx.globalCompositeOperation = "destination-out";
      balls.forEach((b) => {
        ctx.beginPath();
        // slight wobble for natural fall
        ctx.ellipse(b.x, b.y, b.r, b.r * 0.95, b.rot, 0, Math.PI * 2);
        ctx.fill();
      });

      // reset composition
      ctx.globalCompositeOperation = "source-over";
      updateBalls();
      raf = requestAnimationFrame(draw);
    };

    const updateBalls = () => {
      balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.rot += 0.02;
        // simple bounce or reset when off screen
        if (b.y - b.r > h) {
          b.y = -50 - Math.random() * 200;
          b.x = Math.random() * w;
          b.vy = 1 + Math.random() * 2.5;
          b.r = 30 + Math.random() * 50;
        }
        if (b.x < -100) b.x = w + 20;
        if (b.x > w + 100) b.x = -20;
      });
    };

    // handle resize
    const onResize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [img]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-xl brightness-80"
        style={{ backgroundImage: `url(${img})` }}
      />

      {/* overlay for mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

      {/* top sharp image (positioned) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* top image is visible only where canvas mask has holes via CSS mask-image */}
        <img
          ref={imgRef}
          src={img}
          alt="hero sharp"
          className="w-full h-full object-cover pointer-events-none"
          style={{
            // use the canvas as mask via CSS - modern browsers support maskComposite via url(#)
            // we'll apply mask via canvas element by placing canvas above this image and using composite operations
            // Simpler approach: we keep sharp image visible but overlay with a canvas that masks it (canvas draws black + holes with destination-out)
            // So leave image as-is behind the canvas and let canvas reveal it using destination-out operations.
          }}
        />
      </div>

      {/* Canvas overlay on top that hides the sharp image by default and punches holes where balls are. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "destination-out" }}
      />

      {/* Content over everything (text should be above reveal effect) */}
      <div className="relative z-30 max-w-5xl px-6 text-center">
        <span className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 text-sm text-sky-200 border border-white/5">
          Digital Marketing Experts
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 text-white/95 leading-tight">
          We grow brands that matter.
        </h1>

        <p className="max-w-2xl mx-auto text-slate-200/80 mb-8 text-lg">
          Thoughtful marketing. Measurable growth.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 text-white font-medium shadow hover:scale-105 transition"
          >
            Start a Project <ArrowRight size={16} />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/80 hover:bg-white/5 transition"
          >
            View Our Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <ChevronDown size={28} className="text-sky-200/70" />
      </div>
    </section>
  );
}
