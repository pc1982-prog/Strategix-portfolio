import React, { useRef, useEffect, useState } from 'react';
import { TrendingUp, Eye, BarChart3 } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import { STRATEGIX_DATA } from '../../data/siteContent';


export const Traction = () => {
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
    <section ref={sectionRef} className={`section-overlap py-24 relative z-70 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-900 -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-10 md:p-16 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              With us, your Graph will always be in <ShinyText>UPSTREAM!</ShinyText>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {STRATEGIX_DATA.traction.metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-slate-900/50 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4 text-purple-400">
                  {metric.icon === 'trending-up' && <TrendingUp size={48} />}
                  {metric.icon === 'eye' && <Eye size={48} />}
                  {metric.icon === 'bar-chart' && <BarChart3 size={48} />}
                </div>
                <p className="text-gray-300 leading-relaxed">{metric.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};