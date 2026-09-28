import React, { useState } from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingBenefits } from '../components/landing/LandingBenefits';
import { LandingProcessFlow } from '../components/landing/LandingProcessFlow';
import { LandingTestimonials } from '../components/landing/LandingTestimonials';
import { LandingComparison } from '../components/landing/LandingComparison';
import { LandingContactForm } from '../components/landing/LandingContactForm';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  const [activeAudience, setActiveAudience] = useState<'product' | 'gtm'>('product');

  return (
    <div className="min-h-screen bg-white text-[#111318] selection:bg-[#0E7C7B]/20 selection:text-[#0E7C7B]">
      {/* Navigation */}
      <LandingNavbar
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
      />

      {/* Main Content Landmarks */}
      <main>
        {/* Section 1: Hero */}
        <LandingHero />

        {/* Section 2: Core Value & Benefits */}
        <LandingBenefits />

        {/* Section 3: Process Flow / How It Works */}
        <LandingProcessFlow />

        {/* Section 4: Comparison ("Old Way vs. New Way") */}
        <LandingComparison />

        {/* Section 5: Social Proof / Testimonials */}
        <LandingTestimonials />

        {/* Section 6: Contact & Lead Capture Form */}
        <LandingContactForm />
      </main>

      {/* Footer & Cookie Consent */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
