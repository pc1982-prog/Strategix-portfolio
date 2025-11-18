import React, { useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp, Users, MessageSquare, Sparkles, Zap, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import traction from "../../assets/images/traction.png"

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef(null);
  const tractionRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const cards = self.selector(".performance-card");
      const stats = self.selector(".stat-item");
      const titleLines = self.selector(".title-line");
      const tractionText = self.selector(".traction-text");
      const counterBoxes = self.selector(".counter-box");
      const tractionImage = tractionRef.current?.querySelector("img");
      const floatingElements = self.selector(".floating-element");

      // Continuous floating animation for background elements
      floatingElements.forEach((el, i) => {
        gsap.to(el, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Hero Title - 3D Perspective Entrance
      const heroTitle = self.selector(".hero-title");
      gsap.fromTo(
        heroTitle,
        { 
          rotationX: -90, 
          opacity: 0, 
          transformOrigin: "50% 100%",
          z: -500 
        },
        {
          rotationX: 0,
          opacity: 1,
          z: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
          },
        }
      );

      // Hero Subtitle - Glitch effect
      const heroSubtitle = self.selector(".hero-subtitle");
      gsap.fromTo(
        heroSubtitle,
        { 
          scale: 0.8,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
          },
        }
      );

      // Performance Cards - 3D Flip + Slide
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { 
            rotationY: -90,
            x: -200,
            opacity: 0,
            transformOrigin: "left center"
          },
          {
            rotationY: 0,
            x: 0,
            opacity: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".performance-grid",
              start: "top 75%",
            },
          }
        );

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            rotationY: 5,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Stats - Wave entrance
      gsap.fromTo(
        stats,
        { 
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            ease: "power2.out"
          },
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 75%",
          },
        }
      );

      // Traction Title - Split text reveal
      gsap.fromTo(
        titleLines,
        { 
          y: 150,
          opacity: 0,
          rotationX: -90,
          transformOrigin: "50% 100%"
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: tractionRef.current,
            start: "top 70%",
          },
        }
      );

      // Traction Paragraph - Typewriter effect
      gsap.fromTo(
        tractionText,
        { opacity: 0, x: -50, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tractionRef.current,
            start: "top 70%",
          },
        }
      );

      // Counter Boxes - 3D Pop
      gsap.fromTo(
        counterBoxes,
        { 
          z: -500,
          opacity: 0,
          scale: 0.3,
          rotationY: 180
        },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: tractionRef.current,
            start: "top 70%",
            onEnter: () => startCounters(),
          },
        }
      );

      // Traction Image - Parallax + Scale + Rotation
      if (tractionImage) {
        gsap.fromTo(
          tractionImage,
          { scale: 1.4, opacity: 0, rotation: -5 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tractionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.5,
            },
          }
        );
      }

      // Parallax scrolling for cards
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -50 : 50,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startCounters = () => {
    gsap.to("#investment-main", {
      innerText: 23000,
      duration: 2.5,
      ease: "power2.out",
      snap: { innerText: 100 },
      onUpdate: function () {
        const val = Math.round(this.targets()[0].innerText);
        document.getElementById("investment-main").textContent = `₹${(val / 1000).toFixed(val < 10000 ? 1 : 0)}K`;
        document.getElementById("investment-card").textContent = `₹${(val / 1000).toFixed(val < 10000 ? 1 : 0)}K`;
      },
    });

    gsap.to("#delight-card", {
      innerText: 100,
      duration: 2.2,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        document.getElementById("delight-card").textContent = `${Math.round(this.targets()[0].innerText)}%`;
      },
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="relative py-20 sm:py-32 lg:py-40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
        <div className="floating-element absolute top-40 right-20 w-80 h-80 bg-teal-500 rounded-full blur-3xl" />
        <div className="floating-element absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
        <div className="floating-element absolute bottom-20 right-1/4 w-72 h-72 bg-teal-600 rounded-full blur-3xl" />
      </div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-teal-900/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-24 lg:mb-32">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8">
            <Sparkles className="text-emerald-400" size={20} />
            <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">Case Studies</span>
          </div>
          
          <h2 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
            Real Results.
          </h2>
          <p className="hero-subtitle text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
            Real Growth.
          </p>
        </div>

        {/* Performance Cards - Modern Glass Design */}
        <div className="performance-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-32">
          {[
            { 
              title: "Engaging Storytelling", 
              reach: "546,800", 
              suffix: "People reached",
              badge: "₹400 Video → Viral", 
              icon: MessageSquare,
              gradient: "from-emerald-500 to-teal-600"
            },
            { 
              title: "Creative Content", 
              reach: "84,431+", 
              suffix: "Organic Reach",
              badge: "Viral Content", 
              icon: Zap,
              gradient: "from-teal-500 to-cyan-600"
            },
            { 
              title: "LinkedIn Strategy", 
              reach: "Qualified", 
              suffix: "Inbox Leads",
              badge: "Revenue Driver", 
              icon: Target,
              gradient: "from-emerald-600 to-teal-500"
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="performance-card group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
              
              <div className="relative p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className={`p-3 sm:p-4 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={24} className="text-white sm:w-7 sm:h-7" />
                  </div>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{item.title}</h3>
                
                <div>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {item.reach}
                  </p>
                  <p className="text-emerald-200/80 text-base sm:text-lg mt-2">{item.suffix}</p>
                </div>
              </div>
              
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611944212129-4d44d65ce3d7?w=1200&q=80" 
                  alt="LinkedIn" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Glassmorphism */}
        <div className="stats-section relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-20 mb-16 sm:mb-20 lg:mb-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px"
            }} />
          </div>

          <div className="relative">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-3 leading-tight px-4">
              Your Growth Graph Will Always Be
            </h3>
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-12 px-4">
              UPSTREAM! 📈
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8 mb-8 sm:mb-12">
              {[
                { label: "Impressions", value: "132,430", delta: "+155,700%" },
                { label: "Profile Activity", value: "1,431", delta: "+11,750%" },
                { label: "Followers Gained", value: "3,378", delta: "+343.2%" },
                { label: "Accounts Engaged", value: "2,237", delta: "+17,750%" },
              ].map((s, i) => (
                <div key={i} className="stat-item group relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-emerald-500/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 rounded-2xl transition-all duration-500" />
                  <div className="relative">
                    <p className="text-emerald-400 text-xs lg:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">{s.label}</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">{s.value}</p>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                      <TrendingUp size={16} className="animate-bounce sm:w-[18px] sm:h-[18px]" />
                      <span>{s.delta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" 
                alt="Graph" 
                className="w-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* TRACTION Section - Cinematic */}
        <div ref={tractionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">
          <div className="space-y-6 lg:space-y-10">
            <div className="space-y-3">
              <div className="overflow-hidden">
                <h3 className="title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none">
                  Traction
                </h3>
              </div>
              <div className="overflow-hidden">
                <p className="title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent leading-none">
                  <span id="investment-main">₹0K</span> Order
                </p>
              </div>
            </div>

            <p className="traction-text text-base sm:text-lg lg:text-xl text-emerald-100/90 leading-relaxed">
              Incorporated a bespoke <strong className="text-emerald-300 font-black">₹23K chandelier</strong> into a luxurious living room design — turning a single product into a conversation-starting centerpiece.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="counter-box relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center overflow-hidden group hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500" />
                <div className="relative">
                  <p className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">Investment</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white" id="investment-card">₹0K</p>
                </div>
              </div>
              
              <div className="counter-box relative bg-gradient-to-br from-teal-900/40 to-emerald-900/40 backdrop-blur-xl border border-teal-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center overflow-hidden group hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/20 group-hover:to-emerald-500/20 transition-all duration-500" />
                <div className="relative">
                  <p className="text-teal-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">Client Delight</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white" id="delight-card">0%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
              <img
                src={traction}
                alt="₹23K Order"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* CTA - Magnetic Button */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-32">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 lg:px-16 py-4 sm:py-6 lg:py-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white text-base sm:text-xl lg:text-2xl xl:text-3xl font-black rounded-full hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Let's Build Your Success Story</span>
            <ArrowUpRight size={24} className="relative group-hover:rotate-45 transition-transform duration-500 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;