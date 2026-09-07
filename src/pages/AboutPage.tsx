import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  Dumbbell, 
  Compass,
  Calendar,
  Play
} from 'lucide-react';
import { GYM_INFO, STATS_DATA, TIMELINE_DATA, TRAINERS } from '../data/gymData';
import { PageType, ModalState, Trainer } from '../types';
import { AboutFaqSection } from '../components/AboutFaqSection';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenModal }) => {
  const corePillars = [
    {
      icon: Target,
      title: "Science-Backed Biomechanics",
      desc: "Every movement pattern, angle, and load curve is calibrated to maximize hypertrophy while safeguarding joint longevity."
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Standards",
      desc: "From Italian Panatta plate-loaded rigs to hospital-grade air sanitation, we offer nothing short of 5-star athletic excellence."
    },
    {
      icon: HeartHandshake,
      title: "Culture of Empowerment",
      desc: "No intimidation, no vanity. A supportive brotherhood and sisterhood of focused individuals forging their highest physical potential."
    },
    {
      icon: Award,
      title: "Holistic Longevity",
      desc: "Combining heavy compound lifting with infrared detox, cold plunge therapy, and precision sports nutrition."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950 z-0" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Established with High Standards
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
              ABOUT <span className="text-amber-400">KSG DEMO GYM</span>
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-300 font-light mt-6 leading-relaxed">
              "Transform Your Body. Build Your Confidence. Become Your Best Version."
            </p>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mt-4">
              We engineered KSG DEMO GYM as an uncompromising sanctuary for athletic progress, combining imported Italian biomechanical equipment with certified coach mentorship.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
              <button
                id="about-hero-watch-tour-btn"
                onClick={() => onOpenModal('tour')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>WATCH VIRTUAL TOUR</span>
              </button>
              <button
                id="about-hero-book-trial-btn"
                onClick={() => onNavigate('booking')}
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all cursor-pointer"
              >
                BOOK FREE TRIAL
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND STORY & MISSION */}
      <section className="py-20 bg-zinc-900/40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs font-black tracking-widest uppercase text-amber-500 mb-2">
                Our Foundational Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-6">
                Built For Those Who Demand <br /><span className="text-amber-400">Real Transformation</span>
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed mb-4">
                At KSG DEMO GYM, we believe physical strength is the bedrock of mental resilience. We rejected the crowded, chaotic format of generic commercial gyms to build an elite, high-vibe sanctuary.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Our coaches are not rep-counters; they are biomechanical specialists, nutrition researchers, and mentors committed to keeping you consistent and injury-free.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-2xl font-black text-amber-400 font-mono">100%</div>
                  <div className="text-xs font-bold text-zinc-200 mt-1 uppercase">Certified Staff</div>
                  <div className="text-xs text-zinc-500 mt-0.5">NSCA & ACE credentialed</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-2xl font-black text-amber-400 font-mono">15,000</div>
                  <div className="text-xs font-bold text-zinc-200 mt-1 uppercase">Sq.Ft Facility</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Zero wait time floor plan</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80"
                  alt="KSG Gym Floor"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mission Statement</p>
                  <p className="text-sm font-medium text-white mt-1">
                    "To empower ambitious humans to break physical plateaus and cultivate lifelong metabolic health."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR JOURNEY TIMELINE */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Evolution</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
              Our Journey <span className="text-amber-400">Timeline</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3">
              From an underground barbell studio to the city's gold-standard athletic facility.
            </p>
          </div>

          <div className="relative">
            {/* Center Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/50 to-zinc-800" />

            <div className="space-y-12 md:space-y-16">
              {TIMELINE_DATA.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2 px-0 md:px-8">
                      <div className={`p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all shadow-xl ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/20">
                            {item.badge}
                          </span>
                          <span className="text-2xl font-black text-amber-400 font-mono">{item.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1">{item.subtitle}</p>
                        <p className="text-sm text-zinc-300 mt-3 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Node Badge */}
                    <div className="relative my-4 md:my-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-black font-black text-sm flex items-center justify-center shadow-lg ring-4 ring-zinc-950 z-20 font-mono">
                        {item.year.slice(2)}
                      </div>
                    </div>

                    {/* Empty spacer for alignment */}
                    <div className="hidden md:block w-1/2 px-8" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PILLARS */}
      <section className="py-20 bg-zinc-900/60 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
              Why We Are <span className="text-amber-400">Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={p.title}
                  className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TEAM PREVIEW */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
                Meet Our <span className="text-amber-400">Master Coaches</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('trainers')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-all border border-zinc-700"
            >
              <span>VIEW ALL TRAINERS</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.slice(0, 4).map((trainer: Trainer) => (
              <div
                key={trainer.id}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-black text-white">{trainer.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{trainer.role}</p>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{trainer.bio}</p>
                  <button
                    onClick={() => onOpenModal('trainer', trainer)}
                    className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-700"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <AboutFaqSection onNavigate={onNavigate} onOpenModal={onOpenModal} />

      {/* 7. CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-t border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Ready to Experience the KSG Difference?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Book your complimentary VIP pass and tour our 15,000 sq.ft athletic facility today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              Book Free Trial
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="px-8 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm uppercase tracking-wider border border-zinc-700 transition-all"
            >
              View Membership Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
