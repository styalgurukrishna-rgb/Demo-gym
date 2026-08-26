import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Trophy, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData';
import { soundManager } from './common/SoundEffects';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="reviews"
      className="relative py-28 bg-[#080808] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Real Members. Undeniable Results.</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            TRANSFORMATION <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">STORIES</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Read authentic reviews from members who unlocked their peak physical and mental potential at KSG Demo Gym.
          </p>
        </div>

        {/* Carousel Slider Card */}
        <div className="mt-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] via-[#101014] to-[#0A0A0C] border border-white/15 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Background watermark quote */}
              <Quote className="w-20 h-20 text-[#D4AF37]/10 absolute top-6 right-6 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                {/* Member Avatar */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-br from-[#EF4444] to-[#D4AF37] shadow-xl">
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#EF4444] text-[9px] font-black uppercase text-white tracking-wider shadow">
                    VERIFIED
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center sm:text-left">
                  {/* Glowing Animated Star Rating */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[#FDE047] mb-3">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                      >
                        <Star className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]" />
                      </motion.div>
                    ))}
                    <span className="text-xs font-bold text-white ml-2">5.0 / 5.0 Rating</span>
                  </div>

                  {/* Transformation Highlight Badge */}
                  <div className="inline-block px-3.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
                    {activeTestimonial.transformation}
                  </div>

                  {/* Quote */}
                  <p className="text-base sm:text-lg text-neutral-200 font-light italic leading-relaxed">
                    "{activeTestimonial.quote}"
                  </p>

                  {/* Name & Details */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black font-['Syne',sans-serif] uppercase tracking-wide text-white">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-xs text-neutral-400">{activeTestimonial.role}</p>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">
                      {activeTestimonial.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Arrows & Dots */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  id={`testimonial-dot-${dotIdx}`}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? 'w-8 bg-gradient-to-r from-[#EF4444] to-[#D4AF37]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                id="testimonial-prev-btn"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="testimonial-next-btn"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
