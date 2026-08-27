import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Gift, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { soundManager } from '../common/SoundEffects';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimTrial: () => void;
  onViewMembership?: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  isOpen,
  onClose,
  onClaimTrial,
  onViewMembership,
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
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className="relative w-full max-w-lg rounded-3xl bg-zinc-900 border-2 border-amber-500/50 p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.2)] z-10 my-8 overflow-hidden text-center"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="exit-intent-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon badge */}
        <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 mx-auto mb-4 flex items-center justify-center text-amber-400 shadow-xl">
          <Gift className="w-8 h-8 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Before You Go...</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          Want to explore your <span className="text-amber-400">membership options?</span>
        </h3>

        <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 font-light max-w-md mx-auto leading-relaxed">
          Experience our world-class training sanctuary before making a decision. Book a complimentary 1-Day Trial Session with full equipment access and a master coach assessment.
        </p>

        {/* Value stack */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-left space-y-2 text-xs text-zinc-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full 1-Day All-Access Pass to Panatta & Eleiko zones</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>1-on-1 Fitness Assessment & InBody Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
            <span>Zero obligation or automatic billing</span>
          </div>
        </div>

        {/* Buttons: BOOK FREE TRIAL, VIEW MEMBERSHIP, CLOSE */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            id="exit-intent-book-trial-btn"
            onClick={() => {
              soundManager.playClick();
              onClaimTrial();
            }}
            className="flex-1 py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>BOOK FREE TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onViewMembership && (
            <button
              id="exit-intent-view-membership-btn"
              onClick={() => {
                soundManager.playClick();
                onViewMembership();
              }}
              className="py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>VIEW MEMBERSHIP</span>
            </button>
          )}

          <button
            id="exit-intent-close-action-btn"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl text-xs font-bold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
