"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-lg border border-slate-700 animate-bounce">
          <span>Need daily essentials? Order on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 text-sm font-bold leading-none"
            aria-label="Close tooltip"
          >
            &times;
          </button>
        </div>
      )}

      <a
        href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20I%20would%20like%20to%20order%20groceries"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-green-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>

        <MessageCircle className="w-7 h-7 drop-shadow" />
        
        {/* Hover expanding text */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pl-0 group-hover:pl-2">
          Chat With Us
        </span>
      </a>
    </div>
  );
}
