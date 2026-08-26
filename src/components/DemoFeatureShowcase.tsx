import React from 'react';
import { motion } from 'motion/react';
import { 
  CalendarCheck, 
  CreditCard, 
  UserCheck, 
  MessageCircle, 
  Smartphone, 
  Palette, 
  Star, 
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface DemoFeatureShowcaseProps {
  onOpenDemoInquiry?: () => void;
}

export const DemoFeatureShowcase: React.FC<DemoFeatureShowcaseProps> = ({ onOpenDemoInquiry }) => {
  const features = [
    {
      icon: CalendarCheck,
      title: 'ONLINE BOOKING',
      description: 'Zero-friction free trial and personal coach consultation scheduler with real-time calendar slots.',
      highlight: 'Instant Confirmation'
    },
    {
      icon: CreditCard,
      title: 'MEMBERSHIP PLANS',
      description: 'Crystal-clear transparent pricing matrix with automated tax invoice receipts and instant upgrades.',
      highlight: 'Flexible Tiers'
    },
    {
      icon: UserCheck,
      title: 'TRAINER PROFILES',
      description: 'Showcase certified master coaches, credentials, training styles, and client transformations.',
      highlight: 'Build Trust'
    },
    {
      icon: MessageCircle,
      title: 'WHATSAPP LEADS',
      description: 'Direct 1-click WhatsApp lead routing with pre-populated inquiry templates for instant response.',
      highlight: 'Highest Conversion'
    },
    {
      icon: Smartphone,
      title: 'MOBILE RESPONSIVE',
      description: 'App-like fluid mobile UI with bottom navigation bar, biometric pass, and touch-optimized controls.',
      highlight: '100% Mobile Fluid'
    },
    {
      icon: Palette,
      title: 'CUSTOM BRANDING',
      description: 'White-label customizer: effortlessly update colors, logos, copy, and address in real-time.',
      highlight: 'Your Identity'
    },
    {
      icon: Star,
      title: 'CUSTOMER REVIEWS',
      description: 'Verified member transformation stories, before/after metric logs, and 5-star social proof.',
      highlight: 'Social Proof'
    },
    {
      icon: ImageIcon,
      title: 'GYM GALLERY',
      description: 'High-res interactive facility showcase covering heavy iron, recovery saunas, and turf zones.',
      highlight: 'Visual Impact'
    }
  ];

  return (
    <section id="demo-feature-showcase-section" className="py-20 bg-zinc-950/80 relative border-t border-zinc-900 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Digital Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Everything Your Gym <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Needs Online</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Stop relying on generic social media pages. Provide athletes and prospects with a seamless, high-converting digital portal that scales your memberships.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                id={`feature-card-${idx}`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => soundManager.playHover()}
                className="p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 backdrop-blur-xl shadow-xl flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black group-hover:scale-110 transition-all duration-300 mb-5 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="text-amber-500/80 font-bold">{item.highlight}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        {onOpenDemoInquiry && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wide">
                  Ready to deploy this exact system for your gym?
                </h4>
                <p className="text-zinc-400 text-xs mt-0.5">
                  Launch in under 48 hours with full customization and dedicated onboarding.
                </p>
              </div>
            </div>
            <button
              id="feature-showcase-inquiry-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenDemoInquiry();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105 shrink-0"
            >
              REQUEST MY GYM WEBSITE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
