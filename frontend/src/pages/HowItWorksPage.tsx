import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  GitMerge,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { CTABanner } from '../components/site/CTABanner';

export const HowItWorksPage: React.FC = () => {
  const detailedSteps = [
    {
      stepNumber: '01',
      category: 'Ingestion & Fact Extraction',
      title: 'Atomic Memory Decomposition & Retain Pipeline',
      descriptionParagraphs: [
        'When raw business data enters Prelude—whether from customer tickets in Zendesk, executive sales calls in Gong, or changelog feeds—it does not simply get chunked into arbitrary 500-token blocks. Instead, our Hindsight memory substrate decomposes the narrative into discrete, atomic factual statements.',
        'Each atomic observation identifies the primary subject entities (e.g., "Acme Corp", "ApexCloud", "Jane Doe"), the operational domain (pricing, engineering, contract promises), and the exact temporal occurrence date. Embedding vectors are computed via BAAI/bge-small-en-v1.5 and stored in an embedded pgvector instance within pg0.',
        'This ensures every fact is self-contained and independently queryable, preventing the context contamination common in traditional document retrieval systems.',
      ],
      techSpecs: [
        { label: 'Embedding Architecture', value: 'BAAI/bge-small-en-v1.5 (384 dims)' },
        { label: 'Ingestion Latency', value: '< 180ms per document' },
        { label: 'Vector Index', value: 'HNSW on pg0 pgvector substrate' },
        { label: 'Entity Disambiguation', value: 'Autonomous canonical entity resolution' },
      ],
      icon: Database,
    },
    {
      stepNumber: '02',
      category: 'Graph Organization & Temporal Linking',
      title: 'Cross-Silo Entity Linking & Causal Graph Evolution',
      descriptionParagraphs: [
        'Isolated vector search cannot connect cause and effect across business silos. Prelude’s cognitive memory graph dynamically establishes links between entities as new facts are retained over time.',
        'For example, when an enterprise client reports a 2-minute timeout on billing exports on Monday, and the competitor slashes enterprise prices on Wednesday, Prelude establishes a cross-module connection. It recognizes that internal technical friction is actively compounding client pricing sensitivity.',
        'The memory graph evolves continually without requiring complete re-indexing. As new information arrives, older assumptions are re-weighted, maintaining an up-to-date temporal model of every customer account and competitor move.',
      ],
      techSpecs: [
        { label: 'Graph Model', value: 'Temporal entity-relationship mesh' },
        { label: 'Cross-Domain Bridging', value: 'Sales, Support, Marketing, Competitor' },
        { label: 'Re-weighting Model', value: 'Continuous memory decay & reinforcement' },
        { label: 'Memory Capacity', value: 'Millions of interconnected facts per team' },
      ],
      icon: GitMerge,
    },
    {
      stepNumber: '03',
      category: 'Context Retrieval & Reranking',
      title: 'Semantic Context Recall with Cross-Encoder Rerankers',
      descriptionParagraphs: [
        'When an executive queries "What should I know before calling Jane Doe regarding pricing?", Prelude does not run a simplistic keyword match. It executes an unrestricted semantic recall across all four organizational modules simultaneously.',
        'Retrieved candidate memories pass through a ms-marco-MiniLM-L-6-v2 cross-encoder reranker, which evaluates semantic relevance against the user’s exact inquiry. Irrelevant historical chatter is filtered out, leaving only high-impact, grounded facts.',
        'Crucially, if an account has zero prior meetings, Prelude exercises "cold-start honesty"—it returns an explicit notification of low history rather than fabricating synthetic meeting recollections.',
      ],
      techSpecs: [
        { label: 'Reranker Model', value: 'ms-marco-MiniLM-L-6-v2' },
        { label: 'Retrieval Latency', value: '< 120ms cross-silo sweep' },
        { label: 'Provenance Metadata', value: 'Memory ID, date, module, and verbatim excerpt' },
        { label: 'Cold-Start Honesty', value: 'Strict ungrounded hallucination suppression' },
      ],
      icon: Search,
    },
    {
      stepNumber: '04',
      category: 'Synthesis & Playbook Generation',
      title: 'Hardware-Accelerated LLM Synthesis & Strategic Briefing',
      descriptionParagraphs: [
        'The distilled observations and their provenance IDs are fed into Groq-powered hardware inference engines running high-parameter reasoning models. In under 500 milliseconds, Prelude synthesizes a comprehensive strategic briefing tailored to the user’s role.',
        'For sales reps, the briefing highlights budget ceilings and competitor counter-arguments. For product managers, it clusters recurring ticket themes and engineering friction points. For marketing leads, it identifies high-converting messaging angles.',
        'Every single synthesized sentence carries an interactive provenance trace: clicking the citation icon slides open the exact source document, date, and verified memory excerpt from Hindsight.',
      ],
      techSpecs: [
        { label: 'Inference Engine', value: 'Hardware-accelerated Groq LPU' },
        { label: 'Generation Speed', value: 'Sub-500ms end-to-end response' },
        { label: 'Output Structure', value: 'Validated JSON schemas with repair fallback' },
        { label: 'Citation Traceability', value: '100% interactive provenance grounding' },
      ],
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Page Header */}
      <section className="pt-20 pb-12 bg-[#F7F8F9] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-4 text-center">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            HOW IT WORKS // DEEP-DIVE ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#111318] tracking-tight max-w-3xl mx-auto">
            The Science Behind Zero-Amnesia Enterprise Intelligence
          </h1>
          <p className="text-lg text-[#5B6169] max-w-2xl mx-auto leading-relaxed">
            Discover how Prelude transforms disconnected customer tickets, sales notes, and competitor updates into an evolving shared memory graph.
          </p>
        </div>
      </section>

      {/* Detailed 4-Step Architecture Flow */}
      <section className="max-w-[1200px] mx-auto px-6 space-y-24">
        {detailedSteps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Left/Right Text Content (7 Cols) */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold px-3 py-1 rounded-full bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/20">
                    PHASE {step.stepNumber}
                  </span>
                  <span className="text-xs font-mono uppercase text-[#5B6169] font-bold">
                    {step.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#111318] tracking-tight">
                  {step.title}
                </h2>

                <div className="space-y-3 text-sm text-[#5B6169] leading-relaxed">
                  {step.descriptionParagraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Right/Left Spec Card (5 Cols) */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
                    <div className="p-3 rounded-2xl bg-[#E8F5F5] text-[#0E7C7B]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111318] text-base">
                        Phase {step.stepNumber} Telemetry
                      </h4>
                      <span className="text-xs text-[#5B6169] font-mono">
                        Vectorize Hindsight Core
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {step.techSpecs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-between"
                      >
                        <span className="text-[#5B6169]">{spec.label}:</span>
                        <span className="text-[#111318] font-bold text-right ml-2">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Validated against zero-data-loss standards</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Reusable CTA Banner */}
      <CTABanner
        title="Ready to Deploy Continuous Memory in Your Workflows?"
        subtitle="Schedule a consultation with our architects to inspect live memory benchmarks against your enterprise schema."
        primaryButtonText="Contact Our Engineering Team"
        primaryButtonLink="/contact"
        secondaryButtonText="Test Interactive Hub"
        secondaryButtonLink="/app"
      />
    </div>
  );
};
