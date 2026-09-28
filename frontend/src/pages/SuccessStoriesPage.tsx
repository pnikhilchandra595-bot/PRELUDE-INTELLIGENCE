import React, { useState } from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { CTABanner } from '../components/site/CTABanner';

export const SuccessStoriesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'product' | 'gtm'>('all');

  const caseStudies = [
    {
      id: 'cs-1',
      category: 'product',
      company: 'Acme Corp',
      headline: 'Prevented $140,000 Churn Risk by Connecting Support Tickets to Renewal Leverage',
      quote:
        'When our sales rep entered the annual renewal discussion, they already knew our engineering team had logged 3 tickets on billing export timeouts. Demonstrating the fix upfront neutralized competitor price discounting completely.',
      author: 'Jane Doe',
      role: 'VP of Engineering',
      metric: '$140k Annual Contract Saved',
      statLabel: 'Direct Commercial Impact',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Enterprise Renewal', 'Support Feedback', 'Competitor Defense'],
    },
    {
      id: 'cs-2',
      category: 'gtm',
      company: 'OmniCorp Global',
      headline: 'Reduced Account Executive Deal Preparation Time by 82%',
      quote:
        'Our reps used to spend over 4 hours combing through Gong recordings and Salesforce notes before every meeting. With Prelude Brief Me, they get an executive summary with budget ceilings in 2 seconds.',
      author: 'David Kim',
      role: 'VP of Global Sales & Operations',
      metric: '82% Prep Time Saved',
      statLabel: '14 Hours/Week per Rep Reclaimed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Sales Acceleration', 'Meeting Intelligence'],
    },
    {
      id: 'cs-3',
      category: 'product',
      company: 'CloudNine Technologies',
      headline: 'Surfaced Latent Billing Bottlenecks Before Escalation to Board Level',
      quote:
        'Unsupervised feedback clustering connected tickets across 4 enterprise accounts that our customer success team had logged as unrelated one-offs. We prioritized the fix and preserved 100% net retention.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      metric: '100% Net Retention',
      statLabel: 'Zero Churn in Q3 Cohort',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Feedback Clustering', 'Telemetry'],
    },
    {
      id: 'cs-4',
      category: 'product',
      company: 'FinPulse Systems',
      headline: 'Achieved 100% Factual Grounding in Executive Intelligence Queries',
      quote:
        'In financial services, hallucinated AI answers are fatal. The "Why this answer" provenance drawer allows our legal and compliance teams to verify every single retrieved claim in one click.',
      author: 'Elena Rostova',
      role: 'Head of Product Architecture',
      metric: '0% Hallucination Rate',
      statLabel: 'Strict Audit Provenance',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Compliance', 'Provenance Traces'],
    },
    {
      id: 'cs-5',
      category: 'gtm',
      company: 'BioHealth Labs',
      headline: 'Eliminated Knowledge Loss During Customer Success Account Reassignment',
      quote:
        'When our lead enterprise CSM transitioned to another team, their successor stepped into a 20-account portfolio and conducted flawless QBRs on day two without asking clients to repeat their history.',
      author: 'Sophia Alvarez',
      role: 'Director of Customer Success',
      metric: '2-Day Rep Ramp',
      statLabel: 'Zero Client Friction',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Turnover Resilience', 'Onboard Me'],
    },
    {
      id: 'cs-6',
      category: 'gtm',
      company: 'NexusFlow Labs',
      headline: 'Doubled Marketing Campaign Reply Rates Using Competitor Context',
      quote:
        'By querying our marketing campaign memory alongside competitor pricing updates, we crafted an outreach angle addressing competitor price lock-ins that delivered a 31% organic reply rate.',
      author: 'Christian Wright',
      role: 'Head of Enterprise GTM',
      metric: '2.4x Reply Velocity',
      statLabel: 'Highest Campaign Engagement',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      tags: ['Campaign Memory', 'Messaging Angle'],
    },
  ];

  const filtered = caseStudies.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-20 pb-16">
      {/* Page Header */}
      <section className="pt-20 pb-16 bg-[#F7F8F9] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
            CUSTOMER IMPACT & CASE STUDIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#111318] tracking-tight max-w-3xl mx-auto">
            Proven Results in Enterprise Workflows
          </h1>
          <p className="text-lg text-[#5B6169] max-w-2xl mx-auto leading-relaxed">
            Discover how leaders across Product, Engineering, Sales, and Customer Success use Prelude to eliminate context fragmentation and protect revenue.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0E7C7B]" />
            <span className="text-xs font-mono font-bold text-[#111318] uppercase">
              Filter by Audience:
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F8F9] p-1 rounded-full border border-[#E5E7EB]">
            {[
              { key: 'all', label: 'All Case Studies' },
              { key: 'product', label: 'Engineering & Product' },
              { key: 'gtm', label: 'Sales & GTM' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === tab.key
                    ? 'bg-[#0E7C7B] text-white shadow'
                    : 'text-[#5B6169] hover:text-[#111318]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filtered.map((study) => (
            <div
              key={study.id}
              className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Metric Callout Card */}
                <div className="p-4 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/20 space-y-1">
                  <span className="text-2xl font-extrabold font-display text-[#0E7C7B] block">
                    {study.metric}
                  </span>
                  <span className="text-[11px] font-mono text-[#5B6169] block font-medium">
                    {study.statLabel}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#0E7C7B] uppercase">
                    {study.company}
                  </span>
                  <h3 className="text-lg font-bold font-display text-[#111318] group-hover:text-[#0E7C7B] transition-colors leading-snug">
                    {study.headline}
                  </h3>
                </div>

                <blockquote className="text-xs text-[#5B6169] leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                  "{study.quote}"
                </blockquote>
              </div>

              {/* Author & Tags */}
              <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <img
                    src={study.avatar}
                    alt={study.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0E7C7B]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#111318]">
                      {study.author}
                    </h4>
                    <p className="text-[11px] text-[#5B6169]">
                      {study.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F8F9] text-slate-600 border border-[#E5E7EB]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Write Your Own Success Story on Prelude?"
        subtitle="Schedule an evaluation call to see how shared persistent memory accelerates deal close rates and prevents customer churn."
        primaryButtonText="Schedule Your Discovery Session"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Flagship Brief"
        secondaryButtonLink="/contacts/jane-doe"
      />
    </div>
  );
};
