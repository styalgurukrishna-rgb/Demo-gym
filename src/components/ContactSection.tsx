import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_INFO } from '../data/gymData';
import { leadStore } from '../services/leadStore';
import { soundManager } from './common/SoundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    soundManager.playClick();
    setIsSubmitting(true);

    leadStore.addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: 'contact',
      status: 'New',
      notes: formData.message || 'Direct inquiry via contact section form',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#EF4444', '#FFFFFF'],
        });
      } catch (e) {
        // safe fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0A0A0C] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-[#EF4444]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-bold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Concierge Line</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            GET IN <span className="bg-gradient-to-r from-white via-[#FFF8D6] to-[#D4AF37] bg-clip-text text-transparent">TOUCH</span>
          </h2>

          <p className="mt-4 text-base text-neutral-400 font-light">
            Have questions about private personal training, corporate memberships, or scheduling a facility visit? We are at your service.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Contact Form */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Gym Info & Location Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#111114] border border-white/10 shadow-2xl space-y-6">
              <h3 className="text-xl font-black font-['Syne',sans-serif] uppercase tracking-wide text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Headquarters & Club</span>
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Location</p>
                    <p className="text-sm font-medium text-white mt-0.5">{GYM_INFO.address}</p>
                    <span className="text-[11px] text-[#D4AF37] font-semibold">Valet Parking Available</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF4444] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Phone / WhatsApp</p>
                    <a
                      href={`tel:${GYM_INFO.phone}`}
                      className="text-sm font-medium text-white hover:text-[#EF4444] transition-colors mt-0.5 block"
                    >
                      {GYM_INFO.phone}
                    </a>
                    <span className="text-[11px] text-neutral-500">24/7 Member Helpline</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Email Inquiry</p>
                    <a
                      href={`mailto:${GYM_INFO.email}`}
                      className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors mt-0.5 block"
                    >
                      {GYM_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Operating Hours</p>
                    <p className="text-sm font-medium text-white mt-0.5">{GYM_INFO.hours}</p>
                    <span className="text-[11px] text-emerald-400 font-semibold">Open 365 Days / Year</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Action */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hi%20KSG%20Gym%2C%20I%20would%20like%20to%20inquire%20about%20membership`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111114] border border-white/10 shadow-2xl relative">
              {!isSuccess ? (
                <form id="contact-inquiry-form" onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black font-['Syne',sans-serif] uppercase tracking-wide text-white">
                    Send Us A Message
                  </h3>
                  <p className="text-xs text-neutral-400 font-light -mt-3">
                    Our lead fitness consultant typically responds within 15 minutes during club operating hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-input-name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        id="contact-input-email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      id="contact-input-phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Your Message / Goals
                    </label>
                    <textarea
                      rows={4}
                      id="contact-input-message"
                      placeholder="Tell us about your fitness targets, schedule preference, or membership inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Animation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    MESSAGE DELIVERED
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                    Our fitness consultant has received your message and will contact you at <strong className="text-white">{formData.phone}</strong> shortly.
                  </p>

                  <div className="pt-4">
                    <button
                      id="contact-send-another-btn"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
