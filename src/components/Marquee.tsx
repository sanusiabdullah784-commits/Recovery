"use client";

export function Marquee() {
  const row1 = [
    "🛡️ Secure & Verified Recovery",
    "⚖️ Expert Legal Mediation",
    "🌍 Global Network, Local Expertise",
    "⚡ Fast & Transparent Process",
    "🤝 Trusted by Thousands",
  ];
  
  const row2 = [
    " 24/7 Customer Support",
    "🏆 98% Success Rate",
    "🔒 100% Confidential",
    "🚀 Nationwide Coverage",
    "💼 Professional Asset Tracing",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-950/80 border-y border-amber-100 dark:border-slate-800/50 backdrop-blur-sm">
      {/* Inline styles for smooth, zero-config infinite scrolling */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Row 1: Scrolling Left - Mobile Optimized */}
      <div className="flex py-2 sm:py-3 whitespace-nowrap animate-scroll-left">
        {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
          <span key={i} className="mx-4 sm:mx-8 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 sm:gap-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>

      {/* Subtle Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Row 2: Scrolling Right - Mobile Optimized */}
      <div className="flex py-2 sm:py-3 whitespace-nowrap animate-scroll-right">
        {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
          <span key={i} className="mx-4 sm:mx-8 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 sm:gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}