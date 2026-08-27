import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle,
  Zap,
  Flame,
  CreditCard,
  SlidersHorizontal
} from 'lucide-react';
import { PricingPlan } from '../types';
import { leadStore } from '../services/leadStore';
import { soundManager } from './common/SoundEffects';

interface HomePricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenHelpMeChoose: () => void;
}

export const HomePricingSection: React.FC<HomePricingSectionProps> = ({
  onSelectPlan,
  onOpenHelpMeChoose,
}) => {
  const [plans] = useState<PricingPlan[]>(leadStore.getPlans());
  const [showComparison, setShowComparison] = useState(false);

  const comparisonRows: Array<{
    name: string;
    basic: string | boolean;
    premium: string | boolean;
    vip: string | boolean;
  }> = [
    { name: 'Gym Access & Panatta Equipment', basic: '24/7 Unlimited', premium: '24/7 Unlimited', vip: '24/7 + VIP Suite' },
    { name: 'Personal Training Sessions', basic: false, premium: '8 Sessions/Month', vip: 'Unlimited Dedicated' },
    { name: 'Diet & Macro Guidance', basic: false, premium: 'Custom Plan', vip: 'Bespoke Weekly Mapping' },
    { name: 'Fitness Assessment & Body Scans', basic: 'Initial Only', premium: 'Monthly InBody 770', vip: 'Bi-Weekly InBody 770' },
    { name: 'Progress Tracking & App Sync', basic: 'Basic', premium: 'Advanced Analytics', vip: 'Master Coach Log' },
    { name: 'Priority Support & Spa Access', basic: false, premium: 'Sauna & Steam', vip: '24/7 WhatsApp & Cryo Spa' },
  ];

  return (
    <section id="pricing-section" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-amber-500/5">
            <Crown className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            CHOOSE YOUR <span className="text-amber-400">LEVEL</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-2xl mx-auto">
            Transparent luxury tiers engineered for results. Zero hidden enrollment fees, flexible billing, and complete facility access.
          </p>

          {/* HELP ME CHOOSE BANNER BUTTON */}
          <div className="mt-8">
            <button
              id="home-help-me-choose-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenHelpMeChoose();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border-2 border-amber-500/60 text-amber-400 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:border-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>NOT SURE WHICH PLAN IS RIGHT FOR YOU? • HELP ME CHOOSE</span>
            </button>
          </div>
        </div>

        {/* 3 PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan: PricingPlan, idx: number) => {
            const isPopular = plan.isPopular;
            const isVip = plan.isVIP;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-zinc-900 border-2 border-amber-500 shadow-2xl shadow-amber-500/10 scale-105 z-10'
                    : isVip
                    ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-amber-400/40 shadow-xl'
                    : 'bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Popular or VIP Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest shadow-md">
                    MOST POPULAR
                  </div>
                )}
                {isVip && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] font-black uppercase tracking-widest shadow-md">
                    ELITE TIER
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{plan.name}</h3>
                    {isVip && <Crown className="w-5 h-5 text-amber-400" />}
                  </div>

                  <p className="text-xs text-zinc-400 mb-6">{plan.tagline}</p>

                  <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-amber-400">₹</span>
                      <span className="text-4xl font-black text-white tracking-tight font-mono">{plan.price.toLocaleString()}</span>
                      <span className="text-xs text-zinc-400">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Included Privileges:</span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join / Checkout Button */}
                <button
                  id={`home-plan-btn-${plan.id}`}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectPlan(plan);
                  }}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular || isVip
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  <span>{plan.ctaText || 'JOIN THIS PLAN'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* PLAN COMPARISON TOGGLE & TABLE */}
        <div className="max-w-4xl mx-auto text-center">
          <button
            id="toggle-plan-comparison-btn"
            onClick={() => {
              soundManager.playClick();
              setShowComparison(!showComparison);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>{showComparison ? 'HIDE COMPARISON TABLE' : 'COMPARE ALL PLAN PRIVILEGES'}</span>
          </button>

          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 text-left overflow-x-auto rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 sm:p-6"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-xs uppercase font-black tracking-wider text-zinc-400">
                    <th className="py-3 px-3 text-left">Privilege / Service</th>
                    <th className="py-3 px-3 text-center">BASIC (₹2,000)</th>
                    <th className="py-3 px-3 text-center text-amber-400 bg-amber-500/5 rounded-t-lg">PREMIUM (₹3,000)</th>
                    <th className="py-3 px-3 text-center text-yellow-400">VIP (₹5,000)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                  {comparisonRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-zinc-900/50">
                      <td className="py-3 px-3 font-medium text-zinc-200">{row.name}</td>
                      <td className="py-3 px-3 text-center text-zinc-400">
                        {row.basic === false ? <span className="text-zinc-600">—</span> : row.basic}
                      </td>
                      <td className="py-3 px-3 text-center bg-amber-500/5 font-semibold text-amber-300">
                        {row.premium === false ? <span className="text-zinc-600">—</span> : row.premium}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-yellow-400">
                        {row.vip === false ? <span className="text-zinc-600">—</span> : row.vip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
