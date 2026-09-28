import React from 'react';
import { CompetitorEventType } from '../../types/api';
import { DollarSign, Sparkles, MessageSquare, Users, ShieldAlert, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface EventBadgeProps {
  type: CompetitorEventType;
  size?: 'sm' | 'md';
}

export const EventBadge: React.FC<EventBadgeProps> = ({ type, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  switch (type) {
    case 'pricing':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-500/30 ${sizeClasses}`}>
          <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          Pricing
        </span>
      );
    case 'feature':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-950/60 dark:text-indigo-300 dark:ring-indigo-500/30 ${sizeClasses}`}>
          <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          Feature Launch
        </span>
      );
    case 'messaging':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-500/30 ${sizeClasses}`}>
          <MessageSquare className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          Messaging
        </span>
      );
    case 'hiring':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20 dark:bg-purple-950/60 dark:text-purple-300 dark:ring-purple-500/30 ${sizeClasses}`}>
          <Users className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          Hiring
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 ${sizeClasses}`}>
          {type}
        </span>
      );
  }
};

interface SentimentBadgeProps {
  sentiment: 'positive' | 'neutral' | 'negative';
  score?: number;
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({ sentiment, score }) => {
  switch (sentiment) {
    case 'positive':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          Positive {score !== undefined && `(${score}%)`}
        </span>
      );
    case 'negative':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-950/60 dark:text-rose-300">
          <AlertCircle className="w-3 h-3 text-rose-500" />
          Negative {score !== undefined && `(${score}%)`}
        </span>
      );
    case 'neutral':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300">
          <HelpCircle className="w-3 h-3 text-amber-500" />
          Neutral {score !== undefined && `(${score}%)`}
        </span>
      );
  }
};

interface ModuleBadgeProps {
  module: 'competitors' | 'content' | 'contacts' | 'feedback';
}

export const ModuleBadge: React.FC<ModuleBadgeProps> = ({ module }) => {
  switch (module) {
    case 'competitors':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
          <ShieldAlert className="w-3 h-3" /> Competitor Memory
        </span>
      );
    case 'content':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-900">
          <MessageSquare className="w-3 h-3" /> Content Library
        </span>
      );
    case 'contacts':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900">
          <Users className="w-3 h-3" /> Contact Memory
        </span>
      );
    case 'feedback':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900">
          <Sparkles className="w-3 h-3" /> Customer Feedback
        </span>
      );
  }
};
