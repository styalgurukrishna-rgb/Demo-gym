import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Calendar, 
  ArrowRight, 
  Dumbbell, 
  Flame, 
  ShieldCheck, 
  Coffee 
} from 'lucide-react';
import { FACILITIES } from '../data/gymData';
import { PageType, ModalState, Facility } from '../types';

interface FacilitiesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate, onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<string>(FACILITIES[0].id);

  const activeFacility = FACILITIES.find((f) => f.id === activeTab) || FACILITIES[0];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Building2 className="w-4 h-4" /> 15,000 Sq.Ft Architectural Masterpiece
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            WORLD-CLASS <span className="text-amber-400">FACILITIES</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Engineered with Italian Panatta biomechanics, Swedish Eleiko platforms, medical air filtration, and luxury hydrotherapy recovery.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              id="facilities-watch-virtual-tour"
              onClick={() => onOpenModal('tour')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>WATCH 4K VIRTUAL TOUR</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TABS & SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-6 mb-12 border-b border-zinc-800">
          {FACILITIES.map((facility: Facility) => (
            <button
              key={facility.id}
              onClick={() => setActiveTab(facility.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === facility.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black scale-105'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              <span>{facility.title}</span>
            </button>
          ))}
        </div>

        {/* Active Facility Feature Card */}
        <motion.div
          key={activeFacility.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-zinc-900/90 border border-zinc-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Left: High-Res Image with Lightbox Zoom */}
          <div className="lg:col-span-7 relative h-80 sm:h-[480px] overflow-hidden group">
            <img
              src={activeFacility.image}
              alt={activeFacility.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            
            <button
              onClick={() => onOpenModal('facilityLightbox', activeFacility)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-amber-500 hover:text-black transition-colors"
              title="Expand High-Resolution View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase tracking-wider">
                {activeFacility.highlight}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-2">{activeFacility.title}</h2>
              <p className="text-xs text-zinc-300 font-medium">{activeFacility.category}</p>
            </div>
          </div>

          {/* Right: Detailed Description & Amenities */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-zinc-900/60">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-500 mb-2">Zone Overview</div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase">{activeFacility.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {activeFacility.description}
              </p>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Highlights & Specs:</span>
                {activeFacility.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>BOOK FREE FACILITY TOUR & TRIAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenModal('tour')}
                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-zinc-700 transition-all"
              >
                Explore In 360° Virtual Tour
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3. ALL FACILITIES CARDS GRID */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Complete Tour</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
              Explore All <span className="text-amber-400">5 Specialized Zones</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility: Facility) => (
              <div
                key={facility.id}
                onClick={() => setActiveTab(facility.id)}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider">
                    {facility.highlight}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="text-lg font-black text-white uppercase">{facility.title}</h4>
                    <p className="text-[11px] text-zinc-300">{facility.category}</p>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{facility.description}</p>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Zone Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
