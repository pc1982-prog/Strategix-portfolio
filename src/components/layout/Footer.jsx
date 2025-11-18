import React from 'react';
import { STRATEGIX_DATA } from '../../data/siteContent';

const Footer = () => {
  return (
    <footer className="relative border-t border-emerald-500/20 py-12 bg-slate-950/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {STRATEGIX_DATA.brand.name}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">{STRATEGIX_DATA.brand.tagline}</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Work', 'Clients', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
            <div className="space-y-3">
              {STRATEGIX_DATA.contact.team.map((member, index) => (
                <div key={index} className="text-slate-400 text-sm">
                  <div className="font-semibold text-white mb-1">{member.name}</div>
                  <a href={`mailto:${member.email}`} className="hover:text-emerald-400 transition-colors block text-xs">
                    {member.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-500/20 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Strategix. All rights reserved. | Elevating Brands, Igniting Success!
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;