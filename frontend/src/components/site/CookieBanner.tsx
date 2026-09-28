import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('prelude_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('prelude_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-[#111318]/95 backdrop-blur-md border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <p className="leading-relaxed">
          We use essential cookies to maintain secure sessions and optimize telemetry routing across our memory cluster. By continuing, you agree to our{' '}
          <a href="#privacy" className="text-[#0E7C7B] underline hover:text-[#17B890]">
            Cookie Policy
          </a>
          .
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 rounded-full bg-[#0E7C7B] hover:bg-[#0B6362] text-white font-bold text-xs shadow transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
