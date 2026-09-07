import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  BrainCircuit, 
  Dumbbell, 
  ShieldCheck, 
  Flame, 
  HeartHandshake, 
  Zap,
  Target
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface StorytellingSectionProps {
  onOpenTrial: () => void;
  onOpenJoin: () => void;
}

export const StorytellingSection: React.FC<StorytellingSectionProps> = ({
  onOpenTrial,
  onOpenJoin,
}) => {
  const problems = [
    {
      id: 'prob-1',
      icon: TrendingDown,
      title: 'Lack of Consistency & Motivation',
      desc: 'Starting strong in January only to burn out 3 weeks later due to lack of an inspiring atmosphere and accountability.',
      tag: 'Common Frustration',
    },
    {
      id: 'prob-2',
      icon: XCircle,
      title: 'Wrong Routines & Injury Risk',
      desc: 'Copying random influencer workouts with incorrect biomechanical angles that cause shoulder, knee, and lower back strain.',
      tag: 'Zero Progression',
    },
    {
      id: 'prob-3',
      icon: AlertTriangle,
      title: 'No Personalized Nutrition Plan',
      desc: 'Training intensely in the gym but eating blindly without tailored macronutrient calculations for your metabolic rate.',
      tag: 'Plateaued Results',
    },
    {
      id: 'prob-4',
      icon: BrainCircuit,
      title: 'Generic Crowded Gyms with No Guidance',
      desc: 'Waiting 15 minutes for a bench press in noisy, packed spaces while gym staff ignores your form and technique.',
      tag: 'Wasted Time',
    },
  ];

  const solutions = [
    {
      id: 'sol-1',
      icon: Dumbbell,
      title: 'Italian Panatta & Swedish Eleiko Equipment',
      desc: 'Calibrated biomechanics ensure 100% muscle activation with isolateral movement paths that protect tendons and joints.',
      highlight: 'Zero Compromise Gear',
      color: 'from-[#EF4444]/20 to-[#EF4444]/5',
      borderColor: 'border-[#EF4444]/30',
      iconColor: 'text-[#EF4444]',
    },
    {
      id: 'sol-2',
      icon: ShieldCheck,
      title: 'CSCS & ACE Certified Master Coaches',
      desc: 'Every coach on our floor holds top tier international credentials. You get instant form correction, rep tempo cues, and constant motivation.',
      highlight: 'Top 1% Coaching',
      color: 'from-[#D4AF37]/20 to-[#D4AF37]/5',
      borderColor: 'border-[#D4AF37]/30',
      iconColor: 'text-[#D4AF37]',
    },
    {
      id: 'sol-3',
      icon: Target,
      title: 'InBody 770 & Custom Macro Protocols',
      desc: 'We map your exact basal metabolic rate, visceral fat, and muscle balance every 14 days with clinical precision nutrition blueprints.',
      highlight: 'Scientific Tracking',
      color: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'sol-4',
      icon: Zap,
      title: 'Infrared Cedar Sauna & Cryo Recovery',
      desc: 'Accelerate muscular repair and lower systemic cortisol with our full-spectrum sauna, cold plunge tubs, and private recovery suite.',
      highlight: 'Rapid Regeneration',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ======================================================== */}
      {/* SECTION 2: PROBLEM */}
      {/* ======================================================== */}
      <section className="relative py-24 bg-[#0A0A0D] border-t border-white/5">
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>The Obstacles Holding You Back</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight"
            >
              STRUGGLING TO REACH YOUR <br />
              <span className="bg-gradient-to-r from-red-400 via-rose-300 to-white bg-clip-text text-transparent">
                TRUE PHYSICAL POTENTIAL?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto"
            >
              Over 87% of gym goers quit within 90 days not because of lack of desire, but because of flawed training environments and missing scientific guidance.
            </motion.p>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "250px 0px" }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-[#121217] border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-red-950/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white font-['Syne',sans-serif] group-hover:text-red-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-red-400/80">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>The Old Gym Model Fails Here</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: SOLUTION */}
      {/* ======================================================== */}
      <section className="relative py-24 bg-[#08080A] border-t border-white/10 overflow-hidden">
        {/* Ambient Gold and Red Lighting */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#EF4444]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-[#D4AF37]/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
              <span>The KSG Standard</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight"
            >
              KSG DEMO GYM HAS THE <br />
              <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
                COMPLETE TRANSFORMATION SOLUTION
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "250px 0px" }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto"
            >
              We engineered a luxury performance sanctuary where elite equipment, accredited master coaches, and bespoke recovery harmonize to guarantee measurable results.
            </motion.p>
          </div>

          {/* 4 Solution Cards with Glass Effect & Hover Elevate */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 1, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "250px 0px" }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={`group relative p-7 rounded-3xl bg-gradient-to-b ${sol.color} backdrop-blur-xl border ${sol.borderColor} hover:border-[#D4AF37]/80 transition-all duration-300 shadow-2xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-13 h-13 rounded-2xl bg-black/50 border border-white/15 flex items-center justify-center ${sol.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-wider text-neutral-200">
                        {sol.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white font-['Syne',sans-serif] group-hover:text-[#FFF4B8] transition-colors leading-snug">
                      {sol.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      {sol.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included in All Memberships</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Solution Banner Call to Action */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#181210] via-[#141218] to-[#101018] border border-[#D4AF37]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <Flame className="w-4 h-4 text-[#EF4444]" />
                <span>Zero Experience Required • Beginners Welcome</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white font-['Syne',sans-serif]">
                Experience The KSG Difference With A Free 1-on-1 VIP Session
              </h4>
              <p className="text-xs text-neutral-400 font-light">
                Meet your master trainer, test Panatta equipment, and receive your comprehensive InBody composition report.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                id="story-book-trial-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenTrial();
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>BOOK FREE TRIAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="story-join-now-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenJoin();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-neutral-200 hover:text-white bg-white/5 hover:bg-white/15 border border-white/15 transition-all cursor-pointer"
              >
                <span>EXPLORE PLANS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
