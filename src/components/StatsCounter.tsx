"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Package, Users, TrendingUp, MapPin, Building2, Shield, Landmark, Globe, Briefcase, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Custom hook for smooth number counting
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); 
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

function StatCard({ icon, endValue, suffix, label, delay }: { 
  icon: React.ReactNode; 
  endValue: number; 
  suffix: string; 
  label: string; 
  delay: number 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(smoothY, [0, 300], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 300], [-4, 4]);

  const background = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(245, 158, 11, 0.15), transparent 40%)`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(endValue, 2500, isInView);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300 overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: "translateZ(20px)" }}>
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-950/80 border border-zinc-800 mb-4 sm:mb-6 group-hover:scale-110 group-hover:border-amber-500/30 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-500">
          <div className="text-amber-400">{icon}</div>
        </div>
        
        <div className="flex items-baseline gap-1 mb-1 sm:mb-2">
          <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400">
            {suffix}
          </span>
        </div>
        
        <p className="text-[10px] sm:text-sm md:text-base text-zinc-400 font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  const { t } = useLanguage();

  // All endValues reset to 0 as requested
  const stats = [
    { icon: <Package className="h-5 w-5 sm:h-6 sm:w-6" />, endValue: 0, suffix: "+", label: t("Items Recovered", "Items Recovered"), delay: 0.1 },
    { icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />, endValue: 0, suffix: "+", label: t("Happy Clients", "Happy Clients"), delay: 0.2 },
    { icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />, endValue: 0, suffix: "%", label: t("Success Rate", "Success Rate"), delay: 0.3 },
    { icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />, endValue: 0, suffix: "+", label: t("States Covered", "States Covered"), delay: 0.4 },
  ];

  // Trusted By Partner Data (Using elegant icons as premium logo placeholders)
  const partners = [
    { icon: <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Leading Insurers", "Leading Insurers") },
    { icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Security Agencies", "Security Agencies") },
    { icon: <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Corporate Legal Firms", "Corporate Legal Firms") },
    { icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Global Logistics", "Global Logistics") },
    { icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Financial Institutions", "Financial Institutions") },
    { icon: <Home className="h-5 w-5 sm:h-6 sm:w-6" />, name: t("Real Estate Developers", "Real Estate Developers") },
  ];

  // Duplicate for seamless infinite scroll
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-zinc-900 to-black transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-amber-500/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-amber-500/20">
            {t("Proven Track Record", "Proven Track Record")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            {t("Trusted by", "Trusted by")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t("Thousands", "Thousands")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2">
            {t(
              "Our numbers speak for themselves. We are the most trusted recovery service in the region, delivering results when it matters most.",
              "Our numbers dey talk for us. We be the most trusted recovery service for the region, we dey deliver results when e matter pass."
            )}
          </p>
        </motion.div>

        {/* Stats Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-2" style={{ perspective: "1000px" }}>
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* ==========================================
            "TRUSTED BY" LOGO MARQUEE
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-24"
        >
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {t("Trusted & Partnered With", "Trusted & Partnered With")}
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            {/* Fade edges for seamless blend */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <motion.div 
              className="flex gap-4 sm:gap-8 w-max"
              animate={{ x: ["0%", "-33.333%"] }} // Moves exactly 1/3 of the way (the length of one set of partners)
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }} // 30s for a smooth, dignified scroll
              whileHover={{ animationPlayState: "paused" }} // Optional: pauses on hover (works best with CSS, but Framer handles it gracefully)
            >
              {marqueeItems.map((partner, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-800/50 transition-all duration-300 group cursor-default"
                >
                  <div className="text-zinc-500 group-hover:text-amber-400 transition-colors duration-300">
                    {partner.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        {/* ========================================== */}

      </div>
    </section>
  );
}