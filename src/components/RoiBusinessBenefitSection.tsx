import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Search, 
  Dumbbell, 
  CreditCard, 
  Calendar, 
  MessageCircle, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface RoiBusinessBenefitSectionProps {
  onOpenBooking?: () => void;
  onOpenJoin?: () => void;
  onOpenDemoInquiry?: () => void;
}

export const RoiBusinessBenefitSection: React.FC<RoiBusinessBenefitSectionProps> = ({
  onOpenBooking,
  onOpenJoin,
  onOpenDemoInquiry
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Visitors Discover Gym',
      description: 'Local prospects search for top fitness studios in your city and land on your high-speed, SEO-optimized showcase.',
      icon: Search,
      metric: '+340% Higher Local Visibility'
    },
    {
      num: '02',
      title: 'Explore Programs & Coaches',
      description: 'Prospects review strength programs, certified trainers, and world-class equipment with cinematic photography.',
      icon: Dumbbell,
      metric: '3.8x Longer Engagement'
    },
    {
      num: '03',
      title: 'View Membership Plans',
      description: 'Transparent Basic, Premium, and VIP plans with feature breakdowns eliminate price hesitation before they visit.',
      icon: CreditCard,
      metric: 'Zero Hidden Pricing Doubts'
    },
    {
      num: '04',
      title: 'Book a Free Trial',
      description: 'Visitors pick a date and trainer slot in 20 seconds. Automated confirmation and QR pass issued instantly.',
      icon: Calendar,
      metric: '48% Trial-to-Member Conversion'
    },
    {
      num: '05',
      title: 'Instant WhatsApp Connect',
      description: '1-click WhatsApp buttons with pre-filled inquiries route hot leads straight into your sales team’s pocket.',
      icon: MessageCircle,
      metric: 'Under 2-Minute Response Time'
    },
    {
      num: '06',
      title: 'Gym Receives Qualified Lead',
      description: 'Lead appears instantly inside the Gym Owner Admin CRM ready for follow-up, onboarding, and payment.',
      icon: UserCheck,
      metric: '100% Lead Capture Record'
    }
  ];

  return (
    <section id="roi-business-benefit-section" className="py-20 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Business Conversion Funnel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Turn Your Website Into Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">24/7 Sales Assistant</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Every screen, CTA, and micro-interaction is engineered to turn casual passersby into loyal, paying members.
          </p>
        </div>

        {/* 6-Step Interactive Conversion Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <motion.div
                key={idx}
                id={`roi-step-card-${idx}`}
                whileHover={{ y: -4 }}
                onClick={() => {
                  soundManager.playClick();
                  setActiveStep(idx);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isCurrent 
                    ? 'bg-zinc-900 border-amber-500 shadow-2xl shadow-amber-500/10'
                    : 'bg-zinc-900/60 hover:bg-zinc-900/90 border-zinc-800'
                }`}
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-zinc-600 group-hover:text-amber-500 transition-colors">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-zinc-800 text-amber-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Metric Pill */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-400" />
                    {step.metric}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-zinc-600 hidden lg:block" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Business Outcome Stats Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">24/7</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Automated Lead Ingestion</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Captures night owls & early morning prospects</div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">+65%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Faster Lead Contact Rate</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Direct WhatsApp auto-population triggers</div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">₹0</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">Lost Inquiries</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Centralized CRM dashboard with status logs</div>
            </div>
          </div>

          {onOpenDemoInquiry && (
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide block">
                  Want this exact high-converting funnel for your gym brand?
                </span>
                <span className="text-[11px] text-zinc-500">
                  Customized with your gym's logo, colors, plans, trainers, and location.
                </span>
              </div>
              <button
                id="roi-section-request-website-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenDemoInquiry();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
              >
                REQUEST MY GYM WEBSITE
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
