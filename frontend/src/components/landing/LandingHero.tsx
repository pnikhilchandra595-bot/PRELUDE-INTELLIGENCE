import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Brain,
  ShieldCheck,
  Compass,
  Zap,
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  // Rotating eyebrow keywords: crossfades every 1.6s
  const keywords = [
    'Zero Context Amnesia',
    '80% Faster Deal Prep',
    'Causal Graph Reasoning',
    'Cross-Silo Memory Recall',
    '100% Grounded Citations',
  ];

  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 1600);
    return () => clearInterval(timer);
  }, [keywords.length]);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-white">
      {/* Background subtle mesh glow */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-40 w-[500px] h-[500px] rounded-full bg-[#0E7C7B]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy (~45%) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Auto-Rotating Eyebrow Strip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F5] border border-[#0E7C7B]/20 text-[#0E7C7B] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0E7C7B] animate-ping" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                SHARED COGNITIVE ENGINE //
              </span>
              <span className="font-bold text-[#0E7C7B] transition-opacity duration-300">
                {keywords[currentKeywordIndex]}
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold font-display text-[#111318] tracking-tight leading-[1.08]">
              Never Enter an Enterprise Conversation Blind Again.
            </h1>

            {/* Subhead with concrete metric */}
            <p className="text-lg text-[#5B6169] leading-relaxed max-w-xl">
              Turn fragmented customer tickets, competitor price cuts, and sales notes into an evolving shared memory graph. Achieve over <strong className="text-[#111318] font-bold">80% faster situational briefing</strong> with zero hallucinations and verified source citations.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white font-bold text-base shadow-lg shadow-[#0E7C7B]/25 hover:shadow-xl hover:shadow-[#0E7C7B]/30 transition-all group"
              >
                <span>Request Custom Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111318] hover:bg-black text-white font-semibold text-base shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Explore Live Hub</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#5B6169] border-t border-[#E5E7EB]">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#0E7C7B]" />
                <span>Powered by Vectorize Hindsight</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#0E7C7B]" />
                <span>Sub-500ms Hardware Inference</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#0E7C7B]" />
                <span>SOC2 Enterprise Isolation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (~55%, bleeds slightly off right) */}
          <div className="lg:col-span-6 relative lg:-mr-12">
            <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-950 shadow-2xl border border-slate-700/60 overflow-hidden group">
              {/* Top Simulated App Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/40 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-slate-300 text-[11px] ml-2">
                    prelude.app // cross-module-synthesis
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>LIVE MEMORY SYNC</span>
                </div>
              </div>

              {/* Simulated Flagship Brief Card */}
              <div className="p-6 bg-[#070A14] text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-300 uppercase">
                      FLAGSHIP ACCOUNT BRIEF
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                      Jane Doe (Acme Corp)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Confidence: 96%
                  </span>
                </div>

                {/* Synthesis Quote */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 leading-relaxed space-y-2">
                  <p>
                    <strong className="text-white">Commercial Leverage Alert:</strong> Jane Doe is negotiating renewal against an aggressive <span className="text-rose-300 font-semibold">20% discount offer from ApexCloud</span> ($75k floor). Meanwhile, Acme has logged 3 support tickets regarding <span className="text-amber-300 font-semibold">2-minute billing CSV timeouts</span>.
                  </p>
                  <p className="text-cyan-200 text-[11px] bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-400/30">
                    💡 <strong>Recommended Playbook:</strong> Demo the v2.4 billing patch immediately and lock in their $80,000 annual budget cap.
                  </p>
                </div>

                {/* Micro Provenance Trace Tags */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block">Meeting:</span>
                    <span className="text-white font-semibold">Jane Doe Sept 10</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block">Competitor:</span>
                    <span className="text-violet-300 font-semibold">ApexCloud -20%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block">Support:</span>
                    <span className="text-amber-300 font-semibold">3 CSV Failures</span>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Pill */}
              <div className="absolute -bottom-3 -left-3 bg-[#0E7C7B] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-200" />
                <span>342 Memories Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
