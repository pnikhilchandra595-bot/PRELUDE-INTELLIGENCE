import React, { useState } from 'react';
import {
  GlassCard,
  GlassPanel,
  GlassPill,
  GlassBadge,
  FreshnessDot,
  GlassSkeleton,
  GlassEmptyState,
  GlassErrorState,
} from '../components/glass';
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Search,
  CheckCircle,
  Database,
  ArrowRight,
} from 'lucide-react';

export const DesignSystemPreviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'card' | 'panel' | 'pill'>('card');
  const [showSimulatedError, setShowSimulatedError] = useState(false);

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F5] border border-[#0E7C7B]/30 text-[#0E7C7B] text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRELUDE DESIGN SYSTEM // UNIFIED ENTERPRISE TOKENS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#111318]">
          Design System & Component Kit
        </h1>
        <p className="text-[#5B6169] max-w-2xl text-base leading-relaxed">
          Enterprise tokenized design layer featuring GPU-safe SVG refraction, 3D cursor-reactive tilt, specular light sweeps, and WCAG AA contrast matching our flagship brand identity.
        </p>
      </div>

      {/* 1. Surfaces (Three Levels) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3">
          <Layers className="w-5 h-5 text-[#0E7C7B]" />
          <h2 className="text-xl font-bold font-display text-[#111318]">
            1. Surfaces & Physical Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GlassCard Tier */}
          <GlassCard glowColor="teal" className="p-6 bg-white border border-[#E5E7EB] shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#0E7C7B] font-bold">SURFACE 01</span>
                <GlassBadge type="custom" label="3D Tilt & Specular" variant="cyan" />
              </div>
              <h3 className="text-lg font-bold text-[#111318]">GlassCard</h3>
              <p className="text-sm text-[#5B6169] leading-relaxed">
                Clean white canvas with 1px border (#E5E7EB), soft elevation shadow, and dynamic cursor-following spotlight.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#0E7C7B] font-semibold">
                <span>Hover to tilt & trigger specular light</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </GlassCard>

          {/* GlassPanel Tier */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-700 font-bold">SURFACE 02</span>
              <GlassBadge type="custom" label="Structural Panel" variant="violet" />
            </div>
            <h3 className="text-lg font-bold text-[#111318]">GlassPanel</h3>
            <p className="text-sm text-[#5B6169] leading-relaxed">
              Elevated structural surface optimized for sidebars, modals, and primary application sections.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-purple-700 font-semibold">
              <span>Deep structural grounding</span>
            </div>
          </div>

          {/* GlassPill Tier */}
          <GlassCard glowColor="violet" className="p-6 bg-white border border-[#E5E7EB] shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-800 font-bold">SURFACE 03</span>
                <GlassBadge type="custom" label="Specular Sweep" variant="amber" />
              </div>
              <h3 className="text-lg font-bold text-[#111318]">Interactive Pills</h3>
              <p className="text-sm text-[#5B6169] leading-relaxed">
                Rounded interactive pills with spring squash response and subtle specular light sweep on hover.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <GlassPill variant="primary" size="sm">Primary</GlassPill>
                <GlassPill variant="violet" size="sm">Violet</GlassPill>
                <GlassPill variant="secondary" size="sm">Secondary</GlassPill>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 2. Refraction Hero Bar */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3">
          <Zap className="w-5 h-5 text-[#0E7C7B]" />
          <h2 className="text-xl font-bold font-display text-[#111318]">
            2. Hero Search Bar Architecture
          </h2>
        </div>

        <div className="p-8 bg-white border border-[#E5E7EB] rounded-3xl shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            <h3 className="text-lg font-bold text-[#111318]">
              Organic Fluid Edge Curvature
            </h3>
            <p className="text-sm text-[#5B6169]">
              Hero search bar utilizes an SVG turbulence displacement map to create physical liquid edge curvature.
            </p>

            <div className="relative pt-4">
              <div className="p-1 rounded-2xl bg-gradient-to-r from-[#0E7C7B]/30 via-[#17B890]/20 to-[#0E7C7B]/30">
                <div className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
                  <Search className="w-5 h-5 text-[#0E7C7B] shrink-0" />
                  <input
                    type="text"
                    readOnly
                    value="Ask Prelude: 'What changed with Acme Corp pricing leverage this week?'"
                    className="bg-transparent text-sm text-[#111318] placeholder-[#5B6169] focus:outline-none w-full"
                  />
                  <span className="font-mono text-xs px-2 py-1 rounded bg-[#F7F8F9] text-[#5B6169] border border-[#E5E7EB] font-bold">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Badges, Indicators & Freshness Dots */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3">
          <Cpu className="w-5 h-5 text-[#0E7C7B]" />
          <h2 className="text-xl font-bold font-display text-[#111318]">
            3. Context Depth, Provenance & Freshness Dots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-4 bg-white border border-[#E5E7EB] shadow-sm">
            <h3 className="text-base font-bold text-[#111318]">Context Depth Badges</h3>
            <div className="flex flex-col gap-3">
              <GlassBadge type="context-depth" depth="rich" />
              <GlassBadge type="context-depth" depth="growing" />
              <GlassBadge type="context-depth" depth="low" />
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4 bg-white border border-[#E5E7EB] shadow-sm">
            <h3 className="text-base font-bold text-[#111318]">Freshness Dots (Temporal Age)</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#F7F8F9] border border-[#E5E7EB]">
                <FreshnessDot ageDays={4} showLabel />
                <span className="text-xs text-[#5B6169]">— Fresh intelligence (&lt; 14 days)</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#F7F8F9] border border-[#E5E7EB]">
                <FreshnessDot ageDays={28} showLabel />
                <span className="text-xs text-[#5B6169]">— Active historical context (14–60 days)</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#F7F8F9] border border-[#E5E7EB]">
                <FreshnessDot ageDays={85} showLabel />
                <span className="text-xs text-[#5B6169]">— Archived long-term memory (&gt; 60 days)</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 4. The 4 States Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl font-bold font-display text-[#111318]">
            4. Four States Implementation (Loading, Empty, Error, Success)
          </h2>
          <GlassPill
            variant={showSimulatedError ? 'violet' : 'secondary'}
            size="sm"
            onClick={() => setShowSimulatedError(!showSimulatedError)}
          >
            {showSimulatedError ? 'Show Normal State' : 'Toggle Error State'}
          </GlassPill>
        </div>

        {showSimulatedError ? (
          <GlassErrorState
            title="Cluster Connection Interrupted"
            code="MEMORY_UNAVAILABLE"
            message="The cognitive persistent memory node experienced transient latency. Automatic reconnect available."
            onRetry={() => setShowSimulatedError(false)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loading Skeleton */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#0E7C7B] font-bold">STATE: LOADING (SKELETON SHIMMER)</span>
              <div className="p-6 space-y-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
                <GlassSkeleton variant="rect" className="h-6 w-1/2" />
                <GlassSkeleton variant="text" className="w-full" />
                <GlassSkeleton variant="text" className="w-5/6" />
                <GlassSkeleton variant="text" className="w-3/4" />
                <div className="pt-2 flex gap-3">
                  <GlassSkeleton variant="circle" className="w-8 h-8" />
                  <GlassSkeleton variant="rect" className="h-8 w-24" />
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#5B6169] font-bold">STATE: EMPTY (COLD START)</span>
              <GlassEmptyState
                title="No Prior Meeting Memory"
                description="This contact has zero recorded meetings in the Hindsight bank. First interaction will initialize the entity node."
                actionLabel="Schedule Briefing"
                onAction={() => alert('Schedule Briefing clicked')}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
