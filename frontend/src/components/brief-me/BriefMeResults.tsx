import React from 'react';
import { BriefMeResponse, BriefMeSource } from '../../types/api';
import { ModuleBadge } from '../common/Badge';
import { 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  BrainCircuit,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface BriefMeResultsProps {
  result: BriefMeResponse;
  onClose?: () => void;
}

export const BriefMeResults: React.FC<BriefMeResultsProps> = ({ result, onClose }) => {
  return (
    <div className="space-y-6">
      {/* Hero Synthesized Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-300 dark:border-indigo-600/50 bg-gradient-to-br from-indigo-50/95 via-purple-50/60 to-white dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 p-6 md:p-8 shadow-lg">
        {/* Ambient background glow */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 blur-3xl" 
        />

        <div className="relative z-10 space-y-5">
          {/* Header metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 dark:border-indigo-900/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Hindsight Executive Brief
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    <ShieldCheck className="w-3 h-3" /> {result.confidence_score}% Confidence
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Synthesized across {result.sources.length} intelligence nodes
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              Query: "{result.query}"
            </span>
          </div>

          {/* Main Synthesized Narrative (Safe Plain Text) */}
          <div className="rounded-xl bg-white/90 dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/60 p-4 md:p-5 shadow-xs">
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
              {result.synthesized_answer}
            </p>
          </div>

          {/* Key Takeaways */}
          {result.key_takeaways && result.key_takeaways.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-300">
                Key Strategic Takeaways
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.key_takeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-indigo-100/80 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Action */}
          {result.recommended_action && (
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <span className="font-bold">Next Best Action: </span>
                {result.recommended_action}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attribution & Traceability Section (First-Class Visual Element) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Source Memory Traceability ({result.sources.length})
            </h4>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Attributed across shared memory modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {result.sources.map((source, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition"
            >
              <div className="flex items-center justify-between gap-2">
                <ModuleBadge module={source.module} />
                {source.date && (
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {source.date}
                  </span>
                )}
              </div>

              <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {source.title}
              </h5>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                "{source.snippet}"
              </p>

              {source.url && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                  <Link
                    to={source.url}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Inspect in Module <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
