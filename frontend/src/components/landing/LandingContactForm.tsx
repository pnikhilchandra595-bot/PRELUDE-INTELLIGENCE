import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building,
  Mail,
  User,
  Phone,
  Globe,
} from 'lucide-react';

export const LandingContactForm: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('Enterprise Demo');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Product / Engineering Leadership');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [message, setMessage] = useState('');
  const [termsConsent, setTermsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
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
    'Brazil',
    'Other Country',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid work email address';
    }
    if (!message.trim()) errs.message = 'Please provide details on your team inquiry';
    if (!termsConsent) errs.terms = 'You must agree to the terms and privacy policy';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate high-speed submission stub
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F7F8F9] border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Value Assurance (~40%) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E7C7B] font-bold block">
              SCHEDULE BRIEFING // CONTACT US
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#111318] tracking-tight">
              Get in Touch with an Intelligence Specialist
            </h2>
            <p className="text-base text-[#5B6169] leading-relaxed">
              Discover how Prelude can connect your team's historical context in under 15 minutes. See a tailored demo running on your own synthetic workflow data.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F5F5] text-[#0E7C7B] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#111318]">
                  Zero Data Bleed Across Multi-Tenant Boundaries
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F5F5] text-[#0E7C7B] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#111318]">
                  SOC2 Type II & Dedicated Private VPC Runtimes
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm text-xs text-[#5B6169] space-y-1">
              <span className="font-bold text-[#111318] block">Direct Executive Escalations:</span>
              <p>briefings@prelude.ai · +1 (415) 890-4200</p>
            </div>
          </div>

          {/* Right Column: Contact Form / Success Confirmation (~60%) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl">
              {isSubmitted ? (
                /* Success Confirmation Message (No Page Reload) */
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#111318]">
                    Briefing Request Confirmed!
                  </h3>
                  <p className="text-sm text-[#5B6169] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#111318]">{fullName}</strong>. An Intelligence Architect has received your request and will follow up at <strong className="text-[#111318]">{email}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setMessage('');
                      setTermsConsent(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#0E7C7B] text-white text-xs font-bold hover:bg-[#0B6362] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Interactive Lead Capture Form */
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Inquiry Type & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiryType" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                        Inquiry Purpose
                      </label>
                      <select
                        id="inquiryType"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                      >
                        <option value="Enterprise Demo">Enterprise Custom Demo</option>
                        <option value="Platform Pilot">Pilot Program (PoC)</option>
                        <option value="Partnership">Strategic Partnership</option>
                        <option value="Pricing">Contract Tier Consultation</option>
                        <option value="Other">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                        Your Role / Function
                      </label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                      >
                        <option value="Product / Engineering Leadership">VP / Director of Product or Eng</option>
                        <option value="Sales / Revenue Leadership">VP / Director of Sales or CS</option>
                        <option value="Marketing / GTM Leadership">VP / Director of Marketing</option>
                        <option value="C-Suite">C-Suite / Founder</option>
                        <option value="Technical Architect">Architect / AI Engineer</option>
                        <option value="Other">Other Role</option>
                      </select>
                    </div>
                  </div>

                  {/* Full Name & Email */}
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
                        placeholder="Jane Doe"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] focus:outline-none ${
                          errors.fullName
                            ? 'border-rose-500 bg-rose-50/30'
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
                        placeholder="jane@acmecorp.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] focus:outline-none ${
                          errors.email
                            ? 'border-rose-500 bg-rose-50/30'
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

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] focus:outline-none focus:border-[#0E7C7B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                        Country / Territory
                      </label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111318] bg-white focus:outline-none focus:border-[#0E7C7B]"
                      >
                        {countries.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase text-[#111318] font-bold mb-1">
                      Context / Specific Use Case *
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tell us about your team size, key integrations (Gong, Zendesk, Salesforce), and goals..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111318] focus:outline-none ${
                        errors.message
                          ? 'border-rose-500 bg-rose-50/30'
                          : 'border-[#E5E7EB] focus:border-[#0E7C7B]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-2 pt-2">
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
                        <a href="#terms" className="text-[#0E7C7B] underline">
                          Terms of Service
                        </a>{' '}
                        and acknowledge the{' '}
                        <a href="#privacy" className="text-[#0E7C7B] underline">
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

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5B6169]">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 rounded border-[#E5E7EB] text-[#0E7C7B] focus:ring-[#0E7C7B]"
                      />
                      <span>
                        Keep me updated on product releases, benchmark studies, and intelligence best practices.
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
                      <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Request for Demo'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
