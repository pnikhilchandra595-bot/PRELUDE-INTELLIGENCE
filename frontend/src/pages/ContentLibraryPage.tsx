import React, { useState } from 'react';
import {
  FileText,
  Search,
  ArrowUpDown,
  Eye,
  Share2,
  Clock,
  Sparkles,
  ExternalLink,
  Flame,
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
import { useContent } from '../api/queries';

export const ContentLibraryPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'published_at' | 'views' | 'shares'>('views');

  const { data: contentPieces, isLoading, isError, error, refetch } = useContent({
    topic: selectedTopic,
    search: search.trim() || undefined,
    sort: sortBy,
  });

  const topics = [
    'All',
    'Product Architecture',
    'Engineering & AI',
    'Customer Success',
    'Sales Strategy',
    'Market Intelligence',
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        <GlassSkeleton variant="rect" className="h-14 w-full rounded-2xl" />
        <GlassSkeleton variant="rect" className="h-20 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <GlassSkeleton key={i} variant="rect" className="h-56 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Content Intelligence Hub Unavailable"
        message={error?.message || 'Unable to retrieve content metrics repository.'}
        onRetry={() => refetch()}
      />
    );
  }

  // Find max views for relative bar width
  const maxViews = Math.max(...(contentPieces?.map((c) => c.views) || [10000]));
  const maxShares = Math.max(...(contentPieces?.map((c) => c.shares) || [1000]));

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="space-y-1 border-b border-[#E5E7EB] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#0E7C7B] font-bold">PRELUDE INTELLIGENCE // CONTENT STRATEGY</span>
          <span className="text-xs text-[#5B6169]">•</span>
          <span className="text-xs font-mono text-emerald-700 font-bold">TELEMETRY & ANOMALY RADAR</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#111318]">
          Content Intelligence & High-Leverage Repurposing
        </h1>
        <p className="text-sm text-[#5B6169]">
          Identifies statistical performance outliers and correlates whitepaper consumption with enterprise renewal pipelines.
        </p>
      </div>

      {/* 2. Controls: Search, Topic Filters, and Sort */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#5B6169] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content or topics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-[#111318] placeholder-[#5B6169] focus:outline-none focus:border-[#0E7C7B] shadow-sm"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-[#5B6169] shrink-0 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5B6169]" />
            <span>Sort by:</span>
            {(['views', 'shares', 'published_at'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1 rounded-full capitalize transition-all ${
                  sortBy === s
                    ? 'bg-[#0E7C7B] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#5B6169] hover:text-[#111318] border border-[#E5E7EB]'
                }`}
              >
                {s === 'published_at' ? 'Date' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                selectedTopic === t
                  ? 'bg-[#0E7C7B] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#5B6169] hover:text-[#111318] border border-[#E5E7EB]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Empty State */}
      {contentPieces?.length === 0 ? (
        <GlassEmptyState
          title="No Matching Content Assets"
          description="Try broadening your search query or selecting 'All' topics."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedTopic('All');
            setSearch('');
          }}
        />
      ) : (
        /* 4. Grid of Content Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentPieces?.map((piece) => (
            <GlassCard
              key={piece.id}
              glowColor={piece.is_anomaly ? 'amber' : 'teal'}
              className="p-6 flex flex-col justify-between space-y-4 bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Header Pills: Format & Anomaly Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#F7F8F9] text-[#5B6169] border border-[#E5E7EB] font-bold">
                    {piece.format || 'Article'}
                  </span>

                  {piece.is_anomaly ? (
                    <GlassBadge type="anomaly" label="Outlier (High Impact)" />
                  ) : (
                    <span className="text-xs font-mono text-[#0E7C7B] font-bold">
                      Score: {piece.performance_score}/100
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#111318] leading-snug group-hover:text-[#0E7C7B] transition-colors">
                  {piece.title}
                </h3>

                {/* Topic & Date */}
                <div className="flex items-center justify-between text-xs text-[#5B6169] font-mono">
                  <span>{piece.topic}</span>
                  <span>{piece.published_at}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-[#5B6169] line-clamp-3 leading-relaxed">
                  {piece.summary}
                </p>
              </div>

              {/* Bar Visualizations for Views & Shares */}
              <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
                {/* Views Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#5B6169] flex items-center gap-1 font-medium">
                      <Eye className="w-3 h-3 text-[#0E7C7B]" /> Views
                    </span>
                    <span className="text-[#111318] font-bold">
                      {piece.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0E7C7B] h-full rounded-full"
                      style={{ width: `${Math.min(100, (piece.views / maxViews) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Shares Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#5B6169] flex items-center gap-1 font-medium">
                      <Share2 className="w-3 h-3 text-purple-600" /> Shares
                    </span>
                    <span className="text-[#111318] font-bold">
                      {piece.shares.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (piece.shares / maxShares) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
