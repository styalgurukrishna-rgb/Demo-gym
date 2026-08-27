import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Navigation
} from 'lucide-react';
import { PageType, ModalState, GymConfig } from '../types';
import { leadStore } from '../services/leadStore';
import { gymConfigStore } from '../services/gymConfigStore';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      leadStore.addLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: 'contact',
        status: 'New',
        notes: `Subject: ${formData.subject}. Message: ${formData.message}`
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi ${config.brand.gymName}! I would like to inquire about membership and training packages.`;
    const num = (config.whatsapp.number || '+919876543210').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Building2 className="w-4 h-4" /> Always Accessible
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            CONTACT <span className="text-amber-400">{config.brand.gymName}</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Have questions about memberships, coaching, or corporate athletic programs? Connect with our team 24/7.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>CHAT ON WHATSAPP</span>
            </button>
            <a
              href={`tel:${config.contact.phone || '+91 98765 43210'}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-800 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>CALL: {config.contact.phone || '+91 98765 43210'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONTACT FORM & LOCATION GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 sm:p-10 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-2">
                Send Us a Message
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mb-8">
                Fill in the form below and our Front Desk Concierge will respond within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-zinc-950 border border-amber-500/50 text-center">
                  <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white uppercase">Message Sent Successfully!</h3>
                  <p className="text-zinc-400 text-xs mt-2 max-w-sm mx-auto">
                    Thank you {formData.name}. Our Master Coach or Membership Concierge is reviewing your message.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Membership Inquiry', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Personal Trainer Booking">Personal Trainer Booking</option>
                        <option value="1-Day Free Trial">1-Day Free Trial</option>
                        <option value="Corporate Wellness">Corporate Wellness</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Your Message / Fitness Goals
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you are aiming to achieve or any questions you have..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Location & Gym Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Card */}
            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white uppercase">Facility Headquarters</h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200 block">Address</span>
                    <span className="text-zinc-400">{config.contact.address || 'Indiranagar 100ft Road, Bangalore'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200 block">Operating Hours</span>
                    <span className="text-zinc-400">{config.contact.hours || '5:00 AM - 11:00 PM'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200 block">Phone</span>
                    <span className="text-zinc-400">{config.contact.phone || '+91 98765 43210'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200 block">Email</span>
                    <span className="text-zinc-400">{config.contact.email || 'contact@ksggym.com'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual */}
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
              <div className="relative h-48 bg-zinc-950 flex items-center justify-center p-6 text-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')` }}
                />
                <div className="relative z-10">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-bounce" />
                  <h4 className="text-sm font-bold text-white uppercase">Platinum Avenue, Cyber City</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Valet Parking Available for VIP Members</p>
                </div>
              </div>
              <div className="p-4 bg-zinc-950/80 flex items-center justify-between">
                <span className="text-xs text-zinc-400">5 Mins from Metro Station</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
