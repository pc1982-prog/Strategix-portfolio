import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
// import logo from '../../assets/images/logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Mission', id: 'mission' },
    { name: 'Work', id: 'work' },
    { name: 'Clients', id: 'clients' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-emerald-500/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Strategix
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-8 ">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer relative font-medium text-base transition-all duration-300 ${
                  scrolled ? 'text-slate-200 hover:text-emerald-400' : 'text-white hover:text-emerald-300'
                }`}
              >
                {item.name}
                <span className=" cursor-pointer absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out w-0 hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className=" cursor-pointer px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-all ${scrolled ? 'text-slate-200' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-t border-emerald-500/20 shadow-2xl">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left text-lg font-semibold text-white hover:text-emerald-400 transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};