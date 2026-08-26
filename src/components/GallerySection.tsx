import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, SlidersHorizontal, ArrowLeftRight, CheckCircle2, Shield } from 'lucide-react';
import { TiltCard } from './common/TiltCard';
import { Facility } from '../types';

interface GallerySectionProps {
  onOpenLightbox: (facility: Facility) => void;
}

interface BeforeAfterItem {
  id: string;
  name: string;
  age: number;
  duration: string;
  stat: string;
  beforeImg: string;
  afterImg: string;
  program: string;
  quote: string;
}

const TRANSFORMATIONS: BeforeAfterItem[] = [
  {
    id: 'vikram',
    name: 'Vikram Mehta',
    age: 34,
    duration: '16 Weeks',
    stat: '-18kg Body Fat | +6kg Muscle',
    beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    program: 'Hypertrophy & Shred Protocol',
    quote: 'The biomechanical equipment and nutrition guidance changed my entire physique permanently.',
  },
  {
    id: 'ananya',
    name: 'Ananya Roy',
    age: 29,
    duration: '12 Weeks',
    stat: '14% Fat Reduction | Core Strength',
    beforeImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    program: 'HIIT & Athletic Conditioning',
    quote: 'The energy at KSG is electrifying. The coaches hold you accountable every single workout.',
  },
];

