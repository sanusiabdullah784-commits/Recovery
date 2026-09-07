"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Hash, Search, AlertCircle, Flag, Scale, Phone, ArrowRight, Lock, FileCheck, Headphones } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LiveRecoveryToast } from "@/components/LiveRecoveryToast";

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
    { href: "/track", label: t("Reference ID", "Reference ID"), icon: Hash, bgColor: "bg-blue-500/20", iconColor: "text-blue-400", hoverGlow: "group-hover:shadow-blue-500/30" },
    { href: "/report", label: t("Found/Report", "Find/Report"), icon: Search, bgColor: "bg-emerald-500/20", iconColor: "text-emerald-400", hoverGlow: "group-hover:shadow-emerald-500/30" },
    { href: "/complaints", label: t("Lost/Complaint", "Lost/Complain"), icon: AlertCircle, bgColor: "bg-amber-500/20", iconColor: "text-amber-400", hoverGlow: "group-hover:shadow-amber-500/30" },
    { href: "/flagged", label: t("Flagged Items", "Flagged Items"), icon: Flag, bgColor: "bg-red-500/20", iconColor: "text-red-400", hoverGlow: "group-hover:shadow-red-500/30" },
    { href: "/legal-services", label: t("Legal Services", "Legal Services"), icon: Scale, bgColor: "bg-purple-500/20", iconColor: "text-purple-400", hoverGlow: "group-hover:shadow-purple-500/30" },
    { href: "/contact", label: t("Contact", "Contact Us"), icon: Phone, bgColor: "bg-[#8FFFE0]/20", iconColor: "text-[#8FFFE0]", hoverGlow: "group-hover:shadow-[#8FFFE0]/30" },
  ];

  const trustBadges = [
    { icon: FileCheck, label: t("CAC Registered: RC 9578175", "CAC Registered: RC 9578175") },
    { icon: Lock, label: t("NDPR Data Compliant", "NDPR Data Compliant") },
    { icon: ShieldCheck, label: t("256-Bit Secure Encryption", "256-Bit Secure Encryption") },
    { icon: Headphones, label: t("24/7 Verified Support", "24/7 Verified Support") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const line1 = t("Recover What's", "Recover Wetin");
  const line2 = t("Lost.", "You Don Lose.");

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 px-3 sm:px-4 overflow-hidden min-h-screen flex items-center bg-[#03313A]"
    >
      <div className="absolute inset-0 -z-30 bg-[#03313A]" />
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8FFFE0]/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#8FFFE0]/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[120px] animate-pulse delay-700" />
      <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[120px] animate-pulse delay-500" />

      <div className="absolute inset-0 -z-20 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(143, 255, 224, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(143, 255, 224, 0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }} />

      <motion.div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#8FFFE0]/15 blur-[120px] pointer-events-none hidden md:block"
        style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        
        {/* Top Badge - Mobile Optimized */}
        <motion.div initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.8, type: "spring" }} className="inline-flex items-center justify-center mb-6 md:mb-8">
          <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#8FFFE0]/5 backdrop-blur-xl rounded-full border border-[#8FFFE0]/20 shadow-2xl shadow-[#8FFFE0]/5 flex items-center gap-2 sm:gap-3">
            <div className="p-1 sm:p-1.5 bg-gradient-to-br from-[#8FFFE0] to-cyan-400 rounded-full shadow-md shadow-[#8FFFE0]/30">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-[#03313A]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#8FFFE0] whitespace-nowrap">
              {t("Global Leaders in Secure Recovery", "The Number One Place for Secure Recovery")}
            </span>
          </div>
        </motion.div>

        {/* Heading - Mobile Optimized */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-4 md:mb-6 leading-[1.1]">
          <div className="overflow-hidden mb-1 md:mb-2">
            {line1.split("").map((char, i) => (
              <motion.span key={`l1-${i}`} initial={{ y: -150, opacity: 0, filter: "blur(10px)", rotate: Math.random() * 10 - 5 }} animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 + i * 0.025 }} className="inline-block text-white drop-shadow-lg" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {line2.split("").map((char, i) => (
              <motion.span key={`l2-${i}`} initial={{ y: -150, opacity: 0, filter: "blur(10px)", rotate: Math.random() * 10 - 5 }} animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.6 + i * 0.04 }} className="inline-block text-[#8FFFE0] drop-shadow-[0_0_15px_rgba(143,255,224,0.3)]" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subtitle - Mobile Optimized */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="text-sm sm:text-base md:text-lg lg:text-xl text-[#8FFFE0]/80 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
          {t("The secure, verified, and fastest way to recover your lost property and resolve disputes in Nigeria and across the globe.", "The most secure, verified, and fastest way to recover your lost property and solve any wahala for Nigeria and across the globe.")}
        </motion.p>

        {/* Trust Badges - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-10 px-2"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -2, borderColor: "rgba(143, 255, 224, 0.4)" }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#8FFFE0]/5 border border-[#8FFFE0]/10 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#8FFFE0]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#8FFFE0]/90 whitespace-nowrap">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="w-full max-w-2xl mx-auto mb-8 md:mb-12 px-2"
        >
          <form onSubmit={handleTrackSubmit} className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3 bg-[#03313A]/60 backdrop-blur-xl border border-[#8FFFE0]/20 rounded-2xl shadow-2xl shadow-[#8FFFE0]/5 focus-within:border-[#8FFFE0]/50 focus-within:ring-2 focus-within:ring-[#8FFFE0]/20 transition-all duration-300">
            <div className="relative flex-grow">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#8FFFE0]/50" />
              <input
                type="text"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder={t("Enter your HLRS Tracking ID (e.g., HLRS-2026-001)", "Enter your HLRS Tracking ID (e.g., HLRS-2026-001)")}
                className="w-full pl-9 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-transparent border-none text-white placeholder:text-[#8FFFE0]/40 focus:outline-none focus:ring-0 text-sm sm:text-base"
              />
            </div>
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#8FFFE0] hover:bg-[#7ae6cb] text-[#03313A] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#8FFFE0]/20 text-sm sm:text-base whitespace-nowrap"
            >
              {t("Track Now", "Track Am Now")}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
          <p className="text-xs sm:text-sm text-[#8FFFE0]/50 mt-2 sm:mt-3 flex items-center justify-center gap-1.5 px-2">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {t("Already have a Tracking ID? Enter it above to check your case status instantly.", "You get Tracking ID? Enter am above to check your case status sharp sharp.")}
          </p>
        </motion.div>

        {/* Quick Actions Grid - Mobile Optimized */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 w-full max-w-4xl mx-auto perspective-[1000px] px-2">
          {quickActions.map((action) => (
            <motion.div key={action.label} variants={cardVariants} whileHover={{ y: -10, scale: 1.03, rotateX: 5, rotateY: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }} whileTap={{ scale: 0.97 }} className="group cursor-pointer">
              <Link href={action.href} className="block h-full">
                <div className={`flex flex-col items-center justify-center p-3 sm:p-6 bg-[#8FFFE0]/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-[#8FFFE0]/10 shadow-2xl transition-all duration-300 h-full ${action.hoverGlow} group-hover:shadow-[#8FFFE0]/10 group-hover:border-[#8FFFE0]/30 group-hover:bg-[#8FFFE0]/10`}>
                  <div className={`p-2 sm:p-3.5 rounded-lg sm:rounded-xl mb-2 sm:mb-4 ${action.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <action.icon className={`h-5 w-5 sm:h-8 sm:w-8 ${action.iconColor} transition-colors duration-300 group-hover:text-[#8FFFE0]`} />
                  </div>
                  <span className="text-xs sm:text-base md:text-lg font-bold text-white text-center transition-colors duration-300 group-hover:text-[#8FFFE0] leading-tight">{action.label}</span>
                  <div className="mt-2 sm:mt-3 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="h-1 w-6 sm:w-8 bg-[#8FFFE0] rounded-full mx-auto shadow-[0_0_10px_#8FFFE0]" />
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