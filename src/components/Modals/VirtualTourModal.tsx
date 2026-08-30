import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Compass, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose, onOpenJoin }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeZone, setActiveZone] = useState(0);

  if (!isOpen) return null;

  const tourScenes = [
    {
      title: "Main Power Arena & Racks",
      subtitle: "15,000 Sq.Ft Open Floor",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80",
      description: "Panatta Hack Squats, Super Incline Presses, Eleiko Olympic platforms with acoustic shock dissipation.",
      stats: "70+ Workstations • Zero Queuing",
    },
    {
      title: "Private VIP Lifting Suites",
      subtitle: "Exclusive 1-on-1 Studio",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=80",
      description: "Dedicated private coaching suites equipped with InBody 770 diagnostics and high-speed biomechanics cameras.",
      stats: "Private Sound Isolation • Climate Control",
    },
    {
      title: "Hydrotherapy & Infrared Sauna",
      subtitle: "Bio-Recovery Spa",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
      description: "Cedar infrared sauna (up to 80°C), 4°C cold plunge tub, and eucalyptus mist for instant autonomic nervous recovery.",
      stats: "4°C Cold Plunge • Infrared Cedar",
    },
    {
      title: "Artisan Nutrition & Shake Lounge",
      subtitle: "Fuel Bar & Macro Counter",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
      description: "Custom hydrolyzed protein concoctions, cold-pressed nitric oxide shots, and macro meal pick-up lockers.",
      stats: "Barista Pre-Workouts • Clean Fuel",
    }
  ];

  const currentScene = tourScenes[activeZone];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0D0D10] border border-white/15 overflow-hidden shadow-2xl z-10 my-4"
      >
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Syne',sans-serif] font-black text-sm sm:text-base uppercase text-white tracking-wider">
                KSG 360° Cinematic Virtual Walkthrough
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-medium">Interactive 4K Club Exploration</p>
            </div>
          </div>

          <button
            id="tour-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Scene Viewer Window */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black group">
          <img
            src={currentScene.image}
            alt={currentScene.title}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

          {/* Simulated 3D Compass Indicator */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] text-white font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>4K HDR LIVE PREVIEW</span>
          </div>

          {/* Center Play/Pause indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="pointer-events-auto p-4 rounded-full bg-black/60 hover:bg-[#EF4444] border border-white/20 text-white transition-all transform hover:scale-110 cursor-pointer shadow-2xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5 fill-current" />}
            </button>
          </div>

          {/* Bottom Info on Scene */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="max-w-md">
              <span className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-wider">
                {currentScene.subtitle}
              </span>
              <h4 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] uppercase text-white">
                {currentScene.title}
              </h4>
              <p className="text-xs text-neutral-300 font-light mt-1 hidden sm:block">
                {currentScene.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/20 cursor-pointer text-xs"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
              </button>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1.5 rounded-lg bg-black/70 border border-white/10 text-neutral-300">
                {currentScene.stats}
              </span>
            </div>
          </div>
        </div>

        {/* Scene Selection Bar */}
        <div className="p-4 sm:p-5 bg-[#111115] border-t border-white/10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Select Virtual Tour Chapter:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {tourScenes.map((scene, idx) => (
              <button
                key={idx}
                id={`tour-scene-${idx}`}
                onClick={() => setActiveZone(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                  activeZone === idx
                    ? 'bg-[#1E1810] border-[#D4AF37] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <p className="text-[10px] uppercase font-bold text-[#D4AF37]">0{idx + 1}. Chapter</p>
                <p className="text-xs font-bold truncate mt-0.5">{scene.title}</p>
              </button>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">
              Ready to feel the energy in person? Schedule your personalized walkthrough.
            </p>
            <button
              id="tour-schedule-in-person-btn"
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <span>Schedule Live Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
