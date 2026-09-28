import React from 'react';
import { Check, X, Sparkles, AlertCircle } from 'lucide-react';

export const LandingComparison: React.FC = () => {
  const comparisonRows = [
    {
      dimension: 'Context Retention',
      traditional: 'Amnesiac per-tool chats. Every new session resets to zero baseline.',
      prelude: 'Persistent cognitive memory graph. Continuously extracts and connects atomic facts.',
      isHighlight: true,
    },
    {
      dimension: 'Cross-Silo Visibility',
      traditional: 'Siloed data: Support tickets in Zendesk, sales notes in Gong, competitor intel in Slack.',
      prelude: 'Unified cross-functional synthesis connecting commercial, technical, and market signals.',
      isHighlight: true,
    },
    {
      dimension: 'Negotiation Preparedness',
      traditional: 'Blindsided by competitor 20% price cuts brought up mid-call by prospects.',
      prelude: 'Proactive warning alerts & verified playbooks tailored to account budget caps.',
      isHighlight: true,
    },
    {
      dimension: 'Hallucination & Provenance',
      traditional: 'Generative guesses with zero attribution or broken link citations.',
      prelude: '100% cited source memories with interactive "Why this answer" provenance traces.',
      isHighlight: true,
    },
    {
      dimension: 'Preparation Turnaround Time',
      traditional: '3 to 4 hours of tedious manual digging through CRM, tickets, and changelogs.',
      prelude: 'Instant 2-second synthesized briefing with role-tailored takeaways.',
      isHighlight: true,
    },
    {
      dimension: 'New Hire Turnover Onboarding',
      traditional: '3 to 6 months to understand account context when an account manager departs.',
      prelude: 'Day-1 360° account onboarding brief with complete commercial history.',
      isHighlight: true,
    },
  ];

  return (
    <section id="compare" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            OLD WAY VS. NEW WAY // ARCHITECTURAL RECKONING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#111318] tracking-tight">
            Enterprise Intelligence, Reimagined
          </h2>
          <p className="text-base text-[#5B6169] leading-relaxed">
            See how shifting from fragmented corporate silos to a unified cognitive memory graph fundamentally alters decision velocity.
          </p>
        </div>

        {/* Desktop Comparison Table (Hidden on Mobile) */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-[#E5E7EB] shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="p-6 text-sm font-mono font-bold text-[#5B6169] uppercase bg-[#F7F8F9] w-1/4">
                  Evaluation Dimension
                </th>
                <th className="p-6 text-base font-bold text-[#111318] bg-[#F7F8F9] w-3/8">
                  Traditional Siloed Tools
                </th>
                <th className="p-6 text-base font-bold text-[#0E7C7B] bg-[#E8F5F5] w-3/8 border-l border-[#0E7C7B]/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0E7C7B]" />
                    <span>Prelude Shared Memory Hub</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-[#111318] align-top bg-white">
                    {row.dimension}
                  </td>
                  <td className="p-6 text-[#5B6169] align-top bg-white leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="p-6 text-[#111318] font-semibold align-top bg-[#E8F5F5]/60 border-l border-[#0E7C7B]/20 leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0E7C7B] shrink-0 mt-0.5 stroke-[3]" />
                      <span>{row.prelude}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Comparison Cards (Hidden on Desktop) */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-md space-y-4"
            >
              <h4 className="font-display font-bold text-base text-[#111318]">
                {row.dimension}
              </h4>

              {/* Traditional (Old Way) */}
              <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-1">
                <span className="text-[10px] font-mono uppercase text-rose-600 font-bold block">
                  Traditional Silos:
                </span>
                <p className="text-xs text-[#5B6169] leading-relaxed">
                  {row.traditional}
                </p>
              </div>

              {/* Prelude (New Way) */}
              <div className="p-3.5 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#0E7C7B] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Prelude Advantage:
                </span>
                <p className="text-xs font-semibold text-[#111318] leading-relaxed">
                  {row.prelude}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
