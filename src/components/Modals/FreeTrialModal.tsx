import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Calendar, Clock, Target, User, Phone, Mail, CheckCircle2, ShieldCheck, ArrowRight, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';
import { GYM_INFO, AUTOMATED_FOLLOWUPS } from '../../data/gymData';
import { downloadIcsFile } from '../../utils/calendarIcs';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToJoin?: () => void;
}

const FITNESS_GOALS = [
  'Weight Loss',
  'Muscle Gain',
  'Bodybuilding',
  'General Fitness',
  'Strength Training'
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '06:00 AM - 10:00 AM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 04:00 PM' },
  { id: 'evening', label: 'Evening', time: '05:00 PM - 09:30 PM' },
];

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose, onProceedToJoin }) => {
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    fitnessGoal: 'Muscle Gain',
    preferredTime: 'Morning',
    preferredDate: tomorrowStr,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookedPassId, setBookedPassId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    soundManager.playClick();
    setIsSubmitting(true);

    const generatedPass = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookedPassId(generatedPass);

    // Save lead in CRM
    leadStore.addLead({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email || 'guest@lead.com',
      age: formData.age || 25,
      goal: formData.fitnessGoal,
      preferredTime: formData.preferredTime,
      preferredDate: formData.preferredDate,
      type: 'trial',
      status: 'Trial Scheduled',
      notes: `Free 1-Day Trial Pass generated (#${generatedPass}). Preferred slot: ${formData.preferredDate} (${formData.preferredTime}). Goal: ${formData.fitnessGoal}.`
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#EF4444', '#10B981']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const handleClose = () => {
    setIsBooked(false);
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
        className="relative w-full max-w-xl rounded-3xl bg-[#101014] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
      >
        {/* Glowing Background Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EF4444]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="free-trial-modal-close-btn"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            {/* Header */}
            <div className="text-left pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free • No Credit Card Required</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                BOOK YOUR <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">FREE 1-DAY PASS</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                Experience our Panatta equipment, luxury sauna suites, and a 1-on-1 coach assessment on us.
              </p>
            </div>

            {/* Trial Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="trial-form-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    id="trial-form-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#EF4444] transition-colors"
                  />
                </div>
              </div>

              {/* Email & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    id="trial-form-email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Age
                  </label>
                  <input
                    id="trial-form-age"
                    type="number"
                    min="15"
                    max="80"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Fitness Goal Options */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>Your Fitness Goal</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FITNESS_GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setFormData({ ...formData, fitnessGoal: goal })}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                        formData.fitnessGoal === goal
                          ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] shadow-sm'
                          : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Time & Date Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Preferred Time</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot.label })}
                        className={`py-2 px-1 text-[11px] rounded-lg font-semibold text-center transition-all ${
                          formData.preferredTime === slot.label
                            ? 'bg-[#EF4444] text-white'
                            : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    id="trial-form-date"
                    type="date"
                    min={tomorrowStr}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#EF4444]"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Instant Confirmation • Locker & Towel Provided • Zero Obligation</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="confirm-free-trial-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>CONFIRM FREE TRIAL</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
              Your Free Trial Has Been <span className="text-emerald-400">Booked Successfully!</span>
            </h3>

            <p className="text-sm font-semibold text-[#D4AF37] mt-2">
              Fitness Expert Will Contact You Soon.
            </p>

            <p className="text-xs text-neutral-300 mt-1">
              We have reserved your slot for <strong>{formData.preferredDate} ({formData.preferredTime})</strong>.
            </p>

            {/* Digital VIP Pass Card */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#1C1810] via-[#121216] to-[#0D0D10] border-2 border-[#D4AF37]/60 text-left shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    KSG DEMO GYM VIP PASS
                  </span>
                  <h4 className="text-base font-black text-white">{formData.fullName}</h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-mono text-xs font-bold">
                  {bookedPassId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-neutral-300">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Goal</span>
                  <span className="font-semibold text-white">{formData.fitnessGoal}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Time Slot</span>
                  <span className="font-semibold text-white">{formData.preferredTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VIP Guest Access Active
                </span>
                <span className="font-mono text-neutral-500">Show at Reception</span>
              </div>
            </div>

            {/* Automated Sequence Preview */}
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#D4AF37] mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Automated Follow-Up Triggered</span>
              </div>
              <p className="text-[11px] text-neutral-300 italic">
                "{AUTOMATED_FOLLOWUPS[0].message.replace('{name}', formData.fullName).replace('{planOrGoal}', formData.fitnessGoal)}"
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                id="trial-download-ics-btn"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  downloadIcsFile({
                    title: `KSG DEMO GYM - Free 1-Day Trial Pass`,
                    description: `VIP Trial Session for ${formData.fullName}. Preferred slot: ${formData.preferredDate} (${formData.preferredTime}). Goal: ${formData.fitnessGoal}. Pass ID: ${bookedPassId}. Location: ${GYM_INFO.address}.`,
                    location: GYM_INFO.address,
                    startDate: formData.preferredDate,
                    timeSlot: formData.preferredTime,
                    bookingRef: bookedPassId,
                    organizerName: 'KSG DEMO GYM'
                  });
                }}
                className="flex-1 py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Add to Calendar (.ics)</span>
              </button>

              <a
                id="trial-whatsapp-confirm-btn"
                href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hi%20KSG%20DEMO%20GYM%2C%20I%20just%20booked%20my%20Free%201-Day%20Trial%20Pass%20(${bookedPassId})%20for%20${formData.fullName}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp</span>
              </a>

              {onProceedToJoin && (
                <button
                  id="trial-upgrade-join-btn"
                  onClick={() => {
                    handleClose();
                    onProceedToJoin();
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg border border-zinc-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Membership</span>
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
