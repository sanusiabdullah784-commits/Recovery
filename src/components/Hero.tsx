"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Hash, Search, AlertCircle, Flag, Scale, Phone, ArrowRight, Lock, FileCheck, Headphones, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LiveRecoveryToast } from "@/components/LiveRecoveryToast";
import { GlobeBackground } from "@/components/GlobeBackground";

export function Hero() {
  const { t } = useLanguage();
  const router = useRouter();
  const [trackInput, setTrackInput] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      router.push(`/track`);
    }
  };

  const quickActions = [
    { href: "/track", label: t("action_track"), icon: Hash, bgColor: "bg-amber-500/10", iconColor: "text-amber-600", hoverGlow: "group-hover:shadow-amber-500/20", borderColor: "group-hover:border-amber-500/30" },
    { href: "/report", label: t("action_report"), icon: Search, bgColor: "bg-emerald-500/10", iconColor: "text-emerald-600", hoverGlow: "group-hover:shadow-emerald-500/20", borderColor: "group-hover:border-emerald-500/30" },
    { href: "/complaints", label: t("action_complaint"), icon: AlertCircle, bgColor: "bg-orange-500/10", iconColor: "text-orange-600", hoverGlow: "group-hover:shadow-orange-500/20", borderColor: "group-hover:border-orange-500/30" },
    { href: "/flagged", label: t("action_flagged"), icon: Flag, bgColor: "bg-red-500/10", iconColor: "text-red-600", hoverGlow: "group-hover:shadow-red-500/20", borderColor: "group-hover:border-red-500/30" },
    { href: "/legal-services", label: t("action_legal"), icon: Scale, bgColor: "bg-purple-500/10", iconColor: "text-purple-600", hoverGlow: "group-hover:shadow-purple-500/20", borderColor: "group-hover:border-purple-500/30" },
    { href: "/contact", label: t("action_contact"), icon: Phone, bgColor: "bg-slate-500/10", iconColor: "text-slate-600", hoverGlow: "group-hover:shadow-slate-500/20", borderColor: "group-hover:border-slate-500/30" },
  ];

  const trustBadges = [
    { icon: FileCheck, label: t("badge_cac") },
    { icon: Lock, label: t("badge_ndpr") },
    { icon: ShieldCheck, label: t("badge_ssl") },
    { icon: Headphones, label: t("badge_support") },
  ];

  const coreServices = [
    t("core_service_lost_found"),
    t("core_service_litigation"),
    t("core_service_arbitration"),
    t("core_service_adr"),
    t("core_service_odr")
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const line1 = t("hero_title_1");
  const line2 = t("hero_title_2");

  const companyNamePart1 = "HOMELAND RECOVERY";
  const companyNamePart2 = "SERVICES LTD";

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 px-3 sm:px-4 overflow-hidden min-h-screen flex items-center bg-white"
    >
      <GlobeBackground />

      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-amber-200/10 to-yellow-100/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-orange-200/10 to-amber-100/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(180, 140, 60, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 140, 60, 0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }} />

      <motion.div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-br from-amber-300/10 to-yellow-200/5 blur-[120px] pointer-events-none hidden md:block"
        style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        
        {/* ✅ PREMIUM "FALLING RAIN" CORE SERVICES SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 md:mb-14 px-2"
        >
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight"
          >
            {t("core_services_title")}
          </motion.h3>
          
          <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-xl mx-auto">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: -100, opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: 0.5 + index * 0.15 
                }}
                className="flex items-center gap-4 w-full justify-center group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform duration-300">
                  <Check className="h-4 w-4 text-white font-bold" strokeWidth={3} />
                </div>
                
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 text-left tracking-tight group-hover:text-amber-700 transition-colors duration-300">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.8, type: "spring" }} className="inline-flex items-center justify-center mb-6 md:mb-8">
          <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 backdrop-blur-xl rounded-full border border-amber-200/50 shadow-lg shadow-amber-500/5 flex items-center gap-2 sm:gap-3">
            <div className="p-1 sm:p-1.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full shadow-md shadow-amber-500/30">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-amber-900 whitespace-nowrap">
              {t("hero_badge")}
            </span>
          </div>
        </motion.div>

        <div className="mb-4 md:mb-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 mb-1">
            {companyNamePart1.split("").map((char, i) => (
              <motion.span 
                key={`hr-${i}`} 
                initial={{ y: -150, opacity: 0, filter: "blur(10px)" }} 
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} 
                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.8 + i * 0.02 }} 
                className="inline-block text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-[0.1em] text-slate-900"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2">
            {companyNamePart2.split("").map((char, i) => (
              <motion.span 
                key={`sl-${i}`} 
                initial={{ y: -150, opacity: 0, filter: "blur(10px)" }} 
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} 
                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 1.3 + i * 0.02 }} 
                className="inline-block text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-[0.1em] bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1, delay: 1.9, ease: "easeOut" }}
            className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4 rounded-full origin-center" 
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6 leading-[1.1]">
          <div className="overflow-hidden mb-1 md:mb-2">
            {line1.split("").map((char, i) => (
              <motion.span key={`l1-${i}`} initial={{ y: -150, opacity: 0, filter: "blur(10px)", rotate: Math.random() * 10 - 5 }} animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 2.1 + i * 0.025 }} className="inline-block text-slate-900 drop-shadow-sm" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {line2.split("").map((char, i) => (
              <motion.span key={`l2-${i}`} initial={{ y: -150, opacity: 0, filter: "blur(10px)", rotate: Math.random() * 10 - 5 }} animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 2.5 + i * 0.04 }} className="inline-block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,169,56,0.3)]" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3.1 }} className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
          {t("hero_subtitle")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-10 px-2"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -2, borderColor: "rgba(217, 169, 56, 0.4)" }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-amber-50/50 border border-amber-200/30 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="w-full max-w-2xl mx-auto mb-8 md:mb-12 px-2"
        >
          <form onSubmit={handleTrackSubmit} className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-xl border border-amber-200/40 rounded-2xl shadow-xl shadow-amber-500/5 focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all duration-300">
            <div className="relative flex-grow">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-amber-600/50" />
              <input
                type="text"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder={t("hero_search_placeholder")}
                className="w-full pl-9 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base font-medium"
              />
            </div>
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-white font-extrabold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 text-sm sm:text-base whitespace-nowrap"
            >
              {t("hero_search_button")}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-2 sm:mt-3 flex items-center justify-center gap-1.5 px-2">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
            {t("hero_search_note")}
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 w-full max-w-4xl mx-auto perspective-[1000px] px-2">
          {quickActions.map((action) => (
            <motion.div key={action.label} variants={cardVariants} whileHover={{ y: -10, scale: 1.03, rotateX: 5, rotateY: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }} whileTap={{ scale: 0.97 }} className="group cursor-pointer">
              <Link href={action.href} className="block h-full">
                <div className={`flex flex-col items-center justify-center p-4 sm:p-8 bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-200/50 shadow-xl transition-all duration-300 h-full ${action.hoverGlow} ${action.borderColor} group-hover:shadow-lg group-hover:bg-white`}>
                  <div className={`p-3 sm:p-5 rounded-lg sm:rounded-xl mb-3 sm:mb-5 ${action.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <action.icon className={`h-6 w-6 sm:h-10 sm:w-10 ${action.iconColor} transition-colors duration-300`} />
                  </div>
                  <span className="text-sm sm:text-lg md:text-xl font-extrabold text-slate-900 text-center transition-colors duration-300 group-hover:text-amber-700 leading-tight">{action.label}</span>
                  <div className="mt-3 sm:mt-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mx-auto shadow-[0_0_10px_rgba(217,169,56,0.5)]" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LiveRecoveryToast />
    </section>
  );
}