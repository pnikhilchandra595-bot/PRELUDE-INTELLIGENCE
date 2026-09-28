import React from 'react';
import { motion } from 'framer-motion';

export interface GlassPillProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'violet' | 'amber' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export const GlassPill: React.FC<GlassPillProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  active = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#0E7C7B] text-white border-transparent hover:bg-[#0B6362] shadow-sm',
    violet:
      'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 shadow-sm',
    amber:
      'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 shadow-sm',
    secondary:
      'bg-white text-[#111318] border border-[#E5E7EB] hover:bg-[#F7F8F9] shadow-sm',
    ghost:
      'bg-transparent text-[#5B6169] border-transparent hover:bg-[#F7F8F9] hover:text-[#111318]',
  }[variant];

  const activeClasses = active
    ? 'ring-2 ring-[#0E7C7B]/30 bg-[#E8F5F5] border-[#0E7C7B]/30 text-[#0E7C7B] font-semibold'
    : '';

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`glass-pill inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${activeClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
