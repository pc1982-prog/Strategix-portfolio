import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import logo from "../../assets/images/logoStrategix.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Mission", id: "mission" },
    { name: "Work", id: "work" },
    { name: "Clients", id: "clients" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Top Bar - Hidden on Mobile */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex  items-center space-x-3 text-slate-300">
              <HiTrendingUp className="text-emerald-400" size={24} />
              <span className="font-medium text-base">Total sales</span>
              <span className="text-emerald-400 font-bold text-xl">$40,267</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://wa.me/8595519533"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30"
              >
                <FaWhatsapp size={20} />
                <span className="font-medium">WhatsApp</span>
              </a>
              
              <a
                href="tel:+919821781788"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone size={18} />
                <span className="font-medium">+91 8595519533</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar - Only WhatsApp Button Centered */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex justify-center items-center h-14 px-4">
          <a
            href="https://wa.me/919821781788"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30"
          >
            <FaWhatsapp size={20} />
            <span className="font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 lg:top-16 top-14 ${
          scrolled
            ? "bg-slate-950/98 backdrop-blur-xl shadow-lg shadow-emerald-500/10 border-b border-emerald-500/20"
            : "bg-slate-950/90 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center group"
            >
        
              <div className="flex items-center">
              <img
                src={logo}
                alt="Strategix Logo"
                className="w-28 h-28 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
             
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="cursor-pointer relative font-medium text-base transition-all duration-300 text-slate-300 hover:text-emerald-400 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500 ease-out w-0 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-all text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950/98 backdrop-blur-xl border-t border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
              <div className="px-6 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left text-lg font-semibold text-slate-300 hover:text-emerald-400 transition-colors py-2 hover:pl-2"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("contact")}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full shadow-xl shadow-emerald-500/30 transform hover:scale-105 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;