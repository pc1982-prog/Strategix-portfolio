import React, { useRef, useEffect } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { STRATEGIX_DATA } from '../../data/siteContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-28 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-xs font-bold text-emerald-400 tracking-widest uppercase mb-4 px-4 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/10">
            {STRATEGIX_DATA.contact.heading}
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mt-4">
            Ready to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Transform
            </span>{' '}
            Your Brand?
          </h3>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Reach out — we are one message away.
          </p>
        </div>

        {/* Single Email Card */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="group relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/40 rounded-3xl p-10 sm:p-14
                       hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10
                       transition-all duration-500 w-full max-w-lg"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-500/40 rounded-br-3xl" />

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon + arrow */}
            <div className="relative flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center
                              group-hover:bg-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                <Mail size={24} className="text-emerald-400" />
              </div>
              <ArrowUpRight
                size={20}
                className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              />
            </div>

            {/* Label */}
            <p className="relative text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
              General Inquiries
            </p>

            {/* Email */}
            <a
              href={"mailto:marketing@strategixworks.com"}
              className="relative block text-xl sm:text-2xl font-bold text-white hover:text-emerald-400 transition-colors duration-300 break-all"
            >
              marketing@strategixworks.com
            </a>

            {/* Animated underline */}
            <div className="relative mt-6 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-24 transition-all duration-500" />
          </div>
        </div>

      </div>

      <div className="h-10 lg:h-16" />
    </section>
  );
};

export default Contact;