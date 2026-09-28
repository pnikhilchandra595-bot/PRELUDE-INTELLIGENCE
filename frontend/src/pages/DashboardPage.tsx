import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  FileText,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Activity,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import {
  GlassCard,
  GlassPanel,
  GlassPill,
  GlassBadge,
  FreshnessDot,
  GlassSkeleton,
  GlassErrorState,
} from '../components/glass';
import { InteractiveMemoryGraph } from '../components/glass/InteractiveMemoryGraph';
import { useMemoryStats, useCompetitors, useFeedbackThemes } from '../api/queries';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading, isError, error, refetch } = useMemoryStats();
  const { data: competitors } = useCompetitors();
  const { data: feedbackData } = useFeedbackThemes();

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="space-y-3">
          <GlassSkeleton variant="rect" className="h-6 w-48" />
          <GlassSkeleton variant="rect" className="h-10 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <GlassSkeleton key={i} variant="rect" className="h-36 rounded-2xl" />
          ))}
        </div>
        <GlassSkeleton variant="rect" className="h-80 rounded-3xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Dashboard Intelligence Unavailable"
        message={error?.message || 'Unable to synchronize telemetry metrics.'}
        onRetry={() => refetch()}
      />
    );
  }

  // Sparkline miniature dummy points for each module card
  const compSparkline = [
    { v: 12 }, { v: 14 }, { v: 18 }, { v: 22 }, { v: 31 }, { v: 39 },
  ];
  const contentSparkline = [
    { v: 4 }, { v: 6 }, { v: 8 }, { v: 9 }, { v: 11 }, { v: 12 },
  ];
  const meetingSparkline = [
    { v: 2 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 5 }, { v: 6 },
  ];
  const feedbackSparkline = [
    { v: 18 }, { v: 24 }, { v: 28 }, { v: 32 }, { v: 38 }, { v: 42 },
  ];

  // Activity feed items
  const recentActivities = [
    {
      module: 'competitive',
      title: 'ApexCloud cuts Enterprise tier pricing 20%',
      desc: 'Competitor announced $75k annual floor targeting Acme Corp renewal.',
      age_days: 13,
      link: '/competitors/apex-cloud',
    },
    {
      module: 'meeting',
      title: 'Jane Doe confirms $80k hard budget cap',
      desc: 'VP of Engineering at Acme Corp preparing for board review.',
      age_days: 18,
      link: '/contacts/jane-doe',
    },
    {
      module: 'feedback',
      title: '3 tickets logged regarding billing CSV export timeouts',
      desc: 'Enterprise accounts experiencing 120s timeout during month-end closing.',
      age_days: 25,
      link: '/feedback',
    },
    {
      module: 'content',
      title: 'Context Amnesia whitepaper achieved 96 performance score',
      desc: 'Top organic readership among enterprise engineering leads.',
      age_days: 10,
      link: '/content',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header Greeting & Hero Prompt Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0E7C7B] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E7C7B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E7C7B]" />
            </span>
            <span>COGNITIVE MEMORY CLUSTER // ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-[#111318]">
            Intelligence Overview
          </h1>
          <p className="text-sm text-[#5B6169]">
            Persistent context synchronized across Sales, Product, Marketing, and Competitor signals.
          </p>
        </div>

        <GlassPill
          variant="primary"
          onClick={() => navigate('/contacts/jane-doe')}
          icon={<Users className="w-4 h-4 text-white" />}
        >
          View Flagship Brief (Jane Doe)
        </GlassPill>
      </div>

      {/* 2. Four Module Summary Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Module 1: Competitive Intelligence */}
        <GlassCard
          glowColor="violet"
          onClick={() => navigate('/competitors/apex-cloud')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-purple-700 uppercase font-bold">Competitive Intel</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold font-display text-[#111318]">
                {competitors?.reduce((acc, c) => acc + c.event_count, 0) || 39}
              </span>
              <span className="text-xs text-[#5B6169] ml-1.5 font-medium">events</span>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +3 this wk
            </span>
          </div>
          {/* Sparkline */}
          <div className="h-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={compSparkline}>
                <Line type="monotone" dataKey="v" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Module 2: Content Strategy */}
        <GlassCard
          glowColor="teal"
          onClick={() => navigate('/content')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#0E7C7B] uppercase font-bold">Content Strategy</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold font-display text-[#111318]">12</span>
              <span className="text-xs text-[#5B6169] ml-1.5 font-medium">assets</span>
            </div>
            <span className="text-xs font-mono text-[#0E7C7B] font-bold">96 score peak</span>
          </div>
          {/* Sparkline */}
          <div className="h-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contentSparkline}>
                <Line type="monotone" dataKey="v" stroke="#0E7C7B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Module 3: Meeting Prep */}
        <GlassCard
          glowColor="cyan"
          onClick={() => navigate('/contacts/jane-doe')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-emerald-700 uppercase font-bold">Meeting Prep</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold font-display text-[#111318]">6</span>
              <span className="text-xs text-[#5B6169] ml-1.5 font-medium">contacts</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Jane Doe Q3
            </span>
          </div>
          {/* Sparkline */}
          <div className="h-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={meetingSparkline}>
                <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Module 4: Feedback Synthesis */}
        <GlassCard
          glowColor="amber"
          onClick={() => navigate('/feedback')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-amber-800 uppercase font-bold">Feedback Themes</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold font-display text-[#111318]">
                {feedbackData?.total_feedback_count || 42}
              </span>
              <span className="text-xs text-[#5B6169] ml-1.5 font-medium">tickets</span>
            </div>
            <span className="text-xs font-mono text-amber-700 font-bold">
              {feedbackData?.avg_sentiment || 72}% pos
            </span>
          </div>
          {/* Sparkline */}
          <div className="h-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={feedbackSparkline}>
                <Line type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Interactive Cognitive Knowledge & Memory Graph */}
      <InteractiveMemoryGraph />

      {/* 3. Memory Growth Chart (Interactive Recharts with Fast-Forward Growth Animation) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-[#111318]">
                Memory Growth Over Time
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/30">
                Hindsight Graph
              </span>
            </div>
            <p className="text-xs text-[#5B6169] mt-1">
              Cumulative atomic facts and entity relationships retained in persistent memory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-[#5B6169] block">Total Retained Memories</span>
              <span className="font-mono text-2xl font-extrabold text-[#111318]">
                {stats?.total_memories || 342}
              </span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats?.weekly_growth || []}>
              <defs>
                <linearGradient id="memoryGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0E7C7B" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#17B890" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                stroke="#9CA3AF"
                tick={{ fill: '#5B6169', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: '#5B6169', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-xl border border-[#E5E7EB] text-xs shadow-xl space-y-1">
                        <span className="font-bold text-[#111318] block">{data.week}</span>
                        <span className="text-[#0E7C7B] block font-mono font-bold">
                          Cumulative: {data.cumulative} memories
                        </span>
                        <span className="text-[#5B6169] block font-mono">
                          Retained this period: +{data.count}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#0E7C7B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#memoryGrowthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. "Since Your Last Visit" Intelligence Activity Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0E7C7B]" />
            <h2 className="text-lg font-bold font-display text-[#111318]">
              Since Your Last Visit
            </h2>
          </div>
          <span className="text-xs text-[#5B6169] font-mono">
            4 new cross-module connections indexed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentActivities.map((act, i) => (
            <GlassCard
              key={i}
              onClick={() => navigate(act.link)}
              className="p-5 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <GlassBadge
                    type="module"
                    module={act.module as any}
                  />
                  <FreshnessDot ageDays={act.age_days} showLabel />
                </div>
                <h3 className="text-sm font-bold text-[#111318] group-hover:text-[#0E7C7B] transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-[#5B6169] leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end text-xs text-[#0E7C7B] font-semibold gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Investigate signal</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
