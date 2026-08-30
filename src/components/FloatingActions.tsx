import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Sparkles, X, UserPlus, Flame, Calendar, ArrowRight } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { soundManager } from './common/SoundEffects';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface FloatingActionsProps {
  onOpenJoin?: () => void;
  onOpenBooking?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ 
  onOpenJoin,
  onOpenBooking 
}) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [showDesktopBar, setShowDesktopBar] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) {
      setShowDesktopBar(false);
      return;
    }

    const handleScroll = () => {
      const shouldShow = window.scrollY > 450;
      setShowDesktopBar((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleBooking = onOpenBooking || onOpenJoin || (() => {});

  return (
    <>
      {/* DESKTOP FLOATING TOP/CORNER CTA: "READY TO START?" */}
      {showDesktopBar && !isDismissed && (
        <div className="hidden lg:flex fixed bottom-6 left-6 z-40 items-center gap-3 p-3.5 pr-4 rounded-2xl bg-zinc-900/95 border border-amber-500/40 text-white shadow-2xl backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono block">
              READY TO START?
            </span>
            <span className="text-xs text-zinc-300 font-semibold">
              Claim your free 1-Day VIP Pass
            </span>
          </div>
          <button
            id="desktop-floating-trial-btn"
            onClick={() => {
              soundManager.playClick();
              handleBooking();
            }}
            className="ml-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>BOOK FREE TRIAL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setIsDismissed(true);
            }}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors ml-1 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DESKTOP FLOATING ACTION BUTTONS (CALL + WHATSAPP) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Call Now Button */}
        <a
          id="floating-call-btn"
          href={CONTACT_CONFIG.getTelUrl()}
          onClick={() => soundManager.playClick()}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Call Gym Now"
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-200 group-hover:text-white">
            Call Now ({CONTACT_CONFIG.displayPhone})
          </span>
        </a>

        {/* Floating WhatsApp Button with Tooltip & Pulsing Glow */}
        <div className="relative flex items-center gap-2">
          {/* Tooltip */}
          {showTooltip && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/95 border border-amber-500/40 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-semibold text-zinc-200">Chat With Fitness Coach</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-zinc-400 hover:text-white ml-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* WhatsApp Action Button with Pulse Animation */}
          <a
            id="floating-whatsapp-btn"
            href={CONTACT_CONFIG.getWhatsAppUrl("Hello KSG DEMO GYM, I want to know about membership plans and book a free trial.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            aria-label="Chat With Fitness Coach on WhatsApp"
            className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-black animate-ping" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              Chat on WhatsApp
            </span>
          </a>
        </div>
      </div>

      {/* MOBILE NATIVE STICKY BOTTOM QUICK-ACTION BAR (CALL, WHATSAPP, BOOK) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-3 py-2.5 shadow-2xl pointer-events-auto">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* 1. CALL NOW */}
          <a
            id="mobile-sticky-call-btn"
            href={CONTACT_CONFIG.getTelUrl()}
            onClick={() => soundManager.playClick()}
            className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 active:scale-95 transition-all text-zinc-300 hover:text-white cursor-pointer min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call Now</span>
          </a>

          {/* 2. WHATSAPP */}
          <a
            id="mobile-sticky-whatsapp-btn"
            href={CONTACT_CONFIG.getWhatsAppUrl("Hello KSG DEMO GYM, I want to know about membership plans.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>

          {/* 3. BOOK FREE TRIAL */}
          <button
            id="mobile-sticky-book-btn"
            onClick={() => {
              soundManager.playClick();
              handleBooking();
            }}
            className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-amber-500 text-black font-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-black mb-0.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">Book Trial</span>
          </button>
        </div>
      </div>
    </>
  );
};
