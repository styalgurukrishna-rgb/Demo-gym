import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, ExternalLink, Sparkles } from 'lucide-react';
import { gymConfigStore } from '../services/gymConfigStore';
import { GymConfig } from '../types';
import { soundManager } from './common/SoundEffects';
import { analytics } from '../utils/analytics';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface FindOurGymSectionProps {
  onBookTour?: () => void;
}

export const FindOurGymSection: React.FC<FindOurGymSectionProps> = ({ onBookTour }) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const mapsUrl = config.contact.googleMapsUrl || 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${config.brand.gymName} ${config.contact.address || config.contact.city || 'Bangalore'}`
    )}`;

  const handleDirectionsClick = () => {
    soundManager.playClick();
    analytics.trackEvent('directions_click', {
      gymName: config.brand.gymName,
      destination: config.contact.address,
    });
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    soundManager.playClick();
    analytics.trackEvent('call_click', {
      phone: config.contact.phone,
    });
  };

  return (
    <section id="find-our-gym" className="relative py-20 bg-zinc-950/95 border-t border-zinc-800 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>FIND OUR GYM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            VISIT OUR <span className="bg-gradient-to-r from-white via-[#FFF8D6] to-amber-400 bg-clip-text text-transparent">SANCTUARY</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto">
            Conveniently located in the heart of the city with dedicated valet parking, high-speed transit access, and round-the-clock security.
          </p>
        </div>

        {/* Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Information Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black font-['Syne',sans-serif] uppercase tracking-wide text-white">
                    {config.brand.gymName} HQ
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Open Today
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">Facility Address</p>
                  <p className="text-sm font-semibold text-white mt-1 leading-snug">
                    {config.contact.address || `${config.contact.city}, India`}
                  </p>
                  <p className="text-[11px] text-amber-400/90 font-medium mt-1">
                    Valet Parking & EV Charging Available On-Site
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">Opening Hours</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {config.contact.openingHours || '5:00 AM - 11:00 PM (Daily)'}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Staffed Concierge: Mon–Sat 6:00 AM – 10:00 PM
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">Direct Concierge Helpline</p>
                  <a
                    href={CONTACT_CONFIG.getTelUrl()}
                    onClick={handleCallClick}
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-1 block"
                  >
                    {config.contact.phone || CONTACT_CONFIG.displayPhone}
                  </a>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Call anytime for guest passes & scheduling
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="find-gym-get-directions-btn"
                  onClick={handleDirectionsClick}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl font-black text-xs uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 fill-black" />
                  <span>GET DIRECTIONS</span>
                </button>

                {onBookTour && (
                  <button
                    id="find-gym-book-tour-btn"
                    onClick={onBookTour}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>SCHEDULE VISIT</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl group">
              {/* Map Preview Background */}
              <div 
                className="h-80 sm:h-96 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
                }}
              >
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute inset-0 bg-zinc-950/20" />
              </div>

              {/* Pin Indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-2xl bg-amber-500 text-black flex items-center justify-center shadow-2xl shadow-amber-500/50 mb-3"
                >
                  <MapPin className="w-7 h-7 fill-black" />
                </motion.div>

                <div className="px-4 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-xl max-w-xs">
                  <p className="text-xs font-black uppercase text-white tracking-wide">
                    {config.brand.gymName}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {config.contact.city}, India
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Map Preview</span>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectionsClick}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
