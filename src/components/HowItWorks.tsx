"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, CheckCircle, Clock, Lock, TrendingUp, Radio, Search, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      step: "01",
      title: t("Report or Lodge a Complaint", "Report or Lodge a Complaint"),
      description: t(
        "Fill out our secure, easy-to-use form with the details of your lost item or missing person. You can even use voice typing for faster input.",
        "Fill out our secure, easy-to-use form with the details of your lost item or missing person. You fit even use voice typing make e faster."
      ),
      metric: { icon: Clock, text: t("Takes < 2 Mins", "E no reach 2 Mins") }
    },
    {
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      step: "02",
      title: t("Secure Verification & Payment", "Secure Verification & Payment"),
      description: t(
        "Pay a small, transparent registration fee via Paystack, Flutterwave, or PayPal. Our verified agents immediately begin investigating your case.",
        "Pay a small, transparent registration fee via Paystack, Flutterwave, or PayPal. Our verified agents go immediately start to investigate your case."
      ),
      metric: { icon: Lock, text: t("256-Bit Encrypted", "256-Bit Encrypted") }
    },
    {
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      step: "03",
      title: t("Recovery & Resolution", "Recovery & Resolution"),
      description: t(
        "Track your case in real-time using your unique HLRS Tracking ID. Once matched, we securely facilitate the return of your property.",
        "Track your case in real-time using your unique HLRS Tracking ID. Once we match am, we go safely bring back your property."
      ),
      metric: { icon: TrendingUp, text: t("98% Success Rate", "98% Success Rate") },
      hasDashboardPeek: true // Flag to trigger the interactive peek
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -30, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-visible">
      
      {/* Background decoration - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-amber-500/20">
            {t("Simple & Secure Process", "Simple & Secure Process")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            {t("How Homeland Recovery", "How Homeland Recovery")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">{t("Works", "Dey Work")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            {t(
              "We have streamlined the recovery process into three simple, transparent steps to get your property back as fast as possible.",
              "We don streamline the recovery process into three simple, transparent steps to get your property back as fast as possible."
            )}
          </p>
        </motion.div>

        {/* Steps Grid - Mobile Optimized */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 perspective-[1000px] pb-24 md:pb-0"
        >
          
          {/* Animated Journey Connecting Line */}
          <div className="hidden md:block absolute top-[56px] left-[16.66%] right-[16.66%] h-[2px] z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: "left center" }}
              className="w-full h-full bg-gradient-to-r from-amber-500/20 via-yellow-500/50 to-amber-500/20 rounded-full"
            />
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
              />
            </div>
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, scale: 1.02, rotateX: 4, rotateY: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative z-10"
            >
              <div className="h-full bg-white dark:bg-slate-900 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 pt-10 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300">
                
                {/* Step Number Watermark - Mobile Optimized */}
                <span className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-6xl font-black text-slate-100 dark:text-slate-800/50 select-none group-hover:text-amber-100 dark:group-hover:text-amber-900/20 transition-colors">
                  {item.step}
                </span>

                {/* Icon Container - Mobile Optimized */}
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Content - Mobile Optimized */}
                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                  {item.description}
                </p>

                {/* Floating Metric Badge - Mobile Optimized */}
                <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-20">
                  <div className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-amber-200 dark:border-amber-800 rounded-full shadow-lg shadow-amber-500/10">
                    <item.metric.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {item.metric.text}
                    </span>
                  </div>
                </div>

                {/* ==========================================
                    INTERACTIVE DASHBOARD PEEK (Step 3 Only) - Mobile Optimized
                    ========================================== */}
                {item.hasDashboardPeek && (
                  <div className="absolute top-full left-0 right-0 mt-6 sm:mt-8 opacity-0 translate-y-4 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto z-30">
                    <div className="relative bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl border border-amber-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl shadow-amber-500/20 overflow-hidden">
                      {/* Top Glow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                      
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/10">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Radio className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 animate-pulse" />
                          <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            {t("Live Tracking Preview", "Live Tracking Preview")}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">ID: HLRS-2026-8842</span>
                      </div>

                      {/* Mini Timeline */}
                      <div className="space-y-2.5 sm:space-y-3 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[6px] sm:left-[7px] top-2 bottom-2 w-0.5 bg-slate-700/50" />
                        
                        {/* Step 1 */}
                        <div className="relative flex items-center gap-2.5 sm:gap-3">
                          <div className="relative z-10 flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500/20 border border-emerald-500">
                            <CheckCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-bold text-white">{t("Complaint Lodged", "Complaint Lodged")}</p>
                            <p className="text-[8px] sm:text-[10px] text-slate-400">{t("Completed", "E don complete")}</p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-center gap-2.5 sm:gap-3">
                          <div className="relative z-10 flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500/20 border border-emerald-500">
                            <CheckCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-bold text-white">{t("Payment Verified", "Payment Verified")}</p>
                            <p className="text-[8px] sm:text-[10px] text-slate-400">{t("Completed", "E don complete")}</p>
                          </div>
                        </div>

                        {/* Step 3 (Active) */}
                        <div className="relative flex items-center gap-2.5 sm:gap-3">
                          <div className="relative z-10 flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-amber-500/20 border border-amber-500">
                            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-400 animate-ping absolute" />
                            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-400 relative" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-bold text-amber-300">{t("Agent Assigned", "Agent Assigned")}</p>
                            <p className="text-[8px] sm:text-[10px] text-amber-400/70 animate-pulse">{t("Investigating...", "E dey investigate...")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ========================================== */}

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}