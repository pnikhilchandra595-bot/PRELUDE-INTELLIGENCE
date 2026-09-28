import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title = 'Ready to Eliminate Context Fragmentation Across Your Teams?',
  subtitle = 'Experience how continuous persistent memory unifies Sales, Product, and Marketing in one shared intelligence graph.',
  primaryButtonText = 'Request Custom Demo',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Launch Live Hub',
  secondaryButtonLink = '/app',
}) => {
  return (
    <section className="py-20 lg:py-24 bg-[#0E7C7B] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/15 blur-2xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 font-bold px-3 py-1 rounded-full bg-black/20 border border-white/20 inline-block">
            STEP INTO CONTINUOUS INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-cyan-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0E7C7B] font-bold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to={secondaryButtonLink}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111318] hover:bg-black text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Brain className="w-4 h-4 text-cyan-300" />
            <span>{secondaryButtonText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
