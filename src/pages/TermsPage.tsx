import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, AlertCircle, RefreshCw, Dumbbell, ShieldAlert, ArrowLeft, Mail, Phone } from 'lucide-react';
import { PageType, GymConfig } from '../types';
import { gymConfigStore } from '../services/gymConfigStore';
import { soundManager } from '../components/common/SoundEffects';

interface TermsPageProps {
  onNavigate: (page: PageType) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newCfg) => setConfig(newCfg));
    return () => unsub();
  }, []);

  const gymName = config.brand.gymName || 'KSG DEMO GYM';
  const email = config.contact.email || 'contact@ksgdemogym.com';
  const phone = config.contact.phone || '+91 75499 29102';

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            id="terms-back-home-btn"
            onClick={() => {
              soundManager.playClick();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-zinc-800 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Facility Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Terms & <span className="text-amber-400">Conditions</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {gymName} Rules & Membership Guidelines
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
          {/* Section 1: Acceptance */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-5 h-5" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing the <strong className="text-white font-semibold">{gymName}</strong> website, reserving trial passes, or enrolling in any membership tier, you agree to be bound by these Terms & Conditions, all applicable municipal laws, and our posted facility safety guidelines.
            </p>
          </section>

          {/* Section 2: Facility Code of Conduct */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <Dumbbell className="w-5 h-5" /> 2. Facility Code of Conduct & Etiquette
            </h2>
            <ul className="space-y-2.5 list-disc list-inside text-zinc-300">
              <li><strong className="text-white">Appropriate Attire:</strong> Clean athletic apparel and closed-toe training footwear must be worn at all times on the lifting floor.</li>
              <li><strong className="text-white">Equipment Care:</strong> Members are required to re-rack weights and wipe down machines after use using the provided sanitizing stations.</li>
              <li><strong className="text-white">Mutual Respect:</strong> Harassment, aggressive behavior, or disruptive conduct toward fellow members or staff results in immediate membership termination.</li>
            </ul>
          </section>

          {/* Section 3: Bookings & Free Trials */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <RefreshCw className="w-5 h-5" /> 3. Bookings, Free Trials & Rescheduling
            </h2>
            <p className="mb-3">
              Free 1-Day Trial passes are valid for one-time use per individual upon initial identity verification at the front desk.
            </p>
            <p>
              Personal training appointments can be rescheduled up to 4 hours in advance through the member dashboard or directly via concierge WhatsApp.
            </p>
          </section>

          {/* Section 4: Membership Fees & Cancellations */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-5 h-5" /> 4. Fees, Billing & Cancellation Policies
            </h2>
            <p className="mb-3">
              Membership fees are billed according to your selected plan (Monthly, Quarterly, or Annual). Zero hidden enrollment fees apply.
            </p>
            <p>
              Annual memberships include a complimentary 30-day medical freeze option upon presentation of valid medical certification.
            </p>
          </section>

          {/* Section 5: Physical Activity & Health Disclaimer */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-5 h-5" /> 5. Health & Physical Activity Disclaimer
            </h2>
            <p>
              You acknowledge that intense physical exercise, weightlifting, and athletic training involve inherent risks. We strongly recommend consulting a physician before starting any rigorous fitness or nutrition regimen. Members voluntarily assume all risks associated with facility workouts.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 text-amber-400">
              6. Questions About Terms
            </h2>
            <p className="mb-4">
              For any clarification regarding memberships, contracts, or facility rules:
            </p>
            <div className="flex flex-wrap gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{phone}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
