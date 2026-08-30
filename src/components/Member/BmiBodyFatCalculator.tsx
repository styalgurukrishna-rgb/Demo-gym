import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Flame,
  Activity,
  Sparkles,
  TrendingUp,
  Info,
  CheckCircle2,
  RefreshCw,
  Save,
  Dumbbell,
  Target,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Layers,
  HeartPulse,
  Award
} from 'lucide-react';
import { soundManager } from '../common/SoundEffects';
import { MemberProfile } from '../../types';
import { leadStore } from '../../services/leadStore';

interface BmiBodyFatCalculatorProps {
  member: MemberProfile;
  onSavedProgress?: () => void;
  className?: string;
}

export type UnitSystem = 'metric' | 'imperial';
export type CalcMode = 'bmi' | 'bodyfat' | 'goal_planner';

export const BmiBodyFatCalculator: React.FC<BmiBodyFatCalculatorProps> = ({
  member,
  onSavedProgress,
  className = ''
}) => {
  const [calcMode, setCalcMode] = useState<CalcMode>('bmi');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  
  // Basic Demographic & Body Inputs
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(member.currentWeight || 78.4);
  const [heightCm, setHeightCm] = useState<number>(member.heightCm || 180);
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // Moderate exercise 3-5 days/week

  // Circumference inputs for US Navy Body Fat equation (in cm)
  const [neckCm, setNeckCm] = useState<number>(39);
  const [waistCm, setWaistCm] = useState<number>(84);
  const [hipCm, setHipCm] = useState<number>(96); // only used for females

  // Goal Planner Inputs
  const [goalType, setGoalType] = useState<'fat_loss' | 'muscle_gain' | 'recomp'>('fat_loss');
  const [targetWeightKg, setTargetWeightKg] = useState<number>(member.targetWeight || 75.0);
  const [targetBodyFatPct, setTargetBodyFatPct] = useState<number>(10.0);

  // Status & Feedback
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Sync with member props when member changes
  useEffect(() => {
    if (member) {
      if (member.currentWeight) setWeightKg(member.currentWeight);
      if (member.heightCm) setHeightCm(member.heightCm);
      if (member.targetWeight) setTargetWeightKg(member.targetWeight);
    }
  }, [member]);

  // Conversions for Imperial Display
  const weightDisplay = unitSystem === 'metric' ? weightKg : Number((weightKg * 2.20462).toFixed(1));
  const heightFeet = Math.floor(heightCm / 30.48);
  const heightInches = Math.round((heightCm % 30.48) / 2.54);
  const neckDisplay = unitSystem === 'metric' ? neckCm : Number((neckCm / 2.54).toFixed(1));
  const waistDisplay = unitSystem === 'metric' ? waistCm : Number((waistCm / 2.54).toFixed(1));
  const hipDisplay = unitSystem === 'metric' ? hipCm : Number((hipCm / 2.54).toFixed(1));

  // 1. BMI Calculation
  const heightInMeters = Math.max(0.5, heightCm / 100);
  const bmiValue = Number((weightKg / (heightInMeters * heightInMeters)).toFixed(1));

  // BMI Category & Styling
  let bmiCategory = 'Healthy / Normal';
  let bmiColor = 'text-emerald-400';
  let bmiBgColor = 'bg-emerald-500/10 border-emerald-500/30';
  let bmiAdvice = 'Your BMI is in the optimal range. Focus on lean muscle synthesis and athletic conditioning.';
  let bmiGaugePercent = 50; // percentage along the 15 - 35 range

  if (bmiValue < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-sky-400';
    bmiBgColor = 'bg-sky-500/10 border-sky-500/30';
    bmiAdvice = 'Focus on a nutrient-dense caloric surplus and progressive resistance training to build foundational lean mass.';
    bmiGaugePercent = Math.max(5, ((bmiValue - 15) / (35 - 15)) * 100);
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    bmiCategory = 'Healthy / Athletic';
    bmiColor = 'text-emerald-400';
    bmiBgColor = 'bg-emerald-500/10 border-emerald-500/30';
    bmiAdvice = 'Ideal weight-to-height ratio. Maintain progressive overload and dial in macro nutrient timing.';
    bmiGaugePercent = Math.min(65, Math.max(25, ((bmiValue - 15) / (35 - 15)) * 100));
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    bmiCategory = 'Overweight / Muscular';
    bmiColor = 'text-amber-400';
    bmiBgColor = 'bg-amber-500/10 border-amber-500/30';
    bmiAdvice = 'Athletes with high muscle mass often test here. Cross-reference with US Navy Body Fat % for accurate physique tracking.';
    bmiGaugePercent = Math.min(85, Math.max(65, ((bmiValue - 15) / (35 - 15)) * 100));
  } else {
    bmiCategory = 'High Mass Index';
    bmiColor = 'text-rose-400';
    bmiBgColor = 'bg-rose-500/10 border-rose-500/30';
    bmiAdvice = 'Recommended to pair moderate caloric deficit with coach-guided low-impact conditioning and heavy resistance.';
    bmiGaugePercent = Math.min(98, Math.max(85, ((bmiValue - 15) / (35 - 15)) * 100));
  }

  // Ideal weight range for height (BMI 18.5 - 24.9)
  const minIdealWeightKg = Number((18.5 * (heightInMeters * heightInMeters)).toFixed(1));
  const maxIdealWeightKg = Number((24.9 * (heightInMeters * heightInMeters)).toFixed(1));

  // 2. US Navy Body Fat % Formula
  // Men: 495 / (1.0324 - 0.19077*log10(waist - neck) + 0.15456*log10(height)) - 450
  // Women: 495 / (1.29579 - 0.35004*log10(waist + hip - neck) + 0.22100*log10(height)) - 450
  let calculatedBodyFat = 15.0;
  try {
    if (gender === 'male') {
      const waistMinusNeck = Math.max(1, waistCm - neckCm);
      const denominator = 1.0324 - 0.19077 * Math.log10(waistMinusNeck) + 0.15456 * Math.log10(heightCm);
      if (denominator > 0) {
        calculatedBodyFat = Number((495 / denominator - 450).toFixed(1));
      }
    } else {
      const waistPlusHipMinusNeck = Math.max(1, waistCm + hipCm - neckCm);
      const denominator = 1.29579 - 0.35004 * Math.log10(waistPlusHipMinusNeck) + 0.22100 * Math.log10(heightCm);
      if (denominator > 0) {
        calculatedBodyFat = Number((495 / denominator - 450).toFixed(1));
      }
    }
  } catch {
    calculatedBodyFat = 15.0;
  }

  // Sanity clamp
  if (isNaN(calculatedBodyFat) || calculatedBodyFat < 3) calculatedBodyFat = 3.0;
  if (calculatedBodyFat > 60) calculatedBodyFat = 60.0;

  // Body Composition breakdown
  const fatMassKg = Number(((weightKg * calculatedBodyFat) / 100).toFixed(1));
  const leanMassKg = Number((weightKg - fatMassKg).toFixed(1));

  // Body Fat Category (ACE guidelines)
  let bfCategory = 'Fitness';
  let bfColor = 'text-emerald-400';
  let bfBadge = 'Ideal Athletic Range';

  if (gender === 'male') {
    if (calculatedBodyFat < 6) {
      bfCategory = 'Essential Fat';
      bfColor = 'text-amber-400';
      bfBadge = 'Competition Shredded (Ultra Low)';
    } else if (calculatedBodyFat <= 13) {
      bfCategory = 'Athletic / Six-Pack';
      bfColor = 'text-emerald-400';
      bfBadge = 'Elite Definition (Visible Abs)';
    } else if (calculatedBodyFat <= 17) {
      bfCategory = 'Fitness';
      bfColor = 'text-emerald-400';
      bfBadge = 'Athletic & Lean';
    } else if (calculatedBodyFat <= 24) {
      bfCategory = 'Average';
      bfColor = 'text-amber-400';
      bfBadge = 'Healthy Moderate';
    } else {
      bfCategory = 'Elevated Fat';
      bfColor = 'text-rose-400';
      bfBadge = 'High Adiposity';
    }
  } else {
    // Female
    if (calculatedBodyFat < 14) {
      bfCategory = 'Essential Fat';
      bfColor = 'text-amber-400';
      bfBadge = 'Athletic Minimum';
    } else if (calculatedBodyFat <= 20) {
      bfCategory = 'Athletic';
      bfColor = 'text-emerald-400';
      bfBadge = 'Elite Definition';
    } else if (calculatedBodyFat <= 24) {
      bfCategory = 'Fitness';
      bfColor = 'text-emerald-400';
      bfBadge = 'Sculpted & Fit';
    } else if (calculatedBodyFat <= 31) {
      bfCategory = 'Average';
      bfColor = 'text-amber-400';
      bfBadge = 'Healthy Baseline';
    } else {
      bfCategory = 'Elevated Fat';
      bfColor = 'text-rose-400';
      bfBadge = 'High Adiposity';
    }
  }

  // 3. Metabolic BMR (Mifflin-St Jeor) & TDEE
  let baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    baseBmr += 5;
  } else {
    baseBmr -= 161;
  }
  const bmr = Math.round(baseBmr);
  const tdee = Math.round(bmr * activityLevel);

  // Goal Timeline Estimation
  const weightDifferenceKg = Math.abs(weightKg - targetWeightKg);
  // Safe rate: 0.5kg fat loss/week or 0.25kg lean muscle/week
  const weeklyRateKg = goalType === 'fat_loss' ? 0.5 : goalType === 'muscle_gain' ? 0.25 : 0.35;
  const estimatedWeeks = Math.max(1, Math.ceil(weightDifferenceKg / weeklyRateKg));
  const recommendedDailyCalories =
    goalType === 'fat_loss'
      ? Math.round(tdee - 500)
      : goalType === 'muscle_gain'
      ? Math.round(tdee + 350)
      : tdee;
  const dailyProteinGrams = Math.round(weightKg * 2.0); // 2.0g per kg

  // Handle Input Changes with Unit conversions
  const handleWeightChange = (val: number) => {
    if (unitSystem === 'metric') {
      setWeightKg(val);
    } else {
      setWeightKg(Number((val / 2.20462).toFixed(1)));
    }
  };

  const handleNeckChange = (val: number) => {
    if (unitSystem === 'metric') {
      setNeckCm(val);
    } else {
      setNeckCm(Number((val * 2.54).toFixed(1)));
    }
  };

  const handleWaistChange = (val: number) => {
    if (unitSystem === 'metric') {
      setWaistCm(val);
    } else {
      setWaistCm(Number((val * 2.54).toFixed(1)));
    }
  };

  const handleHipChange = (val: number) => {
    if (unitSystem === 'metric') {
      setHipCm(val);
    } else {
      setHipCm(Number((val * 2.54).toFixed(1)));
    }
  };

  const handleFillFromProfile = () => {
    soundManager.playClick();
    if (member) {
      if (member.currentWeight) setWeightKg(member.currentWeight);
      if (member.heightCm) setHeightCm(member.heightCm);
      if (member.targetWeight) setTargetWeightKg(member.targetWeight);
      if (member.bodyFatPct) {
        // approximate matching waist
        setWaistCm(member.bodyFatPct > 15 ? 86 : 80);
      }
    }
  };

  const handleSaveToTracker = () => {
    soundManager.playSuccess();

    // 1. Add entry to leadStore progress logs
    leadStore.addProgressLog({
      memberId: member.id,
      weightKg: Number(weightKg.toFixed(1)),
      heightCm: Number(heightCm),
      bmi: bmiValue,
      bodyFatPct: calculatedBodyFat,
      muscleMassKg: leanMassKg,
      notes: customNotes || `Calculator Scan (${calcMode.toUpperCase()} Mode) • Target: ${targetWeightKg}kg`,
      photoUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80'
    });

    // 2. Update current member metrics in leadStore
    leadStore.updateCurrentMemberMetrics({
      currentWeight: Number(weightKg.toFixed(1)),
      heightCm: Number(heightCm),
      bmi: bmiValue,
      bodyFatPct: calculatedBodyFat,
      muscleMassKg: leanMassKg,
      targetWeight: Number(targetWeightKg)
    });

    setSaveSuccess(true);
    if (onSavedProgress) onSavedProgress();
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background Ambience */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                BMI & Body Fat Calculator
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                InBody Tech
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Precision clinical formulas (WHO BMI standard & US Navy Body Fat circumference equation).
            </p>
          </div>
        </div>

        {/* Right Tools: Units Toggle & Profile Fill */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Fill from Profile */}
          <button
            type="button"
            onClick={handleFillFromProfile}
            title="Load your saved profile measurements"
            className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Sync Profile</span>
          </button>

          {/* Unit System Switcher */}
          <div className="p-1 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setUnitSystem('metric');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unitSystem === 'metric'
                  ? 'bg-amber-500 text-black font-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setUnitSystem('imperial');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unitSystem === 'imperial'
                  ? 'bg-amber-500 text-black font-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Imperial (lbs/in)
            </button>
          </div>

          {/* Info Modal Button */}
          <button
            type="button"
            onClick={() => setShowInfoModal(!showInfoModal)}
            title="About BMI vs Body Fat %"
            className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Callout Modal / Dropdown */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden my-4"
          >
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-2">
              <div className="flex items-center justify-between font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Understanding BMI vs. Body Fat Percentage
                </span>
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="text-zinc-400 hover:text-white text-[11px] underline"
                >
                  Close
                </button>
              </div>
              <p>
                <strong>BMI (Body Mass Index)</strong> is a height-to-weight ratio recognized globally by the WHO. While great for general screening, muscular athletes often get classified as &quot;Overweight&quot; due to dense muscle mass.
              </p>
              <p>
                <strong>US Navy Body Fat %</strong> measures body circumference (waist, neck, hips) to distinguish between lean muscle tissue and adipose fat mass, providing an authentic benchmark for body composition changes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 my-6 pb-1">
        {[
          { id: 'bmi', label: '1. Quick BMI & Ideal Range', icon: Scale },
          { id: 'bodyfat', label: '2. US Navy Body Fat % & Lean Mass', icon: Flame },
          { id: 'goal_planner', label: '3. Recomp Goal & Timeline', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = calcMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setCalcMode(tab.id as CalcMode);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black font-black shadow-lg scale-[1.02]'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT INPUTS / RIGHT LIVE METRICS & RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          {/* Gender & Age Row */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <label className="block text-[11px] font-black uppercase text-zinc-400 tracking-wider">
              1. Biological Sex & Age
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setGender('male');
                }}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                <span>Male</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setGender('female');
                }}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                <span>Female</span>
              </button>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Age:</span>
                <span className="font-mono font-bold text-white">{age} Years</span>
              </div>
              <input
                type="range"
                min="14"
                max="85"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>
          </div>

          {/* Core Height & Weight Sliders */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <label className="block text-[11px] font-black uppercase text-zinc-400 tracking-wider">
              2. Height & Current Weight
            </label>

            {/* Height Slider & Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Height:</span>
                <span className="font-mono font-black text-amber-400">
                  {unitSystem === 'metric' ? `${heightCm} cm` : `${heightFeet} ft ${heightInches} in (${heightCm} cm)`}
                </span>
              </div>
              <input
                type="range"
                min="120"
                max="220"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>120 cm (3&apos;11&quot;)</span>
                <span>175 cm (5&apos;9&quot;)</span>
                <span>220 cm (7&apos;3&quot;)</span>
              </div>
            </div>

            {/* Weight Slider & Input */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-900">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Weight:</span>
                <span className="font-mono font-black text-amber-400">
                  {weightDisplay} {unitSystem === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
              <input
                type="range"
                min={unitSystem === 'metric' ? 40 : 88}
                max={unitSystem === 'metric' ? 160 : 352}
                step={unitSystem === 'metric' ? 0.5 : 1}
                value={weightDisplay}
                onChange={(e) => handleWeightChange(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>{unitSystem === 'metric' ? '40 kg' : '88 lbs'}</span>
                <span>{unitSystem === 'metric' ? '80 kg' : '176 lbs'}</span>
                <span>{unitSystem === 'metric' ? '160 kg' : '352 lbs'}</span>
              </div>
            </div>
          </div>

          {/* Mode 2 Specific: Circumference Inputs for US Navy Method */}
          {calcMode === 'bodyfat' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/30 space-y-4"
            >
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider">
                  3. Circumference Measurements (US Navy Tape)
                </label>
                <span className="text-[10px] text-zinc-400">Measure relaxed at narrowest points</span>
              </div>

              {/* Neck */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Neck Circumference (below larynx):</span>
                  <span className="font-mono font-bold text-white">
                    {neckDisplay} {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
                <input
                  type="range"
                  min={unitSystem === 'metric' ? 25 : 10}
                  max={unitSystem === 'metric' ? 55 : 22}
                  step="0.5"
                  value={neckDisplay}
                  onChange={(e) => handleNeckChange(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Waist */}
              <div className="space-y-1 pt-2 border-t border-zinc-900">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Waist Circumference (at navel level):</span>
                  <span className="font-mono font-bold text-white">
                    {waistDisplay} {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
                <input
                  type="range"
                  min={unitSystem === 'metric' ? 50 : 20}
                  max={unitSystem === 'metric' ? 140 : 55}
                  step="0.5"
                  value={waistDisplay}
                  onChange={(e) => handleWaistChange(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Hips (for females) */}
              {gender === 'female' && (
                <div className="space-y-1 pt-2 border-t border-zinc-900">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Hip Circumference (widest glute point):</span>
                    <span className="font-mono font-bold text-white">
                      {hipDisplay} {unitSystem === 'metric' ? 'cm' : 'in'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === 'metric' ? 65 : 26}
                    max={unitSystem === 'metric' ? 150 : 60}
                    step="0.5"
                    value={hipDisplay}
                    onChange={(e) => handleHipChange(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Mode 3 Specific: Recomp Goal Selection */}
          {calcMode === 'goal_planner' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4"
            >
              <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider">
                3. Choose Target Body Transformation Objective
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fat_loss', label: 'Fat Loss', desc: 'Deficit / Shred' },
                  { id: 'recomp', label: 'Recomp', desc: 'Maintain & Build' },
                  { id: 'muscle_gain', label: 'Hypertrophy', desc: 'Lean Bulk' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setGoalType(g.id as any);
                    }}
                    className={`p-3 rounded-xl text-center transition-all cursor-pointer ${
                      goalType === g.id
                        ? 'bg-amber-500 text-black font-black shadow-md'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{g.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>

              {/* Target Weight Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Target Goal Weight:</span>
                  <span className="font-mono font-black text-amber-400">{targetWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="130"
                  step="0.5"
                  value={targetWeightKg}
                  onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Activity Level Selector */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                <label className="block text-xs text-zinc-400">Weekly Training Frequency:</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value={1.2}>Sedentary (Little or no workout)</option>
                  <option value={1.375}>Lightly Active (1-2 days/week)</option>
                  <option value={1.55}>Moderately Active (3-5 days/week at KSG)</option>
                  <option value={1.725}>Very Active (6-7 intense lifting sessions)</option>
                  <option value={1.9}>Elite Athlete / Double Training Days</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Quick Notes for Progress Log */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Optional note for this scan (e.g., Fasted morning weigh-in, post-leg session)"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Save to Log CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSaveToTracker}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>RECORD TO INBODY PROGRESS TIMELINE</span>
            </button>

            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 text-center"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully recorded to your member progress log & profile!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE CLINICAL RESULTS & VISUAL GAUGES */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. PRIMARY METRICS HIGHLIGHT TILES */}
          <div className="grid grid-cols-2 gap-4">
            {/* BMI Tile */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
                <span className="uppercase font-bold text-[10px] tracking-wider text-zinc-500">BMI Metric</span>
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">{bmiValue}</div>
              <div className={`text-xs font-bold mt-1.5 ${bmiColor}`}>
                {bmiCategory}
              </div>
            </div>

            {/* Body Fat % Tile */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
                <span className="uppercase font-bold text-[10px] tracking-wider text-zinc-500">Est. Body Fat</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-amber-400 font-mono">
                {calculatedBodyFat}%
              </div>
              <div className={`text-xs font-bold mt-1.5 ${bfColor}`}>
                {bfCategory} ({bfBadge})
              </div>
            </div>
          </div>

          {/* 2. VISUAL BMI SPECTRUM GAUGE */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase text-[11px]">WHO BMI Index Spectrum</span>
              <span className="font-mono text-zinc-400">Score: {bmiValue}</span>
            </div>

            {/* Gradient Spectrum Bar */}
            <div className="relative w-full h-3 rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 via-amber-500 to-rose-500 overflow-hidden">
              {/* Active Needle Indicator */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-white shadow-lg border border-black transform -translate-x-1/2 transition-all duration-300"
                style={{ left: `${bmiGaugePercent}%` }}
              />
            </div>

            {/* Legend Labels */}
            <div className="grid grid-cols-4 text-[9px] text-zinc-400 font-mono text-center pt-1">
              <span className="text-sky-400">&lt;18.5 Under</span>
              <span className="text-emerald-400">18.5-24.9 Normal</span>
              <span className="text-amber-400">25-29.9 Over</span>
              <span className="text-rose-400">30+ High</span>
            </div>

            {/* Coach Insight */}
            <p className="text-xs text-zinc-300 bg-zinc-900 p-3 rounded-xl border border-zinc-800/80 leading-relaxed">
              <span className="font-bold text-amber-400">Coach Insight: </span>
              {bmiAdvice}
            </p>
          </div>

          {/* 3. BODY COMPOSITION BREAKDOWN (LEAN MASS VS FAT MASS) */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase text-[11px]">Calculated Body Composition</span>
              <span className="text-[10px] text-zinc-400 font-mono">Total {weightKg} kg</span>
            </div>

            {/* Stacked Ratio Bar */}
            <div className="h-4 rounded-xl overflow-hidden flex bg-zinc-900 border border-zinc-800">
              <div
                className="bg-emerald-500 text-black text-[9px] font-black flex items-center justify-center transition-all duration-500"
                style={{ width: `${100 - calculatedBodyFat}%` }}
                title={`Lean Body Mass: ${leanMassKg} kg`}
              >
                {100 - calculatedBodyFat > 20 && `LEAN ${100 - calculatedBodyFat}%`}
              </div>
              <div
                className="bg-amber-500 text-black text-[9px] font-black flex items-center justify-center transition-all duration-500"
                style={{ width: `${calculatedBodyFat}%` }}
                title={`Fat Mass: ${fatMassKg} kg`}
              >
                {calculatedBodyFat > 15 && `FAT ${calculatedBodyFat}%`}
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-emerald-400 block uppercase font-sans font-bold">Lean Muscle Mass</span>
                <span className="text-base font-black text-white">{leanMassKg} kg</span>
                <span className="text-[9px] text-zinc-500 block font-sans">Skeletal & Organ Mass</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-amber-400 block uppercase font-sans font-bold">Adipose Fat Mass</span>
                <span className="text-base font-black text-white">{fatMassKg} kg</span>
                <span className="text-[9px] text-zinc-500 block font-sans">Essential + Storage Fat</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-sky-400 block uppercase font-sans font-bold">Ideal Weight Range</span>
                <span className="text-base font-black text-white">{minIdealWeightKg}-{maxIdealWeightKg} kg</span>
                <span className="text-[9px] text-zinc-500 block font-sans">For {heightCm}cm Frame</span>
              </div>
            </div>
          </div>

          {/* 4. METABOLIC TARGETS & MACRO ENGINE */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase text-[11px]">Energy Expenditure (TDEE & BMR)</span>
              <span className="text-amber-400 text-[10px] font-mono font-bold">Mifflin-St Jeor</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-zinc-900">
                <span className="text-[10px] text-zinc-500 block uppercase font-sans">Basal BMR</span>
                <span className="text-sm font-bold text-white">{bmr}</span>
                <span className="text-[9px] text-zinc-500 block">kcal/day</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900">
                <span className="text-[10px] text-zinc-500 block uppercase font-sans">Maintenance TDEE</span>
                <span className="text-sm font-bold text-white">{tdee}</span>
                <span className="text-[9px] text-zinc-500 block">kcal/day</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-[10px] text-amber-400 block uppercase font-sans font-bold">Target Calories</span>
                <span className="text-sm font-bold text-amber-400">{recommendedDailyCalories}</span>
                <span className="text-[9px] text-amber-300/80 block">kcal/day</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 gap-2 border-t border-zinc-900">
              <span>
                Daily Protein Intake Goal: <strong className="text-white font-mono">{dailyProteinGrams}g</strong> (2.0g/kg)
              </span>
              {calcMode === 'goal_planner' && (
                <span className="text-emerald-400 font-bold">
                  Estimated Timeline: ~{estimatedWeeks} Weeks to {targetWeightKg}kg
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiBodyFatCalculator;
