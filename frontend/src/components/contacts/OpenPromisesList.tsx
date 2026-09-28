import React, { useState } from 'react';
import { CheckSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface OpenPromisesListProps {
  promises: string[];
}

export const OpenPromisesList: React.FC<OpenPromisesListProps> = ({ promises }) => {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const toggleComplete = (idx: number) => {
    setCompleted((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const pendingCount = promises.filter((_, idx) => !completed[idx]).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Open Promises & Commitments
          </h3>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            pendingCount > 0
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
          }`}
        >
          {pendingCount} Pending
        </span>
      </div>

      {promises.length === 0 ? (
        <div className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
          No open promises recorded. All prior commitments resolved.
        </div>
      ) : (
        <div className="space-y-2.5">
          {promises.map((promise, idx) => {
            const isDone = !!completed[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleComplete(idx)}
                className={`group flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                  isDone
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                    : 'bg-white dark:bg-slate-850 border-amber-200/70 dark:border-amber-900/40 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-xs'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-snug ${
                      isDone
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {promise}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {isDone ? 'Marked as completed' : 'High Priority Deliverable'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
