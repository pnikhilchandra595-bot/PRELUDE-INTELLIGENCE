import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Compass,
  FileText,
  Users,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface LandingNavbarProps {
  activeAudience: 'product' | 'gtm';
  setActiveAudience: (aud: 'product' | 'gtm') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  activeAudience,
  setActiveAudience,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productModules = [
    {
      title: 'Meeting Intelligence',
      desc: 'Context briefs with open promises and causal timeline history',
      icon: Users,
      href: '/contacts/jane-doe',
    },
    {
      title: 'Competitive Radar',
      desc: 'Real-time pricing shifts, hiring signals & feature drops',
      icon: Compass,
      href: '/competitors/apex-cloud',
    },
    {
      title: 'Feedback Synthesizer',
      desc: 'Clustering thousands of support tickets into product themes',
      icon: MessageSquare,
      href: '/feedback',
    },
    {
      title: 'Campaign Memory',
      desc: 'High-conversion messaging angles combined with competitor context',
      icon: FileText,
      href: '/campaigns',
    },
  ];

  return (
    <>
      {/* Top Audience Toggle Strip */}
      <div className="bg-[#111318] text-slate-300 text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Prelude Cognitive Substrate v2.4</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Zero context amnesia for enterprise teams</span>
          </div>

          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full">
            <button
              onClick={() => setActiveAudience('product')}
              className={`px-3 py-0.5 rounded-full transition-all text-[11px] font-medium ${
                activeAudience === 'product'
                  ? 'bg-[#0E7C7B] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Product & Eng
            </button>
            <button
              onClick={() => setActiveAudience('gtm')}
              className={`px-3 py-0.5 rounded-full transition-all text-[11px] font-medium ${
                activeAudience === 'gtm'
                  ? 'bg-[#0E7C7B] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For GTM & Sales
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E7EB] py-3'
            : 'bg-white py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-[#111318]">
                Prelude
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#0E7C7B] block font-semibold">
                Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#5B6169]">
            <a href="#how-it-works" className="hover:text-[#111318] transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-[#111318] transition-colors">
              Core Capabilities
            </a>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 hover:text-[#111318] transition-colors py-2 cursor-pointer focus:outline-none"
                aria-expanded={isProductsDropdownOpen}
              >
                <span>Modules</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsDropdownOpen ? 'rotate-180 text-[#0E7C7B]' : ''
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {productModules.map((mod, idx) => {
                    const Icon = mod.icon;
                    return (
                      <Link
                        key={idx}
                        to={mod.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F7F8F9] transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-[#E8F5F5] text-[#0E7C7B] group-hover:bg-[#0E7C7B] group-hover:text-white transition-colors shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[#111318] block group-hover:text-[#0E7C7B] transition-colors">
                            {mod.title}
                          </span>
                          <span className="text-xs text-[#5B6169] line-clamp-1">
                            {mod.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#compare" className="hover:text-[#111318] transition-colors">
              Compare
            </a>
            <a href="#testimonials" className="hover:text-[#111318] transition-colors">
              Success Stories
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-semibold text-[#5B6169] hover:text-[#111318] px-4 py-2 rounded-full transition-colors"
            >
              Sign In
            </Link>
            <a
              href="#contact"
              className="text-sm font-semibold bg-[#0E7C7B] hover:bg-[#0B6362] text-white px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-2 group"
            >
              <span>Get a Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              to="/"
              className="text-sm font-semibold bg-[#111318] hover:bg-black text-white px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Launch App</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#111318] hover:bg-[#F7F8F9] rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Full-Screen Overlay Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
            <nav className="space-y-4 pt-4 text-lg font-semibold text-[#111318]">
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-[#E5E7EB]"
              >
                How It Works
              </a>
              <a
                href="#benefits"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-[#E5E7EB]"
              >
                Core Capabilities
              </a>
              <div className="py-2 border-b border-[#E5E7EB] space-y-2">
                <span className="text-xs uppercase font-mono text-[#0E7C7B] font-bold block">
                  Intelligence Modules
                </span>
                {productModules.map((mod, idx) => (
                  <Link
                    key={idx}
                    to={mod.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-[#5B6169] py-1 pl-2"
                  >
                    • {mod.title}
                  </Link>
                ))}
              </div>
              <a
                href="#compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-[#E5E7EB]"
              >
                Compare vs Siloed Tools
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-[#E5E7EB]"
              >
                Success Stories
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[#0E7C7B]"
              >
                Contact Sales
              </a>
            </nav>

            <div className="space-y-3 pt-6 border-t border-[#E5E7EB]">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-[#0E7C7B] text-white rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
