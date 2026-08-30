import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, Zap, Clock, Users, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { STATS_DATA } from '../data/gymData';

interface AboutSectionProps {
  onOpenJoin: () => void;
  onOpenTour: () => void;
}

// Animate count hook for smooth counter animation
const CounterItem: React.FC<{ target: number; suffix: string; label: string; description: string }> = ({
  target,
  suffix,
  label,
  description,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo
      const current = Math.round(target * (1 - Math.pow(2, -10 * progress)));
      setCount(current > target ? target : current);

      if (frame === totalFrames) {
        clearInterval(timer);
        setCount(target);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl shadow-black/50"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Syne',sans-serif] tracking-tight text-white flex items-baseline">
        <span className="bg-gradient-to-r from-white via-[#FFF8D6] to-[#D4AF37] bg-clip-text text-transparent group-hover:to-[#EF4444] transition-all duration-300">
          {count}
        </span>
        <span className="text-[#EF4444] ml-0.5">{suffix}</span>
      </div>
      <p className="mt-2 text-sm sm:text-base font-bold text-white uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xs text-neutral-400 font-light leading-relaxed">{description}</p>
    </div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenJoin, onOpenTour }) => {
  return (
    <section id="about" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#EF4444]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The KSG Legacy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white max-w-3xl">
            More Than A Gym. <br />
            <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              A Complete Transformation.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
            Founded with an uncompromising vision: to unite high-performance training, medical-grade recovery, and elite human coaching under one architectural masterpiece.
          </p>
        </div>

        {/* Dynamic Animated Stats Grid */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((stat, idx) => (
            <CounterItem
              key={idx}
              target={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>

        {/* Narrative & Visual Showcase Block */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Showcase with Metallic Overlays */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 p-2 bg-gradient-to-br from-white/10 via-black to-white/5 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=75&fm=webp"
                  alt="KSG Gym Main Arena"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Floating Member Transformation Quote Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">Verified Transformation</p>
                    <p className="text-sm font-semibold text-white">"From 32% body fat to competition lean in 9 months."</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-[#EF4444]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 px-5 py-3 rounded-2xl bg-[#0D0D0F] border border-[#D4AF37]/50 shadow-2xl items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Bio-Tracking</p>
                <p className="text-xs font-bold text-white">InBody 770 Scans</p>
              </div>
            </div>
          </div>

          {/* Pillars & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-wide text-white">
              Why Elite Athl<span className="text-[#D4AF37]">etes & Executives</span> Choose KSG
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              We eliminated the crowded waiting lines, outdated barbells, and generic training plans. At KSG Demo Gym, every workout is monitored with precise biomechanics, heart rate telemetry, and nutritional accountability.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Unrivaled Equipment Arsenal</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-normal">
                    Precision Panatta plate-loaded rigs, Eleiko competition barbells, and calibrated dumbbells up to 70kg.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Medical-Grade Recovery Spa</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-normal">
                    Infrared cedar sauna, 4°C cold plunge tubs, and Eucalyptus steam to supercharge muscle recovery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Zero-Compromise Cleanliness</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-normal">
                    Hospital-grade HEPA 14 air purifiers and hourly sanitization protocols throughout all 15,000 sq.ft.
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons inside About */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-join-cta-btn"
                onClick={onOpenJoin}
                className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Claim Membership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="about-virtual-tour-btn"
                onClick={onOpenTour}
                className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                View 3D Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
