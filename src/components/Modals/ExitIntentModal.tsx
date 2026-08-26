import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundManager } from '../common/SoundEffects';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  isOpen,
  onClose,
  onClaim,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#121216] border-2 border-[#D4AF37]/60 p-6 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.25)] z-10 my-8 overflow-hidden text-center"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#EF4444]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="exit-intent-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#EF4444] p-[1.5px] mx-auto mb-4 shadow-xl">
          <div className="w-full h-full bg-[#101014] rounded-[22px] flex items-center justify-center text-[#D4AF37]">
            <Gift className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-extrabold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive First-Visit Privilege</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
          WAIT! GET YOUR <span className="text-[#D4AF37]">FREE FITNESS CONSULTATION</span>
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-light max-w-md mx-auto">
          Don't leave without your complimentary <strong className="text-white">1-Day VIP Pass + InBody 770 Composition Scan</strong> (Valued at ₹1,500).
        </p>

        {/* Value stack */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs text-neutral-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full 1-Day All-Access Pass to Panatta & Eleiko zones</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>1-on-1 Fitness Assessment with a Master Coach</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EF4444] shrink-0" />
            <span>Infrared Sauna & Steam Recovery Suite access</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            id="exit-intent-claim-btn"
            onClick={() => {
              soundManager.playClick();
              onClaim();
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>CLAIM FREE TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="exit-intent-dismiss-btn"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-white/5 transition-colors cursor-pointer"
          >
            NO THANKS
          </button>
        </div>
      </motion.div>
    </div>
  );
};
