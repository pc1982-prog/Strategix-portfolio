import React from 'react';
const ShinyText = ({ children, className = '' }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
      {children}
    </span>
  </span>
);
export default ShinyText;