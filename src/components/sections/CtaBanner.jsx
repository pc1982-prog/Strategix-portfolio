import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - elements hidden
      gsap.set([containerRef.current, lineRef.current, textRef.current, buttonRef.current], {
        opacity: 0
      });

      gsap.set(containerRef.current, { scaleY: 0.8 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(textRef.current, { x: -50 });
      gsap.set(buttonRef.current, { x: 50 });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
          onEnter: () => setHasAnimated(true),
        }
      });

      // Container fade in with scale
      tl.to(containerRef.current, {
        opacity: 1,
        scaleY: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Decorative line grows from left
      tl.to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2");

      // Text slides in from left
      tl.to(textRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.2)",
      }, "-=0.3");

      // Button slides in from right
      tl.to(buttonRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.2)",
      }, "-=0.5");

      // Subtle continuous pulse on button
      tl.add(() => {
        gsap.to(buttonRef.current, {
          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const el = document.getElementById('ServicesSection');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="hidden lg:block w-full bg-gradient-to-r from-slate-900/95 via-emerald-950/90 to-slate-900/95 py-6 px-4 sm:px-6 lg:px-8 border-y border-emerald-500/40 backdrop-blur-sm overflow-hidden"
      style={{ minHeight: '100px' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 lg:gap-8">
        {/* Left Side - Text with Decorative Line */}
        <div className="flex items-center gap-4 lg:gap-5 flex-1 w-full sm:w-auto max-w-full">
          <div 
            ref={lineRef}
            className="w-1 h-12 sm:h-14 lg:h-16 bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex-shrink-0 shadow-xl shadow-emerald-400/60"
          />
          <h2 
            ref={textRef}
            className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-emerald-50 to-white bg-clip-text text-transparent leading-tight drop-shadow-lg"
          >
            Let's take the first step. We're ready.
          </h2>
        </div>

        {/* Right Side - Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end flex-shrink-0">
          <button 
            ref={buttonRef}
            onClick={handleScroll}
            className="px-8 lg:px-10 py-3.5 bg-emerald-500 border-2 border-emerald-400 text-white text-base lg:text-lg font-semibold rounded-lg hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
            style={{ minWidth: '150px' }}
          >
            Send Brief
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;