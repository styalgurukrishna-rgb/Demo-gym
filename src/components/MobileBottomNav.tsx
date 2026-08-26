import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Dumbbell, 
  CalendarCheck, 
  MessageCircle, 
  User, 
  Sparkles
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';
import { GYM_INFO } from '../data/gymData';

interface MobileBottomNavProps {
  onOpenTrial: () => void;
  onOpenLogin: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenTrial,
  onOpenLogin,
}) => {
  const handleScrollTo = (id: string) => {
    soundManager.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    soundManager.playClick();
    const cleanPhone = GYM_INFO.whatsapp.replace('+', '');
    window.open(`https://wa.me/${cleanPhone}?text=Hi%20KSG%20Gym%2C%20I%20would%20like%20to%20know%20more%20about%20memberships`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-3 pb-3 pt-1 pointer-events-auto">
      <div className="max-w-md mx-auto rounded-3xl bg-[#0F0F14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] px-2 py-2 flex items-center justify-around">
        {/* 1. Home */}
        <button
          onClick={() => handleScrollTo('home')}
          className="flex flex-col items-center justify-center p-1.5 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer min-w-[56px]"
        >
          <Home className="w-5 h-5 text-neutral-300" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        {/* 2. Programs */}
        <button
          onClick={() => handleScrollTo('programs')}
          className="flex flex-col items-center justify-center p-1.5 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer min-w-[56px]"
        >
          <Dumbbell className="w-5 h-5 text-neutral-300" />
          <span className="text-[10px] font-bold mt-1">Programs</span>
        </button>

        {/* 3. Central Highlighted Book Trial Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenTrial();
          }}
          className="flex flex-col items-center justify-center -mt-5 p-2 rounded-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] border-2 border-[#121217] active:scale-90 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <CalendarCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider -mt-1 pb-1">Book</span>
        </button>

        {/* 4. WhatsApp Coach */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center p-1.5 rounded-2xl text-neutral-400 hover:text-emerald-400 hover:bg-white/5 active:scale-95 transition-all cursor-pointer min-w-[56px]"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-bold mt-1">WhatsApp</span>
        </button>

        {/* 5. Profile / Member Login */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenLogin();
          }}
          className="flex flex-col items-center justify-center p-1.5 rounded-2xl text-neutral-400 hover:text-[#D4AF37] hover:bg-white/5 active:scale-95 transition-all cursor-pointer min-w-[56px]"
        >
          <User className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};
