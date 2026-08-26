import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  HelpCircle,
  CreditCard,
  QrCode
} from 'lucide-react';
import { PRICING_PLANS, FAQS } from '../data/gymData';
import { PageType, ModalState, PricingPlan } from '../types';

interface PricingPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenModal }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const discountMultiplier = billingCycle === 'annual' ? 0.75 : billingCycle === 'quarterly' ? 0.88 : 1;

  const comparisonFeatures = [
    { name: "24/7 Gym Floor & Panatta Equipment", basic: true, premium: true, vip: true },
    { name: "Biometric RFID Keyless Entry", basic: true, premium: true, vip: true },
    { name: "Marble Locker Rooms & Rain Showers", basic: true, premium: true, vip: true },
    { name: "Dedicated 1-on-1 Personal Trainer", basic: false, premium: "8 Sessions/Mo", vip: "Unlimited Dedicated" },
    { name: "Custom Macro Nutrition & Meal Plan", basic: false, premium: true, vip: true },
    { name: "InBody 770 Clinical Body Scans", basic: false, premium: "Monthly", vip: "Bi-Weekly" },
    { name: "Infrared Sauna & Cold Plunge Spa", basic: false, premium: true, vip: "Unlimited Priority" },
    { name: "All HIIT & Group Conditioning Classes", basic: false, premium: true, vip: true },
    { name: "24/7 Direct WhatsApp Coach Concierge", basic: false, premium: false, vip: true },
    { name: "VIP Private Lifting Suite Access", basic: false, premium: false, vip: true },
    { name: "Complimentary Daily Fuel Bar Shakes", basic: false, premium: false, vip: true },
    { name: "Free Monthly VIP Guest Passes", basic: false, premium: false, vip: "2 Passes/Mo" }
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Crown className="w-4 h-4" /> Transparent Luxury Pricing
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            MEMBERSHIP <span className="text-amber-400">PLANS</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Invest in your health with transparent tiers, zero hidden sign-up fees, and complete facility access.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 mt-10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-black shadow-md font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-amber-500 text-black shadow-md font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-extrabold">Save 12%</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-amber-500 text-black shadow-md font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500 text-black font-extrabold">Save 25%</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan: PricingPlan, idx: number) => {
            const calculatedPrice = Math.round(plan.price * discountMultiplier);
            const isHighlight = plan.isPopular || plan.isVIP;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-zinc-900 border-2 border-amber-500 shadow-2xl shadow-amber-500/10 scale-105 z-10'
                    : plan.isVIP
                    ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-amber-400/40 shadow-2xl'
                    : 'bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Popular or VIP Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest shadow-md">
                    MOST POPULAR
                  </div>
                )}
                {plan.isVIP && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] font-black uppercase tracking-widest shadow-md">
                    ELITE TIER
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{plan.name}</h3>
                    {plan.isVIP && <Crown className="w-5 h-5 text-amber-400" />}
                  </div>

                  <p className="text-xs text-zinc-400 mb-6">{plan.tagline}</p>

                  <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-amber-400">₹</span>
                      <span className="text-4xl font-black text-white tracking-tight font-mono">{calculatedPrice.toLocaleString()}</span>
                      <span className="text-xs text-zinc-400">{plan.period}</span>
                    </div>
                    {billingCycle !== 'monthly' && (
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                        Billed {billingCycle} • Cancel anytime
                      </div>
                    )}
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

                {/* Checkout Trigger Button */}
                <button
                  id={`pricing-plan-btn-${plan.id}`}
                  onClick={() => onOpenModal('payment', { plan, finalPrice: calculatedPrice, billingCycle })}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                    plan.isPopular || plan.isVIP
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPARISON MATRIX TABLE */}
      <section className="py-20 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Feature Breakdown</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
              Compare Plan <span className="text-amber-400">Privileges</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-xs uppercase font-black tracking-wider text-zinc-400">
                  <th className="py-4 px-4">Privilege / Service</th>
                  <th className="py-4 px-4 text-center">BASIC (₹2,000)</th>
                  <th className="py-4 px-4 text-center text-amber-400 bg-amber-500/5 rounded-t-xl">PREMIUM (₹3,000)</th>
                  <th className="py-4 px-4 text-center text-yellow-400">VIP (₹5,000)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                {comparisonFeatures.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-zinc-200">{row.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-zinc-600">—</span>
                      ) : (
                        <span className="font-bold text-zinc-300">{row.basic}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center bg-amber-500/5 font-semibold text-amber-300">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto" /> : <span className="text-zinc-600">—</span>
                      ) : (
                        <span className="font-bold text-amber-400">{row.premium}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-yellow-400">
                      {typeof row.vip === 'boolean' ? (
                        row.vip ? <CheckCircle2 className="w-4 h-4 text-yellow-400 mx-auto" /> : <span className="text-zinc-600">—</span>
                      ) : (
                        <span>{row.vip}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. PRICING FAQS */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-widest text-amber-500 uppercase">Clarifications</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 5).map((faq, fIdx) => (
            <div key={fIdx} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
