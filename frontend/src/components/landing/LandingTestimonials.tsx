import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const LandingTestimonials: React.FC = () => {
  const [audienceTab, setAudienceTab] = useState<'product' | 'revenue'>('product');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = {
    product: [
      {
        quote:
          'Before Prelude, our engineering leads had zero visibility into why enterprise customers were threatening to churn during renewals. Having support tickets semantically linked to competitor feature releases saved our Q4 roadmap.',
        name: 'Jane Doe',
        role: 'VP of Engineering',
        company: 'Acme Corp',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      },
      {
        quote:
          'The unsupervised feedback clustering surfaced a critical billing export latency bug that had been buried in Jira for three months. Fixing it immediately unblocked two major enterprise renewals.',
        name: 'Marcus Vance',
        role: 'Chief Technology Officer',
        company: 'CloudNine Technologies',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      },
      {
        quote:
          'The "Why this answer" provenance drawer gives our executive team actual confidence to rely on AI briefs. Every single factual claim is grounded in historical memory with zero hallucination.',
        name: 'Elena Rostova',
        role: 'Head of Product Architecture',
        company: 'FinPulse Systems',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
      },
    ],
    revenue: [
      {
        quote:
          'Walking into an enterprise renewal knowing the competitor slashed prices by 20% three days prior gave us the leverage to offer an SLA commitment instead of a desperate price cut. That one call paid for Prelude for five years.',
        name: 'David Kim',
        role: 'VP of Global Sales & Operations',
        company: 'OmniCorp Global',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      },
      {
        quote:
          'Our account executives used to spend 4 hours digging through Slack, Salesforce, and Gong before every executive call. With Prelude Brief Me, they get a flawless tactical brief in 2 seconds.',
        name: 'Sophia Alvarez',
        role: 'Director of Customer Success',
        company: 'BioHealth Labs',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      },
      {
        quote:
          'The day-1 new hire turnover brief is pure magic. A rep stepped into a territory where the previous account manager left zero transition notes, and sounded like a 4-year company veteran on day one.',
        name: 'Christian Wright',
        role: 'Head of Enterprise GTM',
        company: 'NexusFlow Labs',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      },
    ],
  };

  const currentList = testimonials[audienceTab];

  // Auto advance every 7s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentList.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F7F8F9] border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5E7EB] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
              VOICES OF IMPACT // TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#111318] tracking-tight">
              Trusted by Forward-Looking Leaders
            </h2>
          </div>

          {/* Audience Segment Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#E5E7EB] shadow-sm">
            <button
              onClick={() => {
                setAudienceTab('product');
                setCurrentIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                audienceTab === 'product'
                  ? 'bg-[#0E7C7B] text-white shadow'
                  : 'text-[#5B6169] hover:text-[#111318]'
              }`}
            >
              Product & Engineering
            </button>
            <button
              onClick={() => {
                setAudienceTab('revenue');
                setCurrentIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                audienceTab === 'revenue'
                  ? 'bg-[#0E7C7B] text-white shadow'
                  : 'text-[#5B6169] hover:text-[#111318]'
              }`}
            >
              Revenue & GTM
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-6 min-h-[300px] flex flex-col justify-between transition-all duration-300">
            {/* Quote Icon & Stars */}
            <div className="flex items-center justify-between">
              <Quote className="w-10 h-10 text-[#0E7C7B]/30" />
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg sm:text-xl font-medium text-[#111318] leading-relaxed">
              "{currentList[currentIndex].quote}"
            </blockquote>

            {/* Author Profile */}
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={currentList[currentIndex].avatar}
                  alt={currentList[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0E7C7B]"
                />
                <div>
                  <h4 className="text-base font-bold text-[#111318]">
                    {currentList[currentIndex].name}
                  </h4>
                  <p className="text-xs text-[#5B6169]">
                    {currentList[currentIndex].role} · <strong className="text-[#111318]">{currentList[currentIndex].company}</strong>
                  </p>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="hidden sm:flex items-center gap-1.5">
                {currentList.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === i
                        ? 'w-6 bg-[#0E7C7B]'
                        : 'w-2 bg-[#E5E7EB] hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-center text-[#111318] shadow-sm hover:shadow transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#5B6169]">
              {currentIndex + 1} / {currentList.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F7F8F9] border border-[#E5E7EB] flex items-center justify-center text-[#111318] shadow-sm hover:shadow transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Link at bottom */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0E7C7B] hover:text-[#0B6362] transition-colors"
          >
            <span>See more customer impact stories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
