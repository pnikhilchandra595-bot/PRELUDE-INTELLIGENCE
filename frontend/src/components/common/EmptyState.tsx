import React from 'react';
import { LucideIcon, Inbox, History, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  isColdStart?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  className = '',
  isColdStart = false,
}) => {
  if (isColdStart) {
    return (
      <div
        className={`p-8 md:p-12 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/10 text-center ${className}`}
      >
        <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 ring-8 ring-indigo-50 dark:ring-indigo-950/30">
          <History className="w-7 h-7" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> First-Contact Interaction
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-mono bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
          "{description}"
        </p>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Hindsight active listener enabled. Future meetings, call transcripts, and commitments will be synthesized here automatically.
        </p>
        {actionText && onAction && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-[0.98]"
            >
              {actionText}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-8 md:p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-center ${className}`}
    >
      <div className="mx-auto w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        {description}
      </p>
      {actionText && onAction && (
        <div className="mt-5">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 shadow-sm transition active:scale-[0.98]"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
};
