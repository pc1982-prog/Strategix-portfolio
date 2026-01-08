import React from 'react';

export default function LegitGlobal() {
  const cards = [
    {
        title: "Modern Digital Services",
        description: "We offer a range of digital services such as web development, digital marketing, and AI solutions to support business growth.",
      }
      ,
      
    {
      title: "Data-Driven Strategy",
      description: "Our strategies are driven by comprehensive data analytics, ensuring every decision leads to measurable and impactful results.",
    },
    {
      title: "Customized Solutions",
      description: "We customize our strategies to align perfectly with your distinct business goals and needs.",
    },
    {
      title: "Passion for Innovation",
      description: "We stay ahead of the competition by leveraging innovative digital strategies that drive success.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why should you choose{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Strategix
            </span>{' '}
            ?
          </h1>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-10">
            What Sets Us Apart Is Our Passion For Digital Marketing And Our Commitment To Delivering Exceptional Results.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            GET A FREE CONSULTATION →
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative rounded-3xl p-[3px] group overflow-hidden"
            >
              {/* Rotating Border Gradient */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `conic-gradient(from 0deg, 
                    #0f172a 0deg, 
                    #0f172a 30deg,
                    #10b981 90deg, 
                    #14b8a6 150deg,
                    #0f172a 210deg,
                    #0f172a 240deg,
                    #10b981 270deg, 
                    #14b8a6 330deg, 
                    #0f172a 360deg)`,
                  animation: 'spinBorder 6s linear infinite',
                  filter: 'blur(1px)'
                }}
              ></div>
              
              {/* Inner Card Content */}
              <div className={`relative bg-gradient-to-b ${
                index % 2 === 0 
                  ? 'from-slate-800 to-slate-900' 
                  : 'from-slate-900 to-slate-950'
              } rounded-3xl p-8 h-full transition-all duration-300 hover:scale-[1.02] z-10`}>
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-base leading-relaxed text-slate-300">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spinBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}