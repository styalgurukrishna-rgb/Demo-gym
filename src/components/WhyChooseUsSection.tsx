import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Dumbbell, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Flame, 
  Zap, 
  Wind,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface WhyChooseUsSectionProps {
  onOpenTrial: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenTrial }) => {
  const trustCards = [
    {
      id: 'certified-trainers',
      icon: Award,
      title: 'CSCS & ACE Certified Master Coaches',
      desc: 'No rookie spotters. Every trainer on our floor is internationally accredited in sports science, posture rehabilitation, and periodized programming.',
      highlight: 'Top 1% Coaches',
      badgeColor: 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30',
      iconColor: 'text-[#D4AF37]',
    },
    {
      id: 'modern-equipment',
      icon: Dumbbell,
      title: 'Italian Panatta & Swedish Eleiko Machinery',
      desc: 'Biophysically calibrated isolateral machines and calibrated Olympic barbells engineered to eliminate joint impingement while maximizing hypertrophy.',
      highlight: 'World-Class Rigs',
      badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
      iconColor: 'text-[#EF4444]',
    },
    {
      id: 'flexible-timing',
      icon: Clock,
      title: 'Flexible 24/7 Access with Biometric RFID',
      desc: 'Your schedule, your terms. Access our secured fitness floor, cardio theater, and locker rooms 24 hours a day, 365 days a year.',
      highlight: 'Always Open',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'clean-environment',
      icon: Wind,
      title: 'Medical-Grade Air Filtration & Hygiene',
      desc: 'Equipped with hospital-grade HEPA-14 ionization filters exchanging fresh oxygen every 6 minutes, with hourly sanitization of all surfaces.',
      highlight: 'Ultra Hygienic',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      id: 'personal-guidance',
      icon: HeartHandshake,
      title: 'Bespoke Nutrition & Biometric Mapping',
      desc: 'Clinical InBody 770 composition scans every 14 days matched with tailored macronutrient targets and weekly accountability check-ins.',
      highlight: 'Science-Backed',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      id: 'recovery-spa',
      icon: Zap,
      title: 'Finnish Cedar Sauna & Cryo Recovery Suite',
      desc: 'Full-spectrum infrared heat, cold plunge therapy, and hyper-recovery compression boots to slash DOMS and reset your nervous system.',
      highlight: 'Rapid Healing',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0A0A0D] border-t border-white/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#EF4444]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-[#D4AF37]/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Quality Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
            WHY HIGH ACHIEVERS CHOOSE <br />
            <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              KSG DEMO GYM
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light">
            We eliminated every bottleneck, frustration, and compromise of conventional commercial gyms to deliver a world-class training sanctuary.
          </p>
        </div>

        {/* 6 Luxury Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative p-8 rounded-3xl bg-[#121218]/90 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/60 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-black/60 border border-white/15 flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}>
                      {card.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white font-['Syne',sans-serif] group-hover:text-[#FFF4B8] transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Excellence</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Verification CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTrial();
            }}
            className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/60 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2.5 border border-red-400/30"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047]" />
            <span>EXPERIENCE IT IN PERSON — BOOK FREE PASS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
