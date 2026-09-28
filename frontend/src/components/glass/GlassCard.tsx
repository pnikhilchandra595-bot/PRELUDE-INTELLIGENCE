import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableSpecular?: boolean;
  glowColor?: 'teal' | 'violet' | 'amber' | 'cyan' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  enableTilt = true,
  enableSpecular = true,
  glowColor = 'none',
  onClick,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  // Specular highlight position
  const [specularPos, setSpecularPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    if (enableSpecular) {
      setSpecularPos({
        x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
        y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowClass = {
    teal: 'hover:border-[#0E7C7B]/40 hover:shadow-[0_8px_30px_rgba(14,124,123,0.1)]',
    violet: 'hover:border-purple-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]',
    amber: 'hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]',
    cyan: 'hover:border-[#0E7C7B]/40 hover:shadow-[0_8px_30px_rgba(14,124,123,0.1)]',
    none: '',
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`glass-card rounded-2xl bg-white border border-[#E5E7EB] text-[#111318] shadow-sm transition-all duration-200 ${glowClass} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...(props as any)}
    >
      {/* Specular Radial Spotlight */}
      {enableSpecular && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background: `radial-gradient(400px circle at ${specularPos.x}% ${specularPos.y}%, rgba(14, 124, 123, 0.05), transparent 60%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
