import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function HeroSimple({ img = "/images/hero-bg.jpg" }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md brightness-75"
        style={{ backgroundImage: `url(${img})` }}
      />

      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/40" />

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <span className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 text-sm text-sky-200 border border-white/5">
          Digital Marketing Experts
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white/95 leading-tight mb-4">
          We grow brands that matter.
        </h1>

        <p className="max-w-2xl mx-auto text-slate-200/80 mb-8 text-lg">
          {/* yahan tumhara STRATEGIX_DATA.brand.mission aa sakta hai */}
          Thoughtful marketing. Measurable growth.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 text-white font-medium shadow-lg hover:scale-105 transition"
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={28} className="text-sky-200/70" />
      </div>
    </section>
  );
}
