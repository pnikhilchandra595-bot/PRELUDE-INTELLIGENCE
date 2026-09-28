import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileTabBar } from './MobileTabBar';
import { BackgroundMesh } from '../glass/BackgroundMesh';
import { BriefMeModal } from '../brief-me/BriefMeModal';

export const AppLayout: React.FC = () => {
  const [isBriefMeOpen, setIsBriefMeOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K or Ctrl+K opens Brief Me modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsBriefMeOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[#F7F8F9] text-[#111318] overflow-x-hidden">
      {/* Slow-moving animated gradient mesh background */}
      <BackgroundMesh />

      {/* Floating Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <TopBar onOpenBriefMe={() => setIsBriefMeOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Floating Glass Tab Bar (Mobile) */}
      <MobileTabBar />

      {/* Command Palette / Brief Me Modal */}
      <BriefMeModal
        isOpen={isBriefMeOpen}
        onClose={() => setIsBriefMeOpen(false)}
      />
    </div>
  );
};
