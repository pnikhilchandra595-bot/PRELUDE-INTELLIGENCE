import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Compass,
  Tag,
  DollarSign,
  Zap,
  MessageCircle,
  Briefcase,
  Calendar,
  Filter,
  ArrowRight,
  TrendingDown,
  Crosshair,
  Printer,
  Layers,
  Table,
} from 'lucide-react';
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
import { BattlecardModal } from '../components/competitors/BattlecardModal';
import { MultiCompetitorSwimlane } from '../components/competitors/MultiCompetitorSwimlane';
import { useCompetitors, useCompetitorTimeline } from '../api/queries';
import { CompetitorEventType } from '../types/api';

export const CompetitorTimelinePage: React.FC = () => {
  const { id = 'apex-cloud' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: competitors } = useCompetitors();
  const { data: events, isLoading, isError, error, refetch } = useCompetitorTimeline(id);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'matrix'>('timeline');
  const [isBattlecardOpen, setIsBattlecardOpen] = useState(false);

  const currentCompetitor = competitors?.find((c) => c.id === id) || competitors?.[0];

  const filteredEvents = events?.filter((ev) => {
    if (selectedType === 'all') return true;
    return ev.event_type === selectedType;
  });

  const getEventIcon = (type: CompetitorEventType) => {
    switch (type) {
      case 'pricing':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'feature':
        return <Zap className="w-4 h-4 text-[#0E7C7B]" />;
      case 'messaging':
        return <MessageCircle className="w-4 h-4 text-purple-600" />;
      case 'hiring':
        return <Briefcase className="w-4 h-4 text-amber-600" />;
    }
  };

  const getEventBorderGlow = (type: CompetitorEventType) => {
    switch (type) {
      case 'pricing':
        return 'hover:border-emerald-400 hover:shadow-md';
      case 'feature':
        return 'hover:border-[#0E7C7B] hover:shadow-md';
      case 'messaging':
        return 'hover:border-purple-400 hover:shadow-md';
      case 'hiring':
        return 'hover:border-amber-400 hover:shadow-md';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-16">
        <GlassSkeleton variant="rect" className="h-14 w-full rounded-2xl" />
        <GlassSkeleton variant="rect" className="h-28 rounded-3xl" />
        <div className="space-y-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GlassSkeleton key={i} variant="rect" className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <GlassErrorState
        title="Competitor Intelligence Timeline Unavailable"
        message={error?.message || 'Unable to retrieve competitor event logs.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* 1. Header with Competitor Switcher & Battlecard Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#0E7C7B] font-bold">PRELUDE INTELLIGENCE // COMPETITIVE INTEL</span>
            <span className="text-xs text-[#5B6169]">•</span>
            <span className="text-xs font-mono text-purple-700 font-bold">CHRONOLOGICAL RADAR</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-[#111318]">
            {currentCompetitor?.name || 'Competitor Intelligence'}
          </h1>
          <p className="text-xs text-[#5B6169]">
            {currentCompetitor?.category} • {events?.length || 0} events tracked in persistent memory
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timeline vs Matrix Switcher */}
          <div className="flex items-center bg-[#F7F8F9] p-1 rounded-full border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-[#0E7C7B] text-white shadow-sm font-semibold'
                  : 'text-[#5B6169] hover:text-[#111318]'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#0E7C7B] text-white shadow-sm font-semibold'
                  : 'text-[#5B6169] hover:text-[#111318]'
              }`}
            >
              Rivals Matrix
            </button>
          </div>

          {/* Export Battlecard 1-Pager */}
          {currentCompetitor && (
            <button
              onClick={() => setIsBattlecardOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Export Battlecard</span>
            </button>
          )}

          {/* Competitor Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {competitors?.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/competitors/${c.id}`)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  c.id === id
                    ? 'bg-[#0E7C7B] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#5B6169] hover:text-[#111318] border border-[#E5E7EB]'
                }`}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mode Content */}
      {viewMode === 'matrix' ? (
        <MultiCompetitorSwimlane
          competitors={competitors || []}
          eventsMap={{ [id]: events || [] }}
        />
      ) : (
        <>
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#5B6169] mr-2 flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#5B6169]" /> Filter:
            </span>
            {[
              { key: 'all', label: 'All Events' },
              { key: 'pricing', label: 'Pricing Shifts' },
              { key: 'feature', label: 'Feature Releases' },
              { key: 'messaging', label: 'Messaging & Campaigns' },
              { key: 'hiring', label: 'Executive Hiring' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedType(item.key)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  selectedType === item.key
                    ? 'bg-[#0E7C7B] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#5B6169] hover:text-[#111318] border border-[#E5E7EB]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Empty State if no events match filter */}
          {filteredEvents?.length === 0 ? (
            <GlassEmptyState
              title="No Events Found"
              description={`No ${selectedType} events recorded for ${currentCompetitor?.name} in the selected period.`}
              actionLabel="Show All Events"
              onAction={() => setSelectedType('all')}
            />
          ) : (
            /* Vertical Timeline */
            <div className="relative pl-6 sm:pl-8 border-l border-[#0E7C7B]/30 space-y-8 before:absolute before:inset-y-0 before:left-[-1px] before:w-[2px] before:bg-gradient-to-b before:from-[#0E7C7B] before:via-[#17B890] before:to-transparent">
              {filteredEvents?.map((ev) => (
                <div key={ev.id} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full bg-white border-2 border-[#0E7C7B] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#0E7C7B]" />
                  </div>

                  {/* Event Card */}
                  <GlassCard
                    className={`p-6 transition-all duration-200 bg-white border border-[#E5E7EB] shadow-sm ${getEventBorderGlow(ev.event_type)}`}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-[#F7F8F9] border border-[#E5E7EB]">
                            {getEventIcon(ev.event_type)}
                          </div>
                          <span className="font-mono text-xs uppercase font-bold text-[#111318]">
                            {ev.event_type}
                          </span>
                          {ev.impact_level && (
                            <span
                              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                                ev.impact_level === 'critical'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : ev.impact_level === 'high'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-slate-100 text-[#5B6169] border border-[#E5E7EB]'
                              }`}
                            >
                              {ev.impact_level} Impact
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <FreshnessDot ageDays={ev.age_days || 14} showLabel />
                          <span className="text-xs text-[#5B6169] font-mono">
                            {ev.event_date}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#111318] group-hover:text-[#0E7C7B] transition-colors">
                        {ev.title}
                      </h3>

                      <p className="text-sm text-[#5B6169] leading-relaxed">
                        {ev.description}
                      </p>

                      {ev.tags && ev.tags.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {ev.tags.map((tag, t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F8F9] text-[#5B6169] border border-[#E5E7EB]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Battlecard 1-Pager Modal */}
      {currentCompetitor && (
        <BattlecardModal
          isOpen={isBattlecardOpen}
          onClose={() => setIsBattlecardOpen(false)}
          competitor={currentCompetitor}
          events={events || []}
        />
      )}
    </div>
  );
};
