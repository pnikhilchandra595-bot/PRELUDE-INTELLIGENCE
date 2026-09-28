import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { ContactBriefData } from '../../types/api';

interface StanceTimelineProps {
  stanceEvolution?: ContactBriefData['stance_evolution'];
}

export const StanceTimeline: React.FC<StanceTimelineProps> = ({ stanceEvolution }) => {
  if (!stanceEvolution || stanceEvolution.length === 0) return null;

  const sentimentStyles = {
    champion: {
      dot: 'bg-emerald-500 ring-emerald-200',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Champion',
    },
    cautious: {
      dot: 'bg-amber-500 ring-amber-200',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      label: 'Cautious',
    },
    at_risk: {
      dot: 'bg-rose-500 ring-rose-200',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      label: 'At Risk',
    },
    evaluating: {
      dot: 'bg-blue-500 ring-blue-200',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'Evaluating',
    },
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-[#111318]">
              Temporal Stance & Sentiment Evolution
            </h3>
            <p className="text-xs text-[#5B6169]">
              How the stakeholder's sentiment and purchase willingness shifted across quarters
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-[#0E7C7B] bg-[#E8F5F5] px-2.5 py-0.5 rounded-full border border-[#0E7C7B]/30">
          Hindsight Temporal Graph
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
        {stanceEvolution.map((item, idx) => {
          const style = sentimentStyles[item.sentiment] || sentimentStyles.evaluating;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div
                className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ring-4 ${style.dot} transition-transform group-hover:scale-125`}
              />

              <div className="bg-[#F7F8F9] hover:bg-white p-4 rounded-2xl border border-[#E5E7EB] hover:border-[#0E7C7B]/40 transition-all shadow-2xs space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#111318]">
                    {item.period}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#111318]">
                  {item.stance}
                </p>

                <p className="text-[11px] text-[#5B6169] italic pt-1 border-t border-[#E5E7EB]">
                  <strong>Trigger:</strong> {item.trigger}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
