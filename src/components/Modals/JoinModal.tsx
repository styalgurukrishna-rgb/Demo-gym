import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, User, Phone, Mail, Target, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PricingPlan } from '../../types';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: PricingPlan | null;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fitnessGoal: 'Muscle Hypertrophy & Strength',
    preferredTime: 'Morning (06:00 AM - 10:00 AM)',
    plan: 'PREMIUM PLAN',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan.name }));
    }
  }, [selectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#EF4444', '#FFFFFF']
        });
      } catch (err) {
        // safe fallback
      }
    }, 500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

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
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#EF4444]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="join-modal-close-btn"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="text-left pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Official Membership Registration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                Join KSG DEMO GYM
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Fill in your details below. Our senior fitness consultant will craft your initial assessment.
              </p>
            </div>

            {/* Registration Form */}
            <form id="membership-registration-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    id="join-input-name"
                    placeholder="e.g. Vikram Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    id="join-input-phone"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    id="join-input-email"
                    placeholder="e.g. member@ksgfit.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Fitness Goal
                </label>
                <div className="relative">
                  <Target className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    id="join-select-goal"
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#17171B] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none"
                  >
                    <option value="Muscle Hypertrophy & Strength">Muscle Hypertrophy & Strength</option>
                    <option value="Rapid Fat Loss & Conditioning">Rapid Fat Loss & Conditioning</option>
                    <option value="Athletic VO2 Max & Endurance">Athletic VO2 Max & Endurance</option>
                    <option value="Posture, Spine & Mobility Restoration">Posture, Spine & Mobility Restoration</option>
                    <option value="Celebrity 1-on-1 Transformation">Celebrity 1-on-1 Transformation</option>
                  </select>
                </div>
              </div>

              {/* Preferred Training Time */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Preferred Training Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    id="join-select-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#17171B] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none"
                  >
                    <option value="Early Morning (05:30 AM - 08:00 AM)">Early Morning (05:30 AM - 08:00 AM)</option>
                    <option value="Morning (08:00 AM - 11:00 AM)">Morning (08:00 AM - 11:00 AM)</option>
                    <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                    <option value="Evening Peak (05:00 PM - 08:30 PM)">Evening Peak (05:00 PM - 08:30 PM)</option>
                    <option value="Late Night VIP (09:00 PM - 02:00 AM)">Late Night VIP (09:00 PM - 02:00 AM)</option>
                  </select>
                </div>
              </div>

              {/* Selected Plan Tag */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Selected Plan:</span>
                <span className="font-bold text-[#D4AF37]">{formData.plan}</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="join-form-submit-btn"
                className="w-full mt-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>PROCESSING MEMBERSHIP...</span>
                ) : (
                  <>
                    <span>CONFIRM & SUBMIT REGISTRATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Exact required success message */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              REGISTRATION RECEIVED
            </span>

            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white leading-tight">
              Thank You! Our fitness consultant will contact you shortly.
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-sm mx-auto leading-relaxed">
              We have dispatched your registration details for the <strong className="text-white">{formData.plan}</strong> to Coach Vikram & our concierge desk.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-400">
                <span>Member Name:</span>
                <span className="font-semibold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Contact Phone:</span>
                <span className="font-semibold text-white">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Time Slot:</span>
                <span className="font-semibold text-[#D4AF37]">{formData.preferredTime}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="join-success-close-btn"
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer"
              >
                Close & Return To Site
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
