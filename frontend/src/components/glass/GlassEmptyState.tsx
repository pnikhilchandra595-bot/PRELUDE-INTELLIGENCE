import React from 'react';
import { Database, Plus } from 'lucide-react';

export interface GlassEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const GlassEmptyState: React.FC<GlassEmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`bg-white p-10 rounded-3xl text-center flex flex-col items-center justify-center border border-[#E5E7EB] shadow-sm max-w-lg mx-auto my-8 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B] mb-4 shadow-sm">
        {icon || <Database className="w-8 h-8 text-[#0E7C7B]" />}
      </div>

      <h3 className="font-display text-xl font-bold text-[#111318] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[#5B6169] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
