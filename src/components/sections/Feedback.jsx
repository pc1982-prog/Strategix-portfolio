import React, { useState, useEffect } from 'react';
import image from '../../../public/images/Strategix- Portfolio (39).png'
import image1 from '../../../public/images/Strategix- Portfolio (31).png'
import image2 from '../../../public/images/Strategix- Portfolio (33).png'
import image3 from '../../../public/images/Strategix- Portfolio (5).png'
import image4 from '../../../public/images/Strategix- Portfolio (38).png'
import image5 from '../../../public/images/Strategix- Portfolio (35).png'
import image6 from '../../../public/images/Strategix- Portfolio (34).png'
import image7 from '../../../public/images/Strategix- Portfolio (32).png'

export default function ClientFeedbacks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const feedbacks = [
    {
      text: "Strategix helped us build a strong digital presence with a well-designed website and effective marketing strategies. Their team understood our goals and delivered exactly what we needed.",
      name: "Genwin",
      avatar: image
    },
    {
      text: "From website development to digital marketing execution, Strategix provided consistent support and clear strategy. The results were visible within a short time.",
      name: "Edoofa",
      avatar: image1
    },
    {
      text: "Strategix delivered a clean, professional website along with marketing solutions that aligned perfectly with our brand vision. Smooth communication and timely delivery.",
      name: "OGIO",
      avatar: image2
    },
    {
      text: "Their creative and technical expertise helped us improve our online visibility. Strategix brought structure and clarity to our digital efforts.",
      name: "Nandi IVF",
      avatar: image6
    },
    {
      text: "Strategix supported us with reliable web development and digital strategy. Their approach was practical, transparent, and result-oriented.",
      name: "One Show",
      avatar: image4
    },
    {
      text: "We appreciated Strategix structured approach to website design and digital marketing. Their solutions helped strengthen our brand presence online.",
      name: "The Class of One",
      avatar: image5
    },
    {
      text: "Strategix played a key role in enhancing our digital platform with modern design and performance-focused solutions. A dependable digital partner.",
      name: "Ramada Lucknow",
      avatar: image3
    },
    {
      text: "Strategix helped us streamline our digital presence with a professional website and smart marketing support. Their understanding of our industry was impressive.",
      name: "Prozone",
      avatar: image7
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 py-12 overflow-hidden">
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
            <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm relative"
                 onTouchStart={isMobile ? onTouchStart : undefined}
                 onTouchMove={isMobile ? onTouchMove : undefined}
                 onTouchEnd={isMobile ? onTouchEnd : undefined}
            >
              
              {/* Cards Viewport - Infinite Loop */}
              <div className="relative overflow-hidden mb-4 sm:mb-6">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activeIndex * (isMobile ? 100 : 50)}%)`
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
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl h-[280px] sm:h-[280px] flex flex-col justify-between hover:shadow-emerald-500/20 transition-all">
                        <p className="text-slate-200 text-[15px] sm:text-base leading-relaxed mb-4 sm:mb-6 flex-1 overflow-hidden">
                          {feedback.text}
                        </p>
                        <div className="flex items-center gap-3 sm:gap-3">
                          <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full overflow-hidden border-3 sm:border-4 border-emerald-500 flex-shrink-0">
                            <img 
                              src={feedback.avatar} 
                              alt={feedback.name}
                              className="w-full h-full object-cover "
                            />
                          </div>
                          <span className="text-white font-semibold text-xl sm:text-xl">
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