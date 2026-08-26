import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Phone, Mail, User, CheckCircle2, MessageCircle, ArrowRight, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';
import { GYM_INFO } from '../../data/gymData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Personal Training & Transformation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    soundManager.playClick();
    setIsSubmitting(true);

    leadStore.addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'expert@lead.com',
      goal: formData.topic,
      type: 'consultation',
      status: 'New',
      notes: `Consultation request on ${formData.topic}. Notes: ${formData.message || 'None'}`
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#EF4444', '#10B981']
        });
      } catch (err) {}
    }, 500);
  };

  const handleClose = () => {
    setIsDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#101014] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="consultation-modal-close-btn"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <div>
            <div className="text-left pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-on-1 Fitness Advisory</span>
              </div>
              <h3 className="text-2xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                TALK TO A <span className="text-[#D4AF37]">FITNESS EXPERT</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Have specific injuries, competition goals, or dietary requirements? Speak directly with our Head Transformation Coach.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Menon"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#EF4444]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="anand@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Discussion Topic / Focus</span>
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                >
                  <option value="Personal Training & Transformation">Personal Training & Transformation</option>
                  <option value="Injury Rehab & Mobility">Injury Rehab & Mobility Specialist</option>
                  <option value="Sports Performance & Powerlifting">Sports Performance & Powerlifting</option>
                  <option value="Custom Diet & Macro Protocol">Custom Diet & Macro Protocol</option>
                  <option value="Corporate Membership Inquiry">Corporate / Group Membership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Any Specific Question or Goal? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. I want to prepare for a marathon / drop 10kg body fat."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#AA8012] text-black shadow-lg hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>REQUEST CALL BACK</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg mb-4"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <h3 className="text-2xl font-black font-['Syne',sans-serif] text-white">
              Consultation Request Received!
            </h3>
            <p className="text-xs text-neutral-300 mt-2">
              Our Master Coach will call you at <strong className="text-white">{formData.phone}</strong> within 15 minutes.
            </p>

            <div className="mt-6">
              <a
                href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hi%20KSG%20DEMO%20GYM%2C%20I%20just%20requested%20a%20consultation%20for%20${encodeURIComponent(formData.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
