import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Target, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Share2, 
  Download,
  Flame,
  Dumbbell,
  Award,
  Check,
  CalendarCheck,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import { TRAINERS, GYM_INFO } from '../data/gymData';
import { PageType, ModalState, BookingItem } from '../types';
import { leadStore } from '../services/leadStore';
import { soundManager } from '../components/common/SoundEffects';
import { downloadIcsFile } from '../utils/calendarIcs';

interface BookingPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal?: (type: ModalState['type'], data?: any) => void;
  initialTrainer?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate, initialTrainer }) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    fitnessGoal: 'Muscle Gain & Hypertrophy',
    trainerName: initialTrainer || 'Any Available Master Coach',
    date: tomorrow,
    timeSlot: 'Morning (07:30 AM - 10:00 AM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const goalOptions = [
    { title: 'Weight Loss & Fat Shred', desc: 'Caloric burn, metabolic conditioning & diet tracking' },
    { title: 'Muscle Gain & Hypertrophy', desc: 'Targeted muscle hypertrophy & structured splits' },
    { title: 'Strength & Powerlifting', desc: 'Compound lifts, barbell technique & PR progression' },
    { title: 'General Fitness & Stamina', desc: 'Functional movement, longevity & energy boost' },
    { title: 'Athletic Performance & Speed', desc: 'Agility, plyometrics & athletic conditioning' },
  ];

  const timeSlots = [
    { label: 'Early Bird', time: '05:30 AM - 07:30 AM', category: 'Morning' },
    { label: 'Morning Peak', time: '07:30 AM - 10:00 AM', category: 'Morning' },
    { label: 'Afternoon Focus', time: '12:00 PM - 04:00 PM', category: 'Afternoon' },
    { label: 'Evening Prime', time: '05:00 PM - 08:30 PM', category: 'Evening' },
    { label: 'Night Owl', time: '08:30 PM - 10:30 PM', category: 'Evening' }
  ];

  const stepsList = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Fitness Goal' },
    { number: 3, title: 'Trainer' },
    { number: 4, title: 'Date' },
    { number: 5, title: 'Time' },
    { number: 6, title: 'Review & Confirm' },
  ];

  // Validation logic per step
  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name.trim().length >= 2 && formData.phone.trim().length >= 7 && formData.email.includes('@');
    }
    if (currentStep === 2) return Boolean(formData.fitnessGoal);
    if (currentStep === 3) return Boolean(formData.trainerName);
    if (currentStep === 4) return Boolean(formData.date);
    if (currentStep === 5) return Boolean(formData.timeSlot);
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      alert('Please complete the required fields in this step to continue.');
      return;
    }
    soundManager.playClick();
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    soundManager.playClick();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Please fill in your name, mobile number, and email.');
      return;
    }

    soundManager.playClick();
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
        notes: `Age: ${formData.age || 'N/A'}. Details: ${formData.notes || 'None'}`
      });

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#FFFFFF']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    downloadIcsFile({
      title: `KSG DEMO GYM - VIP Trial Session (${confirmedBooking.fitnessGoal})`,
      description: `Free 1-Day Trial with coach ${confirmedBooking.trainerName}. Location: ${GYM_INFO.address}. Bring gym attire and your booking reference.`,
      location: GYM_INFO.address,
      startDate: confirmedBooking.date,
      timeSlot: confirmedBooking.timeSlot,
      bookingRef: confirmedBooking.id,
      organizerName: 'KSG DEMO GYM Concierge'
    });
  };

  const handleWhatsAppConfirm = () => {
    if (!confirmedBooking) return;
    const msg = `Hi KSG DEMO GYM, I have booked a Free 1-Day VIP Trial!\nBooking ID: ${confirmedBooking.id}\nName: ${confirmedBooking.name}\nDate: ${confirmedBooking.date}\nTime: ${confirmedBooking.timeSlot}\nTrainer: ${confirmedBooking.trainerName}\nGoal: ${confirmedBooking.fitnessGoal}`;
    window.open(`https://wa.me/${GYM_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      fitnessGoal: 'Muscle Gain & Hypertrophy',
      trainerName: 'Any Available Master Coach',
      date: tomorrow,
      timeSlot: 'Morning (07:30 AM - 10:00 AM)',
      notes: '',
    });
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

      {/* 2. 6-STEP BOOKING FLOW OR CONFIRMATION SCREEN */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {!confirmedBooking ? (
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl">
            
            {/* STEP PROGRESS INDICATOR */}
            <div className="mb-10">
              <div className="flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500" 
                  style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
                />

                {stepsList.map((step) => {
                  const isCompleted = currentStep > step.number;
                  const isCurrent = currentStep === step.number;

                  return (
                    <div key={step.number} className="relative z-10 flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (step.number < currentStep) {
                            soundManager.playClick();
                            setCurrentStep(step.number);
                          }
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                            : isCurrent
                            ? 'bg-amber-500 text-black ring-4 ring-amber-500/20 shadow-lg shadow-amber-500/30'
                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                      </button>
                      <span className={`text-[10px] uppercase font-bold tracking-wider mt-2 hidden sm:block ${
                        isCurrent ? 'text-amber-400 font-black' : isCompleted ? 'text-emerald-400' : 'text-zinc-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: PERSONAL INFORMATION */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 1: Your Contact Information
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    We will send your trial pass confirmation and access pass via SMS/WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                      <input
                        id="booking-name-input"
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      WhatsApp / Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                      <input
                        id="booking-phone-input"
                        type="tel"
                        required
                        placeholder="+91 75499 29102"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
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
                        id="booking-email-input"
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Age (Optional)
                    </label>
                    <input
                      id="booking-age-input"
                      type="number"
                      placeholder="e.g. 28"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Next: Fitness Goal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: FITNESS GOAL */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 2: Choose Your Primary Focus
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Your trial coach will tailor your 1-on-1 assessment to this objective.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goalOptions.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setFormData({ ...formData, fitnessGoal: item.title });
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.fitnessGoal === item.title
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase">{item.title}</span>
                        {formData.fitnessGoal === item.title && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-zinc-400">{item.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Next: Select Trainer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: TRAINER SELECTION */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 3: Select Your Master Coach
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Choose a specialized trainer or let us match the best coach for your goal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Any Available Coach Option */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setFormData({ ...formData, trainerName: 'Any Available Master Coach' });
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      formData.trainerName === 'Any Available Master Coach'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-sm uppercase">Any Available Master Coach</span>
                      {formData.trainerName === 'Any Available Master Coach' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-xs text-zinc-400">Match based on best availability for your requested time slot.</p>
                  </button>

                  {/* Registered Trainers */}
                  {TRAINERS.slice(0, 5).map((trainer) => (
                    <button
                      key={trainer.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setFormData({ ...formData, trainerName: trainer.name });
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.trainerName === trainer.name
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase">{trainer.name}</span>
                        {formData.trainerName === trainer.name && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-amber-400 font-semibold">{trainer.role}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{trainer.specialization}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Next: Choose Date</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DATE PICKER */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 4: Pick Your Trial Date
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Select a date within the next 14 days for your VIP visit.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
                  <CalendarIcon className="w-8 h-8 text-amber-400 mx-auto" />
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Select Appointment Date
                  </label>
                  <input
                    id="booking-date-input"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-center font-mono text-base focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-zinc-500">
                    Selected: <strong className="text-amber-400">{new Date(formData.date).toDateString()}</strong>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Next: Select Time Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: TIME SLOT */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 5: Select Time Slot
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Choose a convenient window for your workout and assessment.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setFormData({ ...formData, timeSlot: `${slot.label} (${slot.time})` });
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.timeSlot.includes(slot.time)
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase">{slot.label}</span>
                        {formData.timeSlot.includes(slot.time) && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">{slot.time}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {slot.category}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Next: Review & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: REVIEW & CONFIRM */}
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Step 6: Review & Finalize Booking
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Please review your appointment summary below before generating your VIP pass.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Guest Name:</span>
                      <span className="text-white font-bold text-sm">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Mobile / WhatsApp:</span>
                      <span className="text-white font-bold text-sm">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Email Address:</span>
                      <span className="text-white font-bold text-sm">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Fitness Goal:</span>
                      <span className="text-amber-400 font-bold text-sm">{formData.fitnessGoal}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Assigned Coach:</span>
                      <span className="text-white font-bold text-sm">{formData.trainerName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Date & Slot:</span>
                      <span className="text-emerald-400 font-bold text-sm font-mono">{formData.date} • {formData.timeSlot}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] font-bold uppercase mb-1">
                      Additional Notes or Inquiries (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any specific workout preferences or medical considerations..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    id="booking-confirm-submit-btn"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleFinalSubmit}
                    className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl shadow-amber-500/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Confirming Booking...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>CONFIRM & GET VIP PASS</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        ) : (
          /* BOOKING SUCCESS SCREEN (Requirement: Animated success check, YOU'RE BOOKED!, Details, ADD TO CALENDAR, WHATSAPP, DONE) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-zinc-900 border-2 border-emerald-500/40 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-widest font-mono">
              VIP Pass Confirmed
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-3">
              YOU'RE <span className="text-amber-400">BOOKED!</span>
            </h2>

            <p className="text-sm text-zinc-300 max-w-md mx-auto mt-2 font-light">
              Your complimentary 1-Day VIP Pass has been reserved. Please show this confirmation or reference ID upon arrival at the reception desk.
            </p>

            {/* Pass Details Display */}
            <div className="mt-8 max-w-md mx-auto p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Booking Reference:</span>
                <span className="text-amber-400 font-bold font-mono">#{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Guest Name:</span>
                <span className="text-white font-bold">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Trial Date:</span>
                <span className="text-white font-bold">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Time Window:</span>
                <span className="text-white font-bold">{confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Coach:</span>
                <span className="text-white font-bold">{confirmedBooking.trainerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Target Goal:</span>
                <span className="text-emerald-400 font-bold">{confirmedBooking.fitnessGoal}</span>
              </div>
            </div>

            {/* Required Action Buttons: ADD TO CALENDAR, WHATSAPP, DONE */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              {/* Button 1: ADD TO CALENDAR */}
              <button
                id="booking-add-calendar-btn"
                onClick={() => {
                  soundManager.playClick();
                  handleDownloadCalendar();
                }}
                className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>ADD TO CALENDAR (.ICS)</span>
              </button>

              {/* Button 2: WHATSAPP */}
              <button
                id="booking-whatsapp-confirm-btn"
                onClick={() => {
                  soundManager.playClick();
                  handleWhatsAppConfirm();
                }}
                className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP CONCIERGE</span>
              </button>
            </div>

            <div className="mt-4">
              <button
                id="booking-done-btn"
                onClick={() => {
                  soundManager.playClick();
                  onNavigate('home');
                }}
                className="text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wider py-2 px-4 hover:underline cursor-pointer"
              >
                DONE & RETURN TO HOMEPAGE
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default BookingPage;
