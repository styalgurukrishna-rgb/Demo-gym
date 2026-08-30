import React from 'react';
import { motion } from 'motion/react';
import { X, Flame, Clock, User, CheckCircle2, Calendar, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Program } from '../../types';
import { handleImageError, handleAvatarError } from '../../utils/imageFallback';

interface ProgramDetailModalProps {
  program: Program | null;
  actionType: 'learnMore' | 'bookTrainer' | 'explore' | 'start' | null;
  onClose: () => void;
  onRegister: (program: Program) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  actionType,
  onClose,
  onRegister,
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#101014] border border-white/15 overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
      >
        {/* Top Image Banner */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full shrink-0 overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            onError={handleImageError}
            className="w-full h-full object-cover brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/60 to-transparent" />

          {/* Close button */}
          <button
            id="program-detail-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-widest">
              {program.subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white tracking-wide">
              {program.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Key Metrics Bar: Duration, Calories Burn, Level */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Duration</p>
              <div className="flex items-center justify-center gap-1.5 mt-1 text-xs sm:text-sm font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{program.duration}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Calories Burn</p>
              <div className="flex items-center justify-center gap-1.5 mt-1 text-xs sm:text-sm font-bold text-[#EF4444]">
                <Flame className="w-3.5 h-3.5 text-[#EF4444]" />
                <span>{program.caloriesBurn}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Difficulty</p>
              <p className="mt-1 text-xs sm:text-sm font-bold text-emerald-400">
                {program.level}
              </p>
            </div>
          </div>

          {/* Program Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Program Overview
            </h4>
            <p className="text-sm text-neutral-200 font-light leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Benefits & Adaptations</span>
            </h4>
            <div className="space-y-2.5">
              {program.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <div className="p-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trainer Information */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#17140D] to-[#121215] border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={program.trainer.avatar}
                alt={program.trainer.name}
                onError={handleAvatarError}
                className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/50"
              />
              <div>
                <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Lead Discipline Director</p>
                <h5 className="text-sm font-bold text-white">{program.trainer.name}</h5>
                <p className="text-xs text-neutral-400">{program.trainer.role}</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs text-neutral-300">
            <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span><strong>Schedule:</strong> {program.schedule}</span>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              id="program-detail-register-btn"
              onClick={() => {
                onClose();
                onRegister(program);
              }}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{actionType === 'bookTrainer' ? 'Book 1-on-1 Trainer Slot' : `Register For ${program.title}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
