import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface GlassErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  code?: string;
}

export const GlassErrorState: React.FC<GlassErrorStateProps> = ({
  title = 'Intelligence Retrieval Failed',
  message,
  onRetry,
  className = '',
  code,
}) => {
  return (
    <div
      className={`bg-white p-8 rounded-3xl border border-rose-200 shadow-sm text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 shadow-sm">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <h3 className="font-display text-lg font-bold text-[#111318] mb-1">
        {title}
      </h3>

      {code && (
        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 mb-3">
          Error Code: {code}
        </span>
      )}

      <p className="text-sm text-[#5B6169] max-w-sm mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111318] border border-[#E5E7EB] hover:bg-[#F7F8F9] text-xs font-bold transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4 text-[#0E7C7B]" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
