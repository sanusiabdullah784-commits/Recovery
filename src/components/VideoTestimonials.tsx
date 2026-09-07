"use client";

import { motion } from "framer-motion";
import { Play, Clock, User, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function VideoTestimonials() {
  const { t } = useLanguage();

  const videos = [
    {
      name: "Chinedu Okafor",
      role: t("Vehicle Recovery", "Vehicle Recovery"),
      caseId: "HLRS-2026-8842",
      resolutionTime: t("5 Days", "5 Days"),
      duration: "2:15",
      quote: t("They got my car back in 5 days.", "Dem recover my car for just 5 days."),
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Aisha Bello",
      role: t("Land Dispute Resolution", "Land Dispute Resolution"),
      caseId: "HLRS-2026-9910",
      resolutionTime: t("14 Days", "14 Days"),
      duration: "3:42",
      quote: t("Saved my family's legacy.", "Dem save my family legacy."),
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      name: "Tunde Kingsley",
      role: t("Missing Documents", "Missing Documents"),
      caseId: "HLRS-2026-1104",
      resolutionTime: t("48 Hours", "48 Hours"),
      duration: "1:58",
      quote: t("Tracked down in 48 hours!", "Dem track am down for 48 hours!"),
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-blue-500/20">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {t("Real Stories, Real Results", "Real Stories, Real Results")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            {t("See the", "See the")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t("Impact", "Impact")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            {t("Watch our clients share their firsthand experiences with Homeland Recovery Service Ltd.", "Watch our clients share their firsthand experiences with Homeland Recovery Service Ltd.")}
          </p>
        </motion.div>

        {/* Video Grid - Mobile Optimized */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl shadow-blue-900/20 group-hover:border-blue-500/30 group-hover:shadow-blue-500/20 transition-all duration-500">
                
                {/* Thumbnail Image Area */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* ==========================================
                      3D HOLOGRAPHIC VERIFIED BADGE - Mobile Optimized
                      ========================================== */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-md border border-emerald-400/30 overflow-hidden shadow-lg shadow-emerald-500/10">
                      {/* Holographic Shimmer Sweep */}
                      <motion.div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                      />
                      
                      <div className="relative flex items-center gap-1.5 sm:gap-2 z-10">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                          <div className="relative w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 uppercase tracking-wider drop-shadow-md">
                          {t("Verified", "Verified")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  {/* ========================================== */}

                  {/* Top Right: Duration & Case ID - Mobile Optimized */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col items-end gap-1.5 sm:gap-2 z-20">
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                      <span className="text-[10px] sm:text-xs font-bold text-white">{video.duration}</span>
                    </div>
                    <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-blue-600/80 backdrop-blur-md border border-blue-400/30">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white tracking-wide">
                        {video.caseId}
                      </span>
                    </div>
                  </div>

                  {/* Glowing Play Button - Mobile Optimized */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
                      <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300">
                        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info - Mobile Optimized */}
                <div className="p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm">
                  <p className="text-xs sm:text-sm text-blue-300 font-medium italic mb-3 sm:mb-4 leading-snug">"{video.quote}"</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base text-white font-bold truncate">{video.name}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 truncate">{video.role}</p>
                      </div>
                    </div>
                    
                    {/* Resolution Time Badge - Mobile Optimized */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                        {t("Resolved in", "Resolved in")}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-cyan-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {video.resolutionTime}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}