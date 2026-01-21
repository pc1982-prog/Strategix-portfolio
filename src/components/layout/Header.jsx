import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
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
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918595519533"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110"
        style={{
          animation: 'bounce-slow 2s infinite'
        }}
      >
        <FaWhatsapp size={32} />
      </a>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
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
              <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
                {isMenuOpen ? <X size={28} /> : <RiMenu3Fill size={28} />}
              </div>
            </button>
          </div>

          {/* Mobile Menu with Smooth Slide Animation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-6 space-y-4 bg-slate-950/98 backdrop-blur-xl border-t border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left text-lg font-semibold text-slate-300 hover:text-emerald-400 transition-all duration-300 py-2 hover:pl-2 transform ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className={`block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full shadow-xl shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${navItems.length * 50}ms` : "0ms",
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default Header;