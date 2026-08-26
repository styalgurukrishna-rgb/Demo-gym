import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { FAQS, GYM_INFO } from '../data/gymData';
import { soundManager } from './common/SoundEffects';

interface FaqSectionProps {
  onOpenTrial: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenTrial }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    soundManager.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#0A0A0D] overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
            FREQUENTLY ASKED <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">QUESTIONS</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 font-light">
            Everything you need to know about memberships, coaching, nutrition, and our state-of-the-art facility.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#14141A] border-[#D4AF37]/40 shadow-lg shadow-black/60'
                    : 'bg-[#101014] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-['Syne',sans-serif]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#D4AF37] text-black rotate-180'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#181410] to-[#121014] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-black text-white">Still have questions or need custom arrangements?</h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Our fitness concierge team is available 24/7 on WhatsApp for immediate support.
            </p>
          </div>

          <a
            id="faq-whatsapp-btn"
            href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hello%20KSG%20DEMO%20GYM%2C%20I%20have%20a%20question%20about%20your%20facility.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
