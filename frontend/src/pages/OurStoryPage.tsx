import React from 'react';
import {
  Sparkles,
  Shield,
  Brain,
  Layers,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';
import { CTABanner } from '../components/site/CTABanner';

export const OurStoryPage: React.FC = () => {
  const milestones = [
    {
      year: '2024',
      quarter: 'Q2',
      title: 'The Context Fragmentation Epiphany',
      desc: 'Founded after watching enterprise sales, product, and engineering teams make repeated commercial mistakes due to siloed tool amnesia. We realized the problem was not lack of data, but lack of a persistent cognitive substrate connecting disparate silos.',
    },
    {
      year: '2025',
      quarter: 'Q1',
      title: 'The Vectorize Hindsight Breakthrough',
      desc: 'Pioneered atomic memory retain and semantic recall over flat vector chunks. Benchmarked a 68% reduction in hallucination rates by maintaining an evolving temporal graph rather than standard RAG stores.',
    },
    {
      year: '2025',
      quarter: 'Q4',
      title: 'Sub-500ms Hardware LLM Inference',
      desc: 'Partnered with Groq to power real-time tactical synthesis at silicon speed. Enterprise leaders could now receive comprehensive cross-module briefs in under 500 milliseconds during live customer calls.',
    },
    {
      year: '2026',
      quarter: 'Current',
      title: 'Prelude Enterprise Shared Memory Launch',
      desc: 'Released the flagship Prelude Intelligence Hub, unifying meeting prep, competitor tracking, feedback synthesis, and campaign messaging for forward-looking enterprise organizations worldwide.',
    },
  ];

  const coreValues = [
    {
      title: 'Zero Memory Amnesia',
      desc: 'We believe knowledge earned through hard-fought customer conversations, bugs, and competitor clashes should compound forever, never getting forgotten.',
      icon: Brain,
    },
    {
      title: 'Absolute Groundedness',
      desc: 'No AI answer is acceptable without verified provenance. Every claim must trace back to a specific timestamped fact in persistent memory.',
      icon: Shield,
    },
    {
      title: 'Cross-Functional Symbiosis',
      desc: 'Product and Sales are two sides of the same coin. Connecting engineering tickets with revenue negotiations makes the entire organization smarter.',
      icon: Users,
    },
    {
      title: 'Honesty Over Hallucination',
      desc: 'When data is thin, our models state "No prior history" rather than inventing plausible-sounding fiction. Trust is built through radical transparency.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Page Header & Mission Statement */}
      <section className="pt-20 pb-16 bg-[#F7F8F9] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            OUR STORY // PURPOSE & MISSION
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#111318] tracking-tight max-w-3xl mx-auto">
            Giving Enterprise Teams an Unfair Memory Advantage
          </h1>
          <p className="text-lg text-[#5B6169] max-w-2xl mx-auto leading-relaxed">
            Every day, modern companies lose millions of dollars because the left hand has no idea what the right hand learned six weeks ago. We built Prelude to make corporate amnesia obsolete.
          </p>
        </div>
      </section>

      {/* Chronological Milestone Timeline */}
      <section className="max-w-[1200px] mx-auto px-6 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-[#0E7C7B] font-bold">
            HISTORICAL MILESTONES
          </span>
          <h2 className="text-3xl font-extrabold font-display text-[#111318] tracking-tight">
            How We Built the Cognitive Substrate
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 sm:pl-12 border-l-2 border-[#0E7C7B]/30 space-y-12 before:absolute before:inset-y-0 before:left-[-2px] before:w-[2px] before:bg-gradient-to-b before:from-[#0E7C7B] before:via-[#17B890] before:to-transparent">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Year Marker Badge on Timeline */}
              <div className="absolute -left-[45px] sm:-left-[61px] top-1 w-8 h-8 rounded-full bg-white border-2 border-[#0E7C7B] flex items-center justify-center text-[#0E7C7B] shadow-md group-hover:scale-110 transition-transform">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E7C7B]" />
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl transition-all duration-300 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5F5] text-[#0E7C7B]">
                    {item.year} · {item.quarter}
                  </span>
                  <span className="text-xs font-mono text-[#5B6169]">
                    Milestone Marker
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#111318]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5B6169] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Team Values Grid */}
      <section className="py-20 bg-[#F7F8F9] border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#0E7C7B] font-bold">
              PRINCIPLES & CONVICTIONS
            </span>
            <h2 className="text-3xl font-extrabold font-display text-[#111318] tracking-tight">
              Values That Guide Our Architecture
            </h2>
            <p className="text-sm text-[#5B6169]">
              The core principles behind our engineering standards and multi-tenant data governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5F5] text-[#0E7C7B] flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#111318]">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#5B6169] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Join Forward-Looking Enterprise Teams on Prelude"
        subtitle="Schedule an executive briefing to see how shared persistent memory protects company valuation and deal velocity."
        primaryButtonText="Schedule Your Briefing"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Architecture"
        secondaryButtonLink="/how-it-works"
      />
    </div>
  );
};
