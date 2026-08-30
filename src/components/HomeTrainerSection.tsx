import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowRight, UserCheck, Calendar, Star, Sparkles } from 'lucide-react';
import { TRAINERS } from '../data/gymData';
import { soundManager } from './common/SoundEffects';
import { Trainer } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface HomeTrainerSectionProps {
  onViewTrainerProfile: (trainer: Trainer) => void;
  onBookTrainer: (trainer: Trainer) => void;
  onViewAllTrainers: () => void;
}

export const HomeTrainerSection: React.FC<HomeTrainerSectionProps> = ({
  onViewTrainerProfile,
  onBookTrainer,
  onViewAllTrainers,
}) => {
  return (
    <section id="trainers" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" /> CSCS & Master Certified Coaches
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              COACHED BY <span className="text-amber-400">EXPERTS</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-3 font-light">
              Train with internationally accredited specialists in biomechanics, sports performance, and body recomposition.
            </p>
          </div>

          <button
            id="home-view-all-trainers-btn"
            onClick={() => {
              soundManager.playClick();
              onViewAllTrainers();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm tracking-wide transition-all border border-zinc-700 hover:border-amber-500/40 group self-start md:self-auto cursor-pointer"
          >
            <span>VIEW ALL COACHES</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Trainers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.slice(0, 3).map((trainer, idx) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-72 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-zinc-950/80 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold backdrop-blur-md">
                    {trainer.experience}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                      {trainer.role}
                    </span>
                    <h3 className="text-2xl font-black text-white">{trainer.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Specialty: {trainer.specialization}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 font-light line-clamp-2">
                    {trainer.bio}
                  </p>
                </div>
              </div>

              {/* Action Buttons: VIEW PROFILE & BOOK TRAINER */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  id={`home-view-trainer-${trainer.id}`}
                  onClick={() => {
                    soundManager.playClick();
                    onViewTrainerProfile(trainer);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-zinc-700 text-center cursor-pointer"
                >
                  VIEW PROFILE
                </button>

                <button
                  id={`home-book-trainer-${trainer.id}`}
                  onClick={() => {
                    soundManager.playClick();
                    onBookTrainer(trainer);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK TRAINER</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
