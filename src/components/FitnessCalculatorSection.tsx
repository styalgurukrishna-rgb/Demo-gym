import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  Flame, 
  Dumbbell, 
  Droplet, 
  Scale, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';

interface FitnessCalculatorSectionProps {
  onOpenTrialWithProgram?: (programName: string) => void;
  onOpenTrial: () => void;
}

export const FitnessCalculatorSection: React.FC<FitnessCalculatorSectionProps> = ({
  onOpenTrialWithProgram,
  onOpenTrial,
}) => {
  // Inputs
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [height, setHeight] = useState<number>(175); // cm
  const [weight, setWeight] = useState<number>(76); // kg
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // moderate
  const [goal, setGoal] = useState<'fat_loss' | 'hypertrophy' | 'recomp' | 'strength'>('hypertrophy');

  // Calculation state
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Result values
  const [results, setResults] = useState<{
    bmi: number;
    bmiCategory: string;
    bmiColor: string;
    bmr: number;
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
    waterLiters: number;
    recommendedProgram: string;
    recommendedProgramSubtitle: string;
  } | null>(null);

  const calculateFitnessBlueprint = () => {
    soundManager.playClick();
    setIsCalculating(true);

    setTimeout(() => {
      // 1. BMI = weight(kg) / (height(m)^2)
      const heightInMeters = height / 100;
      const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

      let bmiCategory = 'Healthy Weight';
      let bmiColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        bmiColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      } else if (bmi >= 25 && bmi < 29.9) {
        bmiCategory = 'Overweight / Muscular';
        bmiColor = 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30';
      } else if (bmi >= 30) {
        bmiCategory = 'High Body Mass';
        bmiColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      }

      // 2. BMR using Mifflin-St Jeor Equation
      // Men: 10*W + 6.25*H - 5*Age + 5
      // Women: 10*W + 6.25*H - 5*Age - 161
      let baseBmr = 10 * weight + 6.25 * height - 5 * age;
      if (gender === 'male') {
        baseBmr += 5;
      } else {
        baseBmr -= 161;
      }
      const bmr = Math.round(baseBmr);

      // 3. TDEE = BMR * Activity Level
      const tdee = Math.round(bmr * activityLevel);

      // 4. Target Calories & Macro Split based on Goal
      let targetCalories = tdee;
      let proteinMultiplier = 2.0; // g per kg of bodyweight
      let fatPercent = 0.25; // 25% of calories
      let recommendedProgram = 'Hypertrophy & Strength Architecture';
      let recommendedProgramSubtitle = 'Panatta Plate-Loaded Progressive Overload';

      if (goal === 'fat_loss') {
        targetCalories = Math.round(tdee * 0.80); // 20% deficit
        proteinMultiplier = 2.2; // High protein to preserve muscle
        fatPercent = 0.25;
        recommendedProgram = 'HIIT Cardio & Metabolic Shred Protocol';
        recommendedProgramSubtitle = 'VO2 Max Elevation & Curved Woodway Sprints';
      } else if (goal === 'hypertrophy') {
        targetCalories = Math.round(tdee * 1.10); // 10% lean surplus
        proteinMultiplier = 2.0;
        fatPercent = 0.25;
        recommendedProgram = 'Hypertrophy & Strength Architecture';
        recommendedProgramSubtitle = 'Panatta Biomechanical Hypertrophy Split';
      } else if (goal === 'recomp') {
        targetCalories = tdee; // Maintenance
        proteinMultiplier = 2.3;
        fatPercent = 0.25;
        recommendedProgram = 'VIP Elite 1-on-1 Recomposition';
        recommendedProgramSubtitle = 'Dedicated Coach & InBody 770 Biometrics';
      } else if (goal === 'strength') {
        targetCalories = Math.round(tdee * 1.15); // 15% surplus
        proteinMultiplier = 2.0;
        fatPercent = 0.30;
        recommendedProgram = 'Olympic Eleiko Powerlifting & Strength';
        recommendedProgramSubtitle = 'Competition Calibrated Barbells & Oak Platforms';
      }

      const proteinGrams = Math.round(weight * proteinMultiplier);
      const proteinCalories = proteinGrams * 4;
      const fatCalories = targetCalories * fatPercent;
      const fatsGrams = Math.round(fatCalories / 9);
      const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
      const carbsGrams = Math.round(remainingCalories / 4);

      // 5. Daily Water Intake (Weight * 0.045)
      const waterLiters = parseFloat((weight * 0.045).toFixed(1));

      setResults({
        bmi,
        bmiCategory,
        bmiColor,
        bmr,
        tdee,
        targetCalories,
        proteinGrams,
        carbsGrams,
        fatsGrams,
        waterLiters,
        recommendedProgram,
        recommendedProgramSubtitle,
      });

      setIsCalculating(false);
      setHasCalculated(true);
    }, 400);
  };

  const handleBookSuggestedProgram = () => {
    soundManager.playClick();
    if (results && onOpenTrialWithProgram) {
      onOpenTrialWithProgram(results.recommendedProgram);
    } else {
      onOpenTrial();
    }
  };

  return (
    <section id="calculator" className="relative py-24 bg-[#080808] border-t border-white/10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#EF4444]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-[#D4AF37]/10">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Biometric Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
            CALCULATE YOUR <br />
            <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              FITNESS GOAL & MACROS
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light">
            Enter your biometric data to generate an instant metabolic caloric blueprint, macro distribution, and tailored KSG workout program.
          </p>
        </div>

        {/* Two-Column Interactive Tool Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (Cols 1-6) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#121217] border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-black font-['Syne',sans-serif] text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#D4AF37]" />
                <span>Your Biometrics</span>
              </h3>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Step 1 of 2
              </span>
            </div>

            {/* Gender Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    gender === 'male'
                      ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white border-red-500 shadow-md shadow-red-600/30'
                      : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    gender === 'female'
                      ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white border-red-500 shadow-md shadow-red-600/30'
                      : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age, Height, Weight Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Age (Yrs)
                </label>
                <input
                  type="number"
                  min="14"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Math.max(14, Math.min(80, parseInt(e.target.value) || 25)))}
                  className="w-full py-3 px-3.5 rounded-xl bg-black/40 border border-white/15 text-white font-mono font-bold text-center focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Height */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="130"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Math.max(120, Math.min(230, parseInt(e.target.value) || 170)))}
                  className="w-full py-3 px-3.5 rounded-xl bg-black/40 border border-white/15 text-white font-mono font-bold text-center focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Weight */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="35"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(35, Math.min(220, parseInt(e.target.value) || 70)))}
                  className="w-full py-3 px-3.5 rounded-xl bg-black/40 border border-white/15 text-white font-mono font-bold text-center focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Primary Goal Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Primary Fitness Goal
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'fat_loss', label: 'Fat Loss & Shred', desc: 'Burn fat, retain muscle' },
                  { id: 'hypertrophy', label: 'Muscle Hypertrophy', desc: 'Build size & symmetry' },
                  { id: 'recomp', label: 'Body Recomposition', desc: 'Lose fat, gain muscle' },
                  { id: 'strength', label: 'Peak Power & Strength', desc: 'Heavy progressive lifts' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      goal === g.id
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">{g.label}</span>
                    <span className="block text-[10px] text-neutral-400">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Level Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Daily Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                className="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/15 text-neutral-200 text-xs font-medium focus:border-[#D4AF37] focus:outline-none cursor-pointer"
              >
                <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
                <option value={1.375}>Lightly Active (1-3 gym workouts/week)</option>
                <option value={1.55}>Moderately Active (3-5 intense gym sessions/week)</option>
                <option value={1.725}>Very Active (6-7 heavy lifting/athletic sessions/week)</option>
                <option value={1.9}>Elite Athlete (2x day training or manual labor)</option>
              </select>
            </div>

            {/* Calculate Button */}
            <button
              id="calc-submit-btn"
              type="button"
              onClick={calculateFitnessBlueprint}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/60 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-400/30"
            >
              <Sparkles className="w-4 h-4 text-[#FDE047] animate-pulse" />
              <span>{isCalculating ? 'CALCULATING BLUEPRINT...' : 'CALCULATE MY BLUEPRINT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Dynamic Results Dashboard (Cols 7-12) */}
          <div className="lg:col-span-6">
            {!hasCalculated || !results ? (
              <div className="p-10 rounded-3xl bg-[#121217] border border-dashed border-white/15 text-center flex flex-col items-center justify-center min-h-[460px] space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                  <Calculator className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div className="max-w-sm space-y-1">
                  <h4 className="text-lg font-bold text-white font-['Syne',sans-serif]">
                    Your Customized Results Will Appear Here
                  </h4>
                  <p className="text-xs text-neutral-400 font-light">
                    Adjust your age, height, weight, and fitness target on the left, then click <strong>Calculate My Blueprint</strong>.
                  </p>
                </div>
                <button
                  onClick={calculateFitnessBlueprint}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Load Sample Calculation
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#16161D] via-[#121217] to-[#0E0E12] border border-[#D4AF37]/40 shadow-2xl space-y-6"
              >
                {/* Result Top Stats Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
                      Generated Protocol
                    </span>
                    <h3 className="text-xl font-black font-['Syne',sans-serif] text-white">
                      Your Daily Target Blueprint
                    </h3>
                  </div>

                  <div className={`px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${results.bmiColor}`}>
                    BMI: {results.bmi} • {results.bmiCategory}
                  </div>
                </div>

                {/* Primary Numbers: Target Calories & TDEE */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Daily Calorie Target</span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
                      {results.targetCalories} <span className="text-xs text-neutral-400 font-sans">kcal</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">Target for your goal</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Maintenance (TDEE)</span>
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                      {results.tdee} <span className="text-xs text-neutral-400 font-sans">kcal</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">BMR: {results.bmr} kcal</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Hydration Target</span>
                    <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono block flex items-center gap-1">
                      <Droplet className="w-5 h-5 fill-current" />
                      {results.waterLiters} <span className="text-xs text-neutral-400 font-sans">L/day</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">Optimizes metabolic rate</span>
                  </div>
                </div>

                {/* Daily Macronutrient Distribution */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                    Target Macronutrient Split
                  </span>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Protein */}
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <span className="text-[10px] uppercase font-extrabold text-red-400 block">PROTEIN</span>
                      <span className="text-xl font-black text-white font-mono">{results.proteinGrams}g</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Muscle Synthesis</span>
                    </div>

                    {/* Carbs */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-[10px] uppercase font-extrabold text-[#D4AF37] block">CARBS</span>
                      <span className="text-xl font-black text-white font-mono">{results.carbsGrams}g</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Glycogen Energy</span>
                    </div>

                    {/* Fats */}
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-[10px] uppercase font-extrabold text-purple-400 block">HEALTHY FATS</span>
                      <span className="text-xl font-black text-white font-mono">{results.fatsGrams}g</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">Hormone Balance</span>
                    </div>
                  </div>
                </div>

                {/* Recommended KSG Training Program */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201410] to-[#16121D] border border-[#D4AF37]/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      Recommended Training Split
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">99% Match</span>
                  </div>

                  <h4 className="text-base font-black text-white font-['Syne',sans-serif]">
                    {results.recommendedProgram}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light">
                    {results.recommendedProgramSubtitle}
                  </p>
                </div>

                {/* Instant Action CTA */}
                <div className="pt-2">
                  <button
                    id="calc-claim-trial-btn"
                    onClick={handleBookSuggestedProgram}
                    className="w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/60 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CLAIM FREE TRIAL FOR THIS PROTOCOL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
