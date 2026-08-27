import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Users, 
  ChevronDown, 
  Video, 
  Image as ImageIcon,
  Clock,
  Heart
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { soundManager } from './common/SoundEffects';
import { gymConfigStore } from '../services/gymConfigStore';
import { GymConfig } from '../types';

interface HeroProps {
  onOpenJoin?: () => void;
  onJoinNow?: () => void;
  onOpenTour?: () => void;
  onVirtualTour?: () => void;
  onOpenTrial?: () => void;
  onBookTrial?: () => void;
  onExplorePrograms?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenJoin,
  onJoinNow,
  onOpenTour,
  onVirtualTour,
  onOpenTrial,
  onBookTrial,
  onExplorePrograms
}) => {
  const handleJoin = onOpenJoin || onJoinNow || (() => {});
  const handleTour = onOpenTour || onVirtualTour || (() => {});
  const handleTrial = onOpenTrial || onBookTrial || (() => {});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isVideoBg, setIsVideoBg] = useState(false);
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Parallax layers transforms
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  const midX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const midY = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  const fgX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const fgY = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { width, height, left, top } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Subtle floating luxury dust/sparkle particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particlesCount = 50;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      color: string;
      alpha: number;
      pulse: number;
    }> = [];

    const colors = [
      'rgba(212, 175, 55, ', // Gold
      'rgba(239, 68, 68, ',  // Red
      'rgba(255, 255, 255, ' // Light
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.pulse;

        if (p.alpha > 0.8 || p.alpha < 0.2) {
          p.pulse = -p.pulse;
        }

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#080808]"
    >
      {/* 3D Depth Layer 1: Background Luxury Gym Video/Photo with Ambient Parallax */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-10 z-0 overflow-hidden pointer-events-none scale-105"
      >
        {isVideoBg ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-30 brightness-75 contrast-125 filter"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-heavy-ropes-in-a-gym-44163-large.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={config.hero.heroImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"}
            alt={`${config.brand.gymName} Luxury Architecture`}
            className="w-full h-full object-cover object-center opacity-35 brightness-75 contrast-125 filter"
          />
        )}

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/60 to-[#080808]" />
      </motion.div>

      {/* 3D Depth Layer 2: Moving Light Reflections & Glow Spheres */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#EF4444]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-white/[0.03] rounded-full blur-[90px]" />
      </motion.div>

      {/* 3D Depth Layer 3: Floating Dynamic Light Streaks */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      >
        <div className="absolute top-1/3 right-10 w-96 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rotate-45 blur-sm" />
        <div className="absolute bottom-1/3 left-10 w-96 h-1 bg-gradient-to-r from-transparent via-[#EF4444] to-transparent -rotate-45 blur-sm" />
      </motion.div>

      {/* Floating Sparkle Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-80"
      />

      {/* Background Toggle Button (Photo / Video Mode) */}
      <div className="absolute top-28 right-6 z-20 hidden md:block">
        <button
          onClick={() => {
            soundManager.playClick();
            setIsVideoBg(!isVideoBg);
          }}
          className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-neutral-300 hover:text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg"
        >
          {isVideoBg ? (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Static View</span>
            </>
          ) : (
            <>
              <Video className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Cinematic Video Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Eyebrow Badge - Brand Message */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#D4AF37]/40 backdrop-blur-md mb-6 shadow-2xl shadow-black/60"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
            {config.brand.tagline || 'TRANSFORM YOUR BODY. BUILD YOUR CONFIDENCE. BECOME YOUR BEST VERSION.'}
          </span>
        </motion.div>

        {/* Cinematic Main Heading with Luxury Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-['Syne',sans-serif] tracking-tight uppercase leading-[1.03] text-white max-w-4xl"
        >
          {config.hero.heroHeading ? (
            <span>{config.hero.heroHeading}</span>
          ) : (
            <>
              BUILD THE <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFF3C4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-sm">
                STRONGEST VERSION
              </span> <br className="hidden sm:inline" />
              OF <span className="text-[#EF4444] drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]">YOURSELF</span>
            </>
          )}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed tracking-wide"
        >
          {config.hero.heroSubtitle || 'Train smarter. Get stronger. Become your best version.'}
        </motion.p>

        {/* High-Conversion Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Button 1: JOIN NOW (Primary Glow Button) */}
          <button
            id="hero-join-now-btn"
            onClick={() => {
              soundManager.playClick();
              handleJoin();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto relative group overflow-hidden px-9 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:shadow-[0_0_60px_rgba(239,68,68,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 border border-red-400/40"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{config.hero.ctaButtonText || 'JOIN NOW'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>

          {/* Button 2: BOOK FREE TRIAL (Attention Grabber) */}
          <button
            id="hero-free-trial-btn"
            onClick={() => {
              soundManager.playClick();
              handleTrial();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto group px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-[#D4AF37]/50 hover:border-[#D4AF37] backdrop-blur-xl shadow-lg hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Flame className="w-4 h-4 text-[#D4AF37]" />
            <span>{config.hero.secondaryButtonText || 'BOOK FREE TRIAL'}</span>
          </button>

          {/* Button 3: WATCH TOUR */}
          <button
            id="hero-watch-tour-btn"
            onClick={() => {
              soundManager.playClick();
              handleTour();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white py-2 px-3 hover:underline underline-offset-4 transition-colors flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>WATCH TOUR</span>
          </button>
        </motion.div>

        {/* Floating High-Impact Trust Info Bar (500+ Members, 10+ Trainers, 24/7 Support) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-14 pt-8 border-t border-white/10 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
        >
          {/* Card 1: 500+ Members */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#121217]/90 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-white font-mono">500+ Active</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Dedicated Members</p>
            </div>
          </div>

          {/* Card 2: 10+ Trainers */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#121217]/90 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <div className="p-3 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-white font-mono">10+ Coaches</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">CSCS & ACE Certified</p>
            </div>
          </div>

          {/* Card 3: 24/7 Support & RFID */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#121217]/90 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <div className="p-3 rounded-xl bg-[#EF4444]/15 text-[#EF4444]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-white font-mono">24/7 Access</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Biometric Support</p>
            </div>
          </div>

          {/* Card 4: Infrared Spa & Panatta */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#121217]/90 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-white font-mono">Panatta Rigs</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Italian Biomechanics</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
};
