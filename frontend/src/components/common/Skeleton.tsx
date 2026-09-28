import React from 'react';

export const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`}
  />
);

export const TimelineSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="relative pl-8 pb-6 border-l-2 border-slate-200 dark:border-slate-800 last:border-transparent"
        >
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shimmer className="h-6 w-24 rounded-full" />
                <Shimmer className="h-4 w-28" />
              </div>
              <Shimmer className="h-4 w-16" />
            </div>
            <Shimmer className="h-6 w-3/4" />
            <div className="space-y-2 pt-1">
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2 pt-2">
              <Shimmer className="h-5 w-16 rounded-md" />
              <Shimmer className="h-5 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ContentCardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <Shimmer className="h-5 w-24 rounded-full" />
            <Shimmer className="h-4 w-16" />
          </div>
          <Shimmer className="h-6 w-full" />
          <Shimmer className="h-4 w-3/4" />
          <div className="space-y-2 pt-2">
            <Shimmer className="h-3.5 w-full" />
            <Shimmer className="h-3.5 w-4/5" />
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex gap-4">
              <Shimmer className="h-4 w-12" />
              <Shimmer className="h-4 w-12" />
            </div>
            <Shimmer className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ContactBriefSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Shimmer className="w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <Shimmer className="h-7 w-48" />
              <Shimmer className="h-4 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shimmer className="h-9 w-32 rounded-lg" />
            <Shimmer className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Narrative Summary & Cross Module Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Narrative Summary */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Shimmer className="h-5 w-5 rounded" />
              <Shimmer className="h-5 w-40" />
            </div>
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
          </div>

          {/* Cross Module Insights skeleton */}
          <div className="p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shimmer className="h-6 w-6 rounded-md bg-indigo-200 dark:bg-indigo-800" />
                <Shimmer className="h-6 w-52 bg-indigo-200 dark:bg-indigo-800" />
              </div>
              <Shimmer className="h-5 w-24 rounded-full bg-indigo-200 dark:bg-indigo-800" />
            </div>
            <div className="space-y-3 pt-2">
              <Shimmer className="h-16 w-full rounded-xl bg-white dark:bg-slate-900/80" />
              <Shimmer className="h-16 w-full rounded-xl bg-white dark:bg-slate-900/80" />
            </div>
          </div>
        </div>

        {/* Right Column: History & Open Promises */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <Shimmer className="h-5 w-36" />
            <Shimmer className="h-4 w-48" />
            <Shimmer className="h-4 w-40" />
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <Shimmer className="h-5 w-32" />
            <div className="space-y-2 pt-1">
              <Shimmer className="h-10 w-full rounded-lg" />
              <Shimmer className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedbackThemeSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <Shimmer className="h-6 w-48 mb-4" />
        <Shimmer className="h-64 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <Shimmer className="h-5 w-32" />
              <Shimmer className="h-5 w-20 rounded-full" />
            </div>
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-4/5" />
            <Shimmer className="h-14 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
