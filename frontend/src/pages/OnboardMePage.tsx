import React, { useState } from 'react';
import {
  UserPlus,
  Sparkles,
  Search,
  Building2,
  Users,
  Compass,
  MessageSquare,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
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
import { useOnboard } from '../api/queries';
import { OnboardResponse } from '../types/api';
import { getMockOnboardResponse } from '../api/mocks/data';

export const OnboardMePage: React.FC = () => {
  const [entityInput, setEntityInput] = useState('Acme Corp');
  const onboardMutation = useOnboard();
  const [onboardData, setOnboardData] = useState<OnboardResponse | null>(() =>
    getMockOnboardResponse('Acme Corp')
  );

  const handleSearch = async (entityName = entityInput) => {
    if (!entityName.trim()) return;
    try {
      const res = await onboardMutation.mutateAsync({ entity: entityName });
      setOnboardData(res);
    } catch (e) {
      // fallback to mock generator
      setOnboardData(getMockOnboardResponse(entityName));
    }
  };

  const getModuleStyle = (module: string) => {
    switch (module) {
      case 'meeting':
        return {
          border: 'border-emerald-200',
          bg: 'bg-emerald-50/60',
          badge: 'emerald' as const,
          icon: <Users className="w-5 h-5 text-emerald-700" />,
          title: 'text-emerald-950',
          text: 'text-emerald-950',
        };
      case 'competitive':
        return {
          border: 'border-purple-200',
          bg: 'bg-purple-50/60',
          badge: 'violet' as const,
          icon: <Compass className="w-5 h-5 text-purple-700" />,
          title: 'text-purple-950',
          text: 'text-purple-950',
        };
      case 'feedback':
        return {
          border: 'border-amber-200',
          bg: 'bg-amber-50/60',
          badge: 'amber' as const,
          icon: <MessageSquare className="w-5 h-5 text-amber-700" />,
          title: 'text-amber-950',
          text: 'text-amber-950',
        };
      case 'content':
      default:
        return {
          border: 'border-[#0E7C7B]/30',
          bg: 'bg-[#E8F5F5]',
          badge: 'cyan' as const,
          icon: <FileText className="w-5 h-5 text-[#0E7C7B]" />,
          title: 'text-[#111318]',
          text: 'text-[#111318]',
        };
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="space-y-1 border-b border-[#E5E7EB] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#0E7C7B] font-bold">PRELUDE INTELLIGENCE // STRETCH BUILD</span>
          <span className="text-xs text-[#5B6169]">•</span>
          <span className="text-xs font-mono text-emerald-700 font-bold">DAY 1 NEW-HIRE TURNOVER BRIEF</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#111318]">
          Onboard Me — 360° Account Entity Intelligence
        </h1>
        <p className="text-sm text-[#5B6169]">
          Takes a single account or entity and pulls everything the company ever learned across Sales, Product, Marketing, and Competitor history.
        </p>
      </div>

      {/* 2. Entity Input Bar with Presets */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
        <div className="space-y-4">
          <label className="block text-xs font-mono text-[#111318] uppercase font-bold">
            Input Account / Entity Name:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Building2 className="w-4 h-4 text-[#5B6169] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={entityInput}
                onChange={(e) => setEntityInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. Acme Corp, CloudNine Technologies..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] text-sm text-[#111318] placeholder-[#5B6169] focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
            <button
              disabled={onboardMutation.isPending}
              onClick={() => handleSearch()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              <span>{onboardMutation.isPending ? 'Synthesizing 360°...' : 'Synthesize Onboard Brief'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[#5B6169] font-medium">Quick Entities:</span>
            {['Acme Corp (Jane Doe)', 'CloudNine Technologies', 'FinPulse Systems'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const clean = item.split(' (')[0];
                  setEntityInput(clean);
                  handleSearch(clean);
                }}
                className="px-3 py-1 rounded-full bg-[#F7F8F9] text-[#5B6169] hover:text-[#0E7C7B] border border-[#E5E7EB] hover:border-[#0E7C7B]/40 transition-all text-xs font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Consolidated Narrative & Stakeholders */}
      {onboardData && (
        <div className="space-y-8">
          {/* Executive Overview */}
          <GlassCard glowColor="teal" className="p-6 sm:p-8 space-y-4 bg-white border border-[#E5E7EB] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold font-display text-[#111318]">
                  360° Commercial & Technical Posture: {onboardData.entity}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/30">
                {onboardData.total_memories} Total Memories Synced
              </span>
            </div>

            <p className="text-base text-[#111318] leading-relaxed bg-[#F7F8F9] p-5 rounded-2xl border border-[#E5E7EB]">
              {onboardData.consolidated_summary}
            </p>

            {/* Key Stakeholders List */}
            <div className="pt-2">
              <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block mb-3">
                Key Identified Stakeholders in Memory Graph:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {onboardData.key_stakeholders.map((sh, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs space-y-1 shadow-sm"
                  >
                    <span className="font-bold text-[#111318] block text-sm">
                      {sh.name}
                    </span>
                    <span className="text-[#5B6169] block font-mono">
                      {sh.role}
                    </span>
                    <span className="text-[#0E7C7B] block font-mono text-[11px] font-bold">
                      Sentiment: {sh.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 4. Module-Colored Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onboardData.modules.map((mod, idx) => {
              const style = getModuleStyle(mod.module);
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border ${style.border} ${style.bg} space-y-4 shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
                        {style.icon}
                      </div>
                      <h3 className={`font-display font-bold text-base ${style.title}`}>
                        {mod.title}
                      </h3>
                    </div>
                    <GlassBadge
                      type="custom"
                      label={`${mod.memory_count} memories`}
                      variant={style.badge}
                    />
                  </div>

                  <ul className={`space-y-2 text-xs ${style.text}`}>
                    {mod.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111318]/60 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex justify-end text-[11px] font-mono text-[#5B6169]">
                    Freshness: {mod.freshness}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
