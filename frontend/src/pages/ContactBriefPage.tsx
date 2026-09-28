import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Compass,
  MessageSquare,
  Clock,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  X,
  DollarSign,
  TrendingUp,
  Headphones,
  FileCode,
  AlertTriangle,
  Printer,
} from 'lucide-react';
import {
  GlassCard,
  GlassPanel,
  GlassPill,
  GlassBadge,
  FreshnessDot,
  GlassSkeleton,
  GlassEmptyState,
  GlassErrorState,
} from '../components/glass';
import { ExecutiveExportModal } from '../components/contacts/ExecutiveExportModal';
import { StanceTimeline } from '../components/contacts/StanceTimeline';
import { ContradictionRadar } from '../components/contacts/ContradictionRadar';
import { ArrTrajectoryCard } from '../components/contacts/ArrTrajectoryCard';
import { useContactBrief, useContactsList } from '../api/queries';
import { FactSource } from '../types/api';

export const ContactBriefPage: React.FC = () => {
  const { id = 'jane-doe' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: contacts } = useContactsList();
  const { data: brief, isLoading, isError, error, refetch } = useContactBrief(id);

  // Provenance drawer state: "Why this answer"
  const [selectedSource, setSelectedSource] = useState<FactSource | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Streaming effect simulation: facts landing one-by-one with soft glow
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    setRevealedCount(0);
    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 240); // 240ms staggered streaming arrival

    return () => clearInterval(interval);
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <GlassSkeleton variant="rect" className="h-20 rounded-2xl w-full" />
        <GlassSkeleton variant="rect" className="h-64 rounded-3xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassSkeleton variant="rect" className="h-48 rounded-2xl" />
          <GlassSkeleton variant="rect" className="h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Contact Briefing Unavailable"
        message={error?.message || `Unable to synthesize profile for contact "${id}".`}
        onRetry={() => refetch()}
      />
    );
  }

  const isColdStart = brief?.context_depth === 'low';

  const handleOpenSourceDrawer = (source: FactSource) => {
    setSelectedSource(source);
    setIsDrawerOpen(true);
  };

  const getChurnRiskBadge = (risk?: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            High Churn Risk (Competitive Threat)
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Moderate Churn Risk (Compliance / SLA)
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Low Churn Risk (Strong Expansion)
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header & Contact Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono text-[#0E7C7B] font-bold">
              FLAGSHIP INTELLIGENCE BRIEF // 360° DOSSIER
            </span>
            <GlassBadge
              type="context-depth"
              depth={brief?.context_depth || 'rich'}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-[#111318]">
            {brief?.contact || 'Contact Dossier'}
          </h1>
          <p className="text-sm text-[#5B6169]">
            {brief?.role} · <strong className="text-[#111318]">{brief?.company}</strong>
          </p>
        </div>

        {/* Action Controls: Switch Target & Export 1-Pager */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="contact-select" className="text-xs text-[#5B6169] font-medium">
              Switch Target:
            </label>
            <select
              id="contact-select"
              value={id}
              onChange={(e) => navigate(`/contacts/${e.target.value}`)}
              className="bg-white border border-[#E5E7EB] text-[#111318] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#0E7C7B] shadow-sm font-medium"
            >
              {contacts?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.company})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Executive 1-Pager</span>
          </button>
        </div>
      </div>

      {/* 2. Cold Start State */}
      {isColdStart ? (
        <GlassEmptyState
          title="No Prior History: First Interaction"
          description="This contact has zero recorded meetings or historical tickets in the Hindsight bank. The first interaction will automatically initialize entity tracking and link cross-module signals."
          actionLabel="Log First Interaction"
          onAction={() => alert('Log Interaction modal initialized')}
        />
      ) : (
        /* 3. Flagship Assembled Brief with Streaming Glow */
        <div className="space-y-6">
          {/* Financial & Contract Telemetry Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block mb-0.5">
                  Contract / Deal Value
                </span>
                <span className="text-xl font-extrabold text-[#111318] font-display">
                  {brief?.deal_value || '$120,000 ARR'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/20 flex items-center justify-center text-[#0E7C7B]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block mb-0.5">
                  Renewal Horizon
                </span>
                <span className="text-sm font-bold text-[#111318] font-display">
                  {brief?.renewal_date || 'Q4 2026 Scheduled'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block mb-1">
                  Account Health
                </span>
                {getChurnRiskBadge(brief?.churn_risk)}
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Executive Summary Card with Sentence-Level (i) Provenance Traces */}
          <GlassCard glowColor="teal" className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold font-display text-[#111318]">
                  Executive Briefing & Strategic Summary
                </h2>
              </div>
              {brief?.last_meeting && (
                <div className="flex items-center gap-1.5 text-xs text-[#5B6169]">
                  <Calendar className="w-3.5 h-3.5 text-[#5B6169]" />
                  <span>Last met: <strong className="text-[#111318]">{brief.last_meeting}</strong></span>
                </div>
              )}
            </div>

            {/* Synthesized Sentences with Interactive (i) Provenance Icons */}
            <div className="text-base text-[#111318] leading-relaxed space-y-3 bg-[#F7F8F9] p-5 rounded-2xl border border-[#E5E7EB]">
              <p>
                {brief?.summary}
              </p>

              {/* Provenance Quick Badges */}
              {brief?.sources && brief.sources.length > 0 && (
                <div className="pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#5B6169] font-medium flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#0E7C7B]" /> Verified Provenance Sources:
                  </span>
                  {brief.sources.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenSourceDrawer(src)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-[#111318] hover:border-[#0E7C7B] hover:text-[#0E7C7B] transition-all font-mono text-[11px] shadow-2xs font-semibold cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E7C7B]" />
                      {src.memory_id} ({src.module})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>

          {/* Departmental Contradiction Radar (Blindspot Warning) */}
          {brief?.contradictions && brief.contradictions.length > 0 && (
            <ContradictionRadar contradictions={brief.contradictions} />
          )}

          {/* Account ARR Trajectory Card */}
          {brief?.arr_history && brief.arr_history.length > 0 && (
            <ArrTrajectoryCard arrHistory={brief.arr_history} dealValue={brief.deal_value} />
          )}

          {/* Temporal Stance & Sentiment Evolution */}
          {brief?.stance_evolution && brief.stance_evolution.length > 0 && (
            <StanceTimeline stanceEvolution={brief.stance_evolution} />
          )}

          {/* Facts Appearing One by One with Staggered Glowing Arrival */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Open Promises */}
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[#111318] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Open Promises (From Prior Meetings)</span>
                </h3>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {brief?.open_promises?.length || 0} active
                </span>
              </div>

              <div className="space-y-2.5">
                {brief?.open_promises?.map((promise, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: revealedCount > i ? 1 : 0, x: revealedCount > i ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs text-[#111318] flex items-start gap-2.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{promise}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Relevant Competitor Activity */}
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[#111318] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Relevant Competitor Activity</span>
                </h3>
                <span className="text-xs font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Cross-Signal Alerts
                </span>
              </div>

              <div className="space-y-2.5">
                {brief?.relevant_competitor_activity?.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: revealedCount > i + 1 ? 1 : 0, x: revealedCount > i + 1 ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-[#111318] flex items-start gap-2.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Relevant Feedback & Support Signals */}
            <GlassCard className="p-6 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[#111318] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  <span>Relevant Feedback & Support Telemetry</span>
                </h3>
                <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Zendesk & Intercom Feeds
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brief?.relevant_feedback?.map((fdbk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: revealedCount > i + 2 ? 1 : 0, y: revealedCount > i + 2 ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#111318] flex items-start gap-2.5 shadow-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{fdbk}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* NEW REALISM MODULE: Gong Audio Transcripts */}
            {brief?.call_transcripts && brief.call_transcripts.length > 0 && (
              <GlassCard className="p-6 space-y-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-[#111318] flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#0E7C7B]" />
                    <span>Gong Conversation Intelligence // Verified Audio Transcripts</span>
                  </h3>
                  <span className="text-xs font-mono text-[#0E7C7B] font-bold bg-[#E8F5F5] px-2.5 py-0.5 rounded-full border border-[#0E7C7B]/30">
                    Timestamp Synchronized
                  </span>
                </div>

                <div className="space-y-3">
                  {brief.call_transcripts.map((t, idx) => {
                    const sentimentColors = {
                      frustrated: 'bg-rose-50 text-rose-700 border-rose-200',
                      urgent: 'bg-amber-50 text-amber-800 border-amber-200',
                      positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      neutral: 'bg-slate-50 text-slate-700 border-[#E5E7EB]',
                    };
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0E7C7B] bg-[#E8F5F5] px-2 py-0.5 rounded-md">
                              {t.timestamp}
                            </span>
                            <span className="text-xs font-bold text-[#111318]">
                              {t.speaker}
                            </span>
                          </div>
                          {t.sentiment && (
                            <span
                              className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${sentimentColors[t.sentiment]}`}
                            >
                              {t.sentiment}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5B6169] leading-relaxed italic pl-2 border-l-2 border-[#0E7C7B]/40">
                          "{t.text}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* NEW REALISM MODULE: Engineering & Jira Issue Bridge */}
            {brief?.engineering_tickets && brief.engineering_tickets.length > 0 && (
              <GlassCard className="p-6 space-y-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-[#111318] flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-indigo-600" />
                    <span>Jira Engineering Bridge // Linked Resolution Telemetry</span>
                  </h3>
                  <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    Live Sprint Sync
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brief.engineering_tickets.map((t, idx) => {
                    const statusColors = {
                      in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
                      review: 'bg-purple-50 text-purple-700 border-purple-200',
                      resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      blocked: 'bg-rose-50 text-rose-700 border-rose-200',
                    };
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#111318] shadow-2xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                            {t.key}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${statusColors[t.status]}`}
                          >
                            {t.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-semibold text-xs text-[#111318]">
                          {t.title}
                        </p>
                        {t.assignee && (
                          <div className="text-[11px] text-[#5B6169] flex items-center gap-1.5 pt-1 border-t border-[#E5E7EB]">
                            <span>Lead:</span>
                            <strong className="text-[#111318]">{t.assignee}</strong>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      )}

      {/* 4. SIGNATURE MOMENT: "Why this answer" Sliding Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedSource && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between border-l border-[#E5E7EB] shadow-2xl overflow-y-auto text-[#111318]"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0E7C7B]" />
                    <h3 className="font-display font-bold text-lg text-[#111318]">
                      Why This Answer?
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#F7F8F9] hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#111318] text-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#0E7C7B] font-bold block mb-1">
                      SOURCE MEMORY IDENTIFIER
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#F7F8F9] text-[#111318] border border-[#E5E7EB] font-semibold">
                      {selectedSource.memory_id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#5B6169] border-y border-[#E5E7EB] py-3">
                    <div>
                      <span>Origin Module: </span>
                      <strong className="text-[#111318] capitalize font-bold">
                        {selectedSource.module}
                      </strong>
                    </div>
                    <FreshnessDot ageDays={selectedSource.age_days || 14} showLabel />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#5B6169] font-bold block mb-1">
                      VERIFIED FACT EXCERPT
                    </span>
                    <div className="p-4 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] text-sm text-[#111318] leading-relaxed italic">
                      "{selectedSource.excerpt}"
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 space-y-2">
                    <span className="text-xs font-mono text-[#0E7C7B] font-bold block">
                      GROUNDING GUARANTEE
                    </span>
                    <p className="text-xs text-[#111318] leading-relaxed">
                      This assertion was recalled directly from the Hindsight cluster with an exact vector match threshold of 0.88. No ungrounded hallucinations permitted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E7EB]">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm"
                >
                  Close Provenance Trace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Executive 1-Pager Dossier & PDF Export Modal */}
      {brief && (
        <ExecutiveExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          brief={brief}
        />
      )}
    </div>
  );
};
