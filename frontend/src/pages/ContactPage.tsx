import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Globe2,
  Search,
} from 'lucide-react';
import { CTABanner } from '../components/site/CTABanner';

export const ContactPage: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('Enterprise Demo');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Product / Engineering Leadership');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [termsConsent, setTermsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allCountries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Australia',
    'India',
    'Singapore',
    'Japan',
    'Netherlands',
    'Switzerland',
    'Sweden',
    'Ireland',
    'Israel',
    'New Zealand',
    'Brazil',
    'Mexico',
    'South Korea',
    'Spain',
    'Italy',
    'United Arab Emirates',
    'Denmark',
    'Norway',
    'Finland',
    'Austria',
    'Belgium',
  ];

  const filteredCountries = allCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid work email';
    }
    if (!message.trim()) errs.message = 'Please provide a short description of your project or team goals';
    if (!termsConsent) errs.terms = 'You must accept the terms of service and privacy policy';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const regionalOffices = [
    {
      region: 'San Francisco (HQ)',
      address: '500 Howard Street, Suite 400, San Francisco, CA 94105',
      phone: '+1 (415) 890-4200',
      hours: '08:00 - 18:00 PST',
    },
    {
      region: 'New York',
      address: '114 5th Avenue, 10th Floor, New York, NY 10011',
      phone: '+1 (212) 790-3300',
      hours: '08:30 - 18:30 EST',
    },
    {
      region: 'London (EMEA)',
      address: '100 Bishopsgate, Level 18, London EC2N 4AG, UK',
      phone: '+44 20 7946 0991',
      hours: '09:00 - 18:00 GMT',
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[#F7F8F9] to-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block mb-3">
              PRELUDE INTELLIGENCE // ADVISORY & CONNECT
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#111318] tracking-tight mb-5 leading-[1.1]">
              Contact Our Enterprise Intelligence Advisory Team
            </h1>
            <p className="text-lg text-[#5B6169] leading-relaxed">
              Connect directly with our solutions architects. Whether you want to test our cognitive temporal memory substrate on historical call transcripts or evaluate our private VPC deployment options, we are here to support your team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid (Form + Sidebar) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 cols: Lead-Capture Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F8F9] border border-[#E5E7EB] shadow-lg">
                {isSubmitted ? (
                  /* Swap form for confirmed state */
                  <div className="py-14 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display text-[#111318]">
                        Briefing Request Received
                      </h3>
                      <p className="text-sm text-[#5B6169] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-[#111318]">{fullName}</strong>. A dedicated Intelligence Architect has been assigned to your inquiry and will reach out to <strong className="text-[#111318]">{email}</strong> within two business hours.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-[#5B6169] max-w-md mx-auto text-left space-y-1">
                      <div className="flex items-center gap-2 text-[#0E7C7B] font-semibold">
                        <Clock className="w-4 h-4" />
                        <span>SLA: 2-Hour Rapid Response Window</span>
                      </div>
                      <p>
                        In urgent enterprise scenarios, feel free to directly call our San Francisco desk at <strong>+1 (415) 890-4200</strong>.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFullName('');
                        setEmail('');
                        setMessage('');
                        setTermsConsent(false);
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0E7C7B] text-white text-xs font-bold hover:bg-[#0B6362] transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="border-b border-[#E5E7EB] pb-3 mb-2">
                      <h2 className="text-xl font-bold font-display text-[#111318]">
                        Schedule Architecture Review & Demo
                      </h2>
                      <p className="text-xs text-[#5B6169]">
                        All fields marked with an asterisk (*) are mandatory.
                      </p>
                    </div>

                    {/* Inquiry Type & Specialty */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiryType" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Inquiry Type *
                        </label>
                        <select
                          id="inquiryType"
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                        >
                          <option value="Enterprise Demo">Custom Enterprise Demonstration</option>
                          <option value="Proof of Concept">PoC / Sandbox Trial</option>
                          <option value="Security Review">Security, SOC2 & Private VPC</option>
                          <option value="Integrations">Integrations (Gong, Zendesk, Salesforce)</option>
                          <option value="Pricing">Commercial Volume Pricing</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="role" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Role / Specialty *
                        </label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                        >
                          <option value="Product / Engineering Leadership">Product or Engineering Leader</option>
                          <option value="Sales / Revenue Operations">VP / Director of Sales & RevOps</option>
                          <option value="Marketing / PMM">Head of Product Marketing (PMM)</option>
                          <option value="Customer Experience">Customer Support / Success Director</option>
                          <option value="Executive">Founder / C-Level Executive</option>
                          <option value="Other">Other Specialty</option>
                        </select>
                      </div>
                    </div>

                    {/* Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          placeholder="e.g. Elena Rostova"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] bg-white focus:outline-none ${
                            errors.fullName
                              ? 'border-rose-500 bg-rose-50/20'
                              : 'border-[#E5E7EB] focus:border-[#0E7C7B]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Work Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="elena@enterprise.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] bg-white focus:outline-none ${
                            errors.email
                              ? 'border-rose-500 bg-rose-50/20'
                              : 'border-[#E5E7EB] focus:border-[#0E7C7B]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Country (Searchable Dropdown) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (415) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                        />
                      </div>

                      <div className="relative">
                        <label htmlFor="country" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                          Country / Region
                        </label>
                        <div
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white cursor-pointer flex items-center justify-between"
                        >
                          <span className="truncate">{country}</span>
                          <Globe2 className="w-4 h-4 text-[#5B6169]" />
                        </div>

                        {isCountryDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-20 p-2 max-h-56 overflow-y-auto">
                            <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-[#E5E7EB]">
                              <Search className="w-3.5 h-3.5 text-[#5B6169]" />
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search countries..."
                                className="w-full text-xs outline-none bg-transparent"
                                autoFocus
                              />
                            </div>
                            {filteredCountries.map((c) => (
                              <div
                                key={c}
                                onClick={() => {
                                  setCountry(c);
                                  setIsCountryDropdownOpen(false);
                                  setCountrySearch('');
                                }}
                                className={`px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-[#F7F8F9] ${
                                  country === c ? 'bg-[#0E7C7B]/10 text-[#0E7C7B] font-semibold' : 'text-[#111318]'
                                }`}
                              >
                                {c}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                        Message & Team Context *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Tell us about your team size, customer communication volumes, key tool integrations, and operational pain points..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] bg-white focus:outline-none ${
                          errors.message
                            ? 'border-rose-500 bg-rose-50/20'
                            : 'border-[#E5E7EB] focus:border-[#0E7C7B]'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Required Terms Consent */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5B6169]">
                        <input
                          type="checkbox"
                          checked={termsConsent}
                          onChange={(e) => {
                            setTermsConsent(e.target.checked);
                            if (errors.terms) setErrors({ ...errors, terms: '' });
                          }}
                          className="mt-0.5 rounded border-[#E5E7EB] text-[#0E7C7B] focus:ring-[#0E7C7B]"
                        />
                        <span>
                          I agree to the{' '}
                          <a href="#terms" className="text-[#0E7C7B] underline font-medium">
                            Terms of Service
                          </a>{' '}
                          and acknowledge the{' '}
                          <a href="#privacy" className="text-[#0E7C7B] underline font-medium">
                            Privacy Policy
                          </a>
                          . *
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="text-xs text-rose-600 flex items-center gap-1 pl-6">
                          <AlertCircle className="w-3 h-3" /> {errors.terms}
                        </p>
                      )}

                      {/* Optional Marketing Opt-In */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5B6169]">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-0.5 rounded border-[#E5E7EB] text-[#0E7C7B] focus:ring-[#0E7C7B]"
                        />
                        <span>
                          Send me quarterly benchmark reports on cognitive memory architectures and product telemetry.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span>{isSubmitting ? 'Transmitting Request...' : 'Send Inquiry to Architecture Team'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 cols: Regional Offices, Direct Contacts & Social Links */}
            <div className="lg:col-span-5 space-y-6">
              {/* Regional Offices */}
              <div className="p-7 rounded-3xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
                  REGIONAL CONTACT HUBS
                </span>

                <div className="space-y-5">
                  {regionalOffices.map((office, idx) => (
                    <div key={idx} className="pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0 space-y-1.5">
                      <h4 className="text-base font-bold text-[#111318] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#0E7C7B]" />
                        <span>{office.region}</span>
                      </h4>
                      <p className="text-xs text-[#5B6169] pl-6 leading-relaxed">
                        {office.address}
                      </p>
                      <div className="pl-6 flex items-center justify-between text-xs pt-1">
                        <span className="font-mono text-[#111318] font-semibold">{office.phone}</span>
                        <span className="text-[#5B6169] text-[11px]">{office.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Direct Inquiries */}
              <div className="p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
                  DIRECT DESKS & SECURITY
                </span>
                <div className="space-y-3 text-xs text-[#5B6169]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#111318] font-medium">Enterprise Sales:</span>
                    <a href="mailto:briefings@prelude.ai" className="text-[#0E7C7B] hover:underline font-mono">
                      briefings@prelude.ai
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111318] font-medium">Security & Compliance:</span>
                    <a href="mailto:security@prelude.ai" className="text-[#0E7C7B] hover:underline font-mono">
                      security@prelude.ai
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111318] font-medium">Press & Analyst Relations:</span>
                    <a href="mailto:press@prelude.ai" className="text-[#0E7C7B] hover:underline font-mono">
                      press@prelude.ai
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>SOC2 Type II, HIPAA & ISO 27001 Certified Substrate</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-7 rounded-3xl bg-[#F7F8F9] border border-[#E5E7EB] space-y-3">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
                  CONNECT ON SOCIAL
                </span>
                <p className="text-xs text-[#5B6169]">
                  Follow Prelude engineering updates, research preprints, and platform releases:
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#0E7C7B] hover:border-[#0E7C7B] transition-colors shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#0E7C7B] hover:border-[#0E7C7B] transition-colors shadow-sm"
                    aria-label="Twitter / X"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#0E7C7B] hover:border-[#0E7C7B] transition-colors shadow-sm"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5B6169] hover:text-[#0E7C7B] hover:border-[#0E7C7B] transition-colors shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Reusable CTA Banner */}
      <CTABanner
        title="Ready to Explore How Shared Memory Enhances Every Customer Interaction?"
        subtitle="Schedule a 20-minute tailored briefing or test drive our interactive live hub."
        primaryButtonText="Request Custom Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="Launch Live Hub"
        secondaryButtonLink="/app"
      />
    </div>
  );
};
