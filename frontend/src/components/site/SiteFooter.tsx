import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedLocale, setSelectedLocale] = useState('en-US');

  return (
    <footer className="bg-[#111318] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        {/* Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Regional / Office Contact Info */}
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
              Shared cognitive persistent memory substrate connecting Sales, Product, and Marketing silos.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">San Francisco HQ</span>
                <p className="text-slate-400">548 Market St, Suite 7200</p>
                <p className="text-[#0E7C7B] font-mono">+1 (415) 890-4200</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-white block">New York Operations</span>
                <p className="text-slate-400">One World Trade Center, Fl 45</p>
                <p className="text-[#0E7C7B] font-mono">+1 (212) 555-0199</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-white block">London Office (EMEA)</span>
                <p className="text-slate-400">100 Bishopsgate, EC2N 4AG</p>
                <p className="text-[#0E7C7B] font-mono">+44 20 7946 0991</p>
              </div>
            </div>
          </div>

          {/* Column 2: Resource Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
              Navigation & Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works Pipeline
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-white transition-colors">
                  Our Story & Mission
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Old Way vs. New Way
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-white transition-colors">
                  Customer Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Request Custom Demo
                </Link>
              </li>
              <li>
                <Link to="/app" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Launch Live Intelligence Hub →
                </Link>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Legal Notice & Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Icons */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read our latest benchmark papers on evolving cognitive graphs and LLM groundedness.
            </p>

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

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.57 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
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

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0E7C7B] flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 4: Language / Region Switcher */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
              Region & Language
            </h4>
            <p className="text-xs text-slate-400">
              Global infrastructure deployed in accordance with enterprise data residency standards.
            </p>

            <div className="pt-2">
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Active Locale:
              </label>
              <select
                value={selectedLocale}
                onChange={(e) => setSelectedLocale(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/10 text-xs text-white border border-white/15 focus:outline-none focus:border-[#0E7C7B]"
              >
                <option value="en-US" className="bg-slate-900 text-white">English (United States)</option>
                <option value="en-GB" className="bg-slate-900 text-white">English (United Kingdom)</option>
                <option value="de-DE" className="bg-slate-900 text-white">Deutsch (Deutschland)</option>
                <option value="fr-FR" className="bg-slate-900 text-white">Français (France)</option>
                <option value="ja-JP" className="bg-slate-900 text-white">日本語 (Japan)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright line with computed year */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Prelude Intelligence Inc. All rights reserved. Evolving shared memory for modern enterprise teams.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/our-story" className="hover:text-white transition-colors">About Us</Link>
            <span>•</span>
            <Link to="/compare" className="hover:text-white transition-colors">Compare</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
