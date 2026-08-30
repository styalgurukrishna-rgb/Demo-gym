import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  QrCode, 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Receipt, 
  CreditCard, 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  LogOut, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Download,
  Plus,
  Camera,
  Scale,
  Activity,
  HeartPulse,
  RefreshCw,
  FileText
} from 'lucide-react';
import { PageType, ModalState, MemberProfile, WorkoutPlan, ProgressLog, PaymentReceipt } from '../types';
import { leadStore, DEMO_MEMBER } from '../services/leadStore';
import { soundManager } from '../components/common/SoundEffects';
import { BmiBodyFatCalculator } from '../components/Member/BmiBodyFatCalculator';

interface MemberDashboardPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const MemberDashboardPage: React.FC<MemberDashboardPageProps> = ({ onNavigate, onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'schedule' | 'progress' | 'payments'>('overview');
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [member, setMember] = useState<MemberProfile>(DEMO_MEMBER);
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([]);
  const [payments, setPayments] = useState<PaymentReceipt[]>([]);

  // New Progress Log form state
  const [newWeight, setNewWeight] = useState(78.4);
  const [newHeight, setNewHeight] = useState(180);
  const [newBodyFat, setNewBodyFat] = useState(11.8);
  const [newMuscleMass, setNewMuscleMass] = useState(42.6);
  const [newProgressNotes, setNewProgressNotes] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  // Active Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState<number | null>(null);

  useEffect(() => {
    const updateData = () => {
      const current = leadStore.getCurrentMember() || DEMO_MEMBER;
      setMember(current);
      setWorkouts(leadStore.getWorkouts(current.id));
      setProgressLogs(leadStore.getProgressLogs(current.id));
      setPayments(leadStore.getPayments());
    };

    updateData();
    const unsub = leadStore.subscribe(updateData);
    return () => unsub();
  }, []);

  // Rest Timer Interval
  useEffect(() => {
    if (restTimerSeconds === null || restTimerSeconds <= 0) return;
    const interval = setInterval(() => {
      setRestTimerSeconds((prev) => {
        if (prev && prev > 1) return prev - 1;
        soundManager.playSuccess();
        return null;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [restTimerSeconds]);

  const handleSimulateCheckin = () => {
    soundManager.playSuccess();
    setCheckinSuccess(true);
    setTimeout(() => setCheckinSuccess(false), 3500);
  };

  const handleToggleExercise = (workoutId: string, exerciseId: string) => {
    soundManager.playClick();
    leadStore.toggleExerciseComplete(workoutId, exerciseId);
  };

  const handleStartRestTimer = (seconds: number) => {
    soundManager.playClick();
    setRestTimerSeconds(seconds);
  };

  const handleAddProgress = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();

    const heightM = newHeight / 100;
    const calculatedBmi = Number((newWeight / (heightM * heightM)).toFixed(1));

    leadStore.addProgressLog({
      memberId: member.id,
      weightKg: Number(newWeight),
      heightCm: Number(newHeight),
      bmi: calculatedBmi,
      bodyFatPct: Number(newBodyFat),
      muscleMassKg: Number(newMuscleMass),
      notes: newProgressNotes || 'Weekly regular weigh-in protocol.',
      photoUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80'
    });

    setLogSuccess(true);
    setNewProgressNotes('');
    setTimeout(() => setLogSuccess(false), 3000);
  };

  const handleRenewMembership = () => {
    soundManager.playClick();
    onOpenModal('payment', {
      planName: member.planName,
      price: 5000,
      period: '1 Year Renewal'
    });
  };

  const handleLogout = () => {
    soundManager.playClick();
    leadStore.logout();
    onNavigate('login');
  };

  const currentWorkout = workouts[0];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. TOP MEMBER HERO BAR */}
      <section className="bg-zinc-900/90 border-b border-zinc-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase">
                VIP
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase">{member.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {member.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                ID: <span className="font-mono text-zinc-200">{member.id}</span> • Tier: <span className="text-amber-400 font-bold">{member.planName}</span>
              </p>
              <p className="text-[11px] text-zinc-500">
                Expires: {member.expiryDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateCheckin}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>SCAN DIGITAL ENTRY PASS</span>
            </button>
            <button
              onClick={handleRenewMembership}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RENEW PLAN</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Checkin Alert Banner */}
      {checkinSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500 text-black py-3 px-4 text-center font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Biometric Access Approved! Welcome to KSG DEMO GYM. Have an intense workout!</span>
        </motion.div>
      )}

      {/* 2. DASHBOARD TABS NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: 'overview', label: 'Overview & Pass', icon: User },
            { id: 'progress', label: 'BMI & Body Fat Calculator', icon: Activity },
            { id: 'workout', label: 'Today\'s Workout Split', icon: Dumbbell },
            { id: 'schedule', label: 'Coaching Sessions', icon: Calendar },
            { id: 'payments', label: 'Invoices & Receipts', icon: Receipt },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black font-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TAB CONTENT VIEWS */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Check-ins (This Month)</span>
                <div className="text-2xl font-black text-white mt-1 font-mono">{member.checkinsThisMonth} Days</div>
                <span className="text-[10px] text-emerald-400 font-semibold">Top 5% Consistency</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Current Body Weight</span>
                <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{member.currentWeight} kg</div>
                <span className="text-[10px] text-zinc-400">Target: {member.targetWeight} kg</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Body Fat Percentage</span>
                <div className="text-2xl font-black text-white mt-1 font-mono">{member.bodyFatPct}%</div>
                <span className="text-[10px] text-emerald-400 font-semibold">US Navy Method</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Muscle Mass (SMM)</span>
                <div className="text-2xl font-black text-white mt-1 font-mono">{member.muscleMassKg} kg</div>
                <span className="text-[10px] text-amber-400 font-semibold">+1.8 kg lean gain</span>
              </div>
            </div>

            {/* Quick BMI & Body Fat Snapshot Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/20 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Fitness Progress Tool</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Live Clinical Sync
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase mt-0.5">
                    BMI: {member.bmi || (member.currentWeight / ((member.heightCm || 180)/100)**2).toFixed(1)} • Body Fat: {member.bodyFatPct}% ({member.bodyFatPct <= 13 ? 'Athletic / Six-Pack' : member.bodyFatPct <= 17 ? 'Fitness' : 'Average'})
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    Calculate real-time BMI index, US Navy circumference-based body fat percentage, lean body mass (LBM), metabolic TDEE, and set custom target timelines.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('progress');
                }}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-lg cursor-pointer"
              >
                <span>OPEN CALCULATOR &amp; TRACKER</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Digital QR Entry Pass */}
              <div className="lg:col-span-6 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">KSG Smart Pass</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">24/7 RFID ALL-ACCESS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Turnstile Biometric Pass</h3>
                  <p className="text-xs text-zinc-400 mt-1">Scan this at the reception barrier or hold your phone near the NFC reader.</p>
                </div>

                <div className="my-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center">
                  <QrCode className="w-36 h-36 text-amber-400" />
                  <div className="text-xs font-mono text-zinc-400 mt-3 font-bold">{member.qrCode}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-semibold">● RFID Turnstile Key Valid & Active</div>
                </div>

                <button
                  onClick={handleSimulateCheckin}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  SIMULATE GYM DOOR CHECK-IN
                </button>
              </div>

              {/* Dedicated Coach Card */}
              <div className="lg:col-span-6 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Assigned Coach</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">1-on-1 Dedicated</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.trainerImage}
                      alt={member.assignedTrainer}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-amber-500/40"
                    />
                    <div>
                      <h4 className="text-lg font-black text-white">{member.assignedTrainer}</h4>
                      <p className="text-xs text-amber-400">{member.trainerRole}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Next Session: Tomorrow, 07:00 AM (Upper Body Power)</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Coach's Weekly Directive</span>
                    <p className="italic">
                      "Maintain strict 3-second eccentric tempo on the Panatta chest press. Fuel with 180g protein daily."
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex gap-3">
                  <a
                    href="https://wa.me/917549929102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Coach</span>
                  </a>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('workout');
                    }}
                    className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Dumbbell className="w-4 h-4" />
                    <span>View Today's Split</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TODAY'S WORKOUT */}
        {activeTab === 'workout' && currentWorkout && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Daily Periodization Split
                </span>
                <h3 className="text-xl font-black text-white uppercase mt-0.5">{currentWorkout.dayTitle}</h3>
                <p className="text-xs text-zinc-400 mt-1">{currentWorkout.trainerNotes}</p>
              </div>

              {/* Rest Timer Widget */}
              <div className="flex items-center gap-2 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-300">Rest Timer:</span>
                {restTimerSeconds !== null ? (
                  <span className="font-mono text-sm font-black text-amber-400 animate-pulse">
                    {restTimerSeconds}s
                  </span>
                ) : (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleStartRestTimer(60)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono font-bold"
                    >
                      60s
                    </button>
                    <button
                      onClick={() => handleStartRestTimer(90)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono font-bold"
                    >
                      90s
                    </button>
                    <button
                      onClick={() => handleStartRestTimer(120)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono font-bold"
                    >
                      120s
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              {currentWorkout.exercises.map((ex, index) => (
                <div
                  key={ex.id}
                  onClick={() => handleToggleExercise(currentWorkout.id, ex.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    ex.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-75'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                      ex.completed ? 'bg-emerald-500 text-black' : 'bg-zinc-950 text-amber-400 border border-zinc-800'
                    }`}>
                      {ex.completed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold ${ex.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                        {ex.name}
                      </h4>
                      <p className="text-xs text-zinc-400">{ex.targetMuscle} • {ex.sets} Sets × {ex.reps}</p>
                      {ex.notes && <p className="text-[11px] text-amber-400/80 mt-0.5">{ex.notes}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-zinc-500 block uppercase">Target Load</span>
                      <span className="text-sm font-bold text-amber-400">{ex.targetWeightKg} kg</span>
                    </div>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                      ex.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {ex.completed ? 'Done' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COACHING SESSIONS */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase">Upcoming 1-on-1 Sessions</h3>
                  <p className="text-xs text-zinc-400">Scheduled with Master Coach Vikram Singhania</p>
                </div>
                <button
                  onClick={() => onNavigate('booking')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase"
                >
                  Book New Slot
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Hypertrophy Chest & Deltoids</h4>
                      <p className="text-xs text-zinc-400">Tomorrow • 07:00 AM - 08:15 AM (Biomechanics Area)</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">InBody 770 Clinical Body Composition Scan</h4>
                      <p className="text-xs text-zinc-400">Saturday • 08:30 AM (Sports Science Lab)</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRESS & BMI / BODY FAT CALCULATOR */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            {/* 1. Precision BMI & US Navy Body Fat Calculator Component */}
            <BmiBodyFatCalculator
              member={member}
              onSavedProgress={() => {
                const refreshed = leadStore.getCurrentMember();
                setMember(refreshed);
                setProgressLogs(leadStore.getProgressLogs(refreshed.id));
              }}
            />

            {/* 2. Fast Manual Log Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400">
                  <Plus className="w-5 h-5" />
                  <h3 className="text-base font-black text-white uppercase">Quick InBody 770 Entry</h3>
                </div>
                {logSuccess && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Entry Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleAddProgress} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    required
                    value={newHeight}
                    onChange={(e) => setNewHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Body Fat (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newBodyFat}
                    onChange={(e) => setNewBodyFat(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Muscle Mass (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newMuscleMass}
                    onChange={(e) => setNewMuscleMass(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3">
                  <input
                    type="text"
                    placeholder="Notes (e.g. Post-workout weigh-in, feeling energetic)"
                    value={newProgressNotes}
                    onChange={(e) => setNewProgressNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    SAVE ENTRY
                  </button>
                </div>
              </form>
            </div>

            {/* Historical Scan Logs */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                InBody 770 Scan Timeline ({progressLogs.length} Scans)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progressLogs.map((log) => (
                  <div key={log.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <span className="font-mono text-xs font-bold text-amber-400">{log.date}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">BMI {log.bmi}</span>
                    </div>

                    {log.photoUrl && (
                      <img
                        src={log.photoUrl}
                        alt="Progress check"
                        className="w-full h-36 rounded-xl object-cover border border-zinc-800"
                      />
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Weight</span>
                        <span className="font-bold text-white">{log.weightKg} kg</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Body Fat</span>
                        <span className="font-bold text-emerald-400">{log.bodyFatPct}%</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 italic">{log.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INVOICES & PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase">Payment Receipts & GST Tax Invoices</h3>
                  <p className="text-xs text-zinc-400">Official tax invoices for your KSG DEMO GYM memberships.</p>
                </div>
                <button
                  onClick={handleRenewMembership}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase"
                >
                  Make Payment
                </button>
              </div>

              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.paymentId}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{p.paymentId}</span>
                        <h4 className="text-sm font-bold text-white">{p.planName}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Paid ₹{p.totalAmount} via <span className="text-white font-semibold">{p.paymentMethod}</span> on {p.date}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        alert(`Downloading GST Tax Invoice for ${p.paymentId}... Total: ₹${p.totalAmount}`);
                      }}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MemberDashboardPage;
