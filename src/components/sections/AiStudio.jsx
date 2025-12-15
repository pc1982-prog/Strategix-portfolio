import React from 'react';
import { Sparkles, Video, Music, ImageIcon, Youtube, Play, ExternalLink } from 'lucide-react';

const AIStudio = () => {
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
      icon: ImageIcon,
      title: "AI Visuals",
      description: "Stunning graphics and imagery that capture attention and drive conversions",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];
  return (
    <section id="ai-studio" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects - Similar to Services */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/70 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Matching Services Style */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-2">Creative Excellence</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent">AI Studio</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Transform your ideas into reality with AI-powered content creation
          </p>
        </div>
        {/* Features Grid - Matching Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 border border-violet-500/30 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* YouTube Channel Showcase - Enhanced Design */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Image/Visual */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-300/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-slate-800/50">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
                alt="AI Studio Content"
                className="w-full h-64 sm:h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
             
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://youtube.com/@strategix-yt?si=9G8bX6r6o8DtJnkv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/play w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
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
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Watch Our Work</span>
              </div>
             
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Experience AI
                <span className="bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Creativity</span>
              </h3>
             
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Dive into our YouTube channel to witness the magic of AI-generated content. From viral videos to captivating music, see how we're pushing the boundaries of digital creativity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">Professional AI-generated videos for brands and businesses</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400" />
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">Original music compositions and soundtracks</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">Behind-the-scenes looks at AI creative processes</p>
                </div>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-row flex-nowrap gap-2 sm:gap-4 pt-4 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible">
              <a
                href="https://youtube.com/@strategix-yt?si=9G8bX6r6o8DtJnkv"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 sm:flex-none inline-flex items-center gap-3 px-4 py-3 sm:px-8 sm:py-4 rounded-lg bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-semibold shadow-lg group-hover:opacity-100 transition-all duration-300 hover:scale-105 min-w-0"
              >
                <Youtube className="w-5 h-5 flex-shrink-0" />
                <span className="truncate sm:whitespace-nowrap">Visit Our Channel</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
             
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none inline-flex items-center gap-2 px-4 py-3 sm:px-8 sm:py-4 rounded-lg border border-violet-500/30 text-white hover:bg-violet-500/10 transition-all duration-300 min-w-0"
              >
                <span className="truncate sm:whitespace-nowrap">Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;