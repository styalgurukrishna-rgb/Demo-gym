import React from 'react';
import { motion } from 'motion/react';
import { 
  Dumbbell, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Users, 
  ChevronRight,
  Play
} from 'lucide-react';
import { STATS_DATA, PROGRAMS, GYM_INFO, TESTIMONIALS } from '../data/gymData';
import { PageType, ModalState, Program } from '../types';
import { Hero } from '../components/Hero';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { TransformationSection } from '../components/TransformationSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { TrustCertificationsSection } from '../components/TrustCertificationsSection';
import { AiFitnessCoachSection } from '../components/AiFitnessCoachSection';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenModal }) => {
  return (
    <div className="w-full text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO SECTION */}
      <Hero 
        onBookTrial={() => onNavigate('booking')}
        onJoinNow={() => onOpenModal('join')}
        onVirtualTour={() => onOpenModal('tour')}
        onExplorePrograms={() => onNavigate('programs')}
      />

      {/* 2. STATS SECTION */}
      <section id="stats-section" className="relative py-14 bg-zinc-950/90 border-y border-zinc-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-center p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 shadow-lg hover:border-amber-500/30 transition-all group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center justify-center gap-1 font-mono">
                  <span>{stat.value}</span>
                  <span className="text-amber-500">{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold text-zinc-200 mt-2 tracking-wide uppercase">
                  {stat.label}
                </div>
                <p className="text-xs text-zinc-400 mt-1 hidden sm:block">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <WhyChooseUsSection 
        onBookTrial={() => onNavigate('booking')}
        onConsultation={() => onOpenModal('consultation')}
      />

      {/* 4. FEATURED PROGRAMS PREVIEW */}
      <section id="programs-preview" className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5" /> High-Performance Disciplines
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                Featured <span className="text-amber-400">Programs</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-3">
                Scientifically structured training splits backed by Olympic strength coaches and biomechanical progression.
              </p>
            </div>
            <button
              id="view-all-programs-btn"
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm tracking-wide transition-all border border-zinc-700 hover:border-amber-500/40 group self-start md:self-auto"
            >
              <span>VIEW ALL PROGRAMS</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.slice(0, 3).map((prog: Program, idx: number) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden flex flex-col hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    referrerPolicy="no-referrer"
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
                      onClick={() => onNavigate('booking')}
                      className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 text-center"
                    >
                      Start Program
                    </button>
                    <button
                      id={`view-details-${prog.id}`}
                      onClick={() => onOpenModal('program', prog)}
                      className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-all border border-zinc-700"
                      title="View Details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRANSFORMATION COMPARISON SECTION */}
      <TransformationSection 
        onStartTransformation={() => onNavigate('booking')} 
      />

      {/* 6. FACILITIES SHOWCASE */}
      <FacilitiesSection 
        onOpenTour={() => onOpenModal('tour')}
        onBookPass={() => onNavigate('booking')}
      />

      {/* 7. AI FITNESS COACH SECTION */}
      <AiFitnessCoachSection 
        onOpenBooking={() => onNavigate('booking')}
      />

      {/* 8. TESTIMONIALS SLIDER */}
      <TestimonialsSection 
        onJoinClick={() => onOpenModal('join')}
      />

      {/* 9. TRUST & CERTIFICATIONS */}
      <TrustCertificationsSection />

      {/* 10. FINAL URGENT CALL TO ACTION */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 text-black font-black text-xs uppercase tracking-widest mb-4">
              <Zap className="w-4 h-4 fill-black" /> Limited Capacity This Month
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-tight">
              Your Fitness Journey <br className="hidden sm:block" />Starts Today
            </h2>
            <p className="text-black/85 text-base sm:text-xl max-w-2xl mx-auto font-medium mb-8">
              Join KSG DEMO GYM today and access world-class Italian Panatta machinery, certified master coaches, and luxury recovery suites.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="final-cta-join-now"
                onClick={() => onOpenModal('join')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black text-white hover:bg-zinc-900 font-black text-sm tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>JOIN NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="final-cta-book-trial"
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/90 hover:bg-white text-black font-black text-sm tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all border border-black/10 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK FREE TRIAL</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
