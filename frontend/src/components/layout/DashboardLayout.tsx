import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { DemoToolbar } from './DemoToolbar';
import { 
  Compass, 
  ShieldAlert, 
  BookOpen, 
  Users, 
  MessageSquareHeart, 
  Sparkles, 
  Cpu, 
  Layers,
  Search,
  ExternalLink
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Hub Overview',
      icon: Layers,
      exact: true,
    },
    {
      to: '/competitors/acme-corp',
      label: 'Competitor Timeline',
      icon: ShieldAlert,
      activePattern: /^\/competitors/,
    },
    {
      to: '/content',
      label: 'Content Library',
      icon: BookOpen,
      activePattern: /^\/content/,
    },
    {
      to: '/contacts/jane-doe',
      label: 'Contact Brief',
      icon: Users,
      activePattern: /^\/contacts/,
      badge: 'Flagship',
    },
    {
      to: '/feedback',
      label: 'Feedback Themes',
      icon: MessageSquareHeart,
      activePattern: /^\/feedback/,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Interactive Demo Toolbar */}
      <DemoToolbar />

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo & Memory System Label */}
            <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                    Hindsight
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Intelligence Hub
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Shared Memory Mesh Active</span>
                </div>
              </div>
            </NavLink>

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.activePattern
                  ? item.activePattern.test(location.pathname)
                  : location.pathname === item.to;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition active:scale-95 ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 shadow-2xs border border-indigo-200/80 dark:border-indigo-800'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] uppercase font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Quick Context & Memory Node Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  Enterprise Workspace
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  v1.4.2 · Groq LLM
                </span>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Tabs */}
          <div className="lg:hidden flex overflow-x-auto py-2 gap-1 border-t border-slate-100 dark:border-slate-800/60 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.activePattern
                ? item.activePattern.test(location.pathname)
                : location.pathname === item.to;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer with Traceability & Memory Integrity info */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>
              Hindsight Cognitive Memory Layer · FastAPI Contract Compliance verified
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI Base: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/api/v1</code></span>
            <span>Zero Unstyled Defaults</span>
            <span>Untrusted Markup Guarded</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
