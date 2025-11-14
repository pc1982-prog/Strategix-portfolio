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
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-[#081026] to-[#071221]"
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
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1f6be1] bg-opacity-90 text-white font-medium text-base hover:brightness-105 transition"
          >
            Start a Project
            <ArrowRight size={18} />
          </a>

          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2b5f9e]/40 text-[#cfe3ff] font-medium text-base hover:bg-[#173657]/40 transition"
          >
            View Our Work
          </a>
        </div>

     
      </div>
    </section>
  );
};
