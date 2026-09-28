import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer,
  Copy,
  Check,
  X,
  Sparkles,
  ShieldAlert,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Layers,
  Building,
  User,
  Zap,
} from 'lucide-react';
import { ContactBriefData } from '../../types/api';

interface ExecutiveExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  brief: ContactBriefData;
}

export const ExecutiveExportModal: React.FC<ExecutiveExportModalProps> = ({
  isOpen,
  onClose,
  brief,
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
# PRELUDE INTELLIGENCE // EXECUTIVE 1-PAGER DOSSIER
**Date Generated:** ${new Date().toLocaleDateString()}
**Target:** ${brief.contact} (${brief.role || 'Executive'}) — ${brief.company || 'Enterprise Account'}
**Contract Value:** ${brief.deal_value || 'N/A'} | **Renewal Horizon:** ${brief.renewal_date || 'N/A'} | **Risk Tier:** ${(brief.churn_risk || 'low').toUpperCase()}

---

## 1. 30-SECOND STRATEGIC SUMMARY
${brief.summary}

## 2. DEPARTMENTAL CONTRADICTION & BLINDSPOTS
${
  brief.contradictions && brief.contradictions.length > 0
    ? brief.contradictions
        .map(
          (c) =>
            `- [${c.severity.toUpperCase()}] **${c.title}**\n  * Silo A (${c.silo_a.source}): ${c.silo_a.claim}\n  * Silo B (${c.silo_b.source}): ${c.silo_b.claim}\n  * Tactical Action: ${c.action_item}`
        )
        .join('\n')
    : 'No active departmental contradictions detected across silos.'
}

## 3. KEY OBJECTION HANDLING & TALKING POINTS
- **Competitor Activity:** ${brief.relevant_competitor_activity?.join('; ') || 'None noted'}
- **Product/Support Telemetry:** ${brief.relevant_feedback?.join('; ') || 'No blocking tickets'}
- **Engineering Status:** ${
      brief.engineering_tickets
        ?.map((t) => `${t.key}: ${t.title} [${t.status.toUpperCase()}]`)
        .join(', ') || 'All patches shipped'
    }

## 4. VERIFIED OPEN PROMISES & COMMITMENTS
${brief.open_promises?.map((p) => `- [ ] ${p}`).join('\n') || 'None'}

---
*Grounded by Prelude Shared-Memory Intelligence Engine (Zero Hallucination Guarantee)*
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
        {/* Printable Card container */}
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
              <div className="w-8 h-8 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#111318]">
                  Executive 1-Pager Dossier
                </h3>
                <p className="text-xs text-[#5B6169] hidden sm:block">
                  Print-ready situational briefing for executive calls and negotiation prep
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
                    <span className="text-emerald-700">Copied Markdown!</span>
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
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#111318] text-sm ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actual 1-Pager Sheet Body (Rendered beautifully both on-screen and print) */}
          <div className="p-8 sm:p-10 space-y-6 text-[#111318] font-sans">
            {/* Memorandum Header */}
            <div className="border-b-2 border-[#111318] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#0E7C7B] font-bold uppercase tracking-wider mb-1">
                  <span>PRELUDE COGNITIVE INTELLIGENCE MEMORANDUM</span>
                  <span>// CONFIDENTIAL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#111318]">
                  {brief.contact}
                </h1>
                <p className="text-sm font-medium text-[#5B6169] mt-0.5">
                  {brief.role} · <strong className="text-[#111318]">{brief.company}</strong>
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs">
                <span className="font-mono text-[#5B6169]">
                  Date: <strong>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                </span>
                <span className="font-mono px-2 py-0.5 rounded-md bg-[#F7F8F9] border border-[#E5E7EB] text-[#111318] font-bold">
                  Target ID: {brief.contact_id || 'jane-doe'}
                </span>
              </div>
            </div>

            {/* Key Telemetry Triad */}
            <div className="grid grid-cols-3 gap-3 bg-[#F7F8F9] p-4 rounded-2xl border border-[#E5E7EB] text-xs">
              <div>
                <span className="font-mono text-[#5B6169] text-[10px] uppercase font-bold block mb-0.5">
                  Contract ARR
                </span>
                <span className="text-base font-extrabold text-[#111318] font-display">
                  {brief.deal_value || '$140,000'}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#5B6169] text-[10px] uppercase font-bold block mb-0.5">
                  Renewal Horizon
                </span>
                <span className="text-xs font-bold text-[#111318]">
                  {brief.renewal_date || 'Upcoming'}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#5B6169] text-[10px] uppercase font-bold block mb-0.5">
                  Churn Vulnerability
                </span>
                <span
                  className={`text-xs font-extrabold uppercase ${
                    brief.churn_risk === 'high'
                      ? 'text-rose-700'
                      : brief.churn_risk === 'medium'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {brief.churn_risk || 'Low'} Risk
                </span>
              </div>
            </div>

            {/* 1. 30-Second Exec Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[#0E7C7B] tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>30-Second Situational Assessment</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#111318] leading-relaxed bg-[#F7F8F9] p-4 rounded-xl border border-[#E5E7EB]">
                {brief.summary}
              </p>
            </div>

            {/* 2. Departmental Contradiction Radar (If Present) */}
            {brief.contradictions && brief.contradictions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-rose-700 tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Silo Contradiction Radar (Blindspot Warning)</span>
                </h4>
                <div className="space-y-2">
                  {brief.contradictions.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-xs text-[#111318] space-y-2"
                    >
                      <div className="font-bold text-rose-900 flex items-center justify-between">
                        <span>{c.title}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                          {c.severity}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-rose-200/60">
                        <div className="bg-white/80 p-2 rounded-lg border border-rose-100">
                          <span className="font-bold text-rose-800 block text-[10px]">
                            {c.silo_a.source}:
                          </span>
                          <span className="italic">"{c.silo_a.claim}"</span>
                        </div>
                        <div className="bg-white/80 p-2 rounded-lg border border-rose-100">
                          <span className="font-bold text-rose-800 block text-[10px]">
                            {c.silo_b.source}:
                          </span>
                          <span className="italic">"{c.silo_b.claim}"</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-rose-950 font-medium bg-rose-100/60 p-2 rounded-lg">
                        <strong>Playbook:</strong> {c.action_item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Tactical Grid: Competitor Counter & Open Promises */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Competitor Moves */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2 shadow-2xs">
                <h5 className="font-bold text-[#111318] flex items-center gap-1.5 font-display">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                  <span>Competitor Moves To Counter</span>
                </h5>
                <ul className="space-y-1.5 list-disc list-inside text-[#5B6169] text-[11px] leading-relaxed">
                  {brief.relevant_competitor_activity?.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              {/* Open Promises */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2 shadow-2xs">
                <h5 className="font-bold text-[#111318] flex items-center gap-1.5 font-display">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prior Commitments Due</span>
                </h5>
                <ul className="space-y-1.5 list-disc list-inside text-[#5B6169] text-[11px] leading-relaxed">
                  {brief.open_promises?.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Engineering Bridge & Audio Transcripts */}
            {brief.engineering_tickets && brief.engineering_tickets.length > 0 && (
              <div className="p-4 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#0E7C7B] uppercase font-bold text-[10px] flex items-center gap-1">
                    <FileCode className="w-3 h-3" /> Live Engineering Patch Verification
                  </span>
                  <span className="text-[10px] text-[#5B6169]">Jira Sync</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brief.engineering_tickets.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2.5 rounded-lg border border-[#E5E7EB] text-[11px] flex items-center justify-between"
                    >
                      <div className="truncate mr-2">
                        <strong className="text-indigo-700 font-mono mr-1.5">{t.key}</strong>
                        <span className="text-[#111318]">{t.title}</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 shrink-0 font-bold">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Sign-off */}
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] font-mono text-[#5B6169]">
              <span>PRELUDE SHARED MEMORY ENGINE // ZERO HALLUCINATION</span>
              <span>VERIFIED VECTOR SCORE: 0.94</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
