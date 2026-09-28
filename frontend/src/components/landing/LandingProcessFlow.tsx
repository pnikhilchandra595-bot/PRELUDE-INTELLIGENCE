import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  GitMerge,
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const LandingProcessFlow: React.FC = () => {
  const steps = [
    {
      step: 'Step 1 · Retain',
      title: 'Continuous Fact Extraction',
      desc: 'Hindsight continuously ingests meeting transcripts, customer tickets, and competitor announcements, breaking raw text into atomic factual observations.',
      icon: Database,
      tag: 'Vectorize Substrate',
    },
    {
      step: 'Step 2 · Connect',
      title: 'Temporal Graph Linking',
      desc: 'Entity resolution connects disparate silos over time: a support bug logged on Monday links to a pricing objection raised on Friday.',
      icon: GitMerge,
      tag: 'Cross-Silo Linking',
    },
    {
      step: 'Step 3 · Recall',
      title: 'Semantic Context Retrieval',
      desc: 'When queried, Prelude retrieves relevant memories across all four domains using cross-encoder rerankers, without rigid keyword queries.',
      icon: Search,
      tag: 'Semantic Search',
    },
    {
      step: 'Step 4 · Act',
      title: 'Actionable Strategic Synthesis',
      desc: 'Groq-powered hardware LLMs produce role-tailored briefs, causal chains, and proven playbooks with 100% cited source provenance.',
      icon: Sparkles,
      tag: 'Groq Hardware LLM',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            HOW IT WORKS // PIPELINE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#111318] tracking-tight">
            From Fragmented Data to Strategic Dominance
          </h2>
          <p className="text-base text-[#5B6169] leading-relaxed">
            Our autonomous intelligence pipeline operates continuously in the background, transforming noisy interactions into actionable enterprise foresight.
          </p>
        </div>

        {/* 4 Sequential Pipeline Steps */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0E7C7B]/20 via-[#0E7C7B] to-[#0E7C7B]/20 -translate-y-8 z-0" />

          {/* Steps Grid / Vertical Mobile Timeline */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F8F9] hover:bg-white border border-[#E5E7EB] hover:border-[#0E7C7B]/40 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0E7C7B] group-hover:bg-[#0E7C7B] group-hover:text-white transition-colors shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-[#0E7C7B] font-bold uppercase">
                        {s.step.split(' · ')[0]}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-[#5B6169] uppercase tracking-wider block mb-1">
                        {s.step.split(' · ')[1]}
                      </span>
                      <h3 className="text-lg font-bold font-display text-[#111318] group-hover:text-[#0E7C7B] transition-colors">
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#5B6169] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono text-[#5B6169]">
                    <span>{s.tag}</span>
                    {idx < steps.length - 1 && (
                      <span className="text-[#0E7C7B] font-bold hidden lg:inline">
                        Next →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Walkthrough CTA Link */}
        <div className="text-center pt-4">
          <Link
            to="/preview"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0E7C7B] hover:text-[#0B6362] transition-colors group"
          >
            <span>Inspect Full Architecture & Design Tokens</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
