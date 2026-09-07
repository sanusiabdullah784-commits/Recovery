"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, MapPin, TrendingUp, Crown, Flame, Target } from "lucide-react";

export function Leaderboard() {
  const topHelpers = [
    { rank: 1, name: "Chinedu O.", city: "Abuja", items: 47, badge: "", color: "from-yellow-400 via-amber-500 to-yellow-600", ring: "ring-amber-200 dark:ring-amber-800" },
    { rank: 2, name: "Aisha B.", city: "Lagos", items: 38, badge: "", color: "from-slate-300 to-slate-400", ring: "ring-slate-200 dark:ring-slate-700" },
    { rank: 3, name: "Tunde K.", city: "Port Harcourt", items: 31, badge: "", color: "from-orange-400 to-amber-600", ring: "ring-orange-200 dark:ring-orange-800" },
    { rank: 4, name: "Fatima Y.", city: "Kano", items: 24, badge: "⭐", color: "from-amber-500 to-yellow-600", ring: "ring-transparent" },
    { rank: 5, name: "Emeka N.", city: "Enugu", items: 19, badge: "⭐", color: "from-amber-500 to-yellow-600", ring: "ring-transparent" },
  ];

  // Calculate progress to next rank
  const getProgressToNextRank = (currentRank: number, currentItems: number) => {
    if (currentRank === 1) {
      const nextRankItems = topHelpers[1].items;
      const lead = currentItems - nextRankItems;
      return {
        percentage: 100,
        itemsNeeded: lead,
        label: `${lead} ahead of #2`,
        isLeader: true
      };
    }
    
    const previousRankHelper = topHelpers.find(h => h.rank === currentRank - 1);
    if (!previousRankHelper) return { percentage: 0, itemsNeeded: 0, label: "", isLeader: false };
    
    const itemsNeeded = previousRankHelper.items - currentItems;
    const percentage = (currentItems / previousRankHelper.items) * 100;
    
    return {
      percentage: Math.min(percentage, 99),
      itemsNeeded,
      label: `${itemsNeeded} more to #${currentRank - 1}`,
      isLeader: false
    };
  };

  const podiumHelpers = topHelpers.slice(0, 3);
  const remainingHelpers = topHelpers.slice(3);

  // Podium configuration for each rank - Mobile Optimized
  const podiumConfig: Record<number, { height: string; order: number; crownIcon: React.ReactNode; accentColor: string; bgGradient: string; rankText: string }> = {
    1: { 
      height: "h-32 sm:h-40 md:h-48", 
      order: 2, 
      crownIcon: <Crown className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />,
      accentColor: "from-amber-400 via-yellow-500 to-amber-600",
      bgGradient: "from-amber-500/20 via-yellow-500/10 to-amber-600/20",
      rankText: "text-amber-600 dark:text-amber-400"
    },
    2: { 
      height: "h-28 sm:h-32 md:h-40", 
      order: 1, 
      crownIcon: <Medal className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-slate-400 drop-shadow-[0_0_6px_rgba(148,163,184,0.5)]" />,
      accentColor: "from-slate-300 to-slate-500",
      bgGradient: "from-slate-400/20 to-slate-600/10",
      rankText: "text-slate-500 dark:text-slate-400"
    },
    3: { 
      height: "h-24 sm:h-28 md:h-32", 
      order: 3, 
      crownIcon: <Medal className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.5)]" />,
      accentColor: "from-orange-400 to-amber-600",
      bgGradient: "from-orange-400/20 to-amber-600/10",
      rankText: "text-orange-500 dark:text-orange-400"
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-white dark:from-slate-900 dark:via-amber-950/10 dark:to-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-amber-400/5 dark:bg-amber-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Section Header - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-amber-200 dark:border-amber-800">
            Hall of Fame
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">Helpers</span> This Month
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            Celebrating the incredible community heroes who make our platform stronger every single day.
          </p>
        </motion.div>

        {/* Leaderboard Card - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-amber-100 dark:border-amber-900/30 shadow-xl shadow-amber-500/5"
        >
          
          {/* Header inside card */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Monthly Rankings</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 sm:px-3 py-1 rounded-full">
                Updated Live
              </span>
            </div>
          </div>

          {/* ==========================================
              VISUAL PODIUM FOR TOP 3 - Mobile Optimized
              ========================================== */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-6 mb-8 sm:mb-12 pt-10 sm:pt-16 md:pt-20 relative">
            {/* Decorative spotlight behind #1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
            
            {podiumHelpers.map((helper) => {
              const config = podiumConfig[helper.rank];
              const progress = getProgressToNextRank(helper.rank, helper.items);
              
              return (
                <motion.div
                  key={helper.rank}
                  initial={{ opacity: 0, y: 80, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    delay: helper.rank * 0.15 
                  }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  style={{ order: config.order }}
                  className="flex flex-col items-center relative group cursor-default flex-1 max-w-[120px] sm:max-w-[150px] md:max-w-[180px]"
                >
                  
                  {/* Crown/Medal floating above avatar */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 sm:-top-14 md:-top-16 left-1/2 -translate-x-1/2 z-20"
                  >
                    {config.crownIcon}
                  </motion.div>

                  {/* Avatar */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${helper.color} flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold shadow-xl ring-4 ${helper.ring} mb-2 sm:mb-3`}
                  >
                    {helper.name.charAt(0)}
                    {/* Rank number badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-600 flex items-center justify-center shadow-md">
                      <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-amber-600 dark:text-amber-400">#{helper.rank}</span>
                    </div>
                  </motion.div>

                  {/* Name */}
                  <h4 className={`text-xs sm:text-sm md:text-base font-bold ${config.rankText} mb-0.5 truncate max-w-full text-center leading-tight`}>
                    {helper.name}
                  </h4>
                  
                  {/* City */}
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {helper.city}
                  </p>

                  {/* Items Count */}
                  <div className="text-center mb-2 sm:mb-3">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                        {helper.items}
                      </span>
                    </div>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      Recovered
                    </p>
                  </div>

                  {/* PROGRESS TO NEXT RANK (PODIUM) */}
                  <div className="w-full mb-2 sm:mb-3 px-1 sm:px-2">
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Target className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        {progress.isLeader ? "Leading" : "Next"}
                      </span>
                      <span className="tabular-nums truncate">{progress.label}</span>
                    </div>
                    <div className="w-full h-1 sm:h-1 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 + helper.rank * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${
                          progress.isLeader 
                            ? "from-emerald-400 to-emerald-500" 
                            : config.accentColor
                        }`}
                      />
                    </div>
                  </div>

                  {/* Podium Block */}
                  <div className={`w-full ${config.height} rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b ${config.bgGradient} border-t border-x border-white/40 dark:border-white/10 shadow-lg relative overflow-hidden backdrop-blur-sm`}>
                    {/* Inner shine */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                    {/* Large rank number watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl sm:text-5xl md:text-7xl font-black bg-gradient-to-b ${config.accentColor} bg-clip-text text-transparent opacity-40`}>
                        {helper.rank}
                      </span>
                    </div>
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.accentColor}`} />
                  </div>

                </motion.div>
              );
            })}
          </div>
          {/* ========================================== */}

          {/* Remaining Helpers List (Ranks 4+) - Mobile Optimized */}
          {remainingHelpers.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              {remainingHelpers.map((helper) => {
                const progress = getProgressToNextRank(helper.rank, helper.items);
                
                return (
                  <motion.div
                    key={helper.rank}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.01, 
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-default bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-700/50 hover:border-amber-200 dark:hover:border-amber-800/50"
                  >
                    
                    {/* Main Row */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      
                      {/* Rank Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${helper.color} flex items-center justify-center text-xl sm:text-2xl shadow-md ring-4 ${helper.ring} transition-transform group-hover:scale-110`}>
                          {helper.badge}
                        </div>
                      </div>

                      {/* Rank Number */}
                      <div className="flex-shrink-0 w-6 sm:w-8 text-center hidden sm:block">
                        <span className="text-xl sm:text-2xl font-black text-slate-400 dark:text-slate-500">
                          #{helper.rank}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                          {helper.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {helper.city}
                        </p>
                      </div>

                      {/* Items Recovered */}
                      <div className="flex-shrink-0 text-right">
                        <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                          <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                            {helper.items}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide hidden sm:block">
                          Recovered
                        </p>
                      </div>

                    </div>

                    {/* PROGRESS TO NEXT RANK (LIST) */}
                    <div className="w-full pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-700/30">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 sm:mb-1.5">
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <Target className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" />
                          Progress to #{helper.rank - 1}
                        </span>
                        <span className="tabular-nums text-amber-600 dark:text-amber-400 truncate">{progress.label}</span>
                      </div>
                      <div className="w-full h-1 sm:h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"
                        />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Call to Action - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-700/50 text-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 font-medium px-2">
              Want to see your name on this list?
            </p>
            <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-amber-500/40 flex items-center gap-2 mx-auto">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Helping Today
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}