import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { Trainer } from '../types';
import { TRAINERS } from '../data/gymData';
import { TiltCard } from './common/TiltCard';
import { soundManager } from './common/SoundEffects';

interface TrainersSectionProps {
  onSelectTrainer: (trainer: Trainer) => void;
}

export const TrainersSection: React.FC<TrainersSectionProps> = ({ onSelectTrainer }) => {
  return (
    <section id="trainers" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>World-Class Mentorship</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            MEET THE <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">MASTER COACHES</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Every KSG master coach holds advanced international credentials, national competition experience, and an obsession for human optimization.
          </p>
        </div>

        {/* Trainers Grid with 3D Tilt Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer, idx) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="h-full"
            >
              <TiltCard
                id={`trainer-card-${trainer.id}`}
                className="h-full rounded-2xl bg-gradient-to-b from-white/[0.06] via-[#101013] to-[#0A0A0C] border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_20px_45px_rgba(212,175,55,0.2)] group"
                onClick={() => onSelectTrainer(trainer)}
              >
                {/* Trainer Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-black/30 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 flex items-center gap-1 text-[11px] font-bold text-[#FDE047]">
                    <Star className="w-3 h-3 fill-current text-[#FDE047]" />
                    <span>{trainer.rating.toFixed(1)}</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-neutral-300">
                    {trainer.experience}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black font-['Syne',sans-serif] uppercase tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#EF4444] font-semibold tracking-wider uppercase mt-0.5">
                      {trainer.role}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Specialization</p>
                      <p className="text-xs font-medium text-neutral-200 mt-0.5 leading-snug">
                        {trainer.specialization}
                      </p>
                    </div>
                  </div>

                  {/* View Profile Action */}
                  <div className="mt-5">
                    <button
                      id={`trainer-profile-btn-${trainer.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        onSelectTrainer(trainer);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-[#D4AF37] text-neutral-200 hover:text-black border border-white/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md group/btn"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
