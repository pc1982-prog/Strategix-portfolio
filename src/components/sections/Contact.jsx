import React, { useRef, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { STRATEGIX_DATA } from '../../data/siteContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - fade in from top
      gsap.from(headingRef.current, {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Cards animation - slide from left and right alternately
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            x: index % 2 === 0 ? -100 : 100, // Left se pehla, right se doosra
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });

          // Card ke andar ke elements ko animate karo
          const phoneLink = card.querySelector('.phone-link');
          const emailLink = card.querySelector('.email-link');
          
          if (phoneLink) {
            gsap.from(phoneLink, {
              x: 30,
              opacity: 0,
              duration: 0.6,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            });
          }

          if (emailLink) {
            gsap.from(emailLink, {
              x: 30,
              opacity: 0,
              duration: 0.6,
              delay: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background glows – responsive blur */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-emerald-500/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-teal-500/40 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-bold text-emerald-400 mb-4 tracking-widest uppercase">
            {STRATEGIX_DATA.contact.heading}
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Transform</span> Your Brand?
          </h3>
        </div>

        {/* Team Cards – Fully Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {STRATEGIX_DATA.contact.team.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-6 sm:p-8 lg:p-10 
                         hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 
                         transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Optional subtle inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="mb-6">
                <h4 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {member.name}
                </h4>
                <div className="mt-3 w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 group-hover:w-28" />
              </div>

              <div className="space-y-5">
                {/* Phone */}
                <a
                  href={`tel:${member.phone}`}
                  className="phone-link flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300 group/link"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center 
                                   group-hover/link:bg-emerald-500/30 group-hover/link:scale-110 
                                   transition-all duration-300">
                    <Phone size={20} className="text-emerald-400" />
                  </div>
                  <span className="text-base sm:text-lg font-medium tracking-wide">{member.phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${member.email}`}
                  className="email-link flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300 group/link"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center 
                                   group-hover/link:bg-emerald-500/30 group-hover/link:scale-110 
                                   transition-all duration-300">
                    <Mail size={20} className="text-emerald-400" />
                  </div>
                  <span className="text-base sm:text-lg font-medium break-all tracking-wide">{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Optional bottom spacing for mobile */}
        <div className="h-10 lg:h-20" />
      </div>
    </section>
  );
};

export default Contact;