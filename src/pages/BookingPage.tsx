import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Target, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  Download,
  Flame,
  Dumbbell
} from 'lucide-react';
import { TRAINERS, GYM_INFO } from '../data/gymData';
import { PageType, ModalState, BookingItem } from '../types';
import { leadStore } from '../services/leadStore';

interface BookingPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    fitnessGoal: 'Muscle Gain & Hypertrophy',
    trainerName: 'Any Certified Master Coach',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: 'Morning (06:00 AM - 10:00 AM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingItem | null>(null);

  const goalOptions = [
    'Weight Loss & Fat Shred',
    'Muscle Gain & Hypertrophy',
    'Bodybuilding & Symmetry',
    'General Fitness & Stamina',
    'Strength & Powerlifting',
    'Mobility & Pain Rehab'
  ];

  const timeSlots = [
    'Early Bird (05:30 AM - 07:30 AM)',
    'Morning (07:30 AM - 10:00 AM)',
    'Afternoon (12:00 PM - 04:00 PM)',
    'Evening Peak (05:00 PM - 08:30 PM)',
    'Night Owl (08:30 PM - 11:00 PM)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Please fill in your name, mobile number, and email.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = leadStore.addBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        fitnessGoal: formData.fitnessGoal,
        trainerName: formData.trainerName,
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: `Age: ${formData.age || 'N/A'}. Notes: ${formData.notes || 'None'}`
      });

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }, 600);
  };

  const handleWhatsAppConfirm = () => {
    if (!confirmedBooking) return;
    const msg = `Hi KSG DEMO GYM, I have booked a Free 1-Day VIP Pass!\nBooking ID: ${confirmedBooking.id}\nName: ${confirmedBooking.name}\nDate: ${confirmedBooking.date}\nTime: ${confirmedBooking.timeSlot}\nGoal: ${confirmedBooking.fitnessGoal}`;
    window.open(`https://wa.me/${GYM_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" /> 100% Free VIP 1-Day Experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            BOOK YOUR <span className="text-amber-400">FREE TRIAL</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto mt-3 font-light">
            Receive full gym floor access, an InBody 770 biometric scan, and a 1-on-1 coach assessment.
          </p>
        </div>
      </section>

      {/* 2. BOOKING FORM OR CONFIRMATION SCREEN */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {!confirmedBooking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 sm:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="rahul.sharma@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Age (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Fitness Goal Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Primary Fitness Goal *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {goalOptions.map((goal) => (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => setFormData({ ...formData, fitnessGoal: goal })}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                        formData.fitnessGoal === goal
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trainer Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Preferred Trainer
                </label>
                <select
                  value={formData.trainerName}
                  onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Any Certified Master Coach">Any Available Master Coach</option>
                  {TRAINERS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.specialization})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes / Injuries */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Special Notes or Previous Injuries (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Mild lower back tightness, beginner looking for squat form breakdown."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="confirm-booking-btn"
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>GENERATING PASS...</span>
                ) : (
                  <>
                    <span>CONFIRM FREE TRIAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero payment required • Instant WhatsApp & SMS confirmation pass</span>
              </div>
            </form>
          </motion.div>
        ) : (
          /* 3. CONFIRMATION TICKET PASS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-zinc-900 border-2 border-amber-500/80 p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-wider">
              Booking Confirmed
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-3">
              You're Booked, {confirmedBooking.name}!
            </h2>
            <p className="text-zinc-300 text-sm max-w-md mx-auto mt-2">
              Your Free 1-Day VIP Pass is confirmed. Present your Pass ID or QR code at reception.
            </p>

            {/* Pass Ticket Box */}
            <div className="my-8 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto text-left shadow-inner">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Pass Number</div>
                  <div className="text-sm font-black text-amber-400 font-mono">{confirmedBooking.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Pass Type</div>
                  <div className="text-xs font-bold text-white uppercase">1-Day VIP Access</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Assigned Trainer</span>
                  <span className="font-bold text-zinc-200">{confirmedBooking.trainerName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Date & Time</span>
                  <span className="font-bold text-amber-400">{confirmedBooking.date}</span>
                  <div className="text-[11px] text-zinc-400">{confirmedBooking.timeSlot}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="text-xs text-zinc-400 font-mono">
                  Location: {GYM_INFO.address.split(',')[0]}
                </div>
                <QrCode className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>OPEN IN WHATSAPP</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default BookingPage;
