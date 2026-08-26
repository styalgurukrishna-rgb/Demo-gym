import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  TrendingUp, 
  Smartphone, 
  CreditCard, 
  Bot, 
  Calculator, 
  Users, 
  ShieldCheck, 
  MessageCircle, 
  Flame,
  ArrowRight,
  Database
} from 'lucide-react';
import { soundManager } from '../common/SoundEffects';

interface DemoHighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
  onOpenTrial: () => void;
}

export const DemoHighlightsModal: React.FC<DemoHighlightsModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  onOpenTrial,
}) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: TrendingUp,
      title: 'High-Conversion Lead Capture',
      desc: 'Free trial forms, exit-intent popups, program-specific CTAs, and countdown urgency banners maximize membership inquiries.',
      tag: 'Leads & Growth',
    },
    {
      icon: Database,
      title: 'Gym Owner CRM & Pipeline Management',
      desc: 'Built-in real-time admin portal to manage leads, track conversions, trigger 1-click WhatsApp follow-ups, and export data.',
      tag: 'Admin & Operations',
      actionText: 'Open Live CRM Demo',
      action: onOpenAdmin,
    },
    {
      icon: CreditCard,
      title: 'Tiered Membership & Instant Checkout',
      desc: 'Full checkout modal with UPI QR codes, Credit Card emulation, GST invoice breakdowns, and digital receipts.',
      tag: 'Revenue Engine',
    },
    {
      icon: Bot,
      title: 'Interactive AI Sports Science Coach',
      desc: '24/7 smart assistant providing instant fat loss, hypertrophy, diet, and equipment guidance with conversion triggers.',
      tag: 'AI Feature',
    },
    {
      icon: Calculator,
      title: 'Biometric & Macro Calorie Engine',
      desc: 'Calculates exact BMI, TDEE, caloric targets, water, and macro grams with direct program matching.',
      tag: 'Interactive Tool',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Automation',
      desc: 'Instant pre-filled WhatsApp chat triggers across all key touchpoints for direct mobile conversion.',
      tag: 'Mobile Direct',
    },
    {
      icon: Users,
      title: 'Member Portal with Biometric QR Check-In',
      desc: 'Authenticated member dashboard with scan-ready QR code, workout splits, coach notes, and body stats.',
      tag: 'Retention',
    },
    {
      icon: Smartphone,
      title: '100% Native Mobile App Experience',
      desc: 'Sticky app-style bottom navigation bar, touch-friendly comparison sliders, and ultra-fast loading.',
      tag: 'Mobile First',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#101017] border border-[#D4AF37]/50 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#181210] via-[#121218] to-[#101018] border-b border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gym Owner Presentation Mode</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] text-white">
                WHY THIS PLATFORM SELLS GYM MEMBERSHIPS
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Overview of commercial-grade features engineered to maximize client acquisition, retention, and branding.
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center text-[#D4AF37]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase text-neutral-300">
                          {feat.tag}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-white font-['Syne',sans-serif] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat.title}</span>
                      </h4>

                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>

                    {feat.action && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onClose();
                          feat.action!();
                        }}
                        className="text-xs font-bold text-[#D4AF37] hover:text-[#FFF4B8] flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>{feat.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[#0B0B10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ready for production deployment & custom gym branding</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                OPEN CRM PORTAL
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onOpenTrial();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer"
              >
                TEST FREE TRIAL FLOW
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
