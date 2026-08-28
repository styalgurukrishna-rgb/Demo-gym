import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, MessageCircle, Send, Globe, Building2, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundManager } from '../common/SoundEffects';
import { leadStore } from '../../services/leadStore';
import { gymConfigStore } from '../../services/gymConfigStore';

interface DemoInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoInquiryModal: React.FC<DemoInquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    gymName: '',
    phone: '',
    email: '',
    currentWebsite: '',
    serviceType: 'Complete Gym Website' as const,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.gymName.trim()) errs.gymName = 'Please provide your gym or business name';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Valid phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundManager.playError();
      return;
    }

    setIsSubmitting(true);
    soundManager.playClick();

    setTimeout(() => {
      leadStore.addDemoInquiry({
        name: formData.name,
        gymName: formData.gymName,
        phone: formData.phone,
        email: formData.email,
        currentWebsite: formData.currentWebsite,
        serviceType: formData.serviceType,
        message: formData.message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playSuccess();
    }, 600);
  };

  const handleWhatsAppChat = () => {
    soundManager.playClick();
    const msg = `Hello! I would like to get a high-converting gym website like the demo for my gym: ${formData.gymName || 'My Gym'}. (Name: ${formData.name || 'Owner'})`;
    window.open(gymConfigStore.getWhatsAppUrl(msg), '_blank');
  };

  const handleResetAndClose = () => {
    soundManager.playClick();
    setIsSuccess(false);
    setFormData({
      name: '',
      gymName: '',
      phone: '',
      email: '',
      currentWebsite: '',
      serviceType: 'Complete Gym Website',
      message: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 overflow-hidden my-8"
        >
          {/* Top Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/20 to-transparent blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="close-demo-inquiry-modal-btn"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Header */}
              <div className="mb-6 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>White-Label Gym System</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Let's Build Your Gym's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Online Presence</span>
                </h2>
                <p className="text-zinc-400 text-sm mt-1.5">
                  Get a turn-key, high-converting digital platform tailored for your brand with online bookings, membership tiers, and CRM.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="inquiry-name-input"
                      type="text"
                      placeholder="e.g. Vikram Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900 border ${
                        errors.name ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                      } text-white text-sm outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Gym Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Gym / Studio Name <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="inquiry-gym-name-input"
                        type="text"
                        placeholder="e.g. Titan Athletic Club - Patna"
                        value={formData.gymName}
                        onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border ${
                          errors.gymName ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                        } text-white text-sm outline-none transition-colors`}
                      />
                    </div>
                    {errors.gymName && <p className="text-red-400 text-xs mt-1">{errors.gymName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Phone Number (WhatsApp) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="inquiry-phone-input"
                        type="tel"
                        placeholder="e.g. +91 75499 29102"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border ${
                          errors.phone ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                        } text-white text-sm outline-none transition-colors`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="inquiry-email-input"
                        type="email"
                        placeholder="e.g. owner@mygym.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border ${
                          errors.email ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                        } text-white text-sm outline-none transition-colors`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Website */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Current Website (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="inquiry-current-website-input"
                        type="text"
                        placeholder="e.g. instagram.com/mygym"
                        value={formData.currentWebsite}
                        onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* What would you like to improve? */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      What would you like to build?
                    </label>
                    <select
                      id="inquiry-service-type-select"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none transition-colors"
                    >
                      <option value="Complete Gym Website">Complete Gym Website (Full System)</option>
                      <option value="New Website">New Modern Gym Website</option>
                      <option value="Redesign Existing Website">Redesign Existing Website</option>
                      <option value="Online Booking">Online Trial & Session Booking</option>
                      <option value="Membership System">Membership & Lead CRM System</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Any Specific Requirements or Questions?
                  </label>
                  <textarea
                    id="inquiry-message-input"
                    rows={2}
                    placeholder="Tell us about your gym location, member capacity, or special features you'd like..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none transition-colors"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    id="submit-inquiry-request-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Proposal...</span>
                    ) : (
                      <>
                        <span>REQUEST MY WEBSITE</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-zinc-500 mt-2.5 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Confidential proposal. We respect your business privacy.</span>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 px-2 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Request Received Successfully!
              </h3>
              <p className="text-zinc-300 text-base max-w-md mx-auto mt-3">
                Thank you! We'll contact you shortly to discuss your custom gym website and review your requirements.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="inquiry-success-whatsapp-btn"
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CONNECT ON WHATSAPP NOW</span>
                </button>
                <button
                  id="inquiry-success-close-btn"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
