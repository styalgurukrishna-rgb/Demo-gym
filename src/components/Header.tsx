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

export interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
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
      const scrolled = window.scrollY > 20;
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
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 transition-colors duration-200 ${
          isScrolled
            ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 shadow-2xl shadow-black/80'
            : 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo - Fixed to Left (Always strictly: Logo Icon + Gym Name) */}
          <button
            id="header-brand-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 cursor-pointer text-left select-none min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                {config.brand.logoUrl ? (
                  <img src={config.brand.logoUrl} alt={config.brand.gymName} className="w-full h-full object-cover" />
                ) : (
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-200" />
                )}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-black tracking-wider text-sm sm:text-base lg:text-lg text-white uppercase truncate">
                {config.brand.gymName || 'KSG DEMO GYM'}
              </span>
              <span className="hidden sm:inline-block text-[9px] tracking-[0.18em] text-zinc-400 font-bold uppercase -mt-0.5 truncate max-w-[180px]">
                {config.brand.tagline || 'Luxury Fitness Club'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Visible strictly on lg: 1024px and wider) */}
          <nav 
            id="desktop-navigation" 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  id={`header-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white font-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderPill"
                      className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/40 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions (Visible strictly on lg: 1024px and wider) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Sound FX Toggle */}
            <button
              id="header-sound-toggle-btn"
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
            </button>

            {/* Free Trial Button */}
            <button
              id="header-trial-btn-desktop"
              onClick={() => handleNavClick('booking')}
              onMouseEnter={() => soundManager.playHover()}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-200 hover:text-white hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              Book Free Trial
            </button>

            {/* Join Now CTA */}
            <button
              id="header-join-btn-desktop"
              onClick={() => onOpenModal('join')}
              onMouseEnter={() => soundManager.playHover()}
              className="relative group overflow-hidden px-4.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>JOIN NOW</span>
            </button>
          </div>

          {/* Mobile & Tablet Header Right Control (STRICTLY Hamburger Button Only, lg:hidden) */}
          <div className="flex items-center lg:hidden">
            <button
              id="header-mobile-menu-btn"
              aria-label="Toggle navigation menu"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-800 text-white transition-all cursor-pointer focus:outline-none shrink-0 shadow-md"
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

      {/* Mobile Drawer Navigation (Opens ONLY on mobile when hamburger is clicked) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-sm z-50 bg-zinc-950 border-l border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-black text-xs">
                      KSG
                    </div>
                    <span className="font-bold text-sm tracking-wider text-white uppercase">
                      {config.brand.gymName || 'KSG DEMO GYM'}
                    </span>
                  </div>
                  <button
                    id="header-mobile-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer border border-zinc-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = currentPage === link.page;
                    return (
                      <button
                        key={link.name}
                        id={`mobile-nav-${link.page}`}
                        onClick={() => handleNavClick(link.page)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-bold text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                        }`}
                      >
                        <span className="uppercase tracking-wider">{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                <button
                  id="mobile-nav-join-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal('join');
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>JOIN NOW</span>
                </button>

                <button
                  id="mobile-nav-trial-btn"
                  onClick={() => handleNavClick('booking')}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book Free Trial Pass</span>
                </button>

                {/* Gym Contact Quick Info Inside Drawer */}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                  <a
                    href={CONTACT_CONFIG.getTelUrl()}
                    className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{config.contact.phone || CONTACT_CONFIG.displayPhone}</span>
                  </a>
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1 hover:text-white p-1 rounded transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="text-[10px] uppercase font-bold">{isMuted ? 'Muted' : 'Sound ON'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
