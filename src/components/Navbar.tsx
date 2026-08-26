import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Dumbbell, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  User, 
  LayoutDashboard, 
  Calendar,
  Phone,
  ChevronDown,
  Award,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from './common/SoundEffects';
import { PageType, ModalState, User as UserType } from '../types';
import { leadStore } from '../services/leadStore';

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
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateAuth = () => {
      setCurrentUser(leadStore.getCurrentUser());
    };
    updateAuth();
    const unsub = leadStore.subscribe(updateAuth);
    return () => unsub();
  }, []);

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
    { name: 'Gallery', page: 'gallery' },
    { name: 'Pricing', page: 'pricing' },
    { name: 'Book Trial', page: 'booking' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    soundManager.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 cursor-pointer text-left"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-500 via-amber-500 to-yellow-500 p-[1.5px] shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-wider text-base sm:text-lg text-white flex items-center gap-1 uppercase">
                KSG <span className="text-amber-400">DEMO</span> <span className="text-red-500">GYM</span>
              </span>
              <span className="text-[9px] tracking-[0.22em] text-zinc-400 font-bold uppercase -mt-0.5">
                Luxury Fitness Platform
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
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Gym Owner Admin CRM Trigger */}
            <button
              id="nav-crm-demo-btn"
              onClick={() => handleNavClick('admin-dashboard')}
              title="Open Gym Owner CRM & Lead Management System"
              className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                currentPage === 'admin-dashboard'
                  ? 'bg-emerald-500 text-black border-emerald-400 font-black'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin CRM</span>
            </button>

            {/* Trainer Portal */}
            <button
              id="nav-trainer-btn"
              onClick={() => handleNavClick('trainer-dashboard')}
              title="Open Coach & Trainer Portal"
              className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                currentPage === 'trainer-dashboard'
                  ? 'bg-amber-500 text-black border-amber-400 font-black'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Coach</span>
            </button>

            {/* Member Portal Login / Dashboard */}
            <button
              id="nav-member-login-btn"
              onClick={() => handleNavClick(currentUser?.role === 'member' ? 'member-dashboard' : 'login')}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${
                currentPage === 'login' || currentPage === 'member-dashboard'
                  ? 'bg-amber-500 text-black border-amber-400 font-black'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800 bg-zinc-900 border-zinc-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser ? currentUser.name.split(' ')[0] : 'Portal'}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              id="nav-sound-toggle-btn"
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            </button>

            {/* Free Trial CTA */}
            <button
              id="nav-trial-btn-desktop"
              onClick={() => handleNavClick('booking')}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-zinc-200 hover:text-white hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Free Trial
            </button>

            {/* Join Now */}
            <button
              id="nav-join-now-btn-desktop"
              onClick={() => onOpenModal('join')}
              onMouseEnter={() => soundManager.playHover()}
              className="relative group overflow-hidden px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>JOIN NOW</span>
            </button>
          </div>

          {/* Mobile Header Badges & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="nav-trial-mobile-badge"
              onClick={() => handleNavClick('booking')}
              className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-400"
            >
              Free Trial
            </button>

            <button
              id="nav-join-mobile-badge"
              onClick={() => onOpenModal('join')}
              className="px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-amber-500 text-black shadow-md"
            >
              Join
            </button>

            <button
              id="hamburger-menu-btn"
              aria-label="Toggle navigation menu"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white transition-colors cursor-pointer focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-400" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (12 Pages Menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center p-[1px]">
                      <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                        <Dumbbell className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    <span className="font-black text-sm text-white uppercase">
                      KSG <span className="text-amber-400">DEMO</span> GYM
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        currentPage === link.page
                          ? 'bg-amber-500 text-black font-black'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>

                {/* Portals in Mobile Drawer */}
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                  <button
                    onClick={() => handleNavClick('member-dashboard')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border ${
                      currentPage === 'member-dashboard'
                        ? 'bg-amber-500 text-black border-amber-400 font-black'
                        : 'bg-zinc-900 text-white border-zinc-800'
                    }`}
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Member Portal</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('trainer-dashboard')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border ${
                      currentPage === 'trainer-dashboard'
                        ? 'bg-amber-500 text-black border-amber-400 font-black'
                        : 'bg-zinc-900 text-white border-zinc-800'
                    }`}
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Trainer Portal</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('admin-dashboard')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 border ${
                      currentPage === 'admin-dashboard'
                        ? 'bg-emerald-500 text-black border-emerald-400 font-black'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Gym Owner CRM</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-zinc-800 space-y-3">
                <button
                  onClick={() => handleNavClick('booking')}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-800"
                >
                  Book Free Trial Pass
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal('join');
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <span>JOIN KSG GYM</span>
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
