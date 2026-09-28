import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Shared Marketing Site Layout & Pages
import { SiteLayout } from './components/site/SiteLayout';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ComparePage } from './pages/ComparePage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { ContactPage } from './pages/ContactPage';

// Liquid Glass Intelligence Hub (App Layout & Screens)
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ContactBriefPage } from './pages/ContactBriefPage';
import { CompetitorTimelinePage } from './pages/CompetitorTimelinePage';
import { CampaignsPage } from './pages/CampaignsPage';
import { FeedbackThemesPage } from './pages/FeedbackThemesPage';
import { ContentLibraryPage } from './pages/ContentLibraryPage';
import { OnboardMePage } from './pages/OnboardMePage';
import { DesignSystemPreviewPage } from './pages/DesignSystemPreviewPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Multi-Page Marketing Website with Shared SiteLayout */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
          </Route>

          {/* Liquid Glass Shared Intelligence Hub (Dedicated App Portal) */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="contacts" element={<Navigate to="/app/contacts/jane-doe" replace />} />
            <Route path="contacts/:id" element={<ContactBriefPage />} />
            <Route path="competitors" element={<Navigate to="/app/competitors/apex-cloud" replace />} />
            <Route path="competitors/:id" element={<CompetitorTimelinePage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="feedback" element={<FeedbackThemesPage />} />
            <Route path="content" element={<ContentLibraryPage />} />
            <Route path="onboard" element={<OnboardMePage />} />
            <Route path="preview" element={<DesignSystemPreviewPage />} />
          </Route>

          {/* Direct App Routing for seamless deep links */}
          <Route element={<AppLayout />}>
            <Route path="/contacts" element={<Navigate to="/app/contacts/jane-doe" replace />} />
            <Route path="/contacts/:id" element={<ContactBriefPage />} />
            <Route path="/competitors" element={<Navigate to="/app/competitors/apex-cloud" replace />} />
            <Route path="/competitors/:id" element={<CompetitorTimelinePage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/feedback" element={<FeedbackThemesPage />} />
            <Route path="/content" element={<ContentLibraryPage />} />
            <Route path="/onboard" element={<OnboardMePage />} />
            <Route path="/preview" element={<DesignSystemPreviewPage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
