import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, User, Dumbbell, Calendar, QrCode, CreditCard, Activity, Check, MessageCircle, LogOut, Download, Clock, Flame, Award } from 'lucide-react';
import { DEMO_MEMBER } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';
import { GYM_INFO } from '../../data/gymData';

interface MemberDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MemberDashboardModal: React.FC<MemberDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'trainer' | 'payments'>('overview');
  const [completedExercises, setCompletedExercises] = useState<number[]>([0, 1]);

  if (!isOpen) return null;

  const toggleExercise = (idx: number) => {
    soundManager.playClick();
    if (completedExercises.includes(idx)) {
      setCompletedExercises(completedExercises.filter((i) => i !== idx));
    } else {
      setCompletedExercises([...completedExercises, idx]);
    }
  };

  const todaysWorkout = [
    { name: 'Incline Dumbbell Bench Press', sets: '4 Sets × 8-10 Reps', weight: '36 kg / side', rest: '90s' },
    { name: 'Barbell Flat Bench Press', sets: '3 Sets × 6-8 Reps', weight: '100 kg', rest: '120s' },
    { name: 'Panatta Cable Flyes (Upper Pec Focus)', sets: '4 Sets × 12 Reps', weight: '22.5 kg', rest: '60s' },
    { name: 'Parallel Bar Weighted Dips', sets: '3 Sets × 10 Reps', weight: '+20 kg belt', rest: '90s' },
    { name: 'Overhead Rope Triceps Extension', sets: '4 Sets × 15 Reps', weight: '35 kg', rest: '60s' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#101014] border border-white/15 shadow-2xl z-10 my-6 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#D4AF37] p-[1.5px]">
              <div className="w-full h-full bg-[#0D0D0D] rounded-[14px] flex items-center justify-center font-black text-[#D4AF37] text-lg">
                KM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-['Syne',sans-serif] text-white">
                  {DEMO_MEMBER.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-extrabold uppercase">
                  {DEMO_MEMBER.planName}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Member ID: <span className="font-mono text-white">{DEMO_MEMBER.id}</span> • {DEMO_MEMBER.expiryDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2 border-b border-white/10 flex gap-2 overflow-x-auto bg-black/40">
          {[
            { id: 'overview', label: 'Membership & Stats', icon: Activity },
            { id: 'workout', label: "Today's Routine", icon: Dumbbell },
            { id: 'trainer', label: 'Assigned Master Coach', icon: User },
            { id: 'payments', label: 'Billing & Receipts', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Check-ins This Month</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">{DEMO_MEMBER.checkinsThisMonth}</span>
                    <span className="text-xs text-emerald-400 font-semibold">/ 24 Target</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Current Weight</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-[#D4AF37]">{DEMO_MEMBER.currentWeight}</span>
                    <span className="text-xs text-neutral-400 font-semibold">kg</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Body Fat %</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-emerald-400">{DEMO_MEMBER.bodyFatPct}%</span>
                    <span className="text-xs text-neutral-400 font-semibold">-2.4% MoM</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Skeletal Muscle</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-white">{DEMO_MEMBER.muscleMassKg}</span>
                    <span className="text-xs text-neutral-400 font-semibold">kg</span>
                  </div>
                </div>
              </div>

              {/* Digital RFID & Biometric Turnstile Access Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1E160C] via-[#15110E] to-[#0D0D10] border-2 border-[#D4AF37]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-extrabold uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>24/7 RFID Biometric Turnstile Key</span>
                  </div>
                  <h4 className="text-xl font-black text-white">VIP GYM FLOOR ENTRY PASS</h4>
                  <p className="text-xs text-neutral-300">
                    Scan this dynamic encrypted barcode at the front turnstile or locker terminal.
                  </p>
                </div>

                {/* QR Access Code */}
                <div className="p-3.5 rounded-2xl bg-white text-black text-center shadow-lg shrink-0">
                  <QrCode className="w-24 h-24 text-black mx-auto" />
                  <span className="font-mono text-[9px] font-bold block mt-1 tracking-tighter">
                    {DEMO_MEMBER.qrCode}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workout' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-black text-white uppercase">Chest & Triceps Hypertrophy</h4>
                  <p className="text-xs text-neutral-400">Prescribed by Head Coach Vikram Singhania</p>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {completedExercises.length} / {todaysWorkout.length} Completed
                </div>
              </div>

              <div className="space-y-3">
                {todaysWorkout.map((ex, idx) => {
                  const isDone = completedExercises.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleExercise(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-neutral-300'
                          : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-500 border-emerald-500 text-black'
                              : 'border-white/20 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className={`text-sm font-bold ${isDone ? 'line-through text-neutral-400' : 'text-white'}`}>
                            {ex.name}
                          </h5>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {ex.sets} • Load: <span className="text-[#D4AF37] font-semibold">{ex.weight}</span> • Rest: {ex.rest}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold uppercase text-neutral-500">
                        {isDone ? 'Finished' : 'Mark Done'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'trainer' && (
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={DEMO_MEMBER.trainerImage}
                alt={DEMO_MEMBER.assignedTrainer}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-[#D4AF37]"
              />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-extrabold uppercase">
                  <span>Assigned 1-on-1 Master Coach</span>
                </div>
                <h4 className="text-2xl font-black text-white">{DEMO_MEMBER.assignedTrainer}</h4>
                <p className="text-xs text-neutral-300 font-light">
                  {DEMO_MEMBER.trainerRole} • InBody Composition & Hypertrophy Specialist
                </p>
                <p className="text-xs text-neutral-400">
                  Next scheduled check-in: <strong>Friday, 07:00 AM (Bi-weekly InBody 770 Scan)</strong>
                </p>

                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <a
                    href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hi%20Coach%20Vikram%2C%20this%20is%20Karan%20Malhotra%20regarding%20my%20weekly%20nutrition%20split.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Coach</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-white uppercase">Invoices & Receipts</h4>
              <div className="space-y-3">
                {[
                  { id: 'INV-2026-0081', plan: 'VIP PLAN (Annual VIP Concierge)', date: '15 Jan 2026', amount: '₹5,000', status: 'Paid' },
                  { id: 'INV-2025-0912', plan: 'VIP PLAN (Monthly Renewal)', date: '15 Dec 2025', amount: '₹5,000', status: 'Paid' },
                ].map((inv) => (
                  <div key={inv.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#D4AF37]">{inv.id}</span>
                      <p className="text-sm font-bold text-white mt-0.5">{inv.plan}</p>
                      <p className="text-xs text-neutral-400">{inv.date} • {inv.amount}</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center gap-1 text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Receipt</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
