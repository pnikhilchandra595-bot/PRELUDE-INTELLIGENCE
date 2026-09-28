import React from 'react';
import { FeedbackTheme } from '../../types/api';
import { SentimentBadge } from '../common/Badge';
import { MessageSquareQuote, TrendingUp, TrendingDown, Minus, Users, Tag } from 'lucide-react';

interface ThemeClusterProps {
  theme: FeedbackTheme;
}

export const ThemeCluster: React.FC<ThemeClusterProps> = ({ theme }) => {
  const getTrendIcon = () => {
    switch (theme.trend) {
      case 'up':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" /> Surge (+18%)
          </span>
        );
      case 'down':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <TrendingDown className="w-3.5 h-3.5" /> Declining (-12%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Minus className="w-3.5 h-3.5" /> Stable
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
              {theme.category}
            </span>
            {getTrendIcon()}
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {theme.name}
          </h4>
        </div>

        <div className="text-right shrink-0">
          <SentimentBadge sentiment={theme.sentiment} score={theme.sentiment_score} />
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
            {theme.mention_count} mentions
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {theme.summary}
      </p>

      {/* Customer Quotes */}
      {theme.top_quotes && theme.top_quotes.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <MessageSquareQuote className="w-3 h-3" /> Representative Account Voice
          </div>
          <div className="space-y-2">
            {theme.top_quotes.map((quote, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-xs italic text-slate-700 dark:text-slate-300"
              >
                {quote}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Affected Segments */}
      {theme.affected_segments && theme.affected_segments.length > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <Users className="w-3 h-3 text-slate-400" />
          {theme.affected_segments.map((seg) => (
            <span
              key={seg}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {seg}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
