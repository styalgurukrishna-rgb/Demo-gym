import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Phone, ArrowRight, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { soundManager } from '../common/SoundEffects';

interface MemberLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const MemberLoginModal: React.FC<MemberLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [phone, setPhone] = useState('7549929102');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleQuickDemo = () => {
    soundManager.playClick();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md rounded-3xl bg-[#101014] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          id="member-login-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>KSG Member Portal</span>
          </div>
          <h3 className="text-2xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
            MEMBER <span className="text-[#D4AF37]">LOGIN</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Access your personalized workout splits, InBody scan reports, and trainer schedule.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Registered Mobile Number</span>
            </label>
            <input
              id="member-login-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 75499 29102"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Password / Biometric PIN</span>
            </label>
            <input
              id="member-login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#EF4444]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-black/40" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-[#D4AF37] hover:underline">
              Forgot PIN?
            </button>
          </div>

          {/* Submit */}
          <button
            id="member-login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/30 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>ENTER MEMBER PORTAL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Demo Login Pill for Instant Agency Demonstration */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <button
            id="member-login-demo-instant-btn"
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-3 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>⚡ 1-Click Demo Login (Karan Malhotra)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
