import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Sample data - replace with your actual data
const STRATEGIX_DATA = {
  about: {
    title: "About Us",
    description: "We are a digital marketing agency dedicated to helping businesses grow through innovative strategies and data-driven solutions. Our team of experts specializes in creating impactful campaigns that drive real results.",
    socialMedia: "From creating engaging content to managing your social media presence, we help brands build meaningful connections with their audience across all platforms."
  }
};

export const About = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ctx;
    if (isLarge) {
      ctx = gsap.context(() => {
        // Left side content animation (Text section)
        gsap.from(leftContentRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          }
        });

        // Right side content animation (Images container)
        gsap.from(rightContentRef.current, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          }
        });

        // Left image animation (staggered)
        gsap.from(leftImageRef.current, {
          x: -80,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        });

        // Right image animation (staggered)
        gsap.from(rightImageRef.current, {
          x: 80,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        });
      }, sectionRef);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isLarge]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 py-20 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Animated from Left */}
          <div ref={leftContentRef} className="order-2 lg:order-1">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              {STRATEGIX_DATA.about.title}
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Transforming Digital{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Presence
              </span>
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              {STRATEGIX_DATA.about.description}
            </p>
            <div className="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6 shadow-lg">
              <h4 className="text-base font-semibold text-emerald-400 mb-3">
                Social Media Evolution
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {STRATEGIX_DATA.about.socialMedia}
              </p>
            </div>
          </div>

          {/* Right Content - Animated from Right */}
          <div ref={rightContentRef} className="order-1 lg:order-2 overflow-hidden">
            <div className="flex flex-col items-start max-w-full">
              {/* Main Image - Left & Top (Larger) */}
              <div
                ref={leftImageRef}
                className="w-[75%] sm:w-[72%] relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>

              {/* Second Image - Right & Bottom (Smaller with Gradient Border) */}
              <div
                ref={rightImageRef}
                className="w-[50%] sm:w-[48%] self-end -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32"
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "linear-gradient(to bottom, #10b981, #0f172a)",
                    padding: "4px",
                  }}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop"
                      alt="Team meeting"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;