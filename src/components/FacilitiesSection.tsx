import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, Check, Eye } from 'lucide-react';
import { Facility } from '../types';
import { FACILITIES } from '../data/gymData';
import { handleImageError } from '../utils/imageFallback';

interface FacilitiesSectionProps {
  onOpenLightbox: (facility: Facility) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'modern-equipment', label: 'Equipment' },
    { id: 'workout-area', label: 'Main Arena' },
    { id: 'locker-room', label: 'Locker Suites' },
    { id: 'steam-room', label: 'Sauna & Steam' },
    { id: 'nutrition-area', label: 'Fuel Bar' },
  ];

  const filteredFacilities = activeCategory === 'all'
    ? FACILITIES
    : FACILITIES.filter((f) => f.id === activeCategory);

  return (
    <section id="facilities" className="relative py-28 bg-[#0A0A0C] border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#EF4444]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Grandeur</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            WORLD-CLASS <span className="bg-gradient-to-r from-white via-[#FFF8D6] to-[#D4AF37] bg-clip-text text-transparent">FACILITIES</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Step into 15,000 square feet of acoustically insulated, high-oxygen luxury engineered for peak focus and restorative luxury.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`facility-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid with smooth hover zoom and interactive inspect */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((facility, idx) => (
              <motion.div
                key={facility.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`group relative rounded-2xl bg-[#111114] border border-white/10 hover:border-[#D4AF37]/50 overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
                  idx === 0 && activeCategory === 'all' ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => onOpenLightbox(facility)}
              >
                {/* Image Container with Smooth Zoom Animation */}
                <div className={`relative overflow-hidden ${
                  idx === 0 && activeCategory === 'all' ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}>
                  <img
                    src={facility.image}
                    alt={facility.title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-black/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider">
                      {facility.highlight}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                    <p className="text-xs font-bold tracking-widest text-[#EF4444] uppercase mb-1">
                      {facility.category}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 line-clamp-2 max-w-xl">
                      {facility.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {facility.features.slice(0, 2).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-neutral-300 backdrop-blur-sm"
                        >
                          <Check className="w-3 h-3 text-[#D4AF37]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
