import React from 'react';
import { Sparkles, AlertCircle, Database, CheckCircle2 } from 'lucide-react';

export interface GlassBadgeProps {
  type?: 'context-depth' | 'module' | 'anomaly' | 'custom';
  depth?: 'low' | 'growing' | 'rich';
  module?: 'competitive' | 'content' | 'meeting' | 'feedback' | 'campaign';
  variant?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'slate';
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  type = 'custom',
  depth = 'rich',
  module = 'competitive',
  variant,
  label,
  className = '',
  icon,
}) => {
  // Context Depth Badge
  if (type === 'context-depth') {
    const depthConfig = {
      low: {
        bg: 'bg-rose-50 border-rose-200 text-rose-700',
        text: 'Context Depth: Low (Cold Start)',
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        dot: 'bg-rose-500',
      },
      growing: {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        text: 'Context Depth: Growing',
        icon: <Database className="w-3 h-3 text-amber-600" />,
        dot: 'bg-amber-500',
      },
      rich: {
        bg: 'bg-[#E8F5F5] border-[#0E7C7B]/30 text-[#0E7C7B]',
        text: 'Context Depth: Rich (Multi-Silo)',
        icon: <Sparkles className="w-3 h-3 text-[#0E7C7B]" />,
        dot: 'bg-[#0E7C7B]',
      },
    }[depth];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${depthConfig.bg} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${depthConfig.dot}`} />
        {depthConfig.icon}
        <span>{label || depthConfig.text}</span>
      </span>
    );
  }

  // Module Category Badge
  if (type === 'module') {
    const moduleConfig = {
      competitive: {
        bg: 'bg-purple-50 border-purple-200 text-purple-700',
        text: 'Competitive Intel',
      },
      content: {
        bg: 'bg-[#E8F5F5] border-[#0E7C7B]/30 text-[#0E7C7B]',
        text: 'Content Strategy',
      },
      meeting: {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        text: 'Meeting Prep',
      },
      feedback: {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        text: 'Feedback Synthesis',
      },
      campaign: {
        bg: 'bg-rose-50 border-rose-200 text-rose-700',
        text: 'Campaign Memory',
      },
    }[module];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${moduleConfig.bg} ${className}`}
      >
        {icon}
        <span>{label || moduleConfig.text}</span>
      </span>
    );
  }

  // Outlier / Anomaly Badge
  if (type === 'anomaly') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 shadow-sm ${className}`}
      >
        <Sparkles className="w-3 h-3 text-rose-600 animate-pulse" />
        <span>{label || 'High Anomaly (Outlier)'}</span>
      </span>
    );
  }

  // Custom Variant
  const colorClasses = {
    cyan: 'bg-[#E8F5F5] border-[#0E7C7B]/30 text-[#0E7C7B]',
    violet: 'bg-purple-50 border-purple-200 text-purple-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
    slate: 'bg-[#F7F8F9] border-[#E5E7EB] text-[#5B6169]',
  }[variant || 'slate'];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
};
