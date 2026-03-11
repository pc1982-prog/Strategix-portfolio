import React, { useRef, useEffect } from 'react';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { STRATEGIX_DATA } from '../../data/siteContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const dividerRef = useRef(null);

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

      gsap.from(leftPanelRef.current, {
        x: -120,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftPanelRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(dividerRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(rightPanelRef.current, {
        x: 120,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightPanelRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phones = [...new Set(STRATEGIX_DATA.contact.team.map((m) => m.phone))];
  const emails = [...new Set(STRATEGIX_DATA.contact.team.map((m) => m.email))];

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
            Reach out — we are one call or message away.
          </p>
        </div>

        {/* Split Contact Panel */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-black/40">

          {/* Left — Phone */}
          <div
            ref={leftPanelRef}
            className="group flex-1 relative bg-slate-800/60 backdrop-blur-sm p-8 sm:p-10 lg:p-14 flex flex-col justify-between gap-8 hover:bg-slate-800/80 transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-3xl" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                <Phone size={24} className="text-emerald-400" />
              </div>
              <ArrowUpRight size={20} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">Call Us</p>
              <div className="space-y-3">
                {phones.map((phone, i) => (
                  <a
                    key={i}
                    href={"tel:" + phone}
                    className="block text-xl sm:text-2xl font-bold text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-20 transition-all duration-500" />
            </div>
          </div>

          {/* Vertical Divider */}
          <div
            ref={dividerRef}
            className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-600/60 to-transparent origin-top"
          />
          {/* Horizontal Divider mobile */}
          <div className="block md:hidden h-px bg-gradient-to-r from-transparent via-slate-600/60 to-transparent" />

          {/* Right — Email */}
          <div
            ref={rightPanelRef}
            className="group flex-1 relative bg-slate-800/60 backdrop-blur-sm p-8 sm:p-10 lg:p-14 flex flex-col justify-between gap-8 hover:bg-slate-800/80 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-teal-500/40 rounded-tr-3xl" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center group-hover:bg-teal-500/30 group-hover:scale-110 transition-all duration-300">
                <Mail size={24} className="text-teal-400" />
              </div>
              <ArrowUpRight size={20} className="text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">Email Us</p>
              <div className="space-y-3">
                {emails.map((email, i) => (
                  <a
                    key={i}
                    href={"mailto:" + email}
                    className="block text-lg sm:text-xl font-bold text-white hover:text-teal-400 transition-colors duration-300 break-all"
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full group-hover:w-20 transition-all duration-500" />
            </div>
          </div>

        </div>
      </div>

      <div className="h-10 lg:h-16" />
    </section>
  );
};

export default Contact;