import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Users,
  Compass,
  FileCode,
  AlertCircle,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Zap,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GraphNode {
  id: string;
  label: string;
  type: 'hub' | 'contact' | 'competitor' | 'ticket' | 'support' | 'deal';
  category: string;
  x: number; // percentage
  y: number; // percentage
  detail: string;
  link?: string;
  stat?: string;
  connectedTo: string[];
}

export const InteractiveMemoryGraph: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('hub');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const nodes: GraphNode[] = [
    {
      id: 'hub',
      label: 'Prelude Core Memory',
      type: 'hub',
      category: 'Vector Graph Hub',
      x: 50,
      y: 50,
      detail: 'Central Hindsight semantic memory cluster retaining 342 cross-functional facts with zero hallucination guarantee.',
      stat: '342 Facts Grounded',
      connectedTo: ['jane-doe', 'apex-cloud', 'eng-842', 'fdbk-4402', 'deal-acme'],
    },
    {
      id: 'jane-doe',
      label: 'Jane Doe (Acme Corp)',
      type: 'contact',
      category: 'Key Stakeholder',
      x: 22,
      y: 28,
      detail: 'VP of Engineering at Acme Corp. Evaluates $140k renewal against ApexCloud 20% discount offer.',
      link: '/contacts/jane-doe',
      stat: '$140k ARR Tier',
      connectedTo: ['hub', 'apex-cloud', 'fdbk-4402', 'eng-842', 'deal-acme'],
    },
    {
      id: 'apex-cloud',
      label: 'ApexCloud (-20% Cut)',
      type: 'competitor',
      category: 'Competitive Threat',
      x: 78,
      y: 25,
      detail: 'ApexCloud slashed Enterprise pricing 20% on Sept 15, actively targeting Acme Corp renewal negotiations.',
      link: '/competitors/apex-cloud',
      stat: '$75k Floor Pitch',
      connectedTo: ['hub', 'jane-doe'],
    },
    {
      id: 'fdbk-4402',
      label: 'Ticket #4402 (CSV Timeout)',
      type: 'support',
      category: 'Zendesk Incident',
      x: 18,
      y: 72,
      detail: 'CSV billing export failed after 120 seconds during monthly close; cited by Jane Doe as primary frustration.',
      link: '/feedback',
      stat: '120s Timeout SLA',
      connectedTo: ['hub', 'jane-doe', 'eng-842'],
    },
    {
      id: 'eng-842',
      label: 'ENG-842 (Async Chunking)',
      type: 'ticket',
      category: 'Jira Engineering',
      x: 52,
      y: 82,
      detail: 'Engineering patch backported streaming chunking to drop billing export times from 120s to 180ms.',
      link: '/contacts/jane-doe',
      stat: 'In Code Review',
      connectedTo: ['hub', 'fdbk-4402', 'jane-doe'],
    },
    {
      id: 'deal-acme',
      label: '$140k Enterprise Renewal',
      type: 'deal',
      category: 'Sales Pipeline',
      x: 80,
      y: 74,
      detail: 'High-leverage renewal closing Oct 15. Contradiction flagged: Jane claims $80k cap while DevOps requested $140k cluster.',
      link: '/contacts/jane-doe',
      stat: '17 Days Horizon',
      connectedTo: ['hub', 'jane-doe'],
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'hub':
        return <Brain className="w-5 h-5 text-white" />;
      case 'contact':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'competitor':
        return <Compass className="w-4 h-4 text-purple-600" />;
      case 'support':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'ticket':
        return <FileCode className="w-4 h-4 text-indigo-600" />;
      case 'deal':
        return <TrendingUp className="w-4 h-4 text-[#0E7C7B]" />;
    }
  };

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'hub':
        return 'bg-[#0E7C7B] border-[#0B6362] ring-4 ring-[#0E7C7B]/20 text-white shadow-lg';
      case 'contact':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900';
      case 'competitor':
        return 'bg-purple-50 border-purple-300 text-purple-900';
      case 'support':
        return 'bg-amber-50 border-amber-300 text-amber-900';
      case 'ticket':
        return 'bg-indigo-50 border-indigo-300 text-indigo-900';
      case 'deal':
        return 'bg-[#E8F5F5] border-[#0E7C7B]/40 text-[#0E7C7B]';
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#0E7C7B] font-bold">CROSS-SILO KNOWLEDGE GRAPH</span>
            <span className="text-xs text-[#5B6169]">•</span>
            <span className="text-xs font-mono text-purple-700 font-bold">INTERACTIVE MEMORY TOPOLOGY</span>
          </div>
          <h2 className="text-xl font-bold font-display text-[#111318] mt-0.5">
            Interactive Institutional Memory Graph
          </h2>
          <p className="text-xs text-[#5B6169] mt-0.5">
            Click any node to inspect interconnected cross-functional signals, contradiction paths, and grounded citations
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold text-[#0E7C7B] bg-[#E8F5F5] px-3 py-1 rounded-full border border-[#0E7C7B]/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hindsight Live Mesh</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas & Node Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Graph Visual Area */}
        <div className="lg:col-span-2 relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] overflow-hidden select-none">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0E7C7B_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Connection Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E7C7B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {nodes.map((node) =>
              node.connectedTo.map((targetId) => {
                const targetNode = nodes.find((n) => n.id === targetId);
                if (!targetNode) return null;

                const isHighlighted =
                  selectedNodeId === node.id ||
                  selectedNodeId === targetId ||
                  hoveredNodeId === node.id ||
                  hoveredNodeId === targetId;

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isHighlighted ? '#0E7C7B' : '#CBD5E1'}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeDasharray={isHighlighted ? '4 2' : 'none'}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Node Elements */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnectedToSelected = selectedNode.connectedTo.includes(node.id) || selectedNode.id === node.id;

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute cursor-pointer transition-all duration-200 z-10 flex flex-col items-center group`}
              >
                <div
                  className={`p-2.5 sm:p-3 rounded-2xl border transition-all ${getNodeColor(node.type)} ${
                    isSelected
                      ? 'scale-115 ring-4 ring-[#0E7C7B]/30 shadow-md'
                      : isHovered
                      ? 'scale-110 shadow-sm'
                      : !isConnectedToSelected
                      ? 'opacity-60'
                      : 'opacity-100 shadow-2xs'
                  }`}
                >
                  {getNodeIcon(node.type)}
                </div>

                <span
                  className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap shadow-2xs border ${
                    isSelected
                      ? 'bg-[#111318] text-white border-[#111318]'
                      : 'bg-white text-[#111318] border-[#E5E7EB]'
                  }`}
                >
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="bg-[#F7F8F9] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] h-full space-y-4 shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${getNodeColor(selectedNode.type)}`}>
                  {getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#0E7C7B] block">
                    {selectedNode.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#111318]">
                    {selectedNode.label}
                  </h4>
                </div>
              </div>

              {selectedNode.stat && (
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-[#E5E7EB] text-[#111318]">
                  {selectedNode.stat}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block">
                Node Intelligence Telemetry
              </span>
              <p className="text-xs text-[#111318] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E5E7EB]">
                {selectedNode.detail}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#5B6169] uppercase font-bold block">
                Linked Memory Relations ({selectedNode.connectedTo.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.connectedTo.map((targetId) => {
                  const target = nodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  return (
                    <button
                      key={targetId}
                      onClick={() => setSelectedNodeId(targetId)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white hover:bg-[#E8F5F5] border border-[#E5E7EB] hover:border-[#0E7C7B]/40 text-[#111318] hover:text-[#0E7C7B] transition-all cursor-pointer shadow-2xs"
                    >
                      → {target.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB]">
            {selectedNode.link ? (
              <button
                onClick={() => navigate(selectedNode.link!)}
                className="w-full py-2.5 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6362] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Jump to Deep Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="text-center text-[11px] text-[#5B6169] font-mono">
                Central Node // All Signals Harmonized
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
