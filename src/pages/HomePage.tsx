import React, { useState, useEffect } from 'react';
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
import { PageType, ModalState, Program, GymConfig, Trainer, PricingPlan } from '../types';
import { Hero } from '../components/Hero';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { HomeTrainerSection } from '../components/HomeTrainerSection';
import { HomePricingSection } from '../components/HomePricingSection';
import { TransformationSection } from '../components/TransformationSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { TrustCertificationsSection } from '../components/TrustCertificationsSection';
import { AiFitnessCoachSection } from '../components/AiFitnessCoachSection';
import { DemoFeatureShowcase } from '../components/DemoFeatureShowcase';
import { RoiBusinessBenefitSection } from '../components/RoiBusinessBenefitSection';
import { gymConfigStore } from '../services/gymConfigStore';
import { soundManager } from '../components/common/SoundEffects';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
  onSelectTrainerForBooking?: (trainerName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenModal,
  onSelectTrainerForBooking 
}) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const handleTrainerBooking = (trainer: Trainer) => {
    if (onSelectTrainerForBooking) {
      onSelectTrainerForBooking(trainer.name);
    }
    onNavigate('booking');
  };

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

      {/* 3. WHY CHOOSE US (6 Trust Cards) */}
      <WhyChooseUsSection 
        onBookTrial={() => onNavigate('booking')}
        onConsultation={() => onOpenModal('consultation')}
      />

      {/* 4. TRAIN WITH PURPOSE: FEATURED PROGRAMS */}
      <section id="programs-preview" className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COACHED BY EXPERTS: TRAINER DISCOVERY PREVIEW */}
      <HomeTrainerSection 
        onViewTrainerProfile={(trainer) => onOpenModal('trainer', trainer)}
        onBookTrainer={handleTrainerBooking}
        onViewAllTrainers={() => onNavigate('trainers')}
      />

      {/* 6. BUILT FOR RESULTS: TRANSFORMATION COMPARISON SECTION */}
      <TransformationSection 
        onStartTransformation={() => onNavigate('booking')} 
      />

      {/* 7. CHOOSE YOUR MEMBERSHIP: HOMEPAGE PRICING & PLAN COMPARISON */}
      <HomePricingSection 
        onSelectPlan={(plan) => onOpenModal('payment', { plan, finalPrice: plan.price, billingCycle: 'monthly' })}
        onOpenHelpMeChoose={() => onOpenModal('helpMeChoose')}
      />

      {/* 8. FACILITIES SHOWCASE: TAKE A LOOK INSIDE */}
      <FacilitiesSection 
        onOpenTour={() => onOpenModal('tour')}
        onBookPass={() => onNavigate('booking')}
      />

      {/* 9. AI FITNESS COACH & VIRTUAL CONCIERGE */}
      <AiFitnessCoachSection 
        onOpenBooking={() => onNavigate('booking')}
      />

      {/* 10. SOCIAL PROOF: WHAT OUR MEMBERS SAY (TESTIMONIALS SLIDER) */}
      <TestimonialsSection 
        onJoinClick={() => onOpenModal('join')}
      />

      {/* 11. TRUST & CERTIFICATIONS */}
      <TrustCertificationsSection />

      {/* 12. SECTION 7: READY TO START? (EXPERIENCE KSG DEMO GYM) */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-zinc-800 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4" /> READY TO START?
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            EXPERIENCE <span className="text-amber-400">KSG DEMO GYM</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-xl max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Book your first trial session and discover the training experience.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="experience-trial-cta-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('booking');
              }}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-amber-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK FREE TRIAL</span>
            </button>

            <button
              id="experience-join-cta-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenModal('join');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm tracking-wider uppercase border border-zinc-700 transition-all cursor-pointer"
            >
              <span>EXPLORE MEMBERSHIP</span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. WHITE-LABEL SYSTEM: ROI & BUSINESS BENEFIT FUNNEL */}
      {config.demoMode && !config.whiteLabelMode && (
        <>
          <RoiBusinessBenefitSection 
            onOpenBooking={() => onNavigate('booking')}
            onOpenJoin={() => onOpenModal('join')}
            onOpenDemoInquiry={() => onOpenModal('demoInquiry')}
          />
          <DemoFeatureShowcase 
            onOpenDemoInquiry={() => onOpenModal('demoInquiry')}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
