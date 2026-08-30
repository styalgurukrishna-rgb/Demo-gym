import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Flame, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, finish immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsFinished(true);
      window.scrollTo(0, 0);
      onComplete();
      return;
    }

    // Ultra-fast, snappy luxury intro (200ms)
    const duration = 200;
    const stepTime = 16;
    const steps = Math.max(1, duration / stepTime);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsFinished(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          window.scrollTo(0, 0);
          onComplete();
        }, 120);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated luxury ambient background aura */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#EF4444]/20 via-[#D4AF37]/25 to-transparent blur-[140px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
            {/* Logo Emblem Reveal with rotating glow ring */}
            <div className="relative mb-8">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border border-dashed border-[#D4AF37]/30"
              />

              {/* Energy pulse aura */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#D4AF37] blur-lg"
              />

              {/* Emblem Box */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1C1810] to-[#0A0A0A] border-2 border-[#D4AF37] shadow-2xl flex items-center justify-center p-3"
              >
                <Dumbbell className="w-10 h-10 text-[#D4AF37] stroke-[2.2]" />
                <Flame className="w-4 h-4 text-[#EF4444] absolute top-2 right-2 animate-bounce" />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="font-['Syne',sans-serif] font-black text-3xl sm:text-4xl tracking-tight uppercase text-white flex items-center justify-center gap-2">
                <span>KSG</span>
                <span className="bg-gradient-to-r from-[#FFF4B8] via-[#D4AF37] to-[#EF4444] bg-clip-text text-transparent">
                  DEMO GYM
                </span>
              </h1>

              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
                Transform Your Body. Upgrade Your Life.
              </p>
            </motion.div>

            {/* Progress Bar & Status */}
            <div className="w-full mt-10 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
                <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  INITIALIZING ARCHITECTURE
                </span>
                <span className="text-white font-bold">{progress}%</span>
              </div>

              {/* Bar track */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#D4AF37]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