const GALLERY_PHOTOS = [
  {
    id: 'panatta-rigs',
    title: 'Panatta Biomechanical Rigs',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision angle plate-loaded machinery engineered in Italy for zero joint strain.',
    highlight: 'Imported Panatta Rigs',
    features: ['Isolateral Movement', 'Converging Arc Path', 'Custom Upholstery'],
  },
  {
    id: 'eleiko-platforms',
    title: 'Olympic Eleiko Platforms',
    category: 'Powerlifting',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    description: 'Competition grade calibrated barbells, bumper plates, and vibration-dampened oak drop platforms.',
    highlight: 'IPF Certified',
    features: ['IWF Calibrated Plates', 'Needle Bearing Bars', 'Acoustic Drop Mats'],
  },
  {
    id: 'infrared-recovery',
    title: 'Infrared Bio-Recovery Suite',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    description: 'Full-spectrum cedar infrared sauna and 4°C hyper-recovery cold plunge pools.',
    highlight: 'Recovery Spa',
    features: ['Infrared Heat Waves', 'Ice Contrast Baths', 'Chromotherapy'],
  },
  {
    id: 'cardio-theatre',
    title: '4K Panoramic Cardio Theatre',
    category: 'Cardio',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    description: 'Woodway curved manual treadmills and StairMaster HIIT towers with live biometric HUD.',
    highlight: 'Zero-Impact Runners',
    features: ['Woodway Slats', 'Wattbike Pro Trainers', 'Heart Rate Zone HUD'],
  },
  {
    id: 'private-studios',
    title: 'VIP Master Training Zone',
    category: 'Private VIP',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Dedicated sound-isolated studio for 1-on-1 celebrity conditioning and posture assessment.',
    highlight: 'Executive Privacy',
    features: ['Private Sound Suite', 'InBody Biometrics', 'Dedicated Towel Service'],
  },
  {
    id: 'nutrition-lounge',
    title: 'Macro Fuel & Espresso Bar',
    category: 'Fuel & Nutrition',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    description: 'Artisanal cold brew, whey isolate shakes, and customized pre/post nutrition plans.',
    highlight: 'Organic Fuel',
    features: ['Micro-Filtered Protein', 'Cold-Pressed Juices', 'BCAA Electrolytes'],
  },
];

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'transformation'>('transformation');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedTransformation, setSelectedTransformation] = useState(0);
  const [filterCategory, setFilterCategory] = useState('All');

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const currentT = TRANSFORMATIONS[selectedTransformation];

  const categories = ['All', 'Equipment', 'Powerlifting', 'Recovery', 'Cardio', 'Private VIP'];
  const filteredPhotos = filterCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === filterCategory);

  return (
    <section id="gallery" className="relative py-28 bg-[#09090B] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Excellence & Transformation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            CINEMATIC <span className="bg-gradient-to-r from-white via-[#FFF8D6] to-[#D4AF37] bg-clip-text text-transparent">SHOWCASE</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Witness the pinnacle of athletic architecture and real body transformations created inside our walls.
          </p>

          {/* Toggle Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              id="gallery-tab-transformation"
              onClick={() => setActiveTab('transformation')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === 'transformation'
                  ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Before & After Transformation</span>
            </button>

            <button
              id="gallery-tab-equipment"
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Equipment & Arena 4K</span>
            </button>
          </div>
        </div>

        {/* TRANSFORMATION BEFORE / AFTER INTERACTIVE SLIDER */}
        {activeTab === 'transformation' ? (
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Interactive Comparison Canvas */}
              <div className="lg:col-span-7">
                <div
                  ref={containerRef}
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleSliderMove}
                  className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border-2 border-white/15 shadow-2xl select-none cursor-ew-resize group bg-black"
                >
                  {/* After Image (Full background) */}
                  <img
                    src={currentT.afterImg}
                    alt="After Transformation"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow">
                    AFTER ({currentT.duration})
                  </div>

                  {/* Before Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentT.beforeImg}
                      alt="Before Transformation"
                      className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none"
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                        height: '100%',
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-neutral-300 text-[11px] font-black uppercase tracking-wider border border-white/20">
                      BEFORE (WEEK 0)
                    </div>
                  </div>

                  {/* Vertical Dividing Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EF4444] via-white to-[#D4AF37] shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Center Handle Button */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/90 border-2 border-white flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <ArrowLeftRight className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Bottom Guide Hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5 pointer-events-none">
                    <span>⟵ Drag slider to compare results ⟶</span>
                  </div>
                </div>
              </div>

              {/* Transformation Narrative & Stats Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-3xl bg-[#111114] border border-white/10 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                        Verified Athlete Case
                      </span>
                      <h3 className="text-2xl font-black font-['Syne',sans-serif] uppercase text-white">
                        {currentT.name}, <span className="text-neutral-400 font-normal">{currentT.age} yrs</span>
                      </h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-black uppercase">
                      {currentT.duration}
                    </div>
                  </div>

                  {/* Stat highlight */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Total Body Shift</p>
                    <p className="text-lg font-black font-['Syne',sans-serif] text-white mt-0.5">{currentT.stat}</p>
                    <p className="text-xs text-neutral-400 mt-1">Program: <span className="text-white font-semibold">{currentT.program}</span></p>
                  </div>

                  {/* Member quote */}
                  <p className="text-sm text-neutral-300 font-light italic leading-relaxed">
                    "{currentT.quote}"
                  </p>

                  {/* Member Selector Switchers */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                    {TRANSFORMATIONS.map((t, idx) => (
                      <button
                        key={t.id}
                        id={`transformation-select-btn-${t.id}`}
                        onClick={() => setSelectedTransformation(idx)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          selectedTransformation === idx
                            ? 'bg-[#D4AF37] text-black shadow-md'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {t.name.split(' ')[0]} ({t.duration})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* EQUIPMENT & 4K FACILITY GALLERY */
          <div className="mt-10">
            {/* Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`gallery-cat-${cat}`}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid with 3D Tilt Card and Lightbox trigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <TiltCard
                      id={`gallery-photo-card-${photo.id}`}
                      className="rounded-2xl overflow-hidden bg-[#111114] border border-white/10 hover:border-[#D4AF37]/50 shadow-2xl group"
                      onClick={() =>
                        onOpenLightbox({
                          id: photo.id,
                          title: photo.title,
                          category: photo.category,
                          image: photo.image,
                          description: photo.description,
                          highlight: photo.highlight,
                          features: photo.features,
                        })
                      }
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        {/* Top tag */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                            {photo.highlight}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Bottom details */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-[10px] text-[#EF4444] font-bold uppercase tracking-widest">
                            {photo.category}
                          </p>
                          <h4 className="text-lg font-black font-['Syne',sans-serif] uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                            {photo.title}
                          </h4>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
