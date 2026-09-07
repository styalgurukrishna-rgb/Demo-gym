import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowUp, 
  Clock, 
  CheckCircle2, 
  Send,
  Globe,
  ArrowRight
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';
import { PageType, ModalState, GymConfig } from '../types';
import { gymConfigStore } from '../services/gymConfigStore';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundManager.playSuccess();
    setIsSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: PageType) => {
    soundManager.playClick();
    onNavigate(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800 text-zinc-400 overflow-hidden pt-16 pb-24 lg:pb-12">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White-Label Demo Inquiry Banner */}
        {config.demoMode && !config.whiteLabelMode && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Client Demo
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white uppercase">
                  Ready to create your own gym website?
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5 max-w-xl">
                  Replace the demo branding with your gym name, logo, programs, trainers, membership plans, photos and contact details.
                </p>
              </div>
            </div>

            <button
              id="footer-create-gym-website-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenModal('demoInquiry');
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>CREATE MY GYM WEBSITE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Newsletter */}
        <div className="mb-14 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Ahead in Sports Science</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              Subscribe for Weekly Workout Splits & Diet Guides
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Join 5,000+ fitness enthusiasts receiving science-backed routines directly from our master coaches.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {isSubscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed to {config.brand.gymName} Guides!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-3 px-5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 text-black hover:bg-amber-400 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Info & Hours */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 p-[1px]">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                  {config.brand.logoUrl ? (
                    <img src={config.brand.logoUrl} alt={config.brand.gymName} className="w-full h-full object-cover" />
                  ) : (
                    <Dumbbell className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </div>
              <span className="font-black text-xl text-white tracking-wider uppercase">
                {config.brand.gymName}
              </span>
            </div>

            <p className="text-xs text-zinc-300 font-light max-w-sm leading-relaxed">
              "{config.brand.tagline || 'Transform Your Body. Build Your Confidence. Become Your Best Version.'}" <br />
              {config.brand.aboutText || "Bangalore's premier athletic sanctuary. Italian Panatta biomechanics, CSCS master trainers, and 24/7 recovery spa."}
            </p>

            {/* Opening Hours Box */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Operating Hours</span>
              </div>
              <p className="text-xs text-zinc-300 font-mono">
                Daily: <span className="text-amber-400 font-bold">{config.contact.hours || '5:00 AM - 11:00 PM'}</span>
              </p>
              <p className="text-[10px] text-zinc-500">
                *24/7 Biometric RFID Access for VIP Annual Members
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={config.contact.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={config.contact.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={config.contact.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Website Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handlePageClick('home')} className="hover:text-amber-400 transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('about')} className="hover:text-amber-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('programs')} className="hover:text-amber-400 transition-colors">Programs</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('trainers')} className="hover:text-amber-400 transition-colors">Master Trainers</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('facilities')} className="hover:text-amber-400 transition-colors">Facilities</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('gallery')} className="hover:text-amber-400 transition-colors">Gallery</button>
              </li>
            </ul>
          </div>

          {/* Portals & Conversion */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Booking & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handlePageClick('pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing Plans</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('booking')} className="hover:text-white font-bold text-amber-400 transition-colors cursor-pointer">Book Free Trial</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Us</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => handlePageClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</button>
              </li>
            </ul>
          </div>

          {/* Pricing & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Location & Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="block text-[11px] text-zinc-300">{config.contact.address || 'Indiranagar 100ft Road, Bangalore'}</span>
              </li>
              <li>
                <a href={CONTACT_CONFIG.getTelUrl()} className="block text-[11px] text-amber-400 font-mono hover:underline">
                  {config.contact.phone || CONTACT_CONFIG.displayPhone}
                </a>
              </li>
              <li>
                <a href={CONTACT_CONFIG.getMailtoUrl()} className="block text-[11px] text-zinc-400 hover:text-white transition-colors">
                  {config.contact.email || CONTACT_CONFIG.email}
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onOpenModal('join')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider shadow-md active:scale-95 transition-all"
                >
                  JOIN ONLINE NOW
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {config.brand.gymName}. All Rights Reserved. Built for High-Acquisition Gym Operations.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Open 24/7 • Staffed {config.contact.hours || '5 AM - 11 PM'}</span>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
