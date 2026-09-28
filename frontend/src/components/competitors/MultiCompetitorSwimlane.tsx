import React from 'react';
import { Competitor, CompetitorEvent } from '../../types/api';
import { Shield, Zap, DollarSign, MessageCircle, Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MultiCompetitorSwimlaneProps {
  competitors: Competitor[];
  eventsMap: Record<string, CompetitorEvent[]>;
}

export const MultiCompetitorSwimlane: React.FC<MultiCompetitorSwimlaneProps> = ({
  competitors,
  eventsMap,
}) => {
  const navigate = useNavigate();

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'pricing':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'feature':
        return 'bg-[#E8F5F5] text-[#0E7C7B] border-[#0E7C7B]/30';
      case 'messaging':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'hiring':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-[#E5E7EB]';
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-[#111318]">
            Multi-Competitor Matrix & Intelligence Swimlanes
          </h3>
          <p className="text-xs text-[#5B6169]">
            Side-by-side comparative posture across Tier-1 and emerging competitive threats
          </p>
        </div>
        <span className="text-xs font-mono text-[#0E7C7B] font-bold bg-[#E8F5F5] px-2.5 py-1 rounded-full border border-[#0E7C7B]/30 self-start sm:self-auto">
          {competitors.length} Tracked Rivals
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map((comp) => {
          const compEvents = eventsMap[comp.id] || [];
          const recentEvent = compEvents[0];

          return (
            <div
              key={comp.id}
              className="p-5 rounded-2xl bg-[#F7F8F9] hover:bg-white border border-[#E5E7EB] hover:border-[#0E7C7B]/40 transition-all flex flex-col justify-between shadow-2xs space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {comp.tier.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-[#5B6169] font-mono">
                    {comp.event_count || compEvents.length} events
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-base text-[#111318] group-hover:text-[#0E7C7B] transition-colors">
                    {comp.name}
                  </h4>
                  <p className="text-xs text-[#5B6169] truncate">
                    {comp.category}
                  </p>
                </div>

                {/* Latest Key Signal */}
                {recentEvent ? (
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] space-y-1.5 mt-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded border ${getEventBadge(recentEvent.event_type)}`}>
                        {recentEvent.event_type}
                      </span>
                      <span className="text-[10px] text-[#5B6169] font-mono">
                        {recentEvent.event_date}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#111318] line-clamp-2">
                      {recentEvent.title}
                    </p>
                    <p className="text-[11px] text-[#5B6169] line-clamp-2 italic">
                      "{recentEvent.description}"
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#5B6169] italic">
                    Monitoring ongoing signals...
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#5B6169]">
                  {comp.domain}
                </span>
                <button
                  onClick={() => navigate(`/competitors/${comp.id}`)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0E7C7B] hover:text-[#0B6362] transition-colors cursor-pointer"
                >
                  <span>View Timeline</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
