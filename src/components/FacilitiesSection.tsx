import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, CheckCircle2, Calendar, Play, ArrowRight, Dumbbell } from 'lucide-react';
import { Facility } from '../types';
import { FACILITIES } from '../data/gymData';
import { handleImageError } from '../utils/imageFallback';
import { soundManager } from './common/SoundEffects';

interface FacilitiesSectionProps {
  onOpenLightbox?: (facility: Facility) => void;
  onOpenTour?: () => void;
  onBookPass?: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ 
  onOpenLightbox,
  onOpenTour,
  onBookPass
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'free-weights', label: 'Barbells & Rigs' },
    { id: 'strength-machines', label: 'Panatta Machinery' },
    { id: 'functional-area', label: 'Functional Turf' },
    { id: 'cardio-area', label: 'Cardio Arena' },
    { id: 'recovery-area', label: 'Sauna & Plunge' },
    { id: 'locker-area', label: 'Locker Suites' },
  ];

  const filteredFacilities = activeCategory === 'all'
    ? FACILITIES
    : FACILITIES.filter((f) => f.id === activeCategory);

  const handleLightboxClick = (facility: Facility) => {
    soundManager.playClick();
    if (onOpenLightbox) {
      onOpenLightbox(facility);
    }
  };

  const handleBookClick = () => {
    soundManager.playClick();
    if (onBookPass) {
      onBookPass();
    }
  };

  const handleTourClick = () => {
    soundManager.playClick();
    if (onOpenTour) {
      onOpenTour();
    }
  };

  return (
    <section id="facilities" className="relative py-24 sm:py-32 bg-[#09090C] border-t border-white/5 overflow-hidden scroll-mt-20">
      {/* Subtle architectural ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>15,000 Sq.Ft Architectural Masterpiece</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white leading-tight">
            WORLD-CLASS <span className="text-amber-400">FACILITIES</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Engineered for high-focus athleticism. Discover Swedish Eleiko competition platforms, imported Italian Panatta biomechanics, and medical-grade recovery suites.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`facility-filter-${cat.id}`}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black scale-105'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Facilities Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((facility) => {
              const isLoaded = loadedImages[facility.id];

              return (
                <motion.div
                  key={facility.id}
                  layout
                  initial={{ opacity: 1, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70"
                >
                  {/* Top Image Frame with Lightbox & Highlight */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-950">
                    {/* Placeholder Shimmer (Never Blank/Black) */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                        <Dumbbell className="w-8 h-8 text-zinc-700 animate-pulse" />
                      </div>
                    )}

                    <img
                      src={facility.image}
                      alt={facility.title}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setLoadedImages((prev) => ({ ...prev, [facility.id]: true }))}
                      onError={handleImageError}
                      className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Gradient Transition from image to card body */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Feature Tag */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase tracking-wider shadow-md">
                        {facility.highlight}
                      </span>
                    </div>

                    {/* Lightbox Expand Button */}
                    <button
                      type="button"
                      aria-label={`Expand view of ${facility.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLightboxClick(facility);
                      }}
                      className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-zinc-300 hover:text-black hover:bg-amber-500 hover:border-amber-400 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
                      title="Inspect High-Res View"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clean Content Area (Completely below image, no overlapping text) */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Small Category Label */}
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                        {facility.category}
                      </span>

                      {/* Facility Title */}
                      <h3 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] uppercase text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors mb-2.5">
                        {facility.title}
                      </h3>

                      {/* Short Readable Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                        {facility.description}
                      </p>

                      {/* 2-3 Key Features List */}
                      <div className="space-y-2 pt-3 border-t border-zinc-800/80 mb-5">
                        {facility.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions Row */}
                    <div className="pt-3 flex items-center gap-2.5">
                      <button
                        onClick={handleBookClick}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Tour Pass</span>
                      </button>

                      <button
                        onClick={() => handleLightboxClick(facility)}
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold uppercase transition-all cursor-pointer"
                        title="View Full High-Res Lightbox"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Tour & Experience Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
              Complimentary In-Person Access
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Experience the Entire 15,000 Sq.Ft Space
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-light">
              Book a complimentary 1-Day Trial Session with full equipment floor access, certified coach intro, and recovery amenities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              id="facilities-book-trial-cta"
              onClick={handleBookClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CLAIM FREE 1-DAY PASS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="facilities-open-tour-cta"
              onClick={handleTourClick}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-black uppercase tracking-wider border border-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>WATCH 4K TOUR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

