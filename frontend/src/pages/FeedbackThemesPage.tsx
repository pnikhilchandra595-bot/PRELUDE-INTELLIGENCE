import React, { useState } from 'react';
import {
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Minus,
  Sparkles,
  AlertTriangle,
  Quote,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
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
import { useFeedbackThemes } from '../api/queries';
import { FeedbackTheme } from '../types/api';
import { MOCK_FEEDBACK_ITEMS } from '../api/mocks/data';

export const FeedbackThemesPage: React.FC = () => {
  const { data: feedbackData, isLoading, isError, error, refetch } = useFeedbackThemes();
  const [selectedTheme, setSelectedTheme] = useState<FeedbackTheme | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        <GlassSkeleton variant="rect" className="h-14 w-full rounded-2xl" />
        <GlassSkeleton variant="rect" className="h-72 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassSkeleton variant="rect" className="h-64 rounded-2xl" />
          <GlassSkeleton variant="rect" className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Feedback Telemetry Cluster Unavailable"
        message={error?.message || 'Unable to retrieve clustered feedback sentiment.'}
        onRetry={() => refetch()}
      />
    );
  }

  const themes = feedbackData?.themes || [];
  const sentimentTrend = feedbackData?.sentiment_trend || [];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return {
          bar: 'bg-emerald-500',
          text: 'text-emerald-700',
          bg: 'bg-emerald-50 border-emerald-200',
        };
      case 'negative':
        return {
          bar: 'bg-rose-500',
          text: 'text-rose-700',
          bg: 'bg-rose-50 border-rose-200',
        };
      default:
        return {
          bar: 'bg-amber-500',
          text: 'text-amber-800',
          bg: 'bg-amber-50 border-amber-200',
        };
    }
  };

  // Filter items for drill down
  const drillDownItems = selectedTheme
    ? MOCK_FEEDBACK_ITEMS.filter((item) => item.theme_id === selectedTheme.id)
    : [];

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16 relative">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#0E7C7B] font-bold">PRELUDE INTELLIGENCE // FEEDBACK SYNTHESIZER</span>
            <span className="text-xs text-[#5B6169]">•</span>
            <span className="text-xs font-mono text-amber-800 font-bold">UNSUPERVISED CLUSTERS</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#111318]">
            Customer Feedback Themes & Sentiment Trajectory
          </h1>
          <p className="text-sm text-[#5B6169]">
            {feedbackData?.total_feedback_count || 42} support tickets and customer quotes synthesized into 4 actionable product clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm text-right">
            <span className="text-[10px] font-mono text-[#5B6169] uppercase font-bold block">
              Average Net Sentiment
            </span>
            <span className="font-mono text-2xl font-bold text-[#0E7C7B]">
              {feedbackData?.avg_sentiment || 72}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sentiment Over Time Area Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-display text-[#111318]">
              Sentiment Trajectory Over Time
            </h2>
            <p className="text-xs text-[#5B6169]">
              Bi-weekly moving average across support conversations and NPS surveys.
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/30">
            Positive Rebound
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentTrend}>
              <defs>
                <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0E7C7B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#17B890" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fill: '#5B6169', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#9CA3AF"
                tick={{ fill: '#5B6169', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-xl border border-[#E5E7EB] text-xs shadow-xl space-y-1">
                        <span className="font-bold text-[#111318] block">{d.date}</span>
                        <span className="text-emerald-700 block font-mono font-bold">
                          Positive: {d.positive}%
                        </span>
                        <span className="text-rose-700 block font-mono font-bold">
                          Negative: {d.negative}%
                        </span>
                        <span className="text-[#0E7C7B] block font-mono font-bold">
                          Score: {d.overall_score}%
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="overall_score"
                stroke="#0E7C7B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#sentimentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Clustered Theme Cards with Drill-Down Triggers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-[#111318]">
            Synthesized Feedback Clusters
          </h2>
          <span className="text-xs text-[#5B6169]">
            Click any cluster card to drill down into underlying customer tickets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => {
            const styling = getSentimentColor(theme.sentiment);
            return (
              <GlassCard
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className="p-6 cursor-pointer group flex flex-col justify-between bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded-full border font-bold ${styling.bg} ${styling.text}`}
                    >
                      {theme.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#5B6169] font-mono font-medium">
                      <span>{theme.mention_count} mentions</span>
                      {theme.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                      {theme.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
                      {theme.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-[#111318] group-hover:text-[#0E7C7B] transition-colors">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-[#5B6169] mt-1 leading-relaxed">
                      {theme.summary}
                    </p>
                  </div>

                  {/* Sentiment Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-[#5B6169]">Cluster Sentiment:</span>
                      <span className={`font-bold ${styling.text}`}>
                        {theme.sentiment_score}% Positive
                      </span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${styling.bar}`}
                        style={{ width: `${theme.sentiment_score}%` }}
                      />
                    </div>
                  </div>

                  {/* Top Quotes */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-[#5B6169] uppercase font-bold block">
                      Representative Customer Verbatim:
                    </span>
                    <div className="p-3 rounded-xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs text-[#111318] italic space-y-1">
                      <Quote className="w-3 h-3 text-[#0E7C7B] opacity-60 inline mr-1" />
                      <span>{theme.top_quotes[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 flex items-center justify-between text-xs text-[#0E7C7B] font-semibold">
                  <span className="text-[#5B6169] text-[11px]">
                    Affected: {theme.affected_segments.join(', ')}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Inspect {theme.mention_count} Tickets →
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Drill-Down Modal */}
      {selectedTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-2xl w-full border border-[#E5E7EB] shadow-2xl max-h-[85vh] overflow-y-auto space-y-6 text-[#111318]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <span className="text-xs font-mono text-[#0E7C7B] uppercase font-bold block mb-1">
                  DRILL-DOWN INSPECTION // {selectedTheme.category}
                </span>
                <h3 className="text-xl font-bold font-display text-[#111318]">
                  {selectedTheme.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTheme(null)}
                className="w-8 h-8 rounded-full bg-[#F7F8F9] hover:bg-slate-100 border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#111318]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#5B6169] font-bold block">
                UNDERLYING SUPPORT TICKETS & SURVEY QUOTES
              </span>

              {drillDownItems.length > 0 ? (
                drillDownItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#111318] text-xs">
                          {item.account}
                        </span>
                        <span className="text-xs text-[#5B6169]">
                          ({item.user})
                        </span>
                      </div>
                      <FreshnessDot ageDays={item.age_days} showLabel />
                    </div>
                    <p className="text-xs text-[#111318] leading-relaxed italic bg-white p-3 rounded-xl border border-[#E5E7EB]">
                      "{item.text}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  {selectedTheme.top_quotes.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] text-xs text-[#111318] italic shadow-sm"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTheme(null)}
                className="px-5 py-2.5 rounded-full bg-white text-[#111318] border border-[#E5E7EB] hover:bg-[#F7F8F9] text-xs font-bold transition-all shadow-sm"
              >
                Close Drill-Down
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
