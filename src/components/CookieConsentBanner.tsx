import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { soundManager } from './common/SoundEffects';

interface CookieConsentBannerProps {
  onViewPrivacyPolicy?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onViewPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const status = analytics.getConsentStatus();
    if (status === 'pending') {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    soundManager.playClick();
    analytics.setConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    soundManager.playClick();
    analytics.setConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      id="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 p-4 sm:p-5 rounded-2xl bg-zinc-900/95 border border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-live="polite"
      aria-label="Privacy and Cookie Preferences"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <span>Privacy & Cookie Preferences</span>
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            We use essential session storage and optional analytics to enhance your booking experience and optimize performance.
          </p>
          
          <div className="mt-3 flex items-center gap-2">
            <button
              id="cookie-accept-btn"
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept</span>
            </button>
            <button
              id="cookie-decline-btn"
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-all cursor-pointer"
            >
              Essential Only
            </button>
            {onViewPrivacyPolicy && (
              <button
                id="cookie-privacy-link"
                onClick={() => {
                  soundManager.playClick();
                  onViewPrivacyPolicy();
                }}
                className="text-[11px] text-zinc-400 hover:text-amber-400 underline ml-auto transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
