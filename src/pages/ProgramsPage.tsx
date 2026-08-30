import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  ArrowRight, 
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import { PROGRAMS } from '../data/gymData';
import { PageType, ModalState, Program } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface ProgramsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate, onOpenModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Programs' },
    { id: 'strength', label: 'Strength & Hypertrophy' },
    { id: 'hiit', label: 'Cardio & HIIT' },
    { id: 'crossfit', label: 'CrossFit & Agility' },
    { id: 'mobility', label: 'Mobility & Recovery' },
    { id: 'pt', label: '1-on-1 Personal Training' },
  ];

  const filteredPrograms = PROGRAMS.filter((prog: Program) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'strength') return prog.id.includes('weight') || prog.id.includes('powerlifting');
    if (selectedFilter === 'hiit') return prog.id.includes('cardio');
    if (selectedFilter === 'crossfit') return prog.id.includes('crossfit');
    if (selectedFilter === 'mobility') return prog.id.includes('yoga');
    if (selectedFilter === 'pt') return prog.id.includes('personal');
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Flame className="w-4 h-4" /> Elite Athletic Disciplines
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            TRAINING <span className="text-amber-400">PROGRAMS</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Every program is calibrated with progressive overload principles, metabolic conditioning, and recovery bio-tracking.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFilter === cat.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DETAILED PROGRAMS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPrograms.map((prog: Program, idx: number) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-2xl group"
            >
              {/* Program Top Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                {prog.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-lg">
                    {prog.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{prog.level}</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">{prog.title}</h2>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5">{prog.subtitle}</p>
                </div>
              </div>

              {/* Program Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 mb-6 text-center">
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Duration</div>
                      <div className="text-xs sm:text-sm font-black text-white mt-1 flex items-center justify-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{prog.duration}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Est. Burn</div>
                      <div className="text-xs sm:text-sm font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>{prog.caloriesBurn}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Intensity</div>
                      <div className="text-xs sm:text-sm font-black text-white mt-1 flex items-center justify-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{prog.level.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Checklist */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Key Benefits & Protocols:</h3>
                    <ul className="space-y-2">
                      {prog.benefits.slice(0, 4).map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Program Coach */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 mb-6">
                    <img 
                      src={prog.trainer.avatar} 
                      alt={prog.trainer.name} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{prog.trainer.name}</div>
                      <div className="text-[11px] text-zinc-400">{prog.trainer.role}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    id={`start-program-btn-${prog.id}`}
                    onClick={() => onNavigate('booking')}
                    className="py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>START PROGRAM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`book-trainer-btn-${prog.id}`}
                    onClick={() => onOpenModal('consultation', { programTitle: prog.title })}
                    className="py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>BOOK TRAINER</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FREE TRIAL BANNER */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            Not Sure Which Program Suits Your Genetic Blueprint?
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl mx-auto">
            Book a complimentary 1-Day Trial Pass and receive an InBody 770 body composition assessment with our Head Coach.
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="mt-6 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            CLAIM FREE 1-DAY VIP PASS
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
