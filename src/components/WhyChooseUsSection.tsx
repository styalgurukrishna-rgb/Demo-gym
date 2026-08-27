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
  CheckCircle2,
  LineChart,
  Users,
  Target,
  ArrowRight
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface WhyChooseUsSectionProps {
  onOpenTrial?: () => void;
  onBookTrial?: () => void;
  onConsultation?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  onOpenTrial,
  onBookTrial,
  onConsultation
}) => {
  const handleTrial = onOpenTrial || onBookTrial || onConsultation || (() => {});

  const cards = [
    {
      id: 'expert-coaching',
      icon: Award,
      title: 'EXPERT COACHING',
      desc: 'Professional guidance for every fitness level, from certified master coaches who prioritize technique, safety, and sustainable progression.',
      highlight: 'Certified Coaches',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    {
      id: 'modern-equipment',
      icon: Dumbbell,
      title: 'MODERN EQUIPMENT',
      desc: 'A complete training environment featuring biomechanically calibrated strength machines, Olympic barbells, and specialized recovery suites.',
      highlight: 'World-Class Rigs',
      iconColor: 'text-red-400',
      badgeBg: 'bg-red-500/10 border-red-500/30 text-red-300',
    },
    {
      id: 'personalized-programs',
      icon: Target,
      title: 'PERSONALIZED PROGRAMS',
      desc: 'Training based on individual goals. Custom workout splits, targeted macronutrient advice, and milestone-driven progress tracking.',
      highlight: 'Tailored Plans',
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    {
      id: 'flexible-memberships',
      icon: Clock,
      title: 'FLEXIBLE MEMBERSHIPS',
      desc: 'Plans designed for different needs with transparent pricing, zero hidden charges, and hassle-free access options.',
      highlight: 'Zero Lock-in',
      iconColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    },
    {
      id: 'progress-tracking',
      icon: LineChart,
      title: 'PROGRESS TRACKING',
      desc: 'Track your fitness journey with bi-weekly InBody biometric body scans, strength logs, and coach accountability checkpoints.',
      highlight: 'Measurable Results',
      iconColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    },
    {
      id: 'supportive-community',
      icon: Users,
      title: 'SUPPORTIVE COMMUNITY',
      desc: 'A motivating training environment where athletes, beginners, and fitness enthusiasts encourage one another to achieve their personal best.',
      highlight: 'Uplifting Culture',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 bg-zinc-950 border-t border-zinc-800/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-amber-500/5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MORE THAN A GYM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            WHY CHOOSE <br className="hidden sm:block" />
            <span className="text-amber-400">
              KSG DEMO GYM
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-2xl mx-auto">
            Discover a training experience engineered from the ground up for superior performance, supportive coaching, and verifiable results.
          </p>
        </div>

        {/* 6 Luxury Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${card.badgeBg}`}>
                      {card.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
