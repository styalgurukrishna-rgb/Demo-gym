import React, { useState } from 'react';
import { Phone, MessageCircle, Sparkles, X, UserPlus, Flame } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { soundManager } from './common/SoundEffects';

interface FloatingActionsProps {
  onOpenJoin?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenJoin }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      {/* DESKTOP FLOATING ACTION BUTTONS */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        
        {/* Floating Call Now Button */}
        <a
          id="floating-call-btn"
          href={`tel:${GYM_INFO.phone}`}
          onClick={() => soundManager.playClick()}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Call Gym Now"
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-[#1A1A1E] hover:bg-[#26262B] border border-white/15 hover:border-[#EF4444] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 group-hover:text-white">
            Call Now
          </span>
        </a>

        {/* Floating WhatsApp Button with Tooltip & Pulsing Glow */}
        <div className="relative flex items-center gap-2">
          {/* Tooltip */}
          {showTooltip && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/95 border border-[#D4AF37]/60 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold text-neutral-200">Chat With Fitness Coach</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-neutral-400 hover:text-white ml-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* WhatsApp Action Button with Pulse Animation */}
          <a
            id="floating-whatsapp-btn"
            href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hello%20KSG%20DEMO%20GYM%2C%20I%20want%20to%20know%20about%20membership%20plans.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            aria-label="Chat With Fitness Coach on WhatsApp"
            className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(16,185,129,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-black animate-ping" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              Chat With Fitness Coach
            </span>
          </a>
        </div>
      </div>

      {/* MOBILE NATIVE STICKY BOTTOM QUICK-ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0E]/95 backdrop-blur-xl border-t border-white/15 px-3 py-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* 1. CALL NOW */}
          <a
            id="mobile-sticky-call-btn"
            href={`tel:${GYM_INFO.phone}`}
            onClick={() => soundManager.playClick()}
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all text-neutral-300 hover:text-white"
          >
            <Phone className="w-4 h-4 text-[#EF4444] mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call Now</span>
          </a>

          {/* 2. WHATSAPP */}
          <a
            id="mobile-sticky-whatsapp-btn"
            href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hello%20KSG%20DEMO%20GYM%2C%20I%20want%20to%20know%20about%20membership%20plans.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 active:scale-95 transition-all animate-pulse"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Coach Chat</span>
          </a>

          {/* 3. JOIN NOW */}
          <button
            id="mobile-sticky-join-btn"
            onClick={() => {
              soundManager.playClick();
              if (onOpenJoin) onOpenJoin();
            }}
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-white mb-0.5 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-wider">Join Now</span>
          </button>
        </div>
      </div>
    </>
  );
};
