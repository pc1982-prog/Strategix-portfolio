import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, TrendingUp, MessageSquare, Zap, Target, Sparkles, X } from "lucide-react";
import Trading1 from "../../assets/images/Trading1.jpeg"
import Trading2 from "../../assets/images/Trading2.jpeg"
import Trading3 from "../../assets/images/Trading3.jpeg"
import SaleGraph from "../../assets/images/WhatsApp Image 2025-12-16 at 2.17.33 AM.jpeg"
import Traction from "../../assets/images/Strategix- Portfolio (29).png"
import case3 from "../../assets/images/WhatsApp Image 2025-12-08 at 1.53.53 PM.jpeg"
import case7 from "../../assets/images/CaseStudy7.jpeg"
import case9 from "../../assets/images/WhatsApp Image 2025-12-08 at 1.53.53 PM (1).jpeg"
import case10 from "../../assets/images/CaseStudy10.jpeg"

const Work = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const counterStarted = useRef(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

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

  // const startCounters = () => {
  //   const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
  //     const element = document.getElementById(id);
  //     if (!element) return;

  //     const startTime = performance.now();
  //     const step = (currentTime) => {
  //       const elapsed = currentTime - startTime;
  //       const progress = Math.min(elapsed / duration, 1);
  //       const value = Math.floor(start + (end - start) * easeOutQuart(progress));
        
  //       if (id.includes('investment')) {
  //         element.textContent = `${prefix}${(value / 1000).toFixed(value < 10000 ? 1 : 0)}K${suffix}`;
  //       } else if (id === 'stat-conversion') {
  //         element.textContent = `${prefix}${(value / 10).toFixed(1)}${suffix}`;
  //       } else if (id === 'stat-sales') {
  //         element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
  //       } else {
  //         element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
  //       }
        
  //       if (progress < 1) {
  //         requestAnimationFrame(step);
  //       }
  //     };
  //     requestAnimationFrame(step);
  //   };

  //   const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  //   animateValue('investment-main', 0, 23000, 2500, '₹');
  //   animateValue('investment-card', 0, 23000, 2500, '₹');
  //   animateValue('delight-card', 0, 100, 2200, '', '%');
  //   animateValue('stat-sessions', 0, 14.54, 2500, '');
  //   animateValue('stat-sales', 0, 40267, 2500, '$');
  //   animateValue('stat-orders', 0, 361, 2200, '');
  //   animateValue('stat-conversion', 0, 6.23, 2300, '', '%');
  // };
  const startCounters = () => {
    const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
      const element = document.getElementById(id);
      if (!element) return;

      const startTime = performance.now();
      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (end - start) * easeOutQuart(progress);
        
        if (id.includes('investment')) {
          element.textContent = `${prefix}${(Math.floor(value) / 1000).toFixed(value < 10000 ? 1 : 0)}K${suffix}`;
        } else if (id === 'stat-conversion' || id === 'stat-sessions') {
          element.textContent = `${prefix}${value.toFixed(2)}${suffix}`;
        } else if (id === 'stat-sales') {
          element.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
        } else {
          element.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
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
    animateValue('stat-sessions', 0, 14.54, 2500, '', 'x');
    animateValue('stat-sales', 0, 40267, 2500, '$');
    animateValue('stat-orders', 0, 361, 2200, '');
    animateValue('stat-conversion', 0, 6.23, 2300, '', '%');
  };


  const performanceCards = [
    { 
      title: "Books & Publishing Brand", 
      reach: "$4,864.87", 
      suffix: "Sales (+86%)",
      badge: "41 Orders", 
      icon: MessageSquare,
      gradient: "from-emerald-500 to-teal-600",
      image: Trading3
    },
    { 
      title: "Premium Lifestyle Brand", 
      reach: "₹144,356", 
      suffix: "Sales (+16%)",
      badge: "924 Orders", 
      icon: Zap,
      gradient: "from-teal-500 to-cyan-600",
      image: Trading1
    },
    { 
      title: "E-commerce Book Store", 
      reach: "$6,941.66", 
      suffix: "Sales (+277%)",
      badge: "54 Orders", 
      icon: Target,
      gradient: "from-emerald-600 to-teal-500",
      image: Trading2
    },
  ];

  const caseStudies = [
    { 
      number: "10",
      brand: "",
      industry: "Online Silver Jewellery Brand",
      totalSales: "₹4,83,343",
      amountSpent: "₹106189",
      roas: "4.5x+",
      orders: "394",
      image: case7
    },
    { 
      number: "7",
      brand: "",
      industry: "Premium Athleisure Brand",
      totalSales: "₹1.06M",
      amountSpent: "₹137.43K",
      roas: "7.74x",
      orders: "290",
      image: case9
    },
    { 
      number: "3",
      brand: "",
      industry: "Fashion & Apparel Industry",
      totalSales: "₹317.31K",
      amountSpent: "₹49.79K",
      roas: "6.37x",
      orders: "54",
      image: case10
    },
    { 
      number: "9",
      brand: "",
      industry: "Online Luxury Brand",
      totalSales: "₹130.29K",
      amountSpent: "₹25.83K",
      roas: "5.04x",
      orders: "30",
      image: case3
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

        .card-hover-effect {
          position: relative;
          overflow: hidden;
        }

        .card-hover-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .card-hover-effect:hover::before {
          left: 100%;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: transparent;
          border-radius: 1rem;
          max-width: 900px;
          width: auto;
          max-height: 85vh;
          overflow: hidden;
          position: relative;
          animation: slideUp 0.4s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content img {
          max-width: 100%;
          max-height: 85vh;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Image Popup Modal */}
      {(selectedImage || selectedCard) && (
        <div className="modal-overlay" onClick={() => { setSelectedImage(null); setSelectedCard(null); }}>
          <button 
            onClick={() => { setSelectedImage(null); setSelectedCard(null); }}
            className="absolute top-6 right-6 z-50 p-3 bg-slate-900/90 hover:bg-emerald-500 rounded-full transition-all duration-300 backdrop-blur-sm shadow-2xl border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage || selectedCard} 
              alt="Full view"
              className="rounded-xl shadow-2xl border border-emerald-500/20"
            />
          </div>
        </div>
      )}

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

        {/* Hero Section */}
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
      
        {/* Performance Cards - REDESIGNED */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {performanceCards.map((item, i) => (
              <div 
                key={i} 
                className="group relative rounded-3xl overflow-hidden hover:scale-[1.03] transition-all duration-500 fade-in-up card-hover-effect shadow-2xl"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Card Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                
                {/* Card Content */}
                <div className="relative bg-slate-900/95 rounded-3xl overflow-hidden border border-slate-800/50">
                  {/* Image Section - Full Bleed */}
                  <div 
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80" />
                    
                    {/* Icon Badge - Top Left */}
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 bg-gradient-to-br ${item.gradient} rounded-xl shadow-2xl backdrop-blur-sm`}>
                        <item.icon size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Sales Badge - Top Right */}
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-2 bg-emerald-500 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-2xl border border-white/20">
                        {item.badge}
                      </span>
                    </div>

                    {/* Bottom Stats Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-slate-400 text-sm font-semibold">Total Sales</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {item.reach}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl">
                      <span className="text-emerald-300 text-sm font-bold">Growth</span>
                      <span className="text-emerald-400 font-black text-base">{item.suffix}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="max-w-6xl mx-auto mb-16 px-4 sm:px-6 lg:px-8 fade-in-up">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Real Impact, Real Numbers
            </h3>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6">
              Data-driven performance marketing that delivers measurable growth across all key metrics
            </p>
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 glass border-2 border-emerald-500/50 rounded-2xl glow-emerald">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Performance That Moves Upstream
              </p>
              <span className="text-2xl sm:text-3xl md:text-4xl">📈</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10">
            {[
              { label: "ROAS", value: "14.54x", prefix: "", delta: "+20%", color: "emerald", id: "stat-sessions" },
              { label: "Total Sales", value: "40,267", prefix: "$", delta: "+42%", color: "teal", id: "stat-sales" },
              { label: "Orders", value: "361", prefix: "", delta: "+52%", color: "emerald", id: "stat-orders" },
              { label: "Conversion", value: "6.23", prefix: "", suffix: "%", delta: "+72%", color: "teal", id: "stat-conversion" },
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
                    <span id={s.id}>{s.prefix}0{s.suffix || ''}</span>
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
              src={SaleGraph} 
              alt="Growth Analytics Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Traction Section */}
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
              Incorporated a bespoke <strong className="text-emerald-300 font-black">₹23K chandelier</strong> into a luxurious living room design – turning a single product into a conversation-starting centerpiece.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative glass rounded-2xl p-5 text-center overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
                <div className="relative">
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Chandelier Cost</p>
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
                src={Traction}
                alt="₹23K Order Chandelier"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Case Studies - REDESIGNED */}
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
                className="group relative rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500 fade-in-up shadow-xl cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => setSelectedCard(study.image)}
              >
                {/* Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                
                {/* Card Content */}
                <div className="relative bg-slate-900/95 rounded-2xl overflow-hidden border border-slate-800/50">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={`${study.industry} Case Study`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    
                    <div className="absolute top-3 right-3">
                      <TrendingUp className="w-5 h-5 text-teal-400 drop-shadow-lg" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-4">
                    {study.brand && (
                      <h4 className="text-base font-bold text-white leading-tight mb-1">
                        {study.brand}
                      </h4>
                    )}
                    
                    <p className="text-slate-400 text-xs mb-4">
                      {study.industry}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 px-3 glass rounded-lg">
                        <span className="text-slate-400 text-xs font-medium">Total Sales</span>
                        <span className="font-bold text-emerald-400 text-sm">{study.totalSales}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 glass rounded-lg">
                        <span className="text-slate-400 text-xs font-medium">Spent</span>
                        <span className="font-bold text-teal-400 text-sm">{study.amountSpent}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                        <span className="text-emerald-300 text-xs font-bold">ROAS</span>
                        <span className="font-black text-emerald-400 text-base">{study.roas}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 glass rounded-lg">
                        <span className="text-slate-400 text-xs font-medium">Orders</span>
                        <span className="font-bold text-teal-400 text-sm">{study.orders}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
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