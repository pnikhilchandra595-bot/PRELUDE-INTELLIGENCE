import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  Target,
  Send,
  CheckCircle2,
  XCircle,
  Compass,
  ArrowRight,
  Layers,
  Share2,
} from 'lucide-react';
import {
  GlassCard,
  GlassPanel,
  GlassPill,
  GlassBadge,
  GlassSkeleton,
  GlassEmptyState,
  GlassErrorState,
} from '../components/glass';
import { useCampaigns, useCampaignBrief } from '../api/queries';
import { CampaignBriefResponse } from '../types/api';

export const CampaignsPage: React.FC = () => {
  const { data: campaigns, isLoading, isError, error, refetch } = useCampaigns();
  const briefMutation = useCampaignBrief();

  const [audience, setAudience] = useState('VPs of Engineering & CTOs (Acme Corp Cohort)');
  const [goal, setGoal] = useState('Accelerate Q4 contract renewals and mitigate ApexCloud pricing pressure');
  const [briefResult, setBriefResult] = useState<CampaignBriefResponse | null>(null);

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audience.trim() || !goal.trim()) return;
    try {
      const res = await briefMutation.mutateAsync({ audience, goal });
      setBriefResult(res);
    } catch (err) {
      // error handled by mutation
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'linkedin':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'email':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'ads':
        return 'bg-[#E8F5F5] border-[#0E7C7B]/30 text-[#0E7C7B]';
      case 'blog':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'webinar':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      default:
        return 'bg-slate-100 text-[#5B6169] border-[#E5E7EB]';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        <GlassSkeleton variant="rect" className="h-14 w-full rounded-2xl" />
        <GlassSkeleton variant="rect" className="h-64 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassSkeleton variant="rect" className="h-40 rounded-2xl" />
          <GlassSkeleton variant="rect" className="h-40 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Campaign Memory Repository Unavailable"
        message={error?.message || 'Unable to load campaigns from Hindsight.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="space-y-1 border-b border-[#E5E7EB] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#0E7C7B] font-bold">PRELUDE INTELLIGENCE // MARKETING EXTENSION</span>
          <span className="text-xs text-[#5B6169]">•</span>
          <span className="text-xs font-mono text-rose-700 font-bold">CAMPAIGN & MESSAGING MEMORY</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#111318]">
          Campaign Intelligence & Strategic Angle Generator
        </h1>
        <p className="text-sm text-[#5B6169]">
          Combines historical marketing campaign outcomes with real-time competitor moves to generate high-conversion messaging angles.
        </p>
      </div>

      {/* 2. "Get Campaign Brief" Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-[#111318]">
                Generate Campaign Strategic Brief
              </h2>
              <p className="text-xs text-[#5B6169]">
                Queries campaign memory + recent competitor shifts in Vectorize Hindsight
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateBrief} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#111318] font-bold mb-1.5 uppercase">
                  Target Audience / Persona
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. VPs of Engineering at $50k+ Accounts"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-sm text-[#111318] focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#111318] font-bold mb-1.5 uppercase">
                  Primary Commercial Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Mitigate competitor price cuts & secure renewals"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-sm text-[#111318] focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAudience('VPs of Engineering (Acme Corp Cohort)');
                    setGoal('Overcome billing export latency complaints and defend against ApexCloud 20% discount');
                  }}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#F7F8F9] text-[#5B6169] hover:text-[#0E7C7B] border border-[#E5E7EB] font-medium"
                >
                  ⚡ Acme Cohort Preset
                </button>
              </div>

              <button
                type="submit"
                disabled={briefMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm disabled:opacity-40"
              >
                <Sparkles className="w-4 h-4" />
                <span>{briefMutation.isPending ? 'Recalling Past Angles...' : 'Generate Angle Brief'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* 3. Generated Campaign Brief Output Card */}
        {briefResult && (
          <div className="mt-8 pt-8 border-t border-[#E5E7EB] space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0E7C7B] font-bold">
                SYNTHESIZED CAMPAIGN STRATEGY BRIEF
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Cold-Start Honest
              </span>
            </div>

            {/* Suggested Strategic Angle */}
            <div className="p-5 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 shadow-sm space-y-2">
              <span className="text-xs font-mono text-[#0E7C7B] font-bold block">
                SUGGESTED MESSAGING ANGLE
              </span>
              <p className="text-sm font-semibold text-[#111318] leading-relaxed">
                "{briefResult.suggested_angle}"
              </p>
            </div>

            {/* What Worked & What Didn't Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>What Worked (Historical Memories)</span>
                </div>
                <ul className="text-xs text-[#111318] space-y-2 list-disc list-inside">
                  {briefResult.what_worked?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-display font-bold text-sm">
                  <XCircle className="w-4 h-4" />
                  <span>What Failed to Convert</span>
                </div>
                <ul className="text-xs text-[#111318] space-y-2 list-disc list-inside">
                  {briefResult.what_didnt?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competitor Context */}
            <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
              <div className="flex items-center gap-2 text-purple-700 font-display font-bold text-sm">
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Competitor Context (Temporal Shift)</span>
              </div>
              <ul className="text-xs text-[#111318] space-y-1.5 list-disc list-inside">
                {briefResult.competitor_context?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 4. Campaign History List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-[#111318]">
            Retained Campaigns & Historic Performance
          </h2>
          <span className="text-xs font-mono text-[#5B6169]">
            {campaigns?.length || 0} campaigns indexed in Hindsight
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns?.map((camp) => (
            <GlassCard key={camp.id} className="p-5 space-y-3 bg-white border border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-bold ${getChannelColor(
                    camp.channel
                  )}`}
                >
                  {camp.channel}
                </span>
                <span className="text-xs text-[#5B6169] font-mono">
                  {camp.launched_at}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#111318] mb-1">
                  {camp.name}
                </h3>
                <p className="text-xs text-[#0E7C7B] font-mono font-semibold mb-2">
                  Audience: {camp.audience}
                </p>
                <p className="text-xs text-[#5B6169] italic mb-3">
                  "{camp.message_angle}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs text-[#111318]">
                <span className="text-[#5B6169] block mb-0.5 font-mono text-[10px] uppercase font-bold">
                  Outcome Telemetry:
                </span>
                {camp.outcome_summary}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
