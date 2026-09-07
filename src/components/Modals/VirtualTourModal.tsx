import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  RefreshCw, 
  Compass, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';
import { CONTACT_CONFIG } from '../../config/contactConfig';
import { soundManager } from '../common/SoundEffects';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

interface TourChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  videoId: string;
  posterImage: string;
  highlights: string[];
}

const TOUR_CHAPTERS: TourChapter[] = [
  {
    id: 'arena',
    chapterNumber: '01',
    title: 'MAIN POWER ARENA',
    subtitle: '15,000 Sq.Ft Open Floor • Olympic Platforms & Biomechanics Hub',
    category: 'Ground Floor • Main Strength Arena',
    description: 'High-performance strength arena outfitted with custom Panatta selectorized stations, Eleiko Olympic competition bars, and acoustic vibration-absorbing drop platforms.',
    videoId: 'B9-ssdbpJZA',
    posterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    highlights: ['Eleiko Competition Platforms', 'Panatta Super Incline & Hacks', 'Acoustic Shock Flooring'],
  },
  {
    id: 'vip',
    chapterNumber: '02',
    title: 'PRIVATE VIP TRAINING AREA',
    subtitle: '1-on-1 Studio Suites • Elite Biomechanics Lab',
    category: 'Level 2 North • Private Coaching Suites',
    description: 'Secluded private coaching suites equipped with dedicated squat racks, high-speed biomechanics cameras, and InBody 770 composition diagnostics.',
    videoId: 'N82KJBnUOVM',
    posterImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80',
    highlights: ['Private Acoustic Isolation', 'InBody 770 Diagnostics', '1-on-1 Master Coach Attention'],
  },
  {
    id: 'recovery',
    chapterNumber: '03',
    title: 'HYDROTHERAPY / RECOVERY AREA',
    subtitle: 'Bio-Recovery Spa • Infrared Cedar Sauna & 4°C Plunge',
    category: 'Spa Level • Recovery & Contrast Wing',
    description: 'Custom contrast therapy sanctuary featuring Finnish cedar infrared saunas, calibrated cold immersion plunge tubs, and medical-grade red light cellular recovery.',
    videoId: 'TrYfoUMaPeE',
    posterImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    highlights: ['4°C Cryo Cold Immersion', 'Infrared Cedar Heat Up to 80°C', 'Red Light Photobiomodulation'],
  },
  {
    id: 'nutrition',
    chapterNumber: '04',
    title: 'NUTRITION / LIFESTYLE AREA',
    subtitle: 'Macro Fuel Bar • Artisan Pre-Workout & Protein Lounge',
    category: 'Main Lobby • Nutrition & Social Lounge',
    description: 'Full-service wellness counter providing personalized post-workout hydrolyzed protein shakes, fresh cold-pressed electrolytes, and healthy chef-prepared macro meals.',
    videoId: 'BI_9sftSUH0',
    posterImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80',
    highlights: ['Hydrolyzed Protein Bar', 'Cold-Pressed Electrolytes', 'Macro Meal Pickup Lockers'],
  }
];

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose, onOpenJoin }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeChapter = TOUR_CHAPTERS[activeChapterIndex];

  // Reset or initialize state when opening/closing or switching chapter
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVideoLoading(true);
      setHasVideoError(false);
      setIsPlayingVideo(true);

      // Safety timeout: if iframe doesn't trigger onload within 10s, release loading state
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVideoLoading(false);
      }, 7000);
    } else {
      document.body.style.overflow = '';
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      document.body.style.overflow = '';
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, activeChapterIndex]);

  // Handle keyboard Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChapterSelect = useCallback((index: number) => {
    soundManager.playClick();
    if (index === activeChapterIndex) return;
    setActiveChapterIndex(index);
    setHasVideoError(false);
    setIsVideoLoading(true);
    setIsPlayingVideo(true);
  }, [activeChapterIndex]);

  const handleRetryVideo = useCallback(() => {
    soundManager.playClick();
    setHasVideoError(false);
    setIsVideoLoading(true);
    setIsPlayingVideo(true);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsVideoLoading(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsVideoLoading(false);
    setHasVideoError(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-2xl z-10 my-auto flex flex-col overflow-hidden max-h-[96vh]"
      >
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800/90 flex items-center justify-between bg-zinc-900/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne',sans-serif] font-black text-sm sm:text-base uppercase text-white tracking-wider truncate">
                  KSG 360° Virtual Club Tour
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Walkthrough
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium truncate">
                Official Facility Experience • 4 High-Resolution Video Chapters
              </p>
            </div>
          </div>

          <button
            id="virtual-tour-modal-close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            aria-label="Close Virtual Tour"
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* =======================================================
              VIDEO AREA: Completely clean, no large overlays or badges
             ======================================================= */}
          <div className="relative aspect-video w-full bg-black overflow-hidden select-none">
            {/* Minimalist subtle corner chapter index pill */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400">
                Chapter {activeChapter.chapterNumber} / 04
              </span>
            </div>

            {/* Video Player or Poster Fallback */}
            {isPlayingVideo && !hasVideoError ? (
              <div className="relative w-full h-full">
                {/* Lazy loading spinner while iframe connects */}
                {isVideoLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xs transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-2" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                      Loading Chapter {activeChapter.chapterNumber}...
                    </span>
                  </div>
                )}

                {/* The Video Embed */}
                <iframe
                  key={activeChapter.videoId}
                  src={`https://www.youtube-nocookie.com/embed/${activeChapter.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={`${activeChapter.title} - KSG Virtual Tour`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  className="w-full h-full border-0 absolute inset-0"
                />
              </div>
            ) : (
              /* Fallback if video fails or user toggles poster */
              <div className="relative w-full h-full group">
                <img
                  src={activeChapter.posterImage}
                  alt={activeChapter.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                  <button
                    onClick={handleRetryVideo}
                    className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer mb-3"
                    title="Play Chapter Video"
                  >
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </button>
                  <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {hasVideoError ? 'Video unavailable — Explore the facility' : 'Click to Watch Video'}
                  </p>
                  <p className="text-[11px] text-zinc-300 max-w-sm">
                    {hasVideoError 
                      ? 'Network connection issue or embed restricted. Browse our high-resolution facility zones below.' 
                      : 'High-definition 4K virtual tour of this dedicated fitness area.'}
                  </p>
                  {hasVideoError && (
                    <button
                      onClick={handleRetryVideo}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Retry Playback</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* =======================================================
              BELOW VIDEO AREA: Chapter Info & Metadata
             ======================================================= */}
          <div className="p-4 sm:p-6 bg-zinc-950">
            {/* Header: Title, Category & 1-line Description */}
            <div className="border-b border-zinc-800/80 pb-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-400">
                  {activeChapter.category}
                </span>
                <span className="text-[10px] uppercase font-bold text-zinc-500">
                  {activeChapter.subtitle}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black font-['Syne',sans-serif] uppercase text-white tracking-tight">
                {activeChapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mt-1.5">
                {activeChapter.description}
              </p>

              {/* Key Highlights Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {activeChapter.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* =======================================================
                CHAPTER SELECTION BAR: 4 Interactive Buttons
               ======================================================= */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                  Select Tour Chapter:
                </p>
                <span className="text-[10px] text-zinc-500 font-mono">
                  4 Interactive Zones
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
                {TOUR_CHAPTERS.map((chapter, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={chapter.id}
                      id={`tour-chapter-btn-${idx}`}
                      onClick={() => handleChapterSelect(idx)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/80 hover:bg-zinc-850 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-[10px] uppercase font-black tracking-widest ${
                          isActive ? 'text-amber-400' : 'text-zinc-500'
                        }`}>
                          {chapter.chapterNumber}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        )}
                      </div>
                      <p className={`text-xs font-black uppercase tracking-tight leading-snug line-clamp-1 ${
                        isActive ? 'text-white' : 'text-zinc-300'
                      }`}>
                        {chapter.title.replace(/^\d+\.\s*/, '')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM ACTION FOOTER
           ======================================================= */}
        <div className="p-3.5 sm:p-5 bg-zinc-900/90 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-center sm:text-left w-full sm:w-auto">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
            <p className="text-xs text-zinc-300">
              Want to see our equipment in person? Walk the floor with a master coach.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <a
              href={CONTACT_CONFIG.getTelUrl()}
              onClick={() => soundManager.playClick()}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Call KSG Gym"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Call Gym</span>
            </a>

            <a
              href={CONTACT_CONFIG.getWhatsAppUrl("Hello KSG DEMO GYM, I just viewed your 360° Virtual Tour and would like to schedule an in-person walkthrough.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              id="tour-schedule-visit-btn"
              onClick={() => {
                soundManager.playClick();
                onClose();
                onOpenJoin();
              }}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>SCHEDULE VISIT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
