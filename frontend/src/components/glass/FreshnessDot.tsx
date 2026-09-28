import React from 'react';

export interface FreshnessDotProps {
  ageDays: number;
  showLabel?: boolean;
  className?: string;
}

export const FreshnessDot: React.FC<FreshnessDotProps> = ({
  ageDays,
  showLabel = false,
  className = '',
}) => {
  let status: 'fresh' | 'moderate' | 'aged';
  let dotColor: string;
  let glowColor: string;
  let labelText: string;

  if (ageDays < 14) {
    status = 'fresh';
    dotColor = 'bg-emerald-500';
    glowColor = 'shadow-[0_0_8px_rgba(16,185,129,0.5)]';
    labelText = `${ageDays}d ago (Fresh)`;
  } else if (ageDays <= 60) {
    status = 'moderate';
    dotColor = 'bg-amber-500';
    glowColor = 'shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    labelText = `${ageDays}d ago (14-60d)`;
  } else {
    status = 'aged';
    dotColor = 'bg-rose-500';
    glowColor = 'shadow-[0_0_8px_rgba(244,63,94,0.5)]';
    labelText = `${ageDays}d ago (>60d)`;
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      title={`Intelligence recorded ${ageDays} days ago (${status})`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColor} ${glowColor}`}
        />
      </span>
      {showLabel && (
        <span className="text-xs text-[#5B6169] font-mono">{labelText}</span>
      )}
    </div>
  );
};
