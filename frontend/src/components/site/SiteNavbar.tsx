import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
  Brain,
} from 'lucide-react';

export const SiteNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  const productModules = [
    {
      title: 'Meeting Intelligence',
      desc: 'Context briefs, promises & causal negotiation leverage',
      icon: Users,
      href: '/contacts/jane-doe',
    },
    {
      title: 'Competitive Radar',
      desc: 'Real-time competitor pricing slashes & feature drops',
      icon: Compass,
      href: '/competitors/apex-cloud',
    },
    {
      title: 'Feedback Synthesizer',
      desc: 'Unsupervised ticket clustering into product themes',
      icon: MessageSquare,
      href: '/feedback',
    },
    {
      title: 'Campaign Memory',
      desc: 'High-conversion messaging angles with competitor context',
      icon: FileText,
      href: '/campaigns',
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E7EB] py-3.5'
          : 'bg-white py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-display tracking-tight text-[#111318]">
              Prelude
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0E7C7B] block font-semibold leading-none">
              Intelligence
            </span>
          </div>
        </Link>

        {/* Center/Right Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#5B6169]">
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `transition-colors hover:text-[#111318] ${
                isActive ? 'text-[#0E7C7B] font-semibold' : ''
              }`
            }
          >
            How it Works
          </NavLink>

          <NavLink
            to="/our-story"
            className={({ isActive }) =>
              `transition-colors hover:text-[#111318] ${
                isActive ? 'text-[#0E7C7B] font-semibold' : ''
              }`
            }
          >
            Our Story
          </NavLink>

          {/* Products Dropdown / Mega-Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 transition-colors hover:text-[#111318] py-2 cursor-pointer focus:outline-none"
              aria-expanded={isProductsOpen}
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isProductsOpen ? 'rotate-180 text-[#0E7C7B]' : ''
                }`}
              />
            </button>

            {/* Dropdown Panel */}
            {isProductsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-3 space-y-1 animate-in fade-in zoom-in-95 duration-200">
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

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `transition-colors hover:text-[#111318] ${
                isActive ? 'text-[#0E7C7B] font-semibold' : ''
              }`
            }
          >
            Compare
          </NavLink>

          <NavLink
            to="/success-stories"
            className={({ isActive }) =>
              `transition-colors hover:text-[#111318] ${
                isActive ? 'text-[#0E7C7B] font-semibold' : ''
              }`
            }
          >
            Success Stories
          </NavLink>
        </nav>

        {/* Far Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/app"
            className="text-sm font-semibold text-[#111318] hover:text-[#0E7C7B] px-4 py-2 rounded-full border border-[#E5E7EB] hover:border-[#0E7C7B]/40 transition-all"
          >
            Login
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold bg-[#0E7C7B] hover:bg-[#0B6362] text-white px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Contact</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/app"
            className="text-sm font-semibold bg-[#111318] hover:bg-black text-white px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Brain className="w-3.5 h-3.5 text-cyan-300" />
            <span>Launch Hub</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
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
        <div className="lg:hidden fixed inset-0 top-[68px] bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <nav className="space-y-4 pt-4 text-lg font-semibold text-[#111318]">
            <NavLink to="/how-it-works" className="block py-2 border-b border-[#E5E7EB]">
              How it Works
            </NavLink>
            <NavLink to="/our-story" className="block py-2 border-b border-[#E5E7EB]">
              Our Story
            </NavLink>
            <div className="py-2 border-b border-[#E5E7EB] space-y-2">
              <span className="text-xs uppercase font-mono text-[#0E7C7B] font-bold block">
                Intelligence Products
              </span>
              {productModules.map((mod, idx) => (
                <Link
                  key={idx}
                  to={mod.href}
                  className="block text-sm text-[#5B6169] py-1 pl-2"
                >
                  • {mod.title}
                </Link>
              ))}
            </div>
            <NavLink to="/compare" className="block py-2 border-b border-[#E5E7EB]">
              Compare
            </NavLink>
            <NavLink to="/success-stories" className="block py-2 border-b border-[#E5E7EB]">
              Success Stories
            </NavLink>
            <NavLink to="/contact" className="block py-2 text-[#0E7C7B]">
              Contact Us
            </NavLink>
          </nav>

          <div className="space-y-3 pt-6 border-t border-[#E5E7EB]">
            <Link
              to="/app"
              className="w-full py-3 bg-[#0E7C7B] text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <span>Launch Intelligence Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
