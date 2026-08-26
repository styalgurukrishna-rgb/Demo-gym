import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/gymData';
import { TiltCard } from './common/TiltCard';
import { soundManager } from './common/SoundEffects';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>Transparent Investment In Yourself</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            MEMBERSHIP <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">TIERS</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Select the tier aligned with your ambition. No hidden initiation fees, cancel anytime flexibility, and complete access to excellence.
          </p>
        </div>

        {/* Pricing Cards Grid with 3D Tilt */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const isPopular = plan.isPopular;
            const isVIP = plan.isVIP;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="h-full"
              >
                <TiltCard
                  id={`pricing-card-${plan.id}`}
                  className={`h-full relative rounded-3xl flex flex-col justify-between transition-all duration-300 p-8 shadow-2xl ${
                    isPopular
                      ? 'bg-gradient-to-b from-[#1C1810] via-[#14120C] to-[#0D0D0D] border-2 border-[#D4AF37] shadow-[0_0_55px_rgba(212,175,55,0.3)] lg:-translate-y-4'
                      : isVIP
                      ? 'bg-gradient-to-b from-[#1E1113] via-[#150D0E] to-[#0D0D0D] border-2 border-[#EF4444]/70 shadow-[0_0_50px_rgba(239,68,68,0.25)]'
                      : 'bg-[#101013] border border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => onSelectPlan(plan)}
                >
                  {/* Rotating Shimmering Golden Border for Most Popular */}
                  {isPopular && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#D4AF37] via-transparent to-[#F59E0B] -z-10 opacity-70 blur-[2px]"
                    />
                  )}

                  {/* Popular / VIP Badges */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-[11px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>MOST POPULAR CHOICE</span>
                    </div>
                  )}

                  {isVIP && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-extrabold text-[11px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      <span>VIP ELITE CONCIERGE</span>
                    </div>
                  )}

                  <div>
                    {/* Plan Name & Tagline */}
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl font-black font-['Syne',sans-serif] uppercase tracking-wider ${
                          isPopular ? 'text-[#D4AF37]' : isVIP ? 'text-[#EF4444]' : 'text-white'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <span className="text-[11px] uppercase font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                        {plan.discountBadge}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 font-light mt-2 min-h-[32px]">
                      {plan.tagline}
                    </p>

                    {/* Price display */}
                    <div className="mt-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline">
                        <span className="text-2xl sm:text-3xl font-light text-neutral-300">₹</span>
                        <span className="text-4xl sm:text-5xl font-black font-['Syne',sans-serif] tracking-tight text-white ml-1">
                          {plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm font-semibold text-neutral-400 ml-2">{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">All equipment + showers + locker included</p>
                    </div>

                    {/* Features List */}
                    <div className="mt-6 space-y-3.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">What's Included:</p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div
                            className={`p-1 rounded-full mt-0.5 shrink-0 ${
                              isPopular
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                : isVIP
                                ? 'bg-[#EF4444]/20 text-[#EF4444]'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm text-neutral-300 font-normal leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA Button */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button
                      id={`pricing-btn-${plan.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        onSelectPlan(plan);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 group/btn ${
                        isPopular
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8012] text-black hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-[1.02]'
                          : isVIP
                          ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] hover:scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-center text-neutral-500 mt-2.5">
                      100% Satisfaction Guarantee • No Lock-In Contracts
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
