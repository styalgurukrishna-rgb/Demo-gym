import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Dumbbell, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Calendar,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from './common/SoundEffects';
import { PageType, ModalState, GymConfig } from '../types';
import { gymConfigStore } from '../services/gymConfigStore';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const navLinks: { name: string; page: PageType }[] = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Programs', page: 'programs' },
    { name: 'Trainers', page: 'trainers' },
    { name: 'Facilities', page: 'facilities' },
    { name: 'Pricing', page: 'pricing' },
    { name: 'Booking', page: 'booking' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    soundManager.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 py-2.5 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Fixed to Left */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0 cursor-pointer text-left select-none min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                {config.brand.logoUrl ? (
                  <img src={config.brand.logoUrl} alt={config.brand.gymName} className="w-full h-full object-cover" />
                ) : (
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-black tracking-wider text-sm sm:text-base md:text-lg text-white flex items-center gap-1 uppercase truncate">
                {config.brand.gymName}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.18em] text-zinc-400 font-bold uppercase -mt-0.5 truncate max-w-[130px] sm:max-w-[180px]">
                {config.brand.tagline || 'Luxury Fitness Platform'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/40 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls - Desktop */}
          <div className="hidden xl:flex items-center gap-2.5">
            {/* Sound FX Toggle */}
            <button
              id="nav-sound-toggle-btn"
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            </button>

            {/* Free Trial CTA */}
            <button
              id="nav-trial-btn-desktop"
              onClick={() => handleNavClick('booking')}
              onMouseEnter={() => soundManager.playHover()}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-200 hover:text-white hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Book Free Trial
            </button>

            {/* Join Now */}
            <button
              id="nav-join-now-btn-desktop"
              onClick={() => onOpenModal('join')}
              onMouseEnter={() => soundManager.playHover()}
              className="relative group overflow-hidden px-4.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>JOIN NOW</span>
            </button>
          </div>

          {/* Tablet & Mobile Header Action Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Tablet-only quick sound toggle */}
            <button
              id="tablet-sound-toggle-btn"
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="hidden sm:flex p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Tablet-only quick Join button */}
            <button
              id="tablet-join-now-btn"
              onClick={() => onOpenModal('join')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>JOIN NOW</span>
            </button>

            <button
              id="hamburger-menu-btn"
              aria-label="Toggle navigation menu"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-900/90 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-800 text-white transition-all cursor-pointer focus:outline-none shrink-0 shadow-md"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <div className="flex flex-col gap-1.5 items-center justify-center w-6">
                  <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
                  <span className="w-5 h-0.5 bg-amber-400 rounded-full transition-all" />
                  <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-sm z-50 bg-zinc-950 border-l border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto xl:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center p-[1.5px] shrink-0">
                      <div className="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
                        <Dumbbell className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans font-black text-sm text-white uppercase tracking-wider truncate">
                        KSG <span className="text-amber-400">DEMO</span> GYM
                      </span>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                        Navigation Menu
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleSound}
                      title={isMuted ? "Enable Sound" : "Mute Sound"}
                      className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    </button>
                    <button
                      id="close-mobile-menu-btn"
                      aria-label="Close menu"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center border border-zinc-800"
                    >
                      <X className="w-5 h-5 text-zinc-300 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Primary Menu Navigation Items */}
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = currentPage === link.page;
                    return (
                      <button
                        key={link.name}
                        id={`mobile-nav-${link.page}`}
                        onClick={() => handleNavClick(link.page)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                            : 'text-zinc-200 hover:text-white hover:bg-zinc-900/80 active:bg-zinc-800'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-black" />}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Customer Contact in Mobile Drawer */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2">
                  <a
                    href={CONTACT_CONFIG.getTelUrl()}
                    onClick={() => {
                      soundManager.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call: {CONTACT_CONFIG.displayPhone}</span>
                  </a>

                  <a
                    href={CONTACT_CONFIG.getWhatsAppUrl("Hello KSG DEMO GYM, I would like to book a visit and inquire about memberships.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      soundManager.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-500/30 text-emerald-400 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 text-center">
                    <span className="text-[10px] text-zinc-400 font-medium flex items-center justify-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Mon–Sat 5am–11pm • Sun 6am–9pm</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions - JOIN NOW & Book Trial */}
              <div className="pt-4 mt-4 border-t border-zinc-800 space-y-2.5">
                <button
                  id="drawer-join-now-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal('join');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>JOIN NOW</span>
                </button>

                <button
                  id="drawer-free-trial-btn"
                  onClick={() => handleNavClick('booking')}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-neutral-200 font-bold text-xs uppercase tracking-wider border border-zinc-700/80 active:scale-98 transition-transform cursor-pointer"
                >
                  Book Free 1-Day Trial Pass
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
