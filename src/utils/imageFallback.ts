import React from 'react';

/**
 * Safe Image Fallback Utilities for KSG Demo Gym
 * Ensures zero broken image icons, graceful degradation, and uniform optimization params.
 */

export const FALLBACK_GYM_IMAGE = "/images/fallback-gym.webp";
export const FALLBACK_AVATAR_IMAGE = "/images/fallback-avatar.webp";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string = FALLBACK_GYM_IMAGE) => {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
};

export const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  handleImageError(e, FALLBACK_AVATAR_IMAGE);
};

export const optimizeImageUrl = (url: string, width: number = 800, quality: number = 75): string => {
  if (!url) return FALLBACK_GYM_IMAGE;
  if (url.includes('unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
  }
  return url;
};
