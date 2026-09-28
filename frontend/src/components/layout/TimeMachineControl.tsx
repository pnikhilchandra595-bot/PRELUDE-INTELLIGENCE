import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, Clock, Sparkles, RefreshCw, X } from 'lucide-react';
import { useTimeMachineReplay, useMemoryStats } from '../../api/queries';

export const TimeMachineControl: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [weeksToAdvance, setWeeksToAdvance] = useState(4);
  const replayMutation = useTimeMachineReplay();
  const { data: stats } = useMemoryStats();

  const handleFastForward = async () => {
    setIsAnimating(true);
    try {
      await replayMutation.mutateAsync(weeksToAdvance);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1400);
    } catch (e) {
      setIsAnimating(false);
    }
  };

  return (
    <>
      {/* Global Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/30 hover:bg-[#0E7C7B] hover:text-white transition-all shadow-sm cursor-pointer"
      >
        <FastForward className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Time Machine:</span> +4 Weeks
      </button>

      {/* Floating Modal / Slider Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full border border-[#E5E7EB] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/30 flex items-center justify-center text-[#0E7C7B]">
                    <Clock className="w-5 h-5 text-[#0E7C7B]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#111318]">
                      Time Machine Replay
                    </h3>
                    <p className="text-xs text-[#5B6169]">
                      Simulate knowledge graph temporal growth
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#5B6169] hover:text-[#111318] p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Display */}
              <div className="p-4 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5B6169]">Current Retained Memories:</span>
                  <motion.span
                    key={stats?.total_memories}
                    initial={{ scale: 1.2, color: '#0E7C7B' }}
                    animate={{ scale: 1, color: '#111318' }}
                    className="font-mono font-bold text-lg text-[#111318]"
                  >
                    {stats?.total_memories || 342}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#5B6169]">
                  <span>Cross-Module Connections:</span>
                  <span className="font-mono text-[#0E7C7B] font-bold">
                    {stats?.cross_module_connections || 184}
                  </span>
                </div>
              </div>

              {/* Slider for weeks */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#111318]">
                  <span>Fast-forward duration:</span>
                  <span className="font-mono text-[#0E7C7B] font-bold">
                    +{weeksToAdvance} Weeks (~{weeksToAdvance * 125} memories)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={weeksToAdvance}
                  onChange={(e) => setWeeksToAdvance(parseInt(e.target.value, 10))}
                  className="w-full accent-[#0E7C7B] bg-[#E5E7EB] h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5B6169] hover:text-[#111318] transition-colors"
                >
                  Close
                </button>
                <button
                  disabled={isAnimating || replayMutation.isPending}
                  onClick={handleFastForward}
                  className="px-5 py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  {isAnimating || replayMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )}
                  <span>{isAnimating ? 'Evolving Memory Graph...' : 'Replay & Fast-Forward'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
