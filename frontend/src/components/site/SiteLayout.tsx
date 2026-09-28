import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteNavbar } from './SiteNavbar';
import { SiteFooter } from './SiteFooter';
import { CookieBanner } from './CookieBanner';

export const SiteLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111318] selection:bg-[#0E7C7B]/20 selection:text-[#0E7C7B]">
      {/* Shared Navigation Bar */}
      <SiteNavbar />

      {/* Page Content Landmark */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <SiteFooter />

      {/* Shared Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
};
