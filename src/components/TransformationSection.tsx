import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Flame, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface TransformationSectionProps {
  onOpenConsultation: () => void;
  onOpenTrial: () => void;
}

const TRANSFORMATIONS = [
  {
    id: 'trans-1',
    name: 'Kabir Oberoi',
    age: 31,
    profession: 'Software Architect',
    program: '12-Week Hypertrophy & Fat Loss Split',
    coach: 'Vikram Singhania',
    beforeWeight: '94 kg',
    afterWeight: '79 kg',
    bodyFatBefore: '27.5%',
    bodyFatAfter: '11.2%',
    timeframe: '12 Weeks',
    quote: 'The structured Panatta biomechanics and custom macro nutrition plan transformed my body and focus in just 90 days.',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-2',
    name: 'Ananya Deshmukh',
    age: 27,
    profession: 'Creative Director',
    program: 'HIIT Strength & Glute Sculpt Protocol',
    coach: 'Maya Sen',
    beforeWeight: '68 kg',
    afterWeight: '58 kg',
    bodyFatBefore: '29.0%',
    bodyFatAfter: '16.5%',
    timeframe: '16 Weeks',
    quote: 'Never thought I could deadlift heavy without back pain. The coaches at KSG corrected my posture from Day 1.',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-3',
    name: 'Rohan Mehra',
    age: 36,
    profession: 'Investment Banker',
    program: 'VIP Elite 1-on-1 Recomposition',
    coach: 'Marcus Stone',
    beforeWeight: '88 kg',
    afterWeight: '82 kg',
    bodyFatBefore: '23.0%',
    bodyFatAfter: '10.8%',
    timeframe: '14 Weeks',
    quote: 'The VIP Concierge service fits my hectic schedule. I train at 6 AM, hit the sauna, and arrive at work charged.',
    beforeImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
  }
];

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  onOpenConsultation,
  onOpenTrial,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const current = TRANSFORMATIONS[currentIndex];

  const handleNext = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % TRANSFORMATIONS.length);
    setSliderPosition(50);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + TRANSFORMATIONS.length) % TRANSFORMATIONS.length);
    setSliderPosition(50);
  };

  return (
    <section id="transformations" className="relative py-24 bg-[#0B0B0E] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EF4444]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Transformation Protocols</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
            REAL PEOPLE. <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">REAL RESULTS.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light">
            Slide horizontally to view our members' before and after physique recomposition powered by scientific progression.
          </p>
        </div>

        {/* Transformation Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* Interactive Before/After Visual Slider (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                if (!e.touches[0]) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
            >
              {/* After Image (Background) */}
              <img
                src={current.afterImage}
                alt={`${current.name} After Transformation`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-lg">
                AFTER ({current.timeframe})
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={current.beforeImage}
                  alt={`${current.name} Before Transformation`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-neutral-300 text-xs font-black uppercase tracking-wider border border-white/20 shadow-lg">
                  BEFORE
                </div>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EF4444] via-[#D4AF37] to-[#EF4444] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-[#D4AF37]">
                  <div className="flex items-center text-[10px] font-black">
                    ◀▶
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-neutral-400">
                Drag slider or hover over image to compare
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                  title="Previous Transformation"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono font-bold text-neutral-300">
                  0{currentIndex + 1} / 0{TRANSFORMATIONS.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                  title="Next Transformation"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Transformation Details & Metrics (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Coach {current.coach}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] text-white">
                {current.name}, {current.age}
              </h3>
              <p className="text-xs text-neutral-400">{current.profession} • {current.program}</p>
            </div>

            {/* Before vs After Metric Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Body Weight</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-neutral-500">{current.beforeWeight}</span>
                  <span className="text-lg font-black text-emerald-400">{current.afterWeight}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Body Fat %</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-neutral-500">{current.bodyFatBefore}</span>
                  <span className="text-lg font-black text-[#D4AF37]">{current.bodyFatAfter}</span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
              "{current.quote}"
            </blockquote>

            {/* Call to Action Button */}
            <div className="pt-2">
              <button
                id="start-transformation-cta-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenTrial();
                }}
                className="w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/60 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>START YOUR TRANSFORMATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
