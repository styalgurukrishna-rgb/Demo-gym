import React from 'react';
import { soundManager } from './SoundEffects';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleHover?: number;
  glareEffect?: boolean;
  onClick?: () => void;
  id?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={() => {
        soundManager.playClick();
        if (onClick) onClick();
      }}
      className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

