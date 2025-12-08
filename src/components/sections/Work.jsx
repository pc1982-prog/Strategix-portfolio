import React, { useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp, MessageSquare, Zap, Target, Sparkles } from "lucide-react";
import traction from "../../assets/images/traction.png"
import t from "../../assets/images/adds.jpeg"
import trading1 from "../../assets/images/1.jpeg"
import trading3 from "../../assets/images/99.jpeg"
import trading4 from "../../assets/images/4.jpeg"
import caseStudy10 from "../../assets/images/case-study-10.jpeg";
import caseStudy7 from "../../assets/images/case-study-7.jpeg";
import caseStudy3 from "../../assets/images/case-study-3.jpeg";
import caseStudy9 from "../../assets/images/case-study-9.jpeg";

const Work = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const counterStarted = useRef(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          if (entry.target === statsRef.current && !counterStarted.current) {
            counterStarted.current = true;
            startCounters();
          }
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    elements?.forEach(el => observer.observe(el));

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
      const element = document.getElementById(id);
      if (!element) return;

      const startTime = performance.now();
      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (end - start) * easeOutQuart(progress));
        
        if (id.includes('investment')) {
          element.textContent = `${prefix}${(value / 1000).toFixed(value < 10000 ? 1 : 0)}K${suffix}`;
        } else {
          element.textContent = `${value}${suffix}`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    animateValue('investment-main', 0, 23000, 2500, '₹');
    animateValue('investment-card', 0, 23000, 2500, '₹');
    animateValue('delight-card', 0, 100, 2200, '', '%');
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
      image: caseStudy3
    },
  ];

  return (
    <>
      <style>{`
        .fade-in-up, .fade-in-left, .fade-in-right, .scale-in {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-up {
          transform: translateY(30px);
        }
        
        .fade-in-left {
          transform: translateX(-30px);
        }
        
        .fade-in-right {
          transform: translateX(30px);
        }
        
        .scale-in {
          transform: scale(0.95);
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .glow-emerald {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      <section 
        ref={sectionRef} 
        id="work" 
        className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 md:w-64 h-48 md:h-64 bg-emerald-500 rounded-full blur-3xl floating" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-56 md:w-80 h-56 md:h-80 bg-teal-500 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-40 md:w-48 h-40 md:h-48 bg-emerald-400 rounded-full blur-2xl floating" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Hero Section - More Compact */}
        <div className="relative z-10 text-center mb-12 md:mb-16 lg:mb-20 px-4 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Performance Marketing Excellence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 leading-tight">
            Performance{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                Marketing
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full" />
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Driving <strong className="text-emerald-400 font-bold">measurable growth</strong> through data-driven campaigns that convert.
          </p>
        </div>
      
        {/* Performance Cards - More Compact */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {performanceCards.map((item, i) => (
              <div 
                key={i} 
                className="group relative glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 fade-in-up"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-emerald-500/5 transition-all duration-500" />
                
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 bg-emerald-500 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg`}>
                      <item.icon size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-tight min-h-[3rem] flex items-center">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-2.5 pt-3 border-t border-slate-700/60">
                    <div className="flex items-baseline justify-between">
                      <span className="text-slate-400 text-sm font-medium">Sessions</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {item.reach}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-1.5 glass border border-emerald-500/30 rounded-lg">
                      <span className="text-emerald-300 text-sm font-semibold">Growth</span>
                      <span className="text-emerald-400 font-bold text-sm">{item.suffix}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - More Compact */}
        <div ref={statsRef} className="max-w-6xl mx-auto mb-16 px-4 sm:px-6 lg:px-8 fade-in-up">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Growth Graph Will Always Be
            </h3>
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 glass border-2 border-emerald-500/50 rounded-2xl glow-emerald">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                UPSTREAM
              </p>
              <span className="text-3xl sm:text-4xl md:text-5xl">📈</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10">
            {[
              { label: "Sessions", value: "10,900", prefix: "₹", delta: "+20%", color: "emerald" },
              { label: "Total Sales", value: "34,917", prefix: "$", delta: "+50%", color: "teal" },
              { label: "Orders", value: "322", prefix: "", delta: "+44%", color: "emerald" },
              { label: "Conversion", value: "2.9%", prefix: "", delta: "+19%", color: "teal" },
            ].map((s, i) => (
              <div 
                key={i} 
                className="group glass rounded-2xl p-5 hover:scale-[1.02] transition-all duration-500 scale-in"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${s.color}-500/0 to-${s.color}-500/0 group-hover:from-${s.color}-500/10 group-hover:to-${s.color}-500/10 rounded-2xl transition-all duration-500`} />
                <div className="relative text-center">
                  <p className={`text-${s.color}-400 text-xs font-bold uppercase tracking-wide mb-2`}>
                    {s.label}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">
                    {s.prefix}{s.value}
                  </p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-${s.color}-500/20 border border-${s.color}-500/40 rounded-full`}>
                    <TrendingUp size={14} className={`text-${s.color}-400`} />
                    <span className={`text-${s.color}-400 font-bold text-xs`}>{s.delta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl glow-emerald">
            <img 
              src={t} 
              alt="Growth Analytics Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Traction Section - More Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 fade-in-left">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
                Traction
              </h3>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                <span id="investment-main">₹0K</span> Order
              </p>
            </div>

            <p className="text-base md:text-lg text-emerald-100/90 leading-relaxed">
              Incorporated a bespoke <strong className="text-emerald-300 font-black">₹23K chandelier</strong> into a luxurious living room design — turning a single product into a conversation-starting centerpiece.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative glass rounded-2xl p-5 text-center overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
                <div className="relative">
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Investment</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white" id="investment-card">₹0K</p>
                </div>
              </div>
              
              <div className="relative glass rounded-2xl p-5 text-center overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />
                <div className="relative">
                  <p className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">Client Delight</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white" id="delight-card">0%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group fade-in-right">
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
              <img
                src={traction}
                alt="₹23K Order Chandelier"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Case Studies - More Compact */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-10 fade-in-up">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
              Success <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">Stories</span>
            </h3>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
              Real results from our performance marketing campaigns across diverse brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {caseStudies.map((study, i) => (
              <div 
                key={i} 
                className="group glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 fade-in-up"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={`${study.brand} Case Study`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 bg-teal-500 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg">
                      Case Study {study.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-bold text-white leading-tight flex-1">
                      {study.brand}
                    </h4>
                    <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-slate-400 text-xs mb-3 min-h-[2.5rem]">
                    {study.industry}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-700/60">
                    <div className="flex justify-between items-center py-1.5 px-3 glass rounded-lg">
                      <span className="text-slate-400 text-xs font-medium">Total Sales</span>
                      <span className="font-bold text-emerald-400 text-sm">{study.totalSales}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 glass rounded-lg">
                      <span className="text-slate-400 text-xs font-medium">Spent</span>
                      <span className="font-bold text-teal-400 text-sm">{study.amountSpent}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 text-xs font-bold">ROAS</span>
                      <span className="font-black text-emerald-400 text-base">{study.roas}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 glass rounded-lg">
                      <span className="text-slate-400 text-xs font-medium">Orders</span>
                      <span className="font-bold text-teal-400 text-sm">{study.orders}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - More Compact */}
        <div className="text-center mt-16 fade-in-up">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white text-base md:text-lg font-black rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Let's Build Your Success Story</span>
            <ArrowUpRight size={20} className="relative group-hover:rotate-45 transition-transform duration-500" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Work;