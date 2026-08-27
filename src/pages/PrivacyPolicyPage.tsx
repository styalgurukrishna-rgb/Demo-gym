import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, Database, Cookie, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { PageType, GymConfig } from '../types';
import { gymConfigStore } from '../services/gymConfigStore';
import { soundManager } from '../components/common/SoundEffects';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageType) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newCfg) => setConfig(newCfg));
    return () => unsub();
  }, []);

  const gymName = config.brand.gymName || 'KSG DEMO GYM';
  const email = config.contact.email || 'concierge@demogym.com';
  const phone = config.contact.phone || '+91 98765 00000';
  const address = config.contact.address || 'Bangalore, India';

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            id="privacy-back-home-btn"
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Privacy <span className="text-amber-400">Policy</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Applicable to {gymName}
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
          {/* Section 1: Overview */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <Lock className="w-5 h-5" /> 1. Commitment to Member Privacy
            </h2>
            <p>
              At <strong className="text-white font-semibold">{gymName}</strong>, we respect your personal privacy and are committed to safeguarding the personal data you share with us. This Privacy Policy governs our practices concerning data collection, storage, processing, and communication across our website, mobile booking flows, and facility services.
            </p>
          </section>

          {/* Section 2: Data We Collect */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <Database className="w-5 h-5" /> 2. Information We Collect
            </h2>
            <p className="mb-4">We collect information strictly necessary to provide customized fitness training and membership privileges:</p>
            <ul className="space-y-2.5 list-disc list-inside text-zinc-300">
              <li><strong className="text-white">Contact & Identity Details:</strong> Full Name, Email Address, Contact Phone Number, and Age.</li>
              <li><strong className="text-white">Booking & Fitness Goals:</strong> Preferred session dates, preferred time slots, trainer selections, and personal fitness goals (e.g. Muscle Gain, Fat Loss).</li>
              <li><strong className="text-white">Transaction Information:</strong> Membership tier selections, invoice timestamps, and payment verification IDs (card/UPI credentials are never stored on our servers).</li>
              <li><strong className="text-white">Technical Data:</strong> Anonymized usage logs, device parameters, and essential cookie preferences.</li>
            </ul>
          </section>

          {/* Section 3: Usage of Data */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <Eye className="w-5 h-5" /> 3. How We Use Your Information
            </h2>
            <ul className="space-y-2.5 list-disc list-inside text-zinc-300">
              <li>To confirm free 1-day passes and scheduled personal training appointments.</li>
              <li>To provide workout splits, biometric progress logs, and concierge support via WhatsApp or email.</li>
              <li>To deliver automated booking reminders and calendar integration files (.ics).</li>
              <li>To prevent fraudulent access, unauthorized double-booking, and bot submissions.</li>
            </ul>
          </section>

          {/* Section 4: Cookies & Analytics */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <Cookie className="w-5 h-5" /> 4. Cookies & Analytics Technologies
            </h2>
            <p className="mb-3">
              We employ essential browser storage to preserve session state (such as sound preference and authentication tokens) and optional analytics to monitor page responsiveness. You can adjust your consent at any time through our cookie preference banner.
            </p>
            <p>
              We do not sell, rent, or lease member data to any third-party advertisers or marketing aggregators.
            </p>
          </section>

          {/* Section 5: Data Security & Rights */}
          <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" /> 5. Your Rights & Data Security
            </h2>
            <p className="mb-3">
              You retain full rights to request access, correction, or deletion of your stored records. You may also request data export of your historical logs or opt out of automated messaging reminders at any time.
            </p>
          </section>

          {/* Section 6: Contact Us */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-4 text-amber-400">
              6. Data Privacy Contact Information
            </h2>
            <p className="mb-4">
              For any questions regarding this Privacy Policy or your stored records, reach out directly to the <strong className="text-white">{gymName}</strong> privacy officer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-start gap-2.5 text-zinc-300 sm:col-span-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
