import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, User, Phone, Target, CheckCircle2, Ticket, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FreeTrialSectionProps {
  onDirectPassCreated?: (guestData: any) => void;
}

export const FreeTrialSection: React.FC<FreeTrialSectionProps> = ({ onDirectPassCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: 'Weight Loss & Shred',
    preferredDate: new Date().toISOString().split('T')[0],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passCode, setPassCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const generatedCode = 'KSG-VIP-' + Math.floor(100000 + Math.random() * 900000);
    setPassCode(generatedCode);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#EF4444', '#FFFFFF']
      });
    } catch (err) {
      // safe fallback
    }

    if (onDirectPassCreated) {
      onDirectPassCreated({ ...formData, passCode: generatedCode });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      goal: 'Weight Loss & Shred',
      preferredDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <section id="trial" className="relative py-28 bg-[#0C0C0E] border-y border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-[#EF4444]/15 via-[#D4AF37]/15 to-[#EF4444]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] via-black/80 to-white/[0.02] border border-white/15 p-8 sm:p-12 md:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Top aesthetic corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/30 to-transparent pointer-events-none" />

          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left copy */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Complimentary 1-Day VIP Pass</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
                  Start Your <br />
                  <span className="bg-gradient-to-r from-white via-[#FFF6D4] to-[#D4AF37] bg-clip-text text-transparent">
                    Fitness Journey
                  </span> <br />
                  <span className="text-[#EF4444]">Today</span>
                </h2>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Experience all 15,000 sq.ft of luxury amenities, test our Panatta biomechanical equipment, and meet a senior fitness consultant with zero obligations.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Free InBody 770 composition scan included</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Complimentary post-workout recovery shake</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Full locker suite & infrared sauna access</span>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-6">
                <form
                  id="free-trial-form"
                  onSubmit={handleSubmit}
                  className="space-y-4 p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md shadow-xl"
                >
                  <h3 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <Ticket className="w-4 h-4 text-[#EF4444]" />
                    <span>Claim Your Instant Trial Pass</span>
                  </h3>

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
                        id="trial-input-name"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        id="trial-input-phone"
                        placeholder="e.g. +91 75499 29102"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Primary Fitness Goal
                    </label>
                    <div className="relative">
                      <Target className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        id="trial-select-goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141416] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none"
                      >
                        <option value="Weight Loss & Shred">Weight Loss & Fat Shred</option>
                        <option value="Hypertrophy & Muscle Gain">Hypertrophy & Muscle Gain</option>
                        <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                        <option value="Athletic Endurance & HIIT">Athletic Endurance & HIIT</option>
                        <option value="Joint Mobility & Posture">Joint Mobility & Posture</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Preferred Trial Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        id="trial-input-date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="free-trial-submit-btn"
                    className="w-full mt-2 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>BOOK FREE TRIAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-neutral-500">
                    Instant SMS / WhatsApp verification pass code provided.
                  </p>
                </form>
              </div>
            </div>
          ) : (
            /* Confirmation Pass View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                TRIAL BOOKING CONFIRMED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white mt-1">
                Welcome to KSG Demo Gym, {formData.name}!
              </h3>

              {/* Digital Pass Card */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#1C1810] to-[#0A0A0A] border border-[#D4AF37]/50 text-left shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-['Syne',sans-serif] font-black text-sm text-white">
                    KSG <span className="text-[#D4AF37]">VIP GUEST PASS</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-black uppercase tracking-wider">
                    VALID FOR 1 DAY
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-neutral-500 uppercase text-[10px] font-bold">Guest Name</p>
                    <p className="font-bold text-white mt-0.5">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 uppercase text-[10px] font-bold">Booking Date</p>
                    <p className="font-bold text-[#D4AF37] mt-0.5">{formData.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 uppercase text-[10px] font-bold">Target Goal</p>
                    <p className="font-medium text-neutral-300 mt-0.5">{formData.goal}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 uppercase text-[10px] font-bold">Access Pass Code</p>
                    <p className="font-mono font-black text-[#EF4444] mt-0.5 text-sm">{passCode}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Show this screen or code at reception</span>
                  <span className="text-emerald-400 font-medium">✓ Auto-Registered</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  id="trial-book-another-btn"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer"
                >
                  Book for a Friend
                </button>
                <a
                  href={`https://wa.me/917549929102?text=Hi%20KSG%20Gym%2C%20I%20have%20booked%20my%20free%20trial%20pass%20${passCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
