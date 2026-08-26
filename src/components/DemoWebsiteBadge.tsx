import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ShieldCheck, ChevronDown, Check, Sliders, ArrowRight, X } from 'lucide-react';
import { gymConfigStore } from '../services/gymConfigStore';
import { GymConfig, ModalState } from '../types';
import { soundManager } from './common/SoundEffects';

interface DemoWebsiteBadgeProps {
  onOpenCustomizer?: () => void;
  onOpenInquiry?: () => void;
}

export const DemoWebsiteBadge: React.FC<DemoWebsiteBadgeProps> = ({
  onOpenCustomizer,
  onOpenInquiry
}) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  // If Demo Mode is OFF and White Label is ON, hide the badge completely as requested in spec
  if (!config.demoMode && config.whiteLabelMode) {
    return null;
  }

  // If in pure Client Preview Mode, render only a discreet exit preview control if hovered
  if (config.clientPreviewMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          id="exit-client-preview-mode-btn"
          onClick={() => {
            soundManager.playClick();
            gymConfigStore.setClientPreviewMode(false);
          }}
          className="px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-900 border border-amber-500/40 text-[11px] font-bold text-amber-400 backdrop-blur-xl shadow-2xl flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Exit Client Preview</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="relative">
        {/* Discreet Badge Pill */}
        <button
          id="demo-website-indicator-pill"
          onClick={() => {
            soundManager.playClick();
            setIsOpen(!isOpen);
          }}
          className="px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-900 border border-amber-500/50 hover:border-amber-400 text-amber-400 text-[11px] font-black uppercase tracking-wider shadow-2xl backdrop-blur-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>DEMO WEBSITE</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Interactive Dropdown Box */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-2xl text-zinc-100 z-50"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gym System Controls</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3 space-y-2.5 text-xs">
                {/* Client Preview Toggle */}
                <button
                  id="toggle-client-preview-btn"
                  onClick={() => {
                    soundManager.playClick();
                    gymConfigStore.setClientPreviewMode(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left flex items-center justify-between group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Client Preview Mode</div>
                      <div className="text-[10px] text-zinc-500">Hide admin badges for gym owner pitches</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </button>

                {/* White Label Mode Toggle */}
                <button
                  id="toggle-white-label-btn"
                  onClick={() => {
                    soundManager.playClick();
                    gymConfigStore.setWhiteLabelMode(!config.whiteLabelMode);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left flex items-center justify-between group cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">White-Label Mode</div>
                      <div className="text-[10px] text-zinc-500">
                        {config.whiteLabelMode ? 'Active (Custom Gym Branding)' : 'Demo Branding (KSG)'}
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                    config.whiteLabelMode ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-700'
                  }`}>
                    {config.whiteLabelMode && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>

                {/* Open Customizer */}
                {onOpenCustomizer && (
                  <button
                    id="open-customizer-from-badge-btn"
                    onClick={() => {
                      soundManager.playClick();
                      setIsOpen(false);
                      onOpenCustomizer();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left flex items-center justify-between group cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="font-bold text-white">Website Customizer</div>
                        <div className="text-[10px] text-zinc-500">Edit gym name, logo, colors, plans</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </button>
                )}
              </div>

              {/* Want a website like this CTA */}
              {onOpenInquiry && (
                <div className="pt-2 border-t border-zinc-900">
                  <button
                    id="inquiry-from-badge-btn"
                    onClick={() => {
                      soundManager.playClick();
                      setIsOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <span>WANT THIS FOR YOUR GYM?</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
