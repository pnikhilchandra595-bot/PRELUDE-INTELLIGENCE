import React from 'react';
import { ContentPiece } from '../../types/api';
import { Eye, Share2, Calendar, Clock, ExternalLink, Bookmark, BarChart3 } from 'lucide-react';

interface ContentCardProps {
  content: ContentPiece;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const formattedDate = new Date(content.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 space-y-4 group">
      <div className="space-y-3">
        {/* Top Topic & Format Bar */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 ring-1 ring-sky-600/20 dark:bg-sky-950/60 dark:text-sky-300">
            {content.topic}
          </span>
          {content.format && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {content.format.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none"
          >
            {content.title}
          </a>
        </h4>

        {/* Summary */}
        {content.summary && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {content.summary}
          </p>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-mono font-medium text-slate-700 dark:text-slate-300">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              {content.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 font-mono font-medium text-slate-700 dark:text-slate-300">
              <Share2 className="w-3.5 h-3.5 text-emerald-500" />
              {content.shares.toLocaleString()}
            </span>
          </div>

          {content.performance_score && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold">
              <BarChart3 className="w-3 h-3" />
              {content.performance_score}/100
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formattedDate}
            </span>
            {content.read_time_minutes && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {content.read_time_minutes} min read
              </span>
            )}
          </div>

          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium inline-flex items-center gap-1"
          >
            Read <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
