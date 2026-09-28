import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Database, Activity, Wifi, Shield, Home } from 'lucide-react';
import { TimeMachineControl } from './TimeMachineControl';
import { clientConfig, updateClientConfig, subscribeClientConfig } from '../../api/client';

interface TopBarProps {
  onOpenBriefMe: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenBriefMe }) => {
  const [useMock, setUseMock] = useState(clientConfig.useMock);

  useEffect(() => {
    return subscribeClientConfig(() => {
      setUseMock(clientConfig.useMock);
    });
  }, []);

  const toggleMock = () => {
    updateClientConfig({ useMock: !useMock });
  };

  return (
    <header className="sticky top-4 z-40 px-4 mb-6">
      <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl sm:rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-4">
        {/* Hero "Brief Me" Search Bar with Crisp Hover */}
        <div className="flex-1 max-w-2xl">
          <div
            onClick={onOpenBriefMe}
            className="group relative cursor-pointer"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[#E5E7EB] hover:border-[#0E7C7B]/40 bg-[#F7F8F9] hover:bg-white transition-all shadow-sm">
              <Search className="w-4 h-4 text-[#0E7C7B] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm text-[#111318] truncate flex-1">
                Ask Prelude: <span className="text-[#5B6169]">"What should I know before calling Jane Doe?"</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-lg bg-white text-[#5B6169] border border-[#E5E7EB] font-bold">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Direct link to Home Page */}
          <Link
            to="/"
            title="Go to Public Home Page"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#E5E7EB] transition-all cursor-pointer bg-[#F7F8F9] hover:bg-white text-[#111318] hover:text-[#0E7C7B] shadow-sm"
          >
            <Home className="w-3.5 h-3.5 text-[#0E7C7B]" />
            <span className="hidden sm:inline font-semibold">Home</span>
          </Link>

          {/* Time Machine Fast-Forward */}
          <TimeMachineControl />

          {/* Mode Switch (Live Backend / Mock Store) */}
          <button
            onClick={toggleMock}
            title={useMock ? 'Using local memory store (click to switch to live API)' : 'Using live FastAPI backend on port 8000'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-[#E5E7EB] transition-all cursor-pointer bg-[#F7F8F9] hover:bg-white shadow-sm"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                useMock ? 'bg-amber-400' : 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
              }`}
            />
            <span className="hidden sm:inline text-[#111318] font-medium">
              {useMock ? 'Mock Store' : 'Live API'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
