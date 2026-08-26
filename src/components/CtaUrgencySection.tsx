import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Flame, ArrowRight, ShieldCheck, Users, AlertCircle } from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface CtaUrgencySectionProps {
  onOpenJoin: () => void;
  onOpenTrial: () => void;
}

export const CtaUrgencySection: React.FC<CtaUrgencySectionProps> = ({
  onOpenJoin,
  onOpenTrial,
}) => {
  // Live Countdown Timer (14 hours, 32 minutes, 45 seconds from current time)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const slotsTotal = 25;
  const slotsClaimed = 21;
  const slotsRemaining = slotsTotal - slotsClaimed;

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#080808] via-[#140D0D] to-[#080808] border-y border-white/10 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EF4444]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Urgency Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-red-900/30"
        >
          <Flame className="w-4 h-4 animate-bounce" />
          <span>Limited Membership Intake • March 2026 Batch</span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
          READY TO TRANSFORM <br />
          <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFF3C4] to-[#D4AF37] bg-clip-text text-transparent">
            YOUR BODY & LIFE?
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          We maintain strict trainer-to-member ratios to ensure elite equipment availability and 1-on-1 coaching excellence.
        </p>

        {/* Live Countdown Timer Digits */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-black/60 border-2 border-white/10 min-w-[72px] sm:min-w-[95px] backdrop-blur-md shadow-2xl">
            <span className="font-mono text-2xl sm:text-4xl font-black text-white block">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-1 block">
              HOURS
            </span>
          </div>

          <span className="font-mono text-2xl sm:text-4xl font-black text-[#EF4444] animate-pulse">:</span>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-black/60 border-2 border-white/10 min-w-[72px] sm:min-w-[95px] backdrop-blur-md shadow-2xl">
            <span className="font-mono text-2xl sm:text-4xl font-black text-white block">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-1 block">
              MINUTES
            </span>
          </div>

          <span className="font-mono text-2xl sm:text-4xl font-black text-[#EF4444] animate-pulse">:</span>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-black/60 border-2 border-[#D4AF37]/50 min-w-[72px] sm:min-w-[95px] backdrop-blur-md shadow-2xl shadow-[#D4AF37]/10">
            <span className="font-mono text-2xl sm:text-4xl font-black text-[#D4AF37] block">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mt-1 block">
              SECONDS
            </span>
          </div>
        </div>

        {/* Live Slot Status Progress Bar */}
        <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-white flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
              Intake Availability:
            </span>
            <span className="text-[#EF4444] font-extrabold uppercase">
              Only {slotsRemaining} Slots Left!
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(slotsClaimed / slotsTotal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] rounded-full"
            />
          </div>

          <div className="flex justify-between text-[11px] text-neutral-400 mt-2">
            <span>{slotsClaimed} Members Enrolled</span>
            <span>Max Cap: {slotsTotal} Members</span>
          </div>
        </div>

        {/* High Conversion Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="urgency-join-today-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenJoin();
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/40 hover:shadow-red-600/70 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047] animate-pulse" />
            <span>JOIN TODAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="urgency-book-free-trial-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenTrial();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-neutral-200 hover:text-white bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#D4AF37]/50 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>BOOK FREE TRIAL</span>
          </button>
        </div>
      </div>
    </section>
  );
};
