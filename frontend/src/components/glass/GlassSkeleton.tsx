import React from 'react';

export interface GlassSkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle' | 'card';
  height?: string | number;
  width?: string | number;
}

export const GlassSkeleton: React.FC<GlassSkeletonProps> = ({
  className = '',
  variant = 'rect',
  height,
  width,
}) => {
  const variantClass = {
    text: 'h-4 rounded-md',
    rect: 'rounded-xl',
    circle: 'rounded-full',
    card: 'h-48 rounded-2xl',
  }[variant];

  return (
    <div
      style={{ height, width }}
      className={`relative overflow-hidden bg-slate-200/60 border border-[#E5E7EB] ${variantClass} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
};

export const GlassCardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="glass-card p-6 rounded-2xl space-y-4 bg-white border border-[#E5E7EB]">
      <div className="flex items-center justify-between">
        <GlassSkeleton variant="rect" className="h-6 w-1/3" />
        <GlassSkeleton variant="circle" className="h-8 w-8" />
      </div>
      <div className="space-y-2.5 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <GlassSkeleton
            key={i}
            variant="text"
            className={`w-${i === rows - 1 ? '3/4' : 'full'}`}
          />
        ))}
      </div>
    </div>
  );
};
