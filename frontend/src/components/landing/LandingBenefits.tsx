import React from 'react';
import {
  Check,
  Brain,
  ShieldAlert,
  Zap,
  Clock,
  Layers,
  Sparkles,
  GitBranch,
  Search,
  Users,
} from 'lucide-react';

export const LandingBenefits: React.FC = () => {
  const engineeringBenefits = [
    {
      title: 'Persistent Cognitive Substrate',
      desc: 'Eliminates chatbot amnesia. Every meeting, ticket, and changelog updates an evolving semantic graph.',
    },
    {
      title: 'Zero Ungrounded Hallucinations',
      desc: 'Every generated conclusion traces back to verified temporal records via interactive provenance links.',
    },
    {
      title: 'Unsupervised Feedback Clustering',
      desc: 'Aggregates thousands of support conversations into actionable product themes without manual tagging.',
    },
    {
      title: 'Sub-500ms Hardware Accelerated LLM',
      desc: 'Powered by high-throughput Groq inference chips for instantaneous strategic synthesis.',
    },
    {
      title: 'Cold-Start Honesty',
      desc: 'Explicitly declares when context is low rather than inventing plausible-sounding corporate fiction.',
    },
  ];

  const gtmBenefits = [
    {
      title: 'Instant Situational Briefing',
      desc: 'Generate comprehensive 360° account briefs across commercial, technical, and competitive axes in 2 seconds.',
    },
    {
      title: 'Proactive Competitor Radar',
      desc: 'Track price slashes, feature launches, and messaging shifts before prospects bring them to the negotiation table.',
    },
    {
      title: 'Open Commitments Tracker',
      desc: 'Automatically extracts and monitors promises made in previous calls so nothing falls through the cracks.',
    },
    {
      title: 'High-Conversion Campaign Memory',
      desc: 'Combines historical marketing engagement with competitor context to draft winning outreach angles.',
    },
    {
      title: 'Turnover-Proof Onboarding',
      desc: 'New hires can onboard on complex enterprise accounts on Day 1 with complete historical context.',
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#F7F8F9] border-y border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            CORE VALUE PROPOSITIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#111318] tracking-tight">
            Built for Cross-Functional Harmony
          </h2>
          <p className="text-base text-[#5B6169] leading-relaxed">
            Bridge the communication gap between Product, Engineering, Sales, and Marketing with one unified memory substrate.
          </p>
        </div>

        {/* Alternate Block 1: Image Left, Text Right (Engineering & Product) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Illustration / Card (~50%) */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#E8F5F5] text-[#0E7C7B]">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111318] text-base">
                      Temporal Knowledge Graph
                    </h4>
                    <span className="text-xs text-[#5B6169]">
                      Vectorize Hindsight Core + BGE Embeddings
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Healthy Cluster
                </span>
              </div>

              {/* Memory Node Visual */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[#111318] font-medium">mem_mtg_9401 // Acme Renewal</span>
                  <span className="text-[#0E7C7B]">Temporal Linked</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[#111318] font-medium">mem_comp_7812 // ApexCloud -20%</span>
                  <span className="text-violet-600">Cross-Module Match</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[#111318] font-medium">mem_fdbk_3209 // 120s CSV Timeout</span>
                  <span className="text-amber-600">Friction Detected</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/20 text-xs text-[#0E7C7B] leading-relaxed">
                <strong>Continuous Learning:</strong> Memory nodes automatically update their relationships as new facts are retained.
              </div>
            </div>
          </div>

          {/* Right Checklist (~50%) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#0E7C7B] font-bold">
                ENGINEERING & ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#111318] tracking-tight">
                An Evolving Memory Graph, Not a Static Search Index
              </h3>
              <p className="text-sm text-[#5B6169] leading-relaxed">
                Traditional RAG architectures dump isolated chunks into vector databases. Prelude extracts atomic facts, links entities, and performs causal synthesis.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {engineeringBenefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0E7C7B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111318] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5B6169] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternate Block 2: Text Left, Image Right (GTM & Sales) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Checklist (~50%) */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#0E7C7B] font-bold">
                SALES & CUSTOMER SUCCESS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#111318] tracking-tight">
                Walk into Every High-Stakes Renewal Fully Armed
              </h3>
              <p className="text-sm text-[#5B6169] leading-relaxed">
                Know customer pain points, competitor counter-moves, and past promises before dialing into your next renewal meeting.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {gtmBenefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0E7C7B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111318] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5B6169] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card / Visual (~50%) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <span className="text-xs font-mono font-bold text-[#111318]">
                  STRATEGIC PLAYBOOK CARD
                </span>
                <span className="text-xs font-mono text-[#0E7C7B]">
                  Context: High Leverage
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#111318]">Client: Acme Corp</span>
                  <span className="text-rose-600 font-semibold">Competitor: ApexCloud</span>
                </div>
                <p className="text-[#5B6169] leading-relaxed">
                  "Jane Doe has direct leverage from ApexCloud's 20% price cut announced Sept 15 ($75k floor). Acme's internal CSV billing timeouts are compounding her frustration."
                </p>
                <div className="pt-2 border-t border-[#E5E7EB] text-[#111318] font-medium flex items-center justify-between">
                  <span>Target Agreement Ceiling:</span>
                  <strong className="text-emerald-700 font-bold">$80,000 / year</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Never pitch generic standard book pricing when competitor discounting is active.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
