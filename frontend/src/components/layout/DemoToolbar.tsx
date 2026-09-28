import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ErrorCode } from '../../types/api';
import { 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Database, 
  Moon, 
  Sun, 
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const DemoToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    forcedError,
    setForcedError,
    latency,
    setLatency,
    isMock,
    setIsMock,
    liveBaseUrl,
    setLiveBaseUrl,
    isDarkMode,
    toggleDarkMode,
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();

  const resetAll = () => {
    setForcedError(null);
    setLatency(300);
    setIsMock(true);
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs transition-all z-50">
      {/* Mini Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-indigo-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>JUDGE & EVALUATION TOOLBAR</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
            <span className="text-[11px] text-slate-400">State Simulation:</span>
            {forcedError ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                <AlertCircle className="w-3 h-3 text-rose-400" />
                Forced: {forcedError}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Healthy (200 OK)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Contact Demos */}
          <div className="hidden md:flex items-center gap-1 text-[11px]">
            <span className="text-slate-400">Quick Contact:</span>
            <button
              type="button"
              onClick={() => navigate('/contacts/jane-doe')}
              className={`px-2 py-0.5 rounded hover:bg-slate-800 transition ${
                location.pathname === '/contacts/jane-doe'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300'
              }`}
            >
              Jane Doe (Flagship)
            </button>
            <button
              type="button"
              onClick={() => navigate('/contacts/cold-start')}
              className={`px-2 py-0.5 rounded hover:bg-slate-800 transition ${
                location.pathname === '/contacts/cold-start'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-slate-300'
              }`}
              title="Test mandatory cold-start requirement"
            >
              Cold-Start
            </button>
          </div>

          {/* Dark Mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 transition"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
          </button>

          {/* Drawer Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            <span>{isOpen ? 'Collapse' : 'Test States & Latency'}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Controls Drawer */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 p-4 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Control 1: Error State Injection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                1. Simulate API Error Code
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setForcedError(null)}
                  className={`px-2.5 py-1.5 rounded text-left transition text-xs ${
                    forcedError === null
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  ✓ None (200 OK)
                </button>
                <button
                  type="button"
                  onClick={() => setForcedError('MEMORY_UNAVAILABLE')}
                  className={`px-2.5 py-1.5 rounded text-left transition text-xs ${
                    forcedError === 'MEMORY_UNAVAILABLE'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-rose-300'
                  }`}
                  title="503: Hindsight call failed"
                >
                  503 Memory
                </button>
                <button
                  type="button"
                  onClick={() => setForcedError('LLM_TIMEOUT')}
                  className={`px-2.5 py-1.5 rounded text-left transition text-xs ${
                    forcedError === 'LLM_TIMEOUT'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-amber-300'
                  }`}
                  title="504: Groq call exceeded timeout"
                >
                  504 Timeout
                </button>
                <button
                  type="button"
                  onClick={() => setForcedError('NOT_FOUND')}
                  className={`px-2.5 py-1.5 rounded text-left transition text-xs ${
                    forcedError === 'NOT_FOUND'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-purple-300'
                  }`}
                  title="404: Entity doesn't exist"
                >
                  404 Not Found
                </button>
              </div>
            </div>

            {/* Control 2: Simulated Latency (To inspect Skeleton state) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                2. Skeletons / Latency ({latency}ms)
              </label>
              <div className="flex gap-1.5">
                {[0, 300, 800, 2000].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => setLatency(ms)}
                    className={`flex-1 py-1.5 rounded text-center transition text-xs ${
                      latency === ms
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    {ms === 0 ? '0ms' : `${ms}ms`}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                Set to 800ms or 2000ms to preview the layout-matching skeletons.
              </p>
            </div>

            {/* Control 3: Live vs Mock Swap */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                3. Backend Mode ({isMock ? 'Mock API' : 'Live FastAPI'})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMock(true)}
                  className={`flex-1 py-1.5 rounded text-center transition text-xs ${
                    isMock
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  Mock Layer
                </button>
                <button
                  type="button"
                  onClick={() => setIsMock(false)}
                  className={`flex-1 py-1.5 rounded text-center transition text-xs ${
                    !isMock
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  Live Fetch
                </button>
              </div>
              <input
                type="text"
                value={liveBaseUrl}
                onChange={(e) => setLiveBaseUrl(e.target.value)}
                placeholder="http://localhost:8000/api/v1"
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200"
              />
            </div>

            {/* Control 4: Direct Test Shortcuts */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                4. Mandatory Requirements
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setForcedError(null);
                    navigate('/contacts/cold-start');
                  }}
                  className="w-full text-left px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-purple-300 text-xs flex items-center justify-between"
                >
                  <span>Cold-Start Contact Brief</span>
                  <span className="text-[10px] text-slate-500">"No prior history"</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForcedError(null);
                    navigate('/competitors/empty-comp');
                  }}
                  className="w-full text-left px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs flex items-center justify-between"
                >
                  <span>Empty Competitor Timeline</span>
                  <span className="text-[10px] text-slate-500">Empty State</span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="w-full text-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1 mt-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Controls to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
