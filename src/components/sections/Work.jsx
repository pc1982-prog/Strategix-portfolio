import React, { useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp, Users, MessageSquare, Sparkles, Zap, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import traction from "../../assets/images/traction.png"
import t from "../../assets/images/adds.jpeg"
import trading1 from "../../assets/images/1.jpeg"
import trading3 from "../../assets/images/3.jpeg"
import trading4 from "../../assets/images/4.jpeg"
import caseStudy10 from "../../assets/images/case-study-10.jpeg";
import caseStudy7 from "../../assets/images/case-study-7.jpeg";
import caseStudy3 from "../../assets/images/case-study-3.jpeg";
import caseStudy9 from "../../assets/images/case-study-9.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef(null);
  const tractionRef = useRef(null);
  const heroRef = useRef(null);
  const caseStudiesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const cards = self.selector(".performance-card");
      const stats = self.selector(".stat-item");
      const titleLines = self.selector(".title-line");
      const tractionText = self.selector(".traction-text");
      const counterBoxes = self.selector(".counter-box");
      const tractionImage = tractionRef.current?.querySelector("img");
      const floatingElements = self.selector(".floating-element");
      // Selectors for new case studies
      const caseStudyCards = self.selector(".case-study-card");

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

      // Performance Cards - 3D Flip + Slide (simplified rotation to avoid clipping)
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { 
            rotationY: -45, // Reduced from -90 for less clipping
            x: -100, // Reduced offset
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

        // Hover animation (only on non-touch devices)
        const isTouch = 'ontouchstart' in window;
        if (!isTouch) {
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
        }
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

      // Parallax scrolling for cards (reduced for smoothness)
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -30 : 30, // Reduced from 50
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // New Case Studies Animation - Staggered Fade + Scale
      gsap.fromTo(
        caseStudyCards,
        { 
          opacity: 0,
          y: 50,
          scale: 0.9,
          rotationX: -10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          stagger: {
            each: 0.2,
            from: "start",
            ease: "power3.out"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: "top 80%",
          },
        }
      );

      // Hover for case study cards (only on non-touch)
      caseStudyCards.forEach((card) => {
        const isTouch = 'ontouchstart' in window;
        if (!isTouch) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
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

 
  const performanceCards = [
    { 
      title: "Fair Book Deals - Dec 1", 
      reach: "577", 
      suffix: "Sessions (+15%)",
      badge: "Sales $8,644.87", 
      icon: MessageSquare,
      gradient: "from-emerald-500 to-teal-600",
      image: trading1
    },
    { 
      title: "Sterling International", 
      reach: "14.06K", 
      suffix: "Sessions (+3%)",
      badge: "Sales ₹144,356", 
      icon: Zap,
      gradient: "from-teal-500 to-cyan-600",
      image: trading3
    },
    { 
      title: "Fair Book Deals - Nov 28", 
      reach: "646", 
      suffix: "Sessions (+36%)",
      badge: "Sales $6,941.66", 
      icon: Target,
      gradient: "from-emerald-600 to-teal-500",
      image: trading4
    },
  ];


  const caseStudies = [
    { 
      number: "10",
      brand: "Rishbhirich India",
      industry: "Online Silver Jewellery Brand",
      totalSales: "₹520,000",
      amountSpent: "₹107,000",
      roas: "5x+",
      orders: "4,300",
      aov: "₹2,000",
      cps: "₹32",
      image: caseStudy7
    },
    { 
      number: "7",
      brand: "Muvazoz",
      industry: "Premium Athleisure Brand",
      totalSales: "₹1.06M",
      amountSpent: "₹137.43K",
      roas: "7.74x",
      orders: "290",
      aov: "₹3.67K",
      cps: "₹473.89",
      image: caseStudy9
    },
    { 
      number: "3",
      brand: "Ogio",
      industry: "Fashion & Apparel Industry",
      totalSales: "₹317.31K",
      amountSpent: "₹49.79K",
      roas: "6.37x",
      orders: "54",
      aov: "₹5.88K",
      cps: "₹922.06",
      image: caseStudy10
    },
    { 
      number: "9",
      brand: "Pazzion India",
      industry: "Online Luxury Brand",
      totalSales: "₹130.29K",
      amountSpent: "₹25.83K",
      roas: "5.04x",
      orders: "30",
      aov: "₹4.34K",
      cps: "₹860.91",
      image: caseStudy3
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="relative py-12 sm:py-20 lg:py-32 xl:py-40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-emerald-500 rounded-full blur-3xl" />
        <div className="floating-element absolute top-40 right-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-teal-500 rounded-full blur-3xl" />
        <div className="floating-element absolute bottom-20 left-1/4 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-emerald-400 rounded-full blur-2xl" />
        <div className="floating-element absolute bottom-40 right-1/4 w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 bg-teal-400 rounded-full blur-2xl" />
      </div>

      {/* Hero Section - 3D Animated */}
      <div ref={heroRef} className="relative z-10 text-center mb-16 sm:mb-20 lg:mb-24 xl:mb-32">
        <h2 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
          Performance <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">Marketing</span>
        </h2>
        <p className="hero-subtitle text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
          Driving <strong className="text-emerald-400">measurable growth</strong> through data-driven campaigns that convert.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24 xl:mb-32">
        <div className="performance-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
          {performanceCards.map((item, i) => (
            <div 
              key={i} 
              className="performance-card group relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full min-h-[400px]" 
              style={{ willChange: 'transform' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500" /> {/* Increased hover glow */}
              
              {/* Content Section - Top part with text/info */}
              <div className="relative flex-1 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between z-10"> {/* flex-1 to push image down, z-10 to layer over image if needed */}
                <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                  <div className={`p-2.5 sm:p-3 lg:p-4 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}> {/* Larger icon container */}
                    <item.icon size={20} className="text-white sm:w-6 sm:h-6 lg:w-7 lg:h-7" /> {/* Larger icon */}
                  </div>
                  <span className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 bg-emerald-500/30 border border-emerald-500/50 rounded-full text-sm sm:text-base font-bold text-emerald-300 uppercase tracking-wide flex-shrink-0"> {/* Enhanced badge styling */}
                    {item.badge}
                  </span>
                </div>
                
                <div className="flex-grow"> {/* flex-grow for spacing */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight mb-2"> {/* Slightly larger title */}
                    {item.title}
                  </h3>
                  
                  <div className="mt-auto"> {/* Push stats to bottom */}
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                      {item.reach}
                    </p>
                    <p className="text-emerald-200 text-sm sm:text-base lg:text-lg"> {/* Larger suffix */}
                      {item.suffix}
                    </p>
                  </div>
                </div>
              </div>
           
              <div className="relative flex-shrink-0 overflow-hidden bg-slate-800/50">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.parentElement.innerHTML = `<div class="w-full   flex items-center justify-center bg-slate-700/50 text-slate-400 text-sm">Image not loaded</div>`; 
                  }}
                  className="w-full h-48 sm:h-56  object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/20 to-transparent pointer-events-none" /> 
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - Animated Counters */}
      <div className="stats-section max-w-6xl mx-auto mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-6 lg:px-8">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div className="relative">
          {/* Improved Heading Section */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Your Growth Graph Will Always Be
            </h3>
            <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                UPSTREAM
              </p>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">📈</span>
            </div>
          </div>
          
          {/* Improved Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-14">
            {[
              { label: "Sessions", value: "10,900", prefix: "₹", delta: "+20%", color: "emerald" },
              { label: "Total Sales", value: "34,917", prefix: "$", delta: "+50%", color: "teal" },
              { label: "Orders", value: "322", prefix: "", delta: "+44%", color: "emerald" },
              { label: "Conversion", value: "2.9%", prefix: "", delta: "+19%", color: "teal" },
            ].map((s, i) => (
              <div key={i} className="stat-item group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-slate-700/70 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-8 hover:border-emerald-500/70 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 min-h-[120px]"> {/* Added min-h */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/15 group-hover:to-teal-500/15 rounded-2xl transition-all duration-500" />
                <div className="relative text-center h-full flex flex-col justify-center">
                  <p className={`text-${s.color}-400 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wide mb-2 sm:mb-3`}>
                    {s.label}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-2 sm:mb-3 leading-none">
                    {s.prefix}{s.value}
                  </p>
                  <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-${s.color}-500/20 border border-${s.color}-500/40 rounded-full`}>
                    <TrendingUp size={14} className={`text-${s.color}-400 sm:w-4 sm:h-4`} />
                    <span className={`text-${s.color}-400 font-bold text-xs sm:text-sm lg:text-base`}>{s.delta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Graph Image with Better Styling */}
          <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-500">
            <img 
              src={t} 
              alt="Growth Graph"
              loading="lazy"
              className="w-full h-auto object-contain" // Changed to object-contain
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* TRACTION Section - Cinematic - Fully Responsive */}
      <div ref={tractionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 items-center max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6 lg:space-y-10 order-2 lg:order-1">
          <div className="space-y-2 sm:space-y-3">
            <div className="overflow-hidden">
              <h3 className="title-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none">
                Traction
              </h3>
            </div>
            <div className="overflow-hidden">
              <p className="title-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent leading-none">
                <span id="investment-main">₹0K</span> Order
              </p>
            </div>
          </div>

          <p className="traction-text text-sm sm:text-base lg:text-lg xl:text-xl text-emerald-100/90 leading-relaxed">
            Incorporated a bespoke <strong className="text-emerald-300 font-black">₹23K chandelier</strong> into a luxurious living room design — turning a single product into a conversation-starting centerpiece.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="counter-box relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/40 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 text-center overflow-hidden group hover:scale-105 transition-transform duration-500 min-h-[100px]"> {/* Added min-h */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500" />
              <div className="relative h-full flex flex-col justify-center">
                <p className="text-emerald-400 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider mb-1 sm:mb-2 lg:mb-3">Investment</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white" id="investment-card">₹0K</p>
              </div>
            </div>
            
            <div className="counter-box relative bg-gradient-to-br from-teal-900/40 to-emerald-900/40 backdrop-blur-xl border border-teal-500/40 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 text-center overflow-hidden group hover:scale-105 transition-transform duration-500 min-h-[100px]"> {/* Added min-h */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/20 group-hover:to-emerald-500/20 transition-all duration-500" />
              <div className="relative h-full flex flex-col justify-center">
                <p className="text-teal-400 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider mb-1 sm:mb-2 lg:mb-3">Client Delight</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white" id="delight-card">0%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
            <img
              src={traction}
              alt="₹23K Order"
              loading="lazy"
              className="w-full h-auto object-contain" // Changed to object-contain
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* New Case Studies Section - Responsive Grid */}
      <div ref={caseStudiesRef} className="max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Success <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">Stories</span>
          </h3>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            Real results from our performance marketing campaigns across diverse brands.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full"> {/* Added w-full */}
          {caseStudies.map((study, i) => (
            <div key={i} className="case-study-card relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-slate-700/70 rounded-2xl sm:rounded-3xl overflow-hidden group hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:scale-105 min-h-[350px]" // Added min-h
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/15 group-hover:to-teal-500/15 rounded-2xl transition-all duration-500" />
              <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                {/* Fixed: Aspect ratio + object-contain, lazy load, error fallback */}
                <div className="mb-4 sm:mb-6 relative aspect-[4/3] rounded-xl overflow-hidden  transition-all duration-500 flex items-center justify-center">
                  <img 
                    src={study.image} 
                    alt={`Case Study ${study.number} - ${study.brand}`}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    className="w-full h-full object-contain" // Changed to object-contain
                  />
                  {/* Fallback if no image or load error */}
                  <div className="absolute inset-0 flex items-center justify-center text-center text-slate-400 text-sm hidden">
                    Image Placeholder<br />
                    (Add your image here)
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs sm:text-sm font-bold text-emerald-300">
                    Case Study {study.number}
                  </span>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
                </div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  {study.brand}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 flex-grow">
                  {study.industry}
                </p>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Total Sales</span>
                    <span className="font-bold text-emerald-400">{study.totalSales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent</span>
                    <span className="font-bold text-teal-400">{study.amountSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROAS</span>
                    <span className="font-bold text-emerald-400">{study.roas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orders</span>
                    <span className="font-bold text-teal-400">{study.orders}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA - Magnetic Button - Fully Responsive */}
      <div className="text-center mt-12 sm:mt-16 lg:mt-24 xl:mt-32">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-6 xl:py-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white text-sm sm:text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-black rounded-full hover:scale-105 lg:hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative">Let's Build Your Success Story</span>
          <ArrowUpRight size={20} className="relative group-hover:rotate-45 transition-transform duration-500 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
        </a>
      </div>
    </section>
  );
};

export default Work;