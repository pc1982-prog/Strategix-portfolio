import React, { useRef, useEffect, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import { STRATEGIX_DATA } from '../../data/siteContent';

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={`section-overlap py-24 relative z-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 -z-10"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-purple-400 mb-4 tracking-widest uppercase">
            {STRATEGIX_DATA.contact.heading}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <ShinyText>Transform</ShinyText> Your Brand?
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {STRATEGIX_DATA.contact.team.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900/90 to-purple-900/20 p-10 rounded-2xl border border-purple-500/20 hover:border-purple-500 transition-all duration-500 hover:scale-105 group"
            >
              <div className="mb-6">
                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {member.name}
                </h4>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group/link"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover/link:bg-purple-500/30 transition-colors">
                    <Phone size={20} className="text-purple-400" />
                  </div>
                  <span className="text-lg font-medium">{member.phone}</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group/link"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover/link:bg-purple-500/30 transition-colors">
                    <Mail size={20} className="text-purple-400" />
                  </div>
                  <span className="text-base font-medium break-all">{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;