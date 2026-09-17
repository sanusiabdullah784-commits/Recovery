"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Search, Activity } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      {/* Glowing Orbs - Mobile Optimized */}
      <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[80px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      {/* Subtle Gold Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Main CTA Card with Premium Gold Gradient - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-amber-400/30 dark:border-amber-600/30 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 shadow-2xl shadow-amber-500/20 dark:shadow-amber-900/30 p-6 sm:p-8 md:p-16 text-center"
        >
          {/* Inner Glow - Mobile Optimized */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-white/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* LIVE REAL-TIME ACTIVITY TICKER - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 border border-white/30 mb-6 sm:mb-8 backdrop-blur-md"
            >
              {/* Pulsing Live Dot */}
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
              </span>
              
              <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
              
              <span className="text-[10px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                {t("14 Cases Resolved Today • 3 Verified Agents Online", "14 Cases Don Resolve Today • 3 Verified Agents Dey Online")}
              </span>
            </motion.div>

            {/* Shield Badge - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center p-2 sm:p-3 bg-white/20 rounded-full mb-4 sm:mb-6 border border-white/30 shadow-lg"
            >
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </motion.div>

            {/* Heading - Mobile Optimized */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 leading-tight px-2 drop-shadow-sm"
            >
              {t("Ready to Recover What's", "You Ready to Recover Wetin")} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
                {t("Lost?", "You Don Lose?")}
              </span>
            </motion.h2>

            {/* Subtitle - Mobile Optimized */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
            >
              {/* ✅ UPDATED: Changed "Homeland Recovery" to "Homeland Recovery Services Ltd." */}
              {t(
                "Join thousands of Nigerians who trust Homeland Recovery Services Ltd. to safely reunite them with their lost property. It only takes 2 minutes to report.",
                "Join thousands of Nigerians wey dey trust Homeland Recovery Services Ltd. to safely reunite dem with their lost property. E just take 2 minutes to report."
              )}
            </motion.p>

            {/* Buttons - Mobile Optimized */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
            >
              <Link href="/report" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-700 font-bold rounded-xl shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-amber-50 text-sm sm:text-base">
                  {t("Found/Report", "Find/Report")}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              
              <Link href="/complaints" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t("Lost/Complaint", "Lost/Complain")}
                </button>
              </Link>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}