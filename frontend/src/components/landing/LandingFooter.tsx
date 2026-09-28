import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, MapPin, Phone, ExternalLink } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const [cookieAccepted, setCookieAccepted] = useState(true); // default true to avoid flash
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  useEffect(() => {
    const stored = localStorage.getItem('prelude_cookie_consent');
    if (stored !== 'accepted') {
      setCookieAccepted(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('prelude_cookie_consent', 'accepted');
    setCookieAccepted(true);
  };

  return (
    <>
      <footer className="bg-[#111318] text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          {/* Main Footer 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Regional Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Prelude Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Autonomous shared cognitive memory substrate connecting enterprise silos.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">San Francisco HQ</span>
                  <p className="text-slate-400">548 Market St, Suite 7200</p>
                  <p className="text-[#0E7C7B]">+1 (415) 890-4200</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">New York Operations</span>
                  <p className="text-slate-400">One World Trade Center, Fl 45</p>
                  <p className="text-[#0E7C7B]">+1 (212) 555-0199</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">London Office (EMEA)</span>
                  <p className="text-slate-400">100 Bishopsgate, EC2N 4AG</p>
                  <p className="text-[#0E7C7B]">+44 20 7946 0991</p>
                </div>
              </div>
            </div>

            {/* Column 2: Resources & Legal */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">
                Resources & Legal
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Intelligence Web Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/contacts/jane-doe" className="hover:text-white transition-colors">
                    Flagship Contact Brief
                  </Link>
                </li>
                <li>
                  <Link to="/competitors/apex-cloud" className="hover:text-white transition-colors">
                    Competitor Radar Timeline
                  </Link>
                </li>
                <li>
                  <Link to="/preview" className="hover:text-white transition-colors">
                    Liquid Glass Design System
                  </Link>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service & SLAs
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy & Subprocessors
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white transition-colors">
                    Security & SOC2 Type II Attestation
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Icons */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">
                Community & Network
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow our ongoing research papers on temporal cognitive graphs and LLM groundedness.
              </p>

              {/* Simple SVGs for LinkedIn, Twitter, YouTube, GitHub */}
              <div className="flex items-center gap-3 pt-2">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 4: Language & Territory Switcher */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider text-xs">
                Region & Compliance
              </h4>
              <p className="text-xs text-slate-400">
                Deployments comply with GDPR, CCPA, and regional data residency mandates.
              </p>

              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-mono text-slate-400 block">
                  Select Language / Locale:
                </label>
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 text-xs text-white border border-white/15 focus:outline-none focus:border-[#0E7C7B]"
                  >
                    <option value="English (US)" className="bg-slate-900 text-white">English (US)</option>
                    <option value="English (UK)" className="bg-slate-900 text-white">English (UK)</option>
                    <option value="Deutsch (DE)" className="bg-slate-900 text-white">Deutsch (DE)</option>
                    <option value="Français (FR)" className="bg-slate-900 text-white">Français (FR)</option>
                    <option value="日本語 (JP)" className="bg-slate-900 text-white">日本語 (JP)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright Line */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Prelude Intelligence Inc. All rights reserved. Persistent shared memory for enterprise teams.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <span>•</span>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <span>•</span>
              <a href="#security" className="hover:text-white transition-colors">Security</a>
              <span>•</span>
              <span>Site by Prelude Design Team</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner (Fixed Bottom, dismisses to localStorage) */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-[#111318]/95 backdrop-blur-md border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <p className="leading-relaxed">
              We use essential cookies to maintain secure persistent sessions and optimize telemetry routing. By continuing to browse, you agree to our{' '}
              <a href="#privacy" className="text-[#0E7C7B] underline">
                Cookie Policy
              </a>
              .
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleAcceptCookies}
                className="px-5 py-2 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white font-bold text-xs shadow transition-colors cursor-pointer"
              >
                Accept Essential Cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
