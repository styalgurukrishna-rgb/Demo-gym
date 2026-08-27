import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Dumbbell, 
  Flame, 
  Target, 
  ShieldCheck, 
  Award,
  Crown,
  Calendar,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { soundManager } from '../common/SoundEffects';
import { PricingPlan } from '../../types';

interface SmartPlanAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planId: string) => void;
  onBookConsultation: () => void;
}

export const SmartPlanAdvisorModal: React.FC<SmartPlanAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
  onBookConsultation,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [goal, setGoal] = useState<string>('Muscle Gain');
  const [experience, setExperience] = useState<string>('Intermediate');
  const [support, setSupport] = useState<string>('Trainer');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setGoal('Muscle Gain');
    setExperience('Intermediate');
    setSupport('Trainer');
  };

  // Determine recommended plan based on questionnaire answers
  const getRecommendation = () => {
    if (support === 'Dedicated Coach' || experience === 'Advanced') {
      return {
        id: 'vip',
        name: 'VIP ALL-INCLUSIVE',
        price: '₹5,000/month',
        reason: 'You selected dedicated coaching and high-intensity progression. The VIP tier includes unlimited 1-on-1 coach access, clinical InBody mapping, and private lifting suite privileges.',
        badge: 'Top Recommendation for You',
        color: 'from-amber-400 to-yellow-500'
      };
    } else if (support === 'Trainer' || goal === 'Weight Loss' || goal === 'Muscle Gain') {
      return {
        id: 'premium',
        name: 'PREMIUM ACCESS',
        price: '₹3,000/month',
        reason: 'Based on your fitness goals and trainer preference, Premium provides the ideal balance with 8 personal training sessions per month, custom macro guidance, and full recovery spa access.',
        badge: 'Most Popular Match',
        color: 'from-red-500 to-amber-500'
      };
    } else {
      return {
        id: 'basic',
        name: 'BASIC ACCESS',
        price: '₹2,000/month',
        reason: 'Since you prefer self-guided workouts with full equipment freedom, the Basic plan delivers 24/7 access to all Italian Panatta and Olympic lifting platforms.',
        badge: 'Essential Match',
        color: 'from-zinc-500 to-zinc-400'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden text-left"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">
                Interactive Fitness Assessment
              </span>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Find Your Ideal Membership Plan
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-8 bg-amber-500'
                    : step > s
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-zinc-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {step <= 3 ? `Question ${step} of 3` : 'Your Tailored Result'}
          </span>
        </div>

        {/* QUESTION 1: PRIMARY GOAL */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                1. What is your primary fitness goal?
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Select what matters most for your athletic transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Weight Loss', desc: 'Burn stubborn fat & increase conditioning' },
                { label: 'Muscle Gain', desc: 'Hypertrophy & clean lean mass building' },
                { label: 'Strength', desc: 'Powerlifting, barbell lifts & compound PRs' },
                { label: 'General Fitness', desc: 'Cardiovascular health & everyday stamina' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setGoal(item.label);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    goal === item.label
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm uppercase">{item.label}</span>
                    {goal === item.label && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 2: TRAINING EXPERIENCE */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                2. What is your training experience level?
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Help us understand how familiar you are with structured strength training.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { label: 'Beginner', desc: 'New to fitness or returning after a prolonged break (< 6 months experience)' },
                { label: 'Intermediate', desc: 'Comfortable with gym floor equipment & barbell form (6 months - 2 years)' },
                { label: 'Advanced', desc: 'Experienced lifter looking for elite coaching, progressive overload & periodization' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setExperience(item.label);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    experience === item.label
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm uppercase">{item.label}</span>
                    {experience === item.label && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setStep(3);
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 3: PREFERRED SUPPORT */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                3. What type of coaching support do you prefer?
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Choose the level of accountability that fits your routine.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { label: 'Self-guided', desc: 'I prefer to follow my own schedule and routine on the gym floor.' },
                { label: 'Trainer', desc: 'I want scheduled 1-on-1 coaching sessions and custom macro/diet guidance.' },
                { label: 'Dedicated Coach', desc: 'I need intensive 1-on-1 coaching, bi-weekly biometric mapping, and 24/7 WhatsApp access.' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSupport(item.label);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    support === item.label
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm uppercase">{item.label}</span>
                    {support === item.label && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-bold uppercase cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  setStep(4);
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>See My Recommendation</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION RESULT */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
                  {rec.badge}
                </span>
                <span className="text-base font-black text-white font-mono">{rec.price}</span>
              </div>

              <div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                  {rec.name}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  {rec.reason}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-400 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span>Selected Goal:</span>
                  <span className="text-amber-400 font-bold">{goal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience Level:</span>
                  <span className="text-zinc-200 font-bold">{experience}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Type:</span>
                  <span className="text-zinc-200 font-bold">{support}</span>
                </div>
              </div>
            </div>

            {/* MANDATORY DISCLAIMER */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-500 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important Notice:</strong> This is an algorithmic fitness membership recommendation based on your answers, not medical or professional health advice. Please consult your physician before beginning any new intensive exercise program.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="smart-advisor-view-plan-btn"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSelectPlan(rec.id);
                  onClose();
                }}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>VIEW {rec.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="smart-advisor-book-consult-btn"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onBookConsultation();
                  onClose();
                }}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>BOOK CONSULTATION</span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Questionnaire</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
