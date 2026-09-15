import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Sparkles, 
  Calendar
} from 'lucide-react';
import { STATS_DATA } from '../data/gymData';
import { PageType, ModalState, GymConfig, Trainer } from '../types';
import { Hero } from '../components/Hero';
import { gymConfigStore } from '../services/gymConfigStore';
import { soundManager } from '../components/common/SoundEffects';

// Lazy-loaded Below-the-fold Sections for Optimal First-Paint Performance
const WhyChooseUsSection = lazy(() => import('../components/WhyChooseUsSection').then(m => ({ default: m.WhyChooseUsSection })));
const HomeProgramsSection = lazy(() => import('../components/HomeProgramsSection').then(m => ({ default: m.HomeProgramsSection })));
const HomeTrainerSection = lazy(() => import('../components/HomeTrainerSection').then(m => ({ default: m.HomeTrainerSection })));
const TransformationSection = lazy(() => import('../components/TransformationSection').then(m => ({ default: m.TransformationSection })));
const HomePricingSection = lazy(() => import('../components/HomePricingSection').then(m => ({ default: m.HomePricingSection })));
const FacilitiesSection = lazy(() => import('../components/FacilitiesSection').then(m => ({ default: m.FacilitiesSection })));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const TrustCertificationsSection = lazy(() => import('../components/TrustCertificationsSection').then(m => ({ default: m.TrustCertificationsSection })));
const FindOurGymSection = lazy(() => import('../components/FindOurGymSection').then(m => ({ default: m.FindOurGymSection })));

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
      <section id="stats-section" className="relative py-14 bg-zinc-950 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS_DATA.map((stat) => (
              <div
                key={stat.label}
                className="relative text-center p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 shadow-lg hover:border-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 group"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BELOW-THE-FOLD SECTIONS (Streamed in background without blocking Hero & Header) */}
      <Suspense fallback={null}>
        {/* 3. WHY CHOOSE US (6 Trust Cards) */}
        <WhyChooseUsSection 
          onBookTrial={() => onNavigate('booking')}
          onConsultation={() => onOpenModal('consultation')}
        />

        {/* 4. TRAIN WITH PURPOSE: FEATURED PROGRAMS */}
        <HomeProgramsSection 
          onNavigate={onNavigate} 
          onOpenModal={onOpenModal} 
        />

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
          onOpenLightbox={(facility) => onOpenModal('facilityLightbox', facility)}
          onOpenTour={() => onOpenModal('tour')}
          onBookPass={() => onNavigate('booking')}
        />

        {/* 9. SOCIAL PROOF: WHAT OUR MEMBERS SAY (TESTIMONIALS SLIDER) */}
        <TestimonialsSection 
          onJoinClick={() => onOpenModal('join')}
        />

        {/* 10. TRUST & CERTIFICATIONS */}
        <TrustCertificationsSection />

        {/* 11. FIND OUR GYM: LOCATION & GOOGLE MAPS */}
        <FindOurGymSection onBookTour={() => onOpenModal('tour')} />
      </Suspense>

      {/* 12. READY TO START? (EXPERIENCE KSG DEMO GYM) */}
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
    </div>
  );
};

export default HomePage;
