import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../api/client';
import { BriefMeResponse, ApiError } from '../../types/api';
import { BriefMeResults } from './BriefMeResults';
import { ErrorState } from '../common/ErrorState';
import { Shimmer } from '../common/Skeleton';
import { 
  Sparkles, 
  Search, 
  CornerDownLeft, 
  Loader2, 
  X, 
  Compass, 
  Lightbulb,
  Cpu
} from 'lucide-react';

interface BriefMeSearchBarProps {
  onSearchComplete?: (res: BriefMeResponse) => void;
  className?: string;
}

const PRESET_QUERIES = [
  'what should I know before calling Acme Corp',
  'how to counter SynthAI consumption billing',
  'what are customers saying about our onboarding experience',
];

export const BriefMeSearchBar: React.FC<BriefMeSearchBarProps> = ({
  onSearchComplete,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const briefMutation = useMutation<BriefMeResponse, ApiError, string>({
    mutationFn: (searchQuery: string) => api.briefMe({ query: searchQuery }),
    onSuccess: (data) => {
      if (onSearchComplete) onSearchComplete(data);
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    briefMutation.mutate(query.trim());
  };

  const handleChipClick = (preset: string) => {
    setQuery(preset);
    briefMutation.mutate(preset);
  };

  const handleClear = () => {
    setQuery('');
    briefMutation.reset();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero Command Bar */}
      <div className="relative group">
        <div 
          aria-hidden="true" 
          className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-25 group-hover:opacity-45 blur-lg transition duration-500" 
        />
        
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-indigo-100 dark:border-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 p-2 sm:p-2.5 transition-all"
        >
          <div className="pl-3 pr-2 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Hindsight: 'What should I know before calling Acme Corp?'"
            className="w-full bg-transparent px-2 py-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            aria-label="Brief Me search query"
          />

          <div className="flex items-center gap-2 pr-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={briefMutation.isPending || !query.trim()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {briefMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Brief Me</span>
                  <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded ml-0.5">
                    ↵
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Quick Queries Chips */}
      {!briefMutation.data && !briefMutation.isPending && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Try asking:
          </span>
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleChipClick(preset)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition active:scale-95 text-left"
            >
              "{preset}"
            </button>
          ))}
        </div>
      )}

      {/* State 1: Loading Skeleton */}
      {briefMutation.isPending && (
        <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Shimmer className="w-10 h-10 rounded-xl bg-indigo-200 dark:bg-indigo-900" />
              <div className="space-y-2">
                <Shimmer className="h-5 w-48 bg-indigo-200 dark:bg-indigo-900" />
                <Shimmer className="h-3 w-64" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-4 h-4 animate-spin text-indigo-500" />
              <span>Traversing memory graph nodes...</span>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            <Shimmer className="h-20 w-full rounded-xl" />
            <Shimmer className="h-20 w-full rounded-xl" />
          </div>
        </div>
      )}

      {/* State 2: Error State */}
      {briefMutation.isError && (
        <ErrorState
          error={briefMutation.error}
          onRetry={handleSubmit}
          title="Brief Me Synthesis Failed"
        />
      )}

      {/* State 3: Success State */}
      {briefMutation.isSuccess && briefMutation.data && (
        <BriefMeResults
          result={briefMutation.data}
          onClose={handleClear}
        />
      )}
    </div>
  );
};
