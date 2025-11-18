// src/components/sections/Work.jsx
import React, { useRef, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Users, MessageSquare, ShoppingBag } from "lucide-react";

// Placeholder images (ye bilkul safe hain, kabhi nahi tootenge)
const placeholderImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"; // analytics
const linkedinImg = "https://images.unsplash.com/photo-1611944212129-4d44d65ce3d7?w=800&q=80"; // linkedin post
const shopifyImg = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"; // ecommerce

const Work = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".work-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            card.style.transition = "all 0.8s ease-out";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            observer.unobserve(card);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(card);
    });
  }, []);

  const performanceCards = [
    {
      title: "Advantage of Engaging Storytelling",
      reach: "546,800 People reached",
      engagement: "943,908 Engagements",
      badge: "₹400 Video → Viral Reach",
      icon: MessageSquare,
      img: linkedinImg,
    },
    {
      title: "The Potential of Creative Images & Videos",
      reach: "84,431+ Reach",
      engagement: "Highly Shareable Carousels",
      badge: "Organic Virality",
      icon: TrendingUp,
      img: linkedinImg,
    },
    {
      title: "Power of Good Content on LinkedIn",
      reach: "Inbox Qualified Leads",
      engagement: "Direct Project Enquiries",
      badge: "Revenue from Conversations",
      icon: Users,
      img: linkedinImg,
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
            Real Results.
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Real Growth.
            </span>
          </h2>
          <p className="mt-6 text-lg text-emerald-200 max-w-3xl mx-auto font-light">
            We don’t just create content — we engineer performance that converts.
          </p>
        </div>

        {/* 3 Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {performanceCards.map((item, index) => (
            <div
              key={index}
              className="work-card group relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                    <item.icon size={28} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widJEST">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {item.reach}
                </p>
                <p className="text-emerald-200 mt-2">{item.engagement}</p>
              </div>

              {/* Image */}
              <div className="h-64 bg-slate-800">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/10 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 p-10 lg:p-16 mb-20">
          <h3 className="text-4xl lg:text-5xl font-black text-center text-white mb-12">
            With us, your graph will always be <span className="text-emerald-400">UPSTREAM!</span>
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-12">
            {[
              { label: "Impressions", value: "132,430", delta: "+155,700%" },
              { label: "Profile Activity", value: "1,431", delta: "+11,750%" },
              { label: "Followers Gained", value: "3,378", delta: "+343.2%" },
              { label: "Accounts Engaged", value: "2,237", delta: "+17,750%" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-emerald-300 text-sm uppercase tracking-wider">{stat.label}</p>
                <p className="text-4xl font-black text-white mt-2">{stat.value}</p>
                <p className="text-emerald-400 font-bold text-sm mt-1 flex items-center justify-center gap-1">
                  <TrendingUp size={16} /> {stat.delta}
                </p>
              </div>
            ))}
          </div>

          <img src={placeholderImg} alt="Analytics" className="w-full rounded-2xl shadow-2xl" />
        </div>

        {/* Traction */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-5xl lg:text-6xl font-black text-white mb-4">
              Traction <span className="block text-6xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">₹23K Order</span>
            </h3>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Incorporated a bespoke <strong>₹23K chandelier</strong> into a luxurious living room design — turning a single product into a conversation-starting centerpiece.
            </p>
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="bg-emerald-900/40 backdrop-blur border border-emerald-500/40 rounded-2xl p-6 text-center min-w-40">
                <p className="text-emerald-300 text-sm">Investment</p>
                <p className="text-4xl font-black text-white">₹23K</p>
              </div>
              <div className="bg-emerald-900/40 backdrop-blur border border-emerald-500/40 rounded-2xl p-6 text-center min-w-40">
                <p className="text-emerald-300 text-sm">Client Delight</p>
                <p className="text-4xl font-black text-white">100%</p>
              </div>
            </div>
          </div>

          <div>
            <img src={shopifyImg} alt="Shopify Order" className="w-full rounded-3xl shadow-2xl" />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <a
            href="#contact"
            className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full hover:scale-105 shadow-2xl shadow-emerald-500/40 transition-all duration-300"
          >
            Let’s Build Your Success Story
            <ArrowUpRight size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;