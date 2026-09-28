import React from 'react';
import { TrendingUp, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { ContactBriefData } from '../../types/api';

interface ArrTrajectoryCardProps {
  arrHistory?: ContactBriefData['arr_history'];
  dealValue?: string;
}

export const ArrTrajectoryCard: React.FC<ArrTrajectoryCardProps> = ({ arrHistory, dealValue }) => {
  if (!arrHistory || arrHistory.length === 0) return null;

  const maxArr = Math.max(...arrHistory.map((h) => h.arr_k), 200);

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-[#111318]">
              Account ARR Trajectory & Growth Horizon
            </h3>
            <p className="text-xs text-[#5B6169]">
              Expansion history and projected enterprise renewal pathway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5B6169]">Current Run Rate:</span>
          <span className="font-mono text-sm font-extrabold text-[#0E7C7B] bg-[#E8F5F5] px-2.5 py-0.5 rounded-full border border-[#0E7C7B]/30">
            {dealValue || '$140,000 ARR'}
          </span>
        </div>
      </div>

      {/* Trajectory Bar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {arrHistory.map((step, idx) => {
          const heightPercent = Math.round((step.arr_k / maxArr) * 100);
          const isLatest = idx === arrHistory.length - 2;
          const isProjected = idx === arrHistory.length - 1;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                isProjected
                  ? 'bg-purple-50/50 border-purple-200'
                  : isLatest
                  ? 'bg-[#E8F5F5]/60 border-[#0E7C7B]/40 shadow-xs'
                  : 'bg-[#F7F8F9] border-[#E5E7EB]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#5B6169]">
                    {step.quarter}
                  </span>
                  {isProjected && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-bold">
                      Target
                    </span>
                  )}
                </div>
                <div className="text-lg font-extrabold font-display text-[#111318] flex items-center">
                  <span>${step.arr_k}k</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0E7C7B] ml-0.5" />
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#E5E7EB]/60">
                <span className="text-[10px] text-[#5B6169] block leading-tight">
                  {step.stage}
                </span>
                {/* Visual bar fill */}
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isProjected
                        ? 'bg-purple-500'
                        : isLatest
                        ? 'bg-[#0E7C7B]'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${heightPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
