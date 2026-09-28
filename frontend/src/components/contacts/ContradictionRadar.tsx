import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ContactBriefData } from '../../types/api';

interface ContradictionRadarProps {
  contradictions?: ContactBriefData['contradictions'];
}

export const ContradictionRadar: React.FC<ContradictionRadarProps> = ({ contradictions }) => {
  if (!contradictions || contradictions.length === 0) return null;

  return (
    <div className="bg-rose-50/70 border border-rose-200 p-6 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-rose-200/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-rose-950 flex items-center gap-2">
              <span>Departmental Contradiction Radar</span>
              <span className="font-mono text-[10px] uppercase font-bold bg-rose-200/80 text-rose-800 px-2 py-0.5 rounded-full">
                {contradictions.length} Active Conflict
              </span>
            </h3>
            <p className="text-xs text-rose-800">
              Cross-silo contradictions between stakeholder statements that could trip up negotiation
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-rose-700 font-semibold hidden sm:inline">
          High-Leverage Signal
        </span>
      </div>

      <div className="space-y-3">
        {contradictions.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs sm:text-sm text-[#111318]">
                {c.title}
              </h4>
              <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                {c.severity}
              </span>
            </div>

            {/* Split conflict comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="font-mono text-[10px] text-amber-800 uppercase font-bold block">
                  {c.silo_a.source}
                </span>
                <p className="text-[#111318] italic text-[11px]">
                  "{c.silo_a.claim}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
                <span className="font-mono text-[10px] text-purple-800 uppercase font-bold block">
                  {c.silo_b.source}
                </span>
                <p className="text-[#111318] italic text-[11px]">
                  "{c.silo_b.claim}"
                </p>
              </div>
            </div>

            {/* Resolution Strategy Playbook */}
            <div className="p-3 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#0E7C7B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0E7C7B] font-mono text-[11px] uppercase mr-1">
                  Tactical Playbook:
                </strong>
                <span className="text-[#111318] font-medium leading-relaxed">
                  {c.action_item}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
