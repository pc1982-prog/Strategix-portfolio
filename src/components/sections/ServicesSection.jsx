import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

export default function BrandingDesignPage() {
  const [activeItem, setActiveItem] = useState('Branding Design');

  const contentData = {
    'Branding Design': {
      description: 'In a world where first impressions matter, our branding experts craft unique and compelling brand identities that resonate with your audience. From logo design to brand messaging, we ensure your brand stands out in a crowded digital landscape.',
      services: [
        'Brand Strategy',
        'Logo and Visual Identity',
        'Brand Guidelines',
        'Collateral Design',
        'Brand Experience',
        'Brand Refresh or Rebranding'
      ],
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop'
    },
    'UI/UX Design': {
      description: 'We create intuitive and engaging user experiences that delight your customers. Our UI/UX design process focuses on user research, wireframing, prototyping, and testing to ensure your digital products are both beautiful and functional.',
      services: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Interface Design',
        'Interaction Design',
        'Usability Testing',
        'Design System Creation'
      ],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=600&fit=crop'
    },
    'Web Design': {
      description: 'Transform your online presence with stunning, responsive websites that captivate visitors and drive conversions. We blend creativity with functionality to deliver web experiences that work seamlessly across all devices.',
      services: [
        'Responsive Web Design',
        'Landing Page Design',
        'E-commerce Design',
        'Custom Web Applications',
        'Website Redesign',
        'Mobile-First Design'
      ],
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=600&fit=crop'
    },
    'Social Media Marketing': {
      description: 'Amplify your brand voice across social platforms with strategic content and campaigns. We help you build meaningful connections with your audience through data-driven social media strategies that deliver measurable results.',
      services: [
        'Social Media Strategy',
        'Content Creation',
        'Community Management',
        'Influencer Marketing',
        'Social Media Advertising',
        'Analytics & Reporting'
      ],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop'
    },
    'Performance Marketing': {
      description: 'Drive measurable growth with data-driven performance marketing campaigns. We optimize every channel and touchpoint to maximize your ROI, from paid search to programmatic advertising and beyond.',
      services: [
        'PPC Campaign Management',
        'Conversion Rate Optimization',
        'Marketing Analytics',
        'Retargeting Campaigns',
        'A/B Testing',
        'ROI Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop'
    },
    'SEO': {
      description: 'Boost your organic visibility and climb search engine rankings with our comprehensive SEO strategies. We combine technical expertise with content optimization to help your business get found by the right audience.',
      services: [
        'Technical SEO Audit',
        'Keyword Research',
        'On-Page Optimization',
        'Link Building',
        'Local SEO',
        'SEO Analytics & Reporting'
      ],
      image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&h=600&fit=crop'
    }
  };

  const menuItems = Object.keys(contentData);
  const currentContent = contentData[activeItem];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Services </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              We Offer
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            See our full list of digital solutions that will help your business thrive
          </p>
        </div>

        {/* Main Content Container */}
        <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[60px] shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* Left Side - Menu */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-gradient-to-br from-black via-emerald-500 to-green-400 rounded-t-2xl sm:rounded-t-3xl md:rounded-tl-[40px] lg:rounded-l-[60px] lg:rounded-tr-none py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:pl-12 lg:pr-16 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[650px] flex items-center shadow-2xl">
                
                {/* Moon-shaped Inward Cut - Hidden on mobile and tablet */}
                <div className="hidden lg:block absolute top-0 right-0 w-32 xl:w-40 h-full overflow-visible pointer-events-none z-20">
                  <svg
                    className="absolute top-0 right-0 h-full w-full"
                    viewBox="0 0 160 1000"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M 0 0 Q -60 80 0 160 L 0 840 Q -60 920 0 1000 L 160 1000 L 160 0 Z"
                      fill="url(#grad1)"
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Menu Items */}
                <div className="relative z-30 space-y-1.5 sm:space-y-2 md:space-y-3 w-full">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveItem(item)}
                      className={`flex items-center justify-between cursor-pointer transition-all duration-500 ease-out relative ${
                        activeItem === item
                          ? 'bg-[radial-gradient(120%_120%_at_20%_20%,#22c55e_0%,#14532d_35%,#020617_70%)] px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full shadow-xl scale-105'
                          : 'px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full hover:bg-slate-800/30'
                      }`}
                      style={activeItem === item && window.innerWidth >= 1024 ? {
                        marginRight: '-50px',
                        paddingRight: '70px'
                      } : {}}
                    >
                      <span className="text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                        {item}
                      </span>
                      {activeItem === item && (
                        <div className="bg-emerald-500 rounded-full p-1.5 sm:p-2 md:p-2.5 ml-2 sm:ml-3 md:ml-4 flex-shrink-0">
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-slate-950" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content and Image */}
            <div className="lg:col-span-7 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
                {/* Content Section */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 ease-in-out" key={activeItem + '-content'}>
                  <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                    {currentContent.description}
                  </p>

                  {/* Services List */}
                  <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                    {currentContent.services.map((service, index) => (
                      <div 
                        key={index} 
                        className="flex items-start sm:items-center gap-2 sm:gap-3 transition-all duration-300 ease-out"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards',
                          opacity: 0
                        }}
                      >
                        <div className="bg-emerald-600 rounded-full p-1 sm:p-1.5 flex-shrink-0 mt-0.5 sm:mt-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative flex items-center justify-center mt-6 lg:mt-0 lg:pt-12">
                  {/* Background Frame */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[110%] sm:w-[115%] md:w-[120%] h-[105%] sm:h-[108%] md:h-[110%] bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl sm:rounded-3xl blur-xl"></div>
                  </div>
                  
                  {/* Main Frame */}
                  <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-2 sm:p-3 md:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-slate-700/30 shadow-2xl w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
                    <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={currentContent.image}
                        alt={activeItem}
                        className="w-full h-full object-cover aspect-square transition-opacity duration-500"
                        key={activeItem + '-image'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}