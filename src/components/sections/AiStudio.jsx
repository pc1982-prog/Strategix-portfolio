import React, { useEffect, useRef } from 'react';
import { Sparkles, Video, Music, Image, Youtube, Play, ExternalLink } from 'lucide-react';

const AIStudio = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const showcaseLeftRef = useRef(null);
  const showcaseRightRef = useRef(null);
  const featuresListRef = useRef([]);

  useEffect(() => {
    // Dynamically load GSAP and ScrollTrigger
    const loadGSAP = async () => {
      if (typeof window !== 'undefined') {
        const gsapModule = await import('https://cdn.skypack.dev/gsap@3.12.2');
        const ScrollTriggerModule = await import('https://cdn.skypack.dev/gsap@3.12.2/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;
        
        gsap.registerPlugin(ScrollTrigger);

        // Header Animation
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        });

        // Cards Animation
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
              },
              y: 80,
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'back.out(1.2)'
            });

            // Icon rotation on scroll
            const icon = card.querySelector('.feature-icon');
            if (icon) {
              gsap.from(icon, {
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  end: 'top 60%',
                  toggleActions: 'play none none reverse'
                },
                rotation: -180,
                scale: 0,
                duration: 0.8,
                delay: index * 0.15 + 0.2,
                ease: 'back.out(1.5)'
              });
            }
          }
        });

        // Showcase Left (Image) Animation
        if (showcaseLeftRef.current) {
          gsap.from(showcaseLeftRef.current, {
            scrollTrigger: {
              trigger: showcaseLeftRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out'
          });

          // Play button animation
          const playButton = showcaseLeftRef.current.querySelector('.play-button');
          if (playButton) {
            gsap.from(playButton, {
              scrollTrigger: {
                trigger: showcaseLeftRef.current,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
              },
              scale: 0,
              rotation: 360,
              duration: 0.8,
              delay: 0.5,
              ease: 'back.out(2)'
            });

            // Continuous pulse animation
            gsap.to(playButton, {
              scale: 1.1,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut'
            });
          }
        }

        // Showcase Right (Content) Animation
        if (showcaseRightRef.current) {
          const children = showcaseRightRef.current.children;
          
          gsap.from(children, {
            scrollTrigger: {
              trigger: showcaseRightRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          });
        }

        // Features list items animation
        featuresListRef.current.forEach((item, index) => {
          if (item) {
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 70%',
                toggleActions: 'play none none reverse'
              },
              x: 50,
              opacity: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out'
            });
          }
        });

        // Background gradient animation
        const bgGradients = sectionRef.current.querySelectorAll('.bg-gradient-blob');
        bgGradients.forEach((blob, index) => {
          gsap.to(blob, {
            x: index % 2 === 0 ? 50 : -50,
            y: index % 2 === 0 ? -30 : 30,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
          });
        });
      }
    };

    loadGSAP();
  }, []);

  const features = [
    {
      icon: Video,
      title: "AI Videos",
      description: "Professional video content created with cutting-edge AI technology for maximum engagement",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Music,
      title: "AI Music",
      description: "Original soundtracks and audio compositions tailored to your brand's unique voice",
      gradient: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: Image,
      title: "AI Visuals",
      description: "Stunning graphics and imagery that capture attention and drive conversions",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section ref={sectionRef} id="ai-studio" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="bg-gradient-blob absolute top-0 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
        <div className="bg-gradient-blob absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-2">Creative Excellence</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">AI Studio</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Transform your ideas into reality with AI-powered content creation
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative bg-slate-800/50 border border-slate-700/40 rounded-2xl p-8 hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`feature-icon w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 border border-violet-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* YouTube Channel Showcase */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Image/Visual */}
          <div ref={showcaseLeftRef} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-300/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-slate-800/50">
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" 
                alt="AI Studio Content" 
                className="w-full h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://youtube.com/@strategix-yt?si=9G8bX6r6o8DtJnkv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="play-button group/play w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </a>
              </div>

              {/* YouTube Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-red-600/90 backdrop-blur-sm border border-red-500/50">
                <Youtube className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={showcaseRightRef} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Watch Our Work</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience AI
                <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Creativity</span>
              </h3>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Dive into our YouTube channel to witness the magic of AI-generated content. From viral videos to captivating music, see how we're pushing the boundaries of digital creativity.
              </p>

              <div className="space-y-4">
                <div ref={el => featuresListRef.current[0] = el} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                  </div>
                  <p className="text-slate-400">Professional AI-generated videos for brands and businesses</p>
                </div>
                <div ref={el => featuresListRef.current[1] = el} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400" />
                  </div>
                  <p className="text-slate-400">Original music compositions and soundtracks</p>
                </div>
                <div ref={el => featuresListRef.current[2] = el} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-slate-400">Behind-the-scenes looks at AI creative processes</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://youtube.com/@strategix-yt?si=9G8bX6r6o8DtJnkv"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Youtube className="w-5 h-5" />
                <span>Visit Our Channel</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-violet-500/30 text-white hover:bg-violet-500/10 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;