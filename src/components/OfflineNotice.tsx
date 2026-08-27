import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { soundManager } from './common/SoundEffects';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    soundManager.playClick();
    setIsRetrying(true);
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        setIsOffline(false);
        setJustReconnected(true);
        setTimeout(() => setJustReconnected(false), 3000);
      }
      setIsRetrying(false);
    }, 800);
  };

  if (!isOffline && !justReconnected) return null;

  return (
    <div 
      id="network-status-alert"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border transition-all animate-bounce"
      style={{
        backgroundColor: isOffline ? 'rgba(24, 24, 27, 0.95)' : 'rgba(6, 78, 59, 0.95)',
        borderColor: isOffline ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)',
      }}
      role="alert"
    >
      <div className="flex items-center gap-3 text-xs font-semibold">
        {isOffline ? (
          <>
            <WifiOff className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-zinc-200">Connection problem. Please try again.</span>
            <button
              id="offline-retry-btn"
              onClick={handleRetry}
              disabled={isRetrying}
              className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold flex items-center gap-1 border border-zinc-700 cursor-pointer text-[11px]"
            >
              <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>Retry</span>
            </button>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-200">Reconnected successfully</span>
          </>
        )}
      </div>
    </div>
  );
};
