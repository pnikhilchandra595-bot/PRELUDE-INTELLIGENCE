import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Compass,
  Megaphone,
  MessageSquare,
  FileText,
  UserPlus,
  Sparkles,
  Layers,
  Globe,
  Home,
} from 'lucide-react';
import { useMemoryStats } from '../../api/queries';

const NAV_ITEMS = [
  { path: '/', label: 'Home Page', icon: Home, badge: 'Public' },
  { path: '/app', label: 'Hub Dashboard', icon: LayoutDashboard },
  { path: '/contacts/jane-doe', label: 'Contact Brief', icon: Users, badge: 'Flagship' },
  { path: '/competitors/apex-cloud', label: 'Competitor Timeline', icon: Compass },
  { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { path: '/feedback', label: 'Feedback Themes', icon: MessageSquare },
  { path: '/content', label: 'Content Library', icon: FileText },
  { path: '/onboard', label: 'Onboard Me', icon: UserPlus },
  { path: '/preview', label: 'Design System', icon: Layers },
];

export const Sidebar: React.FC = () => {
  const { data: stats } = useMemoryStats();

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-2rem)] m-4 sticky top-4 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-[#E5E7EB] shadow-sm shrink-0 z-30 select-none">
      {/* Brand Logo directing to Home Page */}
      <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-4 group cursor-pointer" title="Go to Home Page">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="font-display font-extrabold text-base tracking-tight text-[#111318] block leading-tight group-hover:text-[#0E7C7B] transition-colors">
            Prelude
          </span>
          <span className="text-[10px] font-mono text-[#0E7C7B] uppercase tracking-widest block font-bold leading-tight">
            Intelligence Hub
          </span>
        </div>
      </Link>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                  isActive
                    ? 'text-[#0E7C7B] font-semibold'
                    : 'text-[#5B6169] hover:text-[#111318] hover:bg-[#F7F8F9]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Fluid Framer Motion LayoutId Tab Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute inset-0 rounded-2xl bg-[#E8F5F5] border border-[#0E7C7B]/20 shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${
                      isActive ? 'text-[#0E7C7B]' : 'text-[#5B6169]'
                    }`}
                  />
                  <span className="relative z-10 flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="relative z-10 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#E8F5F5] text-[#0E7C7B] border border-[#0E7C7B]/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Memory Status Mini Widget */}
      <div className="pt-4 border-t border-[#E5E7EB] mt-auto">
        <div className="p-3.5 rounded-2xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E7C7B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E7C7B]" />
              </span>
              <span className="text-[11px] font-mono text-[#0E7C7B] uppercase font-bold">
                Hindsight Bank
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#5B6169]">pgvector</span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-[#5B6169]">Retained Memories:</span>
            <span className="font-mono text-sm font-bold text-[#111318]">
              {stats?.total_memories || 342}
            </span>
          </div>

          <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0E7C7B] to-[#17B890] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((stats?.total_memories || 342) / 800) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
