import React from 'react';
import { 
  GitMerge, 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  MessageSquareHeart, 
  Zap, 
  Share2,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactBriefData } from '../../types/api';

interface CrossModuleInsightsProps {
  brief: ContactBriefData;
}

export const CrossModuleInsights: React.FC<CrossModuleInsightsProps> = ({ brief }) => {
  const competitorItems = brief.relevant_competitor_activity || [];
  const feedbackItems = brief.relevant_feedback || [];
  const hasInsights = competitorItems.length > 0 || feedbackItems.length > 0;

  if (!hasInsights) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-300 dark:border-indigo-600/40 bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-pink-50/30 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/20 shadow-md">
      {/* Decorative ambient glowing gradient orb */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-500/20 blur-2xl" 
      />

      <div className="p-6 md:p-7 relative z-10 space-y-5">
        {/* Header with Linked Memory motif */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 dark:border-indigo-900/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-sm ring-4 ring-indigo-100 dark:ring-indigo-900/40">
              <GitMerge className="w-5 h-5 transform rotate-90" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Cross-Module Memory Insights
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Hindsight Synthesized
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                The shared memory graph identified correlations across competitor intelligence and customer sentiment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-2xs self-start sm:self-auto">
            <Workflow className="w-3.5 h-3.5 text-indigo-500" />
            <span>{competitorItems.length + feedbackItems.length} Linked Nodes</span>
          </div>
        </div>

        {/* Recalled Memory Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Competitor Activity Recalls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                Competitor Intelligence Recall
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">External signals</span>
            </div>

            <div className="space-y-2.5">
              {competitorItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl border border-rose-200/80 dark:border-rose-900/50 bg-white/90 dark:bg-slate-900/85 p-3.5 shadow-xs transition hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-100 dark:border-rose-900">
                      <Zap className="w-2.5 h-2.5 text-rose-500" /> Competitor Move
                    </span>
                    <Link
                      to="/competitors/acme-corp"
                      className="text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 inline-flex items-center gap-1"
                    >
                      View Timeline <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {item}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-slate-400" /> Recalled from Competitor Hub
                    </span>
                    <span className="italic font-mono text-[10px]">98% semantic affinity</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Recalls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                Customer Sentiment Recall
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Internal voice of customer</span>
            </div>

            <div className="space-y-2.5">
              {feedbackItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-white/90 dark:bg-slate-900/85 p-3.5 shadow-xs transition hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-100 dark:border-amber-900">
                      <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Customer Trend
                    </span>
                    <Link
                      to="/feedback"
                      className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1"
                    >
                      Explore Feedback <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {item}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-slate-400" /> Recalled from Feedback Cluster
                    </span>
                    <span className="italic font-mono text-[10px]">Verified cohort</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proactive AI Strategy Tip */}
        <div className="rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-200/80 dark:border-indigo-900/40 p-3.5 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">Recommended Talk Track: </span>
            Acknowledge competitor price movements proactively before the prospect brings them up. Reframe on total time-to-value: share how onboarding automation saves 62% implementation effort compared to discount alternatives.
          </div>
        </div>
      </div>
    </div>
  );
};
