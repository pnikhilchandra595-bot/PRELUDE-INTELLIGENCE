import React from 'react';
import {
  Check,
  X,
  Sparkles,
  Layers,
  Brain,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';
import { CTABanner } from '../components/site/CTABanner';

export const ComparePage: React.FC = () => {
  const primaryComparison = [
    {
      dimension: 'Context Longevity',
      traditional: 'Amnesiac chat sessions. Context evaporates when the tab is closed.',
      prelude: 'Persistent evolving cognitive graph retained indefinitely in Vectorize Hindsight.',
    },
    {
      dimension: 'Cross-Functional Synthesis',
      traditional: 'Sales reps see only CRM; Product sees only Jira; Support sees only Zendesk.',
      prelude: 'Simultaneous cross-domain recall connecting commercial, technical, and competitor signals.',
    },
    {
      dimension: 'Competitor Pre-emption',
      traditional: 'Discovered weeks later when customers cite competitor price drops during contract negotiations.',
      prelude: 'Proactive warning badges highlighting competitor price drops and feature shifts.',
    },
    {
      dimension: 'Citation Provenance',
      traditional: 'Unverified generative text. Cannot prove whether a claim was real or hallucinated.',
      prelude: '100% interactive citations showing exact memory ID, source date, and original document excerpt.',
    },
    {
      dimension: 'Time to Executive Brief',
      traditional: '3 to 4 hours of tedious manual reading before every key client call.',
      prelude: 'Sub-500ms synthesized briefing with action items and budget ceiling alignment.',
    },
    {
      dimension: 'Handling Zero Prior Data',
      traditional: 'Invented corporate pleasantries and fabricated assumptions ("confident hallucination").',
      prelude: 'Explicit cold-start honesty: returns "No prior history" to preserve enterprise trust.',
    },
    {
      dimension: 'Customer Feedback Aggregation',
      traditional: 'Manual tag filtering that fails to connect related complaints across accounts.',
      prelude: 'Unsupervised semantic clustering identifying systemic usability friction automatically.',
    },
    {
      dimension: 'New Hire Turnover Onboarding',
      traditional: 'Departed account managers leave messy inboxes and 6-month ramp periods.',
      prelude: 'Day-1 360° account onboarding query that pulls the entire team’s historical knowledge.',
    },
  ];

  const architecturalComparison = [
    {
      feature: 'Storage Paradigm',
      flatRag: 'Static flat vector database (Pinecone, Weaviate, Chroma)',
      preludeGraph: 'Evolving temporal cognitive memory graph in Vectorize Hindsight + pg0',
    },
    {
      feature: 'Unit of Knowledge',
      flatRag: 'Arbitrary 500-token text chunks with high noise and overlap',
      preludeGraph: 'Decomposed atomic facts tagged with entities, timestamps, and domains',
    },
    {
      feature: 'Temporal Awareness',
      flatRag: 'Completely blind to time: treats a 2024 pricing document same as today’s update',
      preludeGraph: 'Temporal decay, event ordering, and freshness dots (<14d, 14–60d, >60d)',
    },
    {
      feature: 'Inference Latency',
      flatRag: '3,000ms – 8,000ms cloud API roundtrips',
      preludeGraph: 'Sub-500ms hardware-accelerated Groq LPU inference',
    },
    {
      feature: 'Causal Reasoning',
      flatRag: 'Matches query keywords; unable to deduce cause and effect',
      preludeGraph: 'Synthesizes causal chains: e.g. billing timeouts driving price sensitivity',
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Page Header */}
      <section className="pt-20 pb-16 bg-[#F7F8F9] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            COMPARATIVE ANALYSIS // STRUCTURAL EVALUATION
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#111318] tracking-tight max-w-3xl mx-auto">
            Traditional Silos vs. Prelude Shared Memory
          </h1>
          <p className="text-lg text-[#5B6169] max-w-2xl mx-auto leading-relaxed">
            Examine the operational and architectural breakdown of why standard tools cause enterprise context amnesia—and how Prelude solves it.
          </p>
        </div>
      </section>

      {/* Main Expanded Comparison Table */}
      <section className="max-w-[1200px] mx-auto px-6 space-y-8">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#111318]">
            Operational Workflow Comparison
          </h2>
          <p className="text-sm text-[#5B6169]">
            Comparing day-to-day work between isolated SaaS tools and a unified memory graph.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-[#E5E7EB] shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="p-6 text-xs font-mono font-bold text-[#5B6169] uppercase bg-[#F7F8F9] w-1/4">
                  Operational Dimension
                </th>
                <th className="p-6 text-base font-bold text-[#111318] bg-[#F7F8F9] w-3/8">
                  Traditional Siloed SaaS
                </th>
                <th className="p-6 text-base font-bold text-[#0E7C7B] bg-[#E8F5F5] w-3/8 border-l border-[#0E7C7B]/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0E7C7B]" />
                    <span>Prelude Intelligence Platform</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-sm">
              {primaryComparison.map((row, idx) => (
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

        {/* Mobile Stacked Comparison Cards */}
        <div className="md:hidden space-y-4">
          {primaryComparison.map((row, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-md space-y-4"
            >
              <h4 className="font-display font-bold text-base text-[#111318]">
                {row.dimension}
              </h4>
              <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-1">
                <span className="text-[10px] font-mono uppercase text-rose-600 font-bold block">
                  Traditional Silos:
                </span>
                <p className="text-xs text-[#5B6169] leading-relaxed">
                  {row.traditional}
                </p>
              </div>
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
      </section>

      {/* Second Architectural Comparison Block (Conventional Flat RAG vs Prelude Temporal Substrate) */}
      <section className="py-20 bg-[#F7F8F9] border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#0E7C7B] font-bold">
              UNDER THE HOOD // ARCHITECTURAL BENCHMARK
            </span>
            <h2 className="text-3xl font-extrabold font-display text-[#111318] tracking-tight">
              Conventional Flat RAG vs. Evolving Memory Graph
            </h2>
            <p className="text-sm text-[#5B6169]">
              Why traditional document embedding stores fail in multi-step enterprise reasoning tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flat RAG Limitation Card */}
            <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-md space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#111318]">
                    Conventional Flat Vector RAG
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    Chunk-and-search paradigm
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#5B6169] leading-relaxed">
                {architecturalComparison.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-mono uppercase font-bold text-slate-700 block">
                      {item.feature}
                    </span>
                    <p>{item.flatRag}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prelude Temporal Memory Advantage Card */}
            <div className="p-8 rounded-3xl bg-[#E8F5F5]/40 border-2 border-[#0E7C7B]/40 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[#0E7C7B]/20 pb-4">
                <div className="p-3 rounded-2xl bg-[#0E7C7B] text-white">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#111318]">
                    Prelude Temporal Cognitive Substrate
                  </h3>
                  <span className="text-xs font-mono text-[#0E7C7B] font-semibold">
                    Vectorize Hindsight + Groq Hardware
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#111318] leading-relaxed font-medium">
                {architecturalComparison.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#0E7C7B]/20 space-y-1 shadow-sm">
                    <span className="font-mono uppercase font-bold text-[#0E7C7B] block">
                      {item.feature}
                    </span>
                    <p>{item.preludeGraph}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Experience the Difference in Real Enterprise Data"
        subtitle="Benchmark your team's workflow on our persistent shared memory architecture."
        primaryButtonText="Request Comparative Benchmark"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Live Hub"
        secondaryButtonLink="/app"
      />
    </div>
  );
};
