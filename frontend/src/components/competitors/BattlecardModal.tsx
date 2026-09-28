import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer,
  Copy,
  Check,
  X,
  ShieldAlert,
  Sparkles,
  Zap,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Crosshair,
  DollarSign,
  Layers,
} from 'lucide-react';
import { Competitor, CompetitorEvent } from '../../types/api';

interface BattlecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitor: Competitor;
  events?: CompetitorEvent[];
}

export const BattlecardModal: React.FC<BattlecardModalProps> = ({
  isOpen,
  onClose,
  competitor,
  events = [],
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `
# PRELUDE INTELLIGENCE // COMPETITIVE BATTLECARD: ${competitor.name.toUpperCase()}
**Domain:** ${competitor.domain} | **Tier:** ${competitor.tier.toUpperCase()} | **Category:** ${competitor.category}
**Date Generated:** ${new Date().toLocaleDateString()}

---

## 1. STRATEGIC POSITIONING & DISPLACEMENT PLAYBOOK
- **Their Main Pitch:** Aggressive 20% lower price point with standard cloud infrastructure bundling.
- **Our Winning Angle:** Cross-functional shared memory hub linking Sales, Product, and Support with zero hallucination. While they offer commodity hosting, Prelude eliminates cross-department context amnesia.

## 2. KEY TALK-TRACKS (WINNING RESPONSES)
1. **On Pricing Discrepancy:**
   "ApexCloud pitches a $75k sticker price, but add-on egress surcharges and compute credit multipliers add 35% to total annual spend. Prelude's predictable cap covers all cross-module vector pipelines."
2. **On Latency & Reliability:**
   "ApexCloud relies on cold-start vector namespace shards with 8-second initial query latency. Prelude delivers sub-150ms persistent memory retrieval."
3. **On Enterprise Compliance:**
   "Prelude provides native SHA-256 cryptographic provenance verification on every memory sync; ApexCloud lacks multi-tenant audit isolation."

## 3. CRITICAL LANDMINES TO AVOID
- DO NOT get drawn into feature-by-feature comparisons on setup wizards.
- DO NOT quote raw cluster pricing without demonstrating our cross-silo memory recall ROI.

## 4. RECENT VERIFIED SIGNALS
${events.slice(0, 4).map((e) => `- [${e.event_date}] ${e.title} (${e.event_type.toUpperCase()} / ${e.impact_level || 'MED'} IMPACT)`).join('\n')}

---
*Grounded by Prelude Shared Memory Engine*
`.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-10 px-3 sm:px-6 pb-16 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden my-auto text-[#111318] print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none relative"
        >
          {/* Header Controls (Sticky so always visible during scroll) */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md print:hidden shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Crosshair className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#111318]">
                  Sales Competitive Battlecard // 1-Pager
                </h3>
                <p className="text-xs text-[#5B6169] hidden sm:block">
                  Pre-meeting counter-tactics, landmines, and pricing defense against {competitor.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111318] hover:border-[#0E7C7B] hover:text-[#0E7C7B] transition-all shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Battlecard</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#111318] text-sm ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actual Battlecard Content */}
          <div className="p-8 sm:p-10 space-y-6 text-[#111318] font-sans">
            {/* Header Banner */}
            <div className="border-b-2 border-[#111318] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold uppercase tracking-wider mb-1">
                  <span>PRELUDE COMPETITIVE INTELLIGENCE BATTLECARD</span>
                  <span>// TACTICAL MEMO</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#111318]">
                  Target: {competitor.name}
                </h1>
                <p className="text-sm font-medium text-[#5B6169] mt-0.5">
                  Category: <strong className="text-[#111318]">{competitor.category}</strong> · Domain: <strong className="text-[#111318]">{competitor.domain}</strong>
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs">
                <span className="font-mono text-[#5B6169]">
                  Date: <strong>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                </span>
                <span className="font-mono px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                  {competitor.tier.toUpperCase()} COMPETITOR
                </span>
              </div>
            </div>

            {/* Quick Strategic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Their Strengths */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <h4 className="font-bold text-rose-900 font-display flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Their Attack Vectors & Strengths</span>
                </h4>
                <ul className="space-y-1.5 text-rose-950 list-disc list-inside text-[11px] leading-relaxed">
                  <li>Aggressive 20% sticker price discount pitched to procurement officers ($75k floor)</li>
                  <li>Fast initial wizard onboarding (under 45 minutes)</li>
                  <li>Bundled basic commodity compute resources</li>
                </ul>
              </div>

              {/* Our Displacing Strengths */}
              <div className="p-4 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 space-y-2">
                <h4 className="font-bold text-[#0E7C7B] font-display flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C7B]" />
                  <span>Our Irreplaceable Defenses</span>
                </h4>
                <ul className="space-y-1.5 text-[#111318] list-disc list-inside text-[11px] leading-relaxed">
                  <li>Persistent cross-silo memory connects Sales, Engineering, and Zendesk telemetry</li>
                  <li>Sub-150ms instant recall vs. their 8-second cold start latency</li>
                  <li>Cryptographic SHA-256 audit trails for regulated enterprise compliance</li>
                </ul>
              </div>
            </div>

            {/* 3 Winning Talk Tracks */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-[#0E7C7B] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3 Winning Talk Tracks For Customer Conversations</span>
              </h4>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-1">
                  <strong className="text-[#111318] block font-display">
                    1. Neutralizing The 20% Sticker Price Cut:
                  </strong>
                  <p className="text-[#5B6169] italic leading-relaxed">
                    "ApexCloud pitches a $75k entry point, but customer telemetry shows unexpected egress fees and credit burn that pushes annual cost 35% higher. Prelude guarantees an all-inclusive enterprise cap with dedicated pods."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-1">
                  <strong className="text-[#111318] block font-display">
                    2. Exposing Their Context Amnesia Blindspot:
                  </strong>
                  <p className="text-[#5B6169] italic leading-relaxed">
                    "ApexCloud stores isolated data shards. When your billing ops team faces an issue, your engineering team has no shared memory of what was promised. Prelude preserves unified institutional context."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-1">
                  <strong className="text-[#111318] block font-display">
                    3. Demonstrating Enterprise SLA & Performance:
                  </strong>
                  <p className="text-[#5B6169] italic leading-relaxed">
                    "Our v2.4 patch deployed async streaming chunking to eliminate timeouts, backed by sub-second latency SLA guarantees."
                  </p>
                </div>
              </div>
            </div>

            {/* Landmines To Avoid */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Critical Landmines To Avoid During Pitch</span>
              </div>
              <ul className="text-amber-950 text-[11px] space-y-1 list-disc list-inside">
                <li><strong>Do NOT</strong> debate cluster provisioning speed; pivot immediately to long-term memory maintenance cost.</li>
                <li><strong>Do NOT</strong> quote raw tier pricing without referencing their unannounced egress fees.</li>
              </ul>
            </div>

            {/* Recent Radar Events */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[#5B6169] tracking-wider">
                Recent Intelligence Radar Signals ({events.length} Tracked)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {events.slice(0, 4).map((e) => (
                  <div key={e.id} className="p-2.5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-[#0E7C7B] uppercase font-bold">{e.event_type}</span>
                      <span className="text-[#5B6169] font-mono">{e.event_date}</span>
                    </div>
                    <p className="font-semibold text-[#111318] text-[11px] truncate">{e.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
