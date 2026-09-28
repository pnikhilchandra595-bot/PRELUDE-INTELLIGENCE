import React from 'react';
import { ApiError, ErrorCode } from '../../types/api';
import { 
  AlertOctagon, 
  Clock, 
  ServerCrash, 
  FileQuestion, 
  AlertTriangle, 
  RotateCw,
  Cpu
} from 'lucide-react';

interface ErrorStateProps {
  error: Error | ApiError | null;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title,
  className = '',
}) => {
  const isApiError = error instanceof ApiError;
  const code: ErrorCode = isApiError ? error.code : 'INTERNAL_ERROR';
  const message = error?.message || 'An unexpected failure occurred while querying the intelligence hub.';

  // Distinct code treatments
  if (code === 'MEMORY_UNAVAILABLE') {
    return (
      <div
        role="alert"
        className={`rounded-2xl border-2 border-rose-300 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/90 to-red-50/50 dark:from-rose-950/40 dark:to-red-950/20 p-6 md:p-8 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 self-start">
            <ServerCrash className="w-7 h-7" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                503 MEMORY_UNAVAILABLE
              </span>
              <span className="text-xs font-medium text-rose-700 dark:text-rose-400">
                Hindsight Cluster Failure
              </span>
            </div>
            <h3 className="text-lg font-bold text-rose-950 dark:text-rose-100">
              {title || 'AI Memory System Unavailable'}
            </h3>
            <p className="text-sm text-rose-800/90 dark:text-rose-200/90 leading-relaxed">
              The Hindsight shared memory node is currently offline or unreachable. We are not displaying empty results because prior memory records exist but cannot be synchronized right now.
            </p>
            <div className="mt-3 p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-rose-200 dark:border-rose-900/40 font-mono text-xs text-rose-900 dark:text-rose-300 break-words">
              {message}
            </div>

            {onRetry && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Retry Connection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (code === 'LLM_TIMEOUT') {
    return (
      <div
        role="alert"
        className={`rounded-2xl border-2 border-amber-300 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/90 to-yellow-50/50 dark:from-amber-950/40 dark:to-yellow-950/20 p-6 md:p-8 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 self-start">
            <Clock className="w-7 h-7" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                504 LLM_TIMEOUT
              </span>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                Groq Synthesis Delay
              </span>
            </div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-100">
              {title || 'This is taking longer than usual'}
            </h3>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              The LLM synthesis pipeline timed out while consolidating cross-module memories. This typically occurs during high upstream query loads.
            </p>
            <div className="mt-3 p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-900/40 font-mono text-xs text-amber-900 dark:text-amber-300 break-words">
              {message}
            </div>

            {onRetry && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Retry Synthesis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (code === 'NOT_FOUND') {
    return (
      <div
        role="alert"
        className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm ${className}`}
      >
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
          <FileQuestion className="w-6 h-6" />
        </div>
        <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-2">
          404 NOT_FOUND
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title || 'Entity Not Found'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
          {message}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-200"
          >
            <RotateCw className="w-4 h-4" />
            Check Again
          </button>
        )}
      </div>
    );
  }

  if (code === 'VALIDATION_ERROR') {
    return (
      <div
        role="alert"
        className={`rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 p-5 shadow-sm ${className}`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded">
                400 VALIDATION_ERROR
              </span>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                Invalid Parameters
              </h4>
            </div>
            <p className="text-sm text-amber-800 dark:text-amber-300">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Default / Internal Error
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-6 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 shrink-0">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 rounded">
              {code}
            </span>
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {title || 'Request Failed'}
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
          {onRetry && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
