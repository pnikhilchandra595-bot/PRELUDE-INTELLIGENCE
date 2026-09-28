import React from 'react';
import { Calendar, Clock, History, CheckCircle2, UserCheck } from 'lucide-react';
import { ContactBriefData } from '../../types/api';

interface HistorySummaryProps {
  brief: ContactBriefData;
}

export const HistorySummary: React.FC<HistorySummaryProps> = ({ brief }) => {
  const lastMeetingFormatted = brief.last_meeting
    ? new Date(brief.last_meeting).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'None recorded';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-500" />
          History Summary
        </h3>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          CRM Sync: Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Last Synced Meeting</span>
          </div>
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 font-mono">
            {lastMeetingFormatted}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Relationship Cadence</span>
          </div>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            Bi-weekly Strategic Review
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Engagement Health</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Affinity
          </span>
        </div>
      </div>
    </div>
  );
};
