import React from 'react';
import { Flame, ArrowRight, ChevronRight } from 'lucide-react';
import { PROGRAMS } from '../data/gymData';
import { Program, PageType, ModalState } from '../types';
import { soundManager } from './common/SoundEffects';

interface HomeProgramsSectionProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const HomeProgramsSection: React.FC<HomeProgramsSectionProps> = ({
  onNavigate,
  onOpenModal,
}) => {
  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5" /> High-Performance Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              TRAIN WITH <span className="text-amber-400">PURPOSE</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-3 font-light">
              Scientifically structured training splits backed by Olympic strength coaches and biomechanical progression.
            </p>
          </div>
          <button
            id="view-all-programs-btn"
            onClick={() => {
              soundManager.playClick();
              onNavigate('programs');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm tracking-wide transition-all border border-zinc-700 hover:border-amber-500/40 group self-start md:self-auto cursor-pointer"
          >
            <span>VIEW ALL PROGRAMS</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.slice(0, 3).map((prog: Program) => (
            <div
              key={prog.id}
              className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden flex flex-col hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                {prog.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-md">
                    {prog.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">{prog.level}</span>
                  <h3 className="text-2xl font-black text-white">{prog.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-400 mb-5 line-clamp-2">
                  {prog.tagline}
                </p>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 mb-6 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Duration</span>
                    <span className="font-bold text-zinc-200">{prog.duration}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Est. Burn</span>
                    <span className="font-bold text-amber-400">{prog.caloriesBurn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    id={`start-program-${prog.id}`}
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('booking');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 text-center cursor-pointer"
                  >
                    Start Program
                  </button>
                  <button
                    id={`view-details-${prog.id}`}
                    onClick={() => {
                      soundManager.playClick();
                      onOpenModal('program', prog);
                    }}
                    className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-all border border-zinc-700 cursor-pointer"
                    title="View Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProgramsSection;
