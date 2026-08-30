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

  // Subtle floating luxury dust/sparkle particles effect - lightweight & efficient
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;

    // Observe hero visibility to stop canvas calculations when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Lightweight particle set (16 particles)
    const particlesCount = 16;
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
      'rgba(245, 158, 11, ', // Amber
      'rgba(255, 255, 255, ' // Soft White
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * 0.015,
      });
    }

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.pulse;

        if (p.alpha > 0.7 || p.alpha < 0.2) {
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
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#080808]"
    >
      {/* 3D Depth Layer 1: Background Luxury Gym Video/Photo with Ambient Parallax */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-4 sm:-inset-8 z-0 overflow-hidden pointer-events-none scale-105"
      >
        {isVideoBg ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-30 brightness-75 contrast-125 filter"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=75&fm=webp"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-heavy-ropes-in-a-gym-44163-large.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={config.hero.heroImage ? `${config.hero.heroImage}?auto=format&fit=crop&w=1920&q=75&fm=webp` : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=75&fm=webp"}
            alt={`${config.brand.gymName} Luxury Architecture`}
            loading="eager"
            decoding="async"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            className="w-full h-full object-cover object-center opacity-35 brightness-75 contrast-125 filter transition-opacity duration-300"
          />
        )}

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/60 to-[#080808] pointer-events-none" />
      </motion.div>

      {/* 3D Depth Layer 2: Moving Light Reflections & Glow Spheres */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#EF4444]/12 rounded-full blur-[60px] sm:blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-[#D4AF37]/12 rounded-full blur-[60px] sm:blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-white/[0.02] rounded-full blur-[50px]" />
      </motion.div>

      {/* 3D Depth Layer 3: Floating Dynamic Light Streaks */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 hidden sm:block"
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
      <div className="absolute top-24 sm:top-28 right-4 sm:right-6 z-20 hidden md:block">
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
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
        
        {/* Top Eyebrow Badge - Brand Message */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/40 backdrop-blur-md mb-5 sm:mb-7 shadow-xl shadow-black/80 max-w-full"
        >
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 truncate">
            {config.brand.tagline || 'TRANSFORM YOUR BODY. UPGRADE YOUR LIFE.'}
          </span>
        </motion.div>

        {/* Cinematic Main Heading with Fluid Luxury Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,7.5vw,5.5rem)] font-black font-['Syne',sans-serif] tracking-tight uppercase leading-[1.04] text-white max-w-4xl w-full break-words mx-auto text-balance"
        >
          {config.hero.heroHeading ? (
            <span>{config.hero.heroHeading}</span>
          ) : (
            <>
              BUILD THE <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-zinc-100 to-amber-300 bg-clip-text text-transparent drop-shadow-sm inline-block max-w-full">
                STRONGEST VERSION
              </span> <br className="hidden sm:inline" />
              OF <span className="text-amber-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.4)] inline-block">YOURSELF</span>
            </>
          )}
        </motion.h1>

        {/* Subheading with Fluid Constraint */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="mt-4 sm:mt-6 text-[clamp(0.95rem,2.2vw,1.3rem)] text-zinc-300 max-w-2xl font-light leading-relaxed tracking-wide px-2 text-pretty"
        >
          {config.hero.heroSubtitle || 'Transform Your Body. Upgrade Your Life.'}
        </motion.p>

        {/* High-Conversion Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-sm sm:max-w-none"
        >
          {/* Button 1: JOIN NOW (Primary Warm Gold / Amber Accent) */}
          <button
            id="hero-join-now-btn"
            onClick={() => {
              soundManager.playClick();
              handleJoin();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto relative group overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 border border-amber-300/60"
          >
            <Sparkles className="w-4 h-4 fill-black text-black animate-spin" style={{ animationDuration: '6s' }} />
            <span>{config.hero.ctaButtonText || 'JOIN NOW'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </button>

          {/* Button 2: BOOK FREE TRIAL (Dark Charcoal Glass) */}
          <button
            id="hero-free-trial-btn"
            onClick={() => {
              soundManager.playClick();
              handleTrial();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto group px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest text-zinc-100 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/60 backdrop-blur-xl shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Flame className="w-4 h-4 text-amber-400" />
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
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold text-zinc-400 hover:text-white py-2.5 px-4 hover:underline underline-offset-4 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-amber-400 fill-amber-400 translate-x-0.5" />
            </div>
            <span>WATCH TOUR</span>
          </button>
        </motion.div>

        {/* High-Impact Trust Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-zinc-800/80 w-full grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left"
        >
          {/* Card 1: 500+ Members */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-black text-white font-mono truncate">500+ Active</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium truncate">Dedicated Members</p>
            </div>
          </div>

          {/* Card 2: 10+ Coaches */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-black text-white font-mono truncate">10+ Coaches</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium truncate">CSCS & ACE Certified</p>
            </div>
          </div>

          {/* Card 3: 24/7 Access */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-black text-white font-mono truncate">24/7 Access</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium truncate">Biometric Support</p>
            </div>
          </div>

          {/* Card 4: Italian Biomechanics */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-black text-white font-mono truncate">Panatta Rigs</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium truncate">Italian Biomechanics</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
};
