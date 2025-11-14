// src/components/services/ServiceModal.jsx
import React, { useEffect } from "react";

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl mx-4 sm:mx-6 bg-slate-900 rounded-2xl border border-white/6 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <img
              src={service.image || service.img}
              alt={service.title}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="service-title" className="text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <div className="mt-2 text-xs text-slate-400">{service.shortDesc}</div>
              </div>
              <div>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/5 hover:bg-white/8 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            <p className="mt-4 text-slate-300 leading-relaxed">{service.fullDesc}</p>

            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium shadow"
              >
                Talk to us
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 rounded-full border border-white/6 text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
