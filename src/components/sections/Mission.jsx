// src/components/sections/Mission.jsx
import React, { useRef, useEffect, useState } from 'react';
import { STRATEGIX_DATA } from '../../data/siteContent';
import ShinyText from '../ui/ShinyText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Mission=() => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [SplitType, setSplitType] = useState(null);

  // Load SplitType dynamically
  useEffect(() => {
    import('split-type').then((module) => {
      setSplitType(() => module.default);
    });
  }, []);

useEffect(() => {
    if (!SplitType || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      const titleSplit = new SplitType(titleRef.current, { types: 'words' });
      gsap.fromTo(
        titleSplit.words,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const direction = i % 2 === 0 ? -80 : 80;

        gsap.fromTo(
          card,
          { x: direction, opacity: 0, scale: 0.94 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const desc = card.querySelector('.mission-desc');
        if (desc && desc.textContent) {
          const descSplit = new SplitType(desc, { types: 'chars' });
          gsap.fromTo(
            descSplit.chars,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: desc,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [SplitType]);

  const missions = STRATEGIX_DATA?.mission || [];

  return (
    <>
     
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section
        ref={sectionRef}
        id="mission"
       className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
         <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl" />
      </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
         <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Our Mission</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">Drives Us</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Transforming bold ideas into measurable digital success
          </p>
        </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-28">
            {missions.map((m, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`
                  group relative flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                  items-center gap-8 sm:gap-10 lg:gap-14
                  p-6 sm:p-8 lg:p-10
                  rounded-2xl sm:rounded-3xl
                  bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-800/60
                  backdrop-blur-xl
                  border border-slate-700/50
                  shadow-2xl shadow-purple-900/10
                  transition-all duration-500 ease-out
                  hover:shadow-emerald-700/25 hover:scale-[1.02] hover:border-emerald-500/80
                `}
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-600/10 to-emerald-300/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 -z-10" />

                <div className="flex-shrink-0">
                  <div
                    // className={`
                    //   w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
                    //   rounded-full flex items-center justify-center
                    //   bg-gradient-to-br from-emerald-500 via-green-500 to-emer-500
                    //   shadow-2xl shadow-purple-600/40
                    //   border border-white/20
                    //   transition-transform duration-300 group-hover:scale-110
                    // `}
                  >
                     <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl">
                  <span className="text-4xl font-bold text-white">{m.number}</span>
                </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-50">
                    {m.title}
                  </h3>
                  <p className="mission-desc text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-light max-w-3xl">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          .animate-pulse { animation: pulse 8s ease-in-out infinite; }
          .bg-gradient-radial {
            background: radial-gradient(circle at center, rgba(139,92,246,0.2), transparent 70%);
          }
        `}</style>
      </section>
    </>
  );
}