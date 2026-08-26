import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
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
  maxTilt = 12,
  scaleHover = 1.02,
  glareEffect = true,
  onClick,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for silky smooth return
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      onClick={() => {
        soundManager.playClick();
        if (onClick) onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? scaleHover : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`relative cursor-pointer transition-shadow duration-300 ${className}`}
    >
      {children}

      {/* Dynamic 3D Glare reflection */}
      {glareEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8), transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};
