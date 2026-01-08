import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientFeedbacks() {
  const [activeIndex, setActiveIndex] = useState(0);

  const feedbacks = [
    {
      text: "Strategix helped us build a strong digital presence with a well-designed website and effective marketing strategies. Their team understood our goals and delivered exactly what we needed.",
      name: "Expertrons",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "From website development to digital marketing execution, Strategix provided consistent support and clear strategy. The results were visible within a short time.",
      name: "Edoofa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Strategix delivered a clean, professional website along with marketing solutions that aligned perfectly with our brand vision. Smooth communication and timely delivery.",
      name: "OGIO",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Their creative and technical expertise helped us improve our online visibility. Strategix brought structure and clarity to our digital efforts.",
      name: "Studio We Do Effects",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Strategix supported us with reliable web development and digital strategy. Their approach was practical, transparent, and result-oriented.",
      name: "WishNew Wellness",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "We appreciated Strategix structured approach to website design and digital marketing. Their solutions helped strengthen our brand presence online.",
      name: "The Class of One",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Strategix played a key role in enhancing our digital platform with modern design and performance-focused solutions. A dependable digital partner.",
      name: "Ramada Lucknow",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Strategix helped us streamline our digital presence with a professional website and smart marketing support. Their understanding of our industry was impressive.",
      name: "Nandi IVF",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    }
  ];
  

  const handleCardClick = (clickedIndex) => {
    const secondCardIndex = (activeIndex + 1) % feedbacks.length;
    if (clickedIndex === secondCardIndex) {
      setActiveIndex(secondCardIndex);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % feedbacks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          {/* Left Side - Heading */}
          <div className="w-full lg:w-auto flex-shrink-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Client </span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Feedbacks</span>
            </h1>
          </div>

          {/* Right Side - Cards Container with Fixed Width */}
          <div className="flex-1 w-full lg:max-w-3xl">
            {/* Cards Background Container */}
            <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm relative">
              
              {/* Left Arrow - Only on Small Devices */}
              <button
                onClick={handlePrev}
                className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 shadow-lg transition-all"
                aria-label="Previous feedback"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow - Only on Small Devices */}
              <button
                onClick={handleNext}
                className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 shadow-lg transition-all"
                aria-label="Next feedback"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Cards Viewport - Infinite Loop */}
              <div className="relative overflow-hidden mb-4 sm:mb-6">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activeIndex * (window.innerWidth < 640 ? 100 : 50)}%)`
                  }}
                >
                  {/* Render cards in a loop - show original array + first card again for seamless loop */}
                  {[...feedbacks, feedbacks[0]].map((feedback, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        const actualIndex = index % feedbacks.length;
                        handleCardClick(actualIndex);
                      }}
                      className="w-full sm:w-1/2 flex-shrink-0 px-2 sm:px-3 cursor-pointer"
                    >
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl min-h-[260px] sm:min-h-[280px] flex flex-col justify-between hover:shadow-emerald-500/20 transition-all">
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                          {feedback.text}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-3 sm:border-4 border-emerald-500 flex-shrink-0">
                            <img 
                              src={feedback.avatar} 
                              alt={feedback.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-slate-900 font-semibold text-sm sm:text-base">
                            {feedback.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2">
                {feedbacks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeIndex
                        ? 'w-3 h-3 bg-emerald-500'
                        : 'w-3 h-3 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to feedback ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}