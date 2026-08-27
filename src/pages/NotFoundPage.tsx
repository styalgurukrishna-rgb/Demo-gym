import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Home, ArrowLeft, Compass } from 'lucide-react';
import { PageType } from '../types';
import { soundManager } from '../components/common/SoundEffects';
import { gymConfigStore } from '../services/gymConfigStore';

interface NotFoundPageProps {
  onNavigate: (page: PageType) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const gymName = gymConfigStore.getGymName();

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4 py-24 selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity scale-110 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')` }}
      />

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-inner">
            <Dumbbell className="w-10 h-10 -rotate-12" />
          </div>

          <span className="text-6xl sm:text-8xl font-black text-amber-400 tracking-tighter block font-['Cinzel',serif]">
            404
          </span>

          <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mt-2 mb-3">
            PAGE NOT FOUND
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
            The training zone or URL you are looking for has been relocated or is currently under reconstruction at {gymName}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="not-found-home-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('home');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>BACK TO HOME</span>
            </button>
            <button
              id="not-found-explore-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('programs');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all border border-zinc-700 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE PROGRAMS</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
