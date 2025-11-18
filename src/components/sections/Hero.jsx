// src/components/hero/Hero.jsx
import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { STRATEGIX_DATA } from "../../data/siteContent";
import LightRays from "../hero/LightRays";
import { TypeWriter } from "../ui/TypeWriter";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Subtle light rays (soft, low opacity) */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#4F8FFD"
        raysSpeed={0.9}
        lightSpread={0.45}
        rayLength={60}
        pulsating={true}
        followMouse={true}
        mouseInfluence={0.06}
        noiseAmount={0.02}
        distortion={0.01}
        className="opacity-80"
      />

      {/* soft behind-glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-[120px] bg-[#16355b]/20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Small badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1 border border-[#2b5f9e]/30 rounded-full text-sm font-medium text-[#cfe3ff] bg-[#0b1a2b]/50">
            Digital Marketing Experts
          </span>
        </div>

        {/* Headline - Simple & Calm */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight text-[#e6eefb]">
          <span className="block">We grow brands that matter.</span>
        </h1>

        {/* Subheading / mission */}
        <p className="text-base sm:text-lg md:text-xl text-[#bcd7ff] mb-10 max-w-3xl mx-auto font-normal">
          <TypeWriter text={STRATEGIX_DATA.brand.mission} speed={32} />
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
         <button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            Start a Project
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('work');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-emerald-500/40 text-emerald-300 font-semibold hover:bg-emerald-950/40 transition-all"
          >
            View Our Work
          </button>
        </div>

     
      </div>
    </section>
  );
};
