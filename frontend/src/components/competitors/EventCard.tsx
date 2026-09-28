import React from 'react';
import { CompetitorEvent } from '../../types/api';
import { EventBadge } from '../common/Badge';
import { Calendar, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EventCardProps {
  event: CompetitorEvent;
  isLast?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isLast = false }) => {
  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getImpactBadge = () => {
    switch (event.impact_level) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
            <AlertTriangle className="w-3 h-3" /> Critical Impact
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
            High Impact
          </span>
        );
      case 'medium':
        return (
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Medium Impact
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative pl-8 pb-8 ${isLast ? 'border-l-2 border-transparent' : 'border-l-2 border-slate-200 dark:border-slate-800'}`}>
      {/* Timeline Node Dot */}
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-400 shadow-xs" />

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 space-y-3">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <EventBadge type={event.event_type} />
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getImpactBadge()}
            {event.source_url && (
              <a
                href={event.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                title="Verify primary source"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {event.title}
        </h4>

        {/* Description - plain text rendering */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {event.description}
        </p>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
