import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  X, 
  Tag, 
  ArrowRight,
  Flame,
  Trophy,
  Users,
  Dumbbell
} from 'lucide-react';
import { PageType, ModalState, GalleryItem } from '../types';
import { leadStore } from '../services/leadStore';
import { handleImageError } from '../utils/imageFallback';

interface GalleryPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(leadStore.getGallery());

  useEffect(() => {
    const unsub = leadStore.subscribe(() => {
      setGalleryItems(leadStore.getGallery());
    });
    return () => unsub();
  }, []);

  const categories = [
    { id: 'all', label: 'All Photos', icon: Camera },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'events', label: 'Events', icon: Trophy },
    { id: 'transformation', label: 'Transformation', icon: Flame },
    { id: 'trainers', label: 'Trainers', icon: Users },
  ];

  const filteredItems = galleryItems.filter((item: GalleryItem) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(245,158,11,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Camera className="w-4 h-4" /> The Visual Experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            COMMUNITY <span className="text-amber-400">GALLERY</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Glimpse into daily high-energy workouts, powerlifting milestones, community competitions, and body transformations.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MASONRY GALLERY GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item: GalleryItem) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer hover:border-amber-500/50 shadow-xl"
              >
                <div className="h-72 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                    {item.categoryLabel}
                  </div>

                  {/* Expand Zoom Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Title & Tag */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      #{item.tag}
                    </span>
                    <h3 className="text-lg font-black text-white uppercase leading-snug group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 text-white hover:bg-amber-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              <div className="p-6 sm:p-8 bg-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase">
                    {lightboxItem.categoryLabel} • #{lightboxItem.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-2">{lightboxItem.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">{lightboxItem.description}</p>
                </div>
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    onNavigate('booking');
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider whitespace-nowrap shadow-lg"
                >
                  Start Your Transformation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 bg-zinc-900/60 border-t border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
            Ready to be our next success story?
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
            Step onto the training floor and experience what true athletic mentorship feels like.
          </p>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-xl"
            >
              BOOK YOUR FREE 1-DAY PASS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
