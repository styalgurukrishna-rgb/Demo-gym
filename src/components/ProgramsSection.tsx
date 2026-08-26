import React from 'react';
import { motion } from 'motion/react';
import { Flame, Clock, ArrowRight, HeartPulse, Dumbbell, Flower2, Crosshair, Sparkles } from 'lucide-react';
import { Program } from '../types';
import { PROGRAMS } from '../data/gymData';
import { TiltCard } from './common/TiltCard';
import { soundManager } from './common/SoundEffects';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program, actionType: 'learnMore' | 'bookTrainer' | 'explore' | 'start') => void;
}

// 1. 3D Metallic Dumbbell Animated Icon Component
const AnimatedDumbbellIcon: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    {/* Rotating glowing aura */}
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 rounded-xl bg-[#EF4444]/20 blur-md"
    />
    <motion.div
      animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A1010] to-[#120808] border border-[#EF4444]/60 flex items-center justify-center text-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.4)]"
    >
      <Dumbbell className="w-5 h-5 stroke-[2.2]" />
    </motion.div>
  </div>
);

// 2. Glowing Heartbeat ECG Wave Animated Icon Component
const AnimatedCardioIcon: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    {/* Pulse ring */}
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-1 rounded-xl border border-[#EF4444] bg-[#EF4444]/10"
    />
    <motion.div
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A0F12] to-[#120506] border border-[#EF4444]/60 flex items-center justify-center text-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.5)]"
    >
      <HeartPulse className="w-5 h-5" />
    </motion.div>
  </div>
);

// 3. Zen Breathing Circle Animated Icon Component
const AnimatedYogaIcon: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    {/* Breathing expanding circle */}
    <motion.div
      animate={{ scale: [0.9, 1.35, 0.9], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-md"
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#241E0F] to-[#0E0C06] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
    >
      <Flower2 className="w-5 h-5" />
    </motion.div>
  </div>
);

// 4. Coach Radar & Target Tracker Animated Icon Component
const AnimatedCoachIcon: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    {/* Radar sweep */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C1810] to-[#0A0A0C] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
    >
      <Crosshair className="w-5 h-5" />
    </motion.div>
  </div>
);

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const getAnimatedIcon = (id: string) => {
    switch (id) {
      case 'weight-training':
        return <AnimatedDumbbellIcon />;
      case 'cardio-training':
        return <AnimatedCardioIcon />;
      case 'yoga-mobility':
        return <AnimatedYogaIcon />;
      case 'personal-training':
      default:
        return <AnimatedCoachIcon />;
    }
  };

  return (
    <section id="programs" className="relative py-28 bg-[#0A0A0C] border-y border-white/5 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#EF4444]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>High-Performance Disciplines</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            CHOOSE YOUR <span className="bg-gradient-to-r from-white via-[#FFF2B2] to-[#D4AF37] bg-clip-text text-transparent">BATTLEGROUND</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Engineered training protocols calibrated to incinerate body fat, construct dense lean muscle, and bulletproof joint mobility.
          </p>
        </div>

        {/* Programs Grid with 3D Tilt Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((program, idx) => {
            let buttonLabel = "Learn More";
            let actionType: 'learnMore' | 'bookTrainer' | 'explore' | 'start' = 'learnMore';

            if (program.id === 'weight-training') {
              buttonLabel = "Learn More";
              actionType = 'learnMore';
            } else if (program.id === 'personal-training') {
              buttonLabel = "Book Trainer";
              actionType = 'bookTrainer';
            } else if (program.id === 'cardio-training') {
              buttonLabel = "Explore Program";
              actionType = 'explore';
            } else if (program.id === 'yoga-mobility') {
              buttonLabel = "Start Program";
              actionType = 'start';
            }

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="h-full"
              >
                <TiltCard
                  id={`program-card-${program.id}`}
                  className="h-full rounded-2xl bg-gradient-to-b from-white/[0.07] via-[#101013] to-[#0A0A0C] border border-white/10 hover:border-[#EF4444]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_20px_45px_rgba(239,68,68,0.2)] group"
                >
                  {/* Top Image Banner with Floating 3D Animated Icon */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-black/40 to-transparent" />

                    {/* Badge */}
                    {program.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                        {program.badge}
                      </div>
                    )}

                    {/* Floating Animated Icon Overlay */}
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      {getAnimatedIcon(program.id)}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                      <span className="flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                        <Flame className="w-3.5 h-3.5 text-[#EF4444]" />
                        {program.caloriesBurn}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black font-['Syne',sans-serif] uppercase tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-xs text-[#EF4444] font-semibold tracking-wider uppercase mt-1">
                        {program.subtitle}
                      </p>
                      <p className="text-xs text-neutral-400 font-light mt-2.5 line-clamp-2 leading-relaxed">
                        {program.tagline}
                      </p>

                      {/* Trainer Lead */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2.5">
                        <img
                          src={program.trainer.avatar}
                          alt={program.trainer.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]/40"
                        />
                        <div className="text-left">
                          <p className="text-[11px] font-bold text-white leading-tight">{program.trainer.name}</p>
                          <p className="text-[10px] text-neutral-400">{program.trainer.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Program Action Button */}
                    <div className="mt-5">
                      <button
                        id={`program-btn-${program.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                          onSelectProgram(program, actionType);
                        }}
                        onMouseEnter={() => soundManager.playHover()}
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-gradient-to-r hover:from-[#DC2626] hover:to-[#EF4444] text-white border border-white/10 hover:border-transparent transition-all duration-300 shadow-md group/btn flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{buttonLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
