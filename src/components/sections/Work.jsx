
import React, { useRef, useEffect, useState } from 'react';
import { Search, Settings, Users, Headphones, Award } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import { STRATEGIX_DATA } from '../../data/siteContent';

 const Work = () => {

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: 'DISCOVER',
      desc: 'People with ideas and experience to develop a vision for the future',
      icon: <Search className="w-8 h-8" />,
      color: 'from-purple-600 to-purple-500',
    },
    {
      title: 'BUILD',
      desc: 'The right tools at the right time enhances the shared economy',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-cyan-600 to-cyan-500',
    },
    {
      title: 'CONNECT',
      desc: 'Integrating clients with partners is the focus of everyday business',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-600 to-green-500',
    },
    {
      title: 'LAUNCH',
      desc: 'Bringing highly-anticipated programs to the marketplace',
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-yellow-600 to-yellow-500',
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section
        ref={sectionRef}
        id="work"
        className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-gradient-radial from-purple-600/10 via-transparent to-transparent blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <p className="text-xs sm:text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Our Work Process
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-50 leading-tight">
              Work <ShinyText>Process</ShinyText>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center space-y-4 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-800"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#grad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={isVisible ? 0 : 283}
                      className="transition-all duration-1500 ease-out"
                    />
                    <defs>
                      <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-slate-900/80 backdrop-blur-sm text-white">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 max-w-xs">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-50">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {STRATEGIX_DATA.work.caseStudy && (
            <div className="mt-20 p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award size={24} className="text-purple-300" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-sm font-semibold text-purple-300 mb-3">
                    {STRATEGIX_DATA.work.caseStudy.label}
                  </span>
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                    {STRATEGIX_DATA.work.caseStudy.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .bg-gradient-radial {
            background: radial-gradient(circle at center, rgba(139,92,246,0.1), transparent 70%);
          }
        `}</style>
      </section>
    </>
  );
};


export default Work;