import React from 'react';

/**
 * Safe Image Fallback Utilities for KSG Demo Gym
 * Ensures zero broken image icons, graceful degradation, and uniform optimization params.
 * Works across local dev, Netlify deployment, offline mode, and mobile devices.
 */

export const FALLBACK_GYM_IMAGE = "/images/fallback-gym.webp";
export const FALLBACK_GYM_ONLINE_IMAGE = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80&fm=webp";

export const FALLBACK_AVATAR_IMAGE = "/images/fallback-avatar.webp";
export const FALLBACK_AVATAR_ONLINE_IMAGE = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80&fm=webp";

// SVG data URI fallback that never fails even if network or local assets are unavailable
const SVG_GYM_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2318181b'/%3E%3Cstop offset='50%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23050505'/%3E%3C/linearGradient%3E%3CradialGradient id='glow' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23f59e0b' stop-opacity='0.15'/%3E%3Cstop offset='100%25' stop-color='%23f59e0b' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Ccircle cx='400' cy='300' r='250' fill='url(%23glow)'/%3E%3Cpath d='M320 300 h160 M340 260 v80 M460 260 v80 M310 270 h20 v60 h-20 z M470 270 h20 v60 h-20 z' stroke='%23d4af37' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.4'/%3E%3C/svg%3E";

const SVG_AVATAR_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ccircle cx='100' cy='80' r='35' fill='%2371717a'/%3E%3Cpath d='M40 180 c0-35 30-55 60-55 s60 20 60 55' fill='%2371717a'/%3E%3C/svg%3E";

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>, 
  fallbackUrl: string = FALLBACK_GYM_IMAGE
) => {
  const target = e.currentTarget;
  const stage = parseInt(target.getAttribute('data-error-stage') || '0', 10);

  if (stage === 0) {
    target.setAttribute('data-error-stage', '1');
    target.src = fallbackUrl;
  } else if (stage === 1) {
    target.setAttribute('data-error-stage', '2');
    target.src = FALLBACK_GYM_ONLINE_IMAGE;
  } else if (stage === 2) {
    target.setAttribute('data-error-stage', '3');
    target.src = SVG_GYM_FALLBACK;
  }
};

export const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const stage = parseInt(target.getAttribute('data-error-stage') || '0', 10);

  if (stage === 0) {
    target.setAttribute('data-error-stage', '1');
    target.src = FALLBACK_AVATAR_IMAGE;
  } else if (stage === 1) {
    target.setAttribute('data-error-stage', '2');
    target.src = FALLBACK_AVATAR_ONLINE_IMAGE;
  } else if (stage === 2) {
    target.setAttribute('data-error-stage', '3');
    target.src = SVG_AVATAR_FALLBACK;
  }
};

export const optimizeImageUrl = (url: string, width: number = 800, quality: number = 75): string => {
  if (!url) return FALLBACK_GYM_IMAGE;
  if (url.includes('unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
  }
  return url;
};
