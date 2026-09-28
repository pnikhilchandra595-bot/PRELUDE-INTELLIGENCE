import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingBenefits } from '../components/landing/LandingBenefits';
import { LandingProcessFlow } from '../components/landing/LandingProcessFlow';
import { LandingTestimonials } from '../components/landing/LandingTestimonials';
import { LandingComparison } from '../components/landing/LandingComparison';
import { LandingContactForm } from '../components/landing/LandingContactForm';
import { CTABanner } from '../components/site/CTABanner';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <LandingHero />

      {/* 2. Benefits / Core Value Section */}
      <LandingBenefits />

      {/* 3. How-It-Works Condensed Pipeline (Links to /how-it-works) */}
      <LandingProcessFlow />

      {/* 4. Comparison Preview (Links to /compare) */}
      <LandingComparison />

      {/* 5. Testimonials Carousel (Links to /success-stories) */}
      <LandingTestimonials />

      {/* 6. Contact Teaser Form (Also links to /contact) */}
      <LandingContactForm />

      {/* 7. Action Banner */}
      <CTABanner
        title="Ready to Transform How Your Organization Retains Intelligence?"
        subtitle="Unify customer feedback, sales transcripts, and competitor alerts into an evolving cognitive memory graph."
        primaryButtonText="Schedule Guided Tour"
        primaryButtonLink="/contact"
        secondaryButtonText="Launch Live Hub"
        secondaryButtonLink="/app"
      />
    </div>
  );
};
