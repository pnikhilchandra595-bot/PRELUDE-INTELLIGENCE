import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Command,
  ArrowRight,
  ShieldCheck,
  Split,
  AlertCircle,
  Clock,
  ExternalLink,
  Brain,
  X,
} from 'lucide-react';
import { GlassCard, GlassPanel, GlassPill, GlassBadge } from '../glass';
import { useBriefMe } from '../../api/queries';
import { BriefMeResponse } from '../../types/api';

interface BriefMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const BriefMeModal: React.FC<BriefMeModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'executive' | 'sales' | 'product'>('executive');
  const briefMeMutation = useBriefMe();
  const [result, setResult] = useState<BriefMeResponse | null>(null);

  // Keyboard shortcut listener (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim() || searchQuery.trim().length < 3) return;
    try {
      const resp = await briefMeMutation.mutateAsync({
        query: searchQuery,
        role: selectedRole,
      });
      setResult(resp);
    } catch (e) {
      // error handled in mutation state
    }
  };

  const samplePrompts = [
    {
      label: 'Target Dossier',
      query: 'What should I know before calling Jane Doe at Acme Corp?',
      tag: 'Sales & Renewal',
    },
    {
      label: 'Competitive Defense',
      query: 'Summarize recent competitor pricing moves against our enterprise tier',
      tag: 'Market Intel',
    },
    {
      label: 'Product Feedback',
      query: 'What are the recurring complaints regarding billing CSV export timeouts?',
      tag: 'Support & Tickets',
    },
    {
      label: 'Cross-Silo Blindspots',
      query: 'What are the highest risk contradictions between Sales notes and Engineering tickets?',
      tag: 'Risk Radar',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 pb-12 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden text-[#111318]"
          >
            {/* Modal Search Bar Header */}
            <div className="p-5 border-b border-[#E5E7EB] bg-[#F7F8F9]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B] shrink-0">
                  <Brain className="w-5 h-5 text-[#0E7C7B]" />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Brief Me: Ask anything across Sales, Product, Marketing, and Competitor history..."
                    className="w-full bg-transparent text-[#111318] text-base placeholder-[#5B6169] focus:outline-none pr-10"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5B6169] hover:text-[#111318] text-xs px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  disabled={briefMeMutation.isPending || query.length < 3}
                  onClick={() => handleSearch()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{briefMeMutation.isPending ? 'Synthesizing...' : 'Synthesize'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#111318] text-sm ml-1 shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Role selection & quick shortcuts */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs">
                <div className="flex items-center gap-1.5 text-[#5B6169]">
                  <span className="font-medium text-[#111318]">Synthesize for:</span>
                  {(['executive', 'sales', 'product'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-1 rounded-full capitalize transition-all text-xs cursor-pointer ${
                        selectedRole === role
                          ? 'bg-[#0E7C7B] text-white font-semibold shadow-sm'
                          : 'bg-white text-[#5B6169] hover:text-[#111318] border border-[#E5E7EB]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {/* Instant prompt pill shortcuts */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  {samplePrompts.slice(0, 3).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(p.query);
                        handleSearch(p.query);
                      }}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#E8F5F5] border border-[#E5E7EB] hover:border-[#0E7C7B]/40 text-[#5B6169] hover:text-[#0E7C7B] text-[11px] font-medium transition-all shrink-0 cursor-pointer shadow-2xs"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[#5B6169]">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white text-[#5B6169] border border-[#E5E7EB]">
                    ESC to close
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Prompts (if no result yet) */}
            {!result && !briefMeMutation.isPending && (
              <div className="p-6 space-y-4">
                <p className="text-xs font-mono text-[#0E7C7B] tracking-wider font-bold">
                  SUGGESTED CROSS-MODULE INTELLIGENCE QUERIES
                </p>
                <div className="space-y-2">
                  {samplePrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(p.query);
                        handleSearch(p.query);
                      }}
                      className="w-full text-left p-3.5 rounded-2xl bg-[#F7F8F9] hover:bg-white border border-[#E5E7EB] hover:border-[#0E7C7B]/40 transition-all flex items-center justify-between group shadow-sm cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#0E7C7B] tracking-wide block">
                          {p.tag} · {p.label}
                        </span>
                        <span className="text-sm font-medium text-[#111318] group-hover:text-[#0E7C7B]">
                          {p.query}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B6169] group-hover:text-[#0E7C7B] transform group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Shimmer */}
            {briefMeMutation.isPending && (
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-[#0E7C7B] text-sm font-semibold">
                  <div className="w-3 h-3 rounded-full bg-[#0E7C7B] animate-ping" />
                  <span>Recalling cross-silo memory nodes from Vectorize Hindsight cluster...</span>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="h-5 bg-slate-200/70 rounded-md animate-pulse w-3/4" />
                  <div className="h-4 bg-slate-200/50 rounded-md animate-pulse w-full" />
                  <div className="h-4 bg-slate-200/50 rounded-md animate-pulse w-5/6" />
                  <div className="h-4 bg-slate-200/50 rounded-md animate-pulse w-4/5" />
                </div>
              </div>
            )}

            {/* Synthesized Brief Result */}
            {result && !briefMeMutation.isPending && (
              <div className="p-6 space-y-6">
                {/* Result Header & Signature Compare Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/30">
                      Confidence: {result.confidence_score}%
                    </span>
                    <span className="text-xs text-[#5B6169]">
                      Grounded in {result.sources?.length || 3} verified memories
                    </span>
                  </div>

                  {/* SIGNATURE MOMENT: Compare Toggle */}
                  <div className="flex items-center gap-1.5 bg-[#F7F8F9] p-1 rounded-full border border-[#E5E7EB]">
                    <button
                      onClick={() => setCompareMode(false)}
                      className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                        !compareMode
                          ? 'bg-[#0E7C7B] text-white shadow-sm'
                          : 'text-[#5B6169] hover:text-[#111318]'
                      }`}
                    >
                      With Shared Memory
                    </button>
                    <button
                      onClick={() => setCompareMode(true)}
                      className={`px-3 py-1 text-xs rounded-full transition-all flex items-center gap-1 font-medium ${
                        compareMode
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-[#5B6169] hover:text-[#111318]'
                      }`}
                    >
                      <Split className="w-3 h-3" />
                      Compare (Without Memory)
                    </button>
                  </div>
                </div>

                {/* Split Comparison View */}
                {compareMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Without Memory (Dimmed, Generic, Flawed) */}
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-rose-700 font-bold">
                          WITHOUT PERSISTENT MEMORY (GENERIC LLM)
                        </span>
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      </div>
                      <p className="text-sm text-rose-950 leading-relaxed italic">
                        "{result.generic_comparison?.generic_answer ||
                          'Thank the customer for their business, discuss standard contract renewal rates, and inquire if they have experienced any general platform issues.'}"
                      </p>
                      <div className="pt-2 border-t border-rose-200 space-y-1.5">
                        <span className="text-xs text-rose-800 font-bold block">
                          Critical Blindspots:
                        </span>
                        <ul className="text-xs text-rose-700 space-y-1 list-disc list-inside">
                          <li>Unaware of competitor 20% price cut 3 days prior</li>
                          <li>Misses 3 unresolved support tickets regarding CSV timeouts</li>
                          <li>Violates agreed-upon budget ceiling</li>
                        </ul>
                      </div>
                    </div>

                    {/* With Memory (Sharp, Grounded, High-Value) */}
                    <div className="p-5 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 shadow-md space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#0E7C7B] font-bold">
                          WITH PRELUDE SHARED MEMORY
                        </span>
                        <Sparkles className="w-4 h-4 text-[#0E7C7B]" />
                      </div>
                      <p className="text-sm text-[#111318] leading-relaxed font-normal">
                        {result.synthesized_answer}
                      </p>
                      <div className="pt-2 border-t border-[#0E7C7B]/20">
                        <span className="text-xs text-[#0E7C7B] font-bold block mb-1">
                          Recommended Action:
                        </span>
                        <p className="text-xs text-[#111318] bg-white p-2.5 rounded-xl border border-[#E5E7EB]">
                          {result.recommended_action}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Rich View */
                  <div className="space-y-6">
                    {/* Synthesized Answer */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#0E7C7B] font-bold">
                        CROSS-MODULE STRATEGIC SYNTHESIS
                      </span>
                      <p className="text-base text-[#111318] leading-relaxed bg-[#F7F8F9] p-5 rounded-2xl border border-[#E5E7EB]">
                        {result.synthesized_answer}
                      </p>
                    </div>

                    {/* Key Takeaways */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#5B6169] font-bold">
                        KEY COGNITIVE TAKEAWAYS
                      </span>
                      <div className="grid grid-cols-1 gap-2.5">
                        {result.key_takeaways?.map((takeaway, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E5E7EB] text-sm text-[#111318] shadow-sm"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#0E7C7B] shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Action */}
                    {result.recommended_action && (
                      <div className="p-4 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-mono text-[#0E7C7B] font-bold block mb-1">
                            RECOMMENDED STRATEGIC PLAYBOOK
                          </span>
                          <p className="text-sm text-[#111318]">
                            {result.recommended_action}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Grounded Sources */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono text-[#5B6169] font-bold">
                        GROUNDED MEMORY SOURCES & PROVENANCE
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {result.sources?.map((src, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-1.5 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-[#0E7C7B] uppercase font-bold">
                                {src.module}
                              </span>
                              {src.date && (
                                <span className="text-[10px] text-[#5B6169]">
                                  {src.date}
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-[#111318] truncate">
                              {src.title}
                            </p>
                            <p className="text-[#5B6169] line-clamp-2 italic">
                              "{src.snippet}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
