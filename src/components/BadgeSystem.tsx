"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Star, Crown, Sparkles, Check, Lock } from "lucide-react";

// ==========================================
// 3D HOLOGRAPHIC BADGE CARD COMPONENT
// ==========================================
function BadgeCard({ badge, index }: { badge: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(smoothY, [0, 250], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 250], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(125);
    mouseY.set(125);
  };

  // Calculate progress percentage
  const progressPercentage = Math.min((badge.current / badge.target) * 100, 100);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: -30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="group relative cursor-pointer"
    >
      <div className="h-full bg-white dark:bg-slate-900 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden">
        
        {/* Holographic Shimmer Effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-200/40 dark:via-amber-200/15 to-transparent skew-x-12 pointer-events-none z-20"
          initial={{ x: "-150%" }}
          whileHover={{ x: "150%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

        {/* Content with 3D depth */}
        <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(30px)" }}>
          
          {/* Status Icon (Check or Lock) */}
          <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center shadow-md ${
            badge.isUnlocked 
              ? "bg-amber-500 shadow-amber-500/40" 
              : "bg-slate-300 dark:bg-slate-700 shadow-slate-500/20"
          }`}>
            {badge.isUnlocked ? (
              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" strokeWidth={3} />
            ) : (
              <Lock className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white" strokeWidth={3} />
            )}
          </div>

          {/* Badge Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${badge.color} text-white mb-3 sm:mb-4 shadow-lg ${badge.glow} group-hover:scale-110 transition-transform duration-300 ${!badge.isUnlocked ? 'opacity-70 grayscale-[20%]' : ''}`}>
            {badge.icon}
          </div>

          {/* Badge Title */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
            {badge.title}
          </h3>
          
          {/* Badge Description */}
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 sm:mb-4">
            {badge.description}
          </p>

          {/* ==========================================
              GAMIFIED PROGRESS INDICATOR
              ========================================== */}
          <div className="w-full mt-auto">
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 sm:mb-1.5 uppercase tracking-wider">
              <span>{badge.isUnlocked ? "Mastered" : "Progress"}</span>
              <span className="tabular-nums">{badge.current} / {badge.target}</span>
            </div>
            
            {/* Progress Bar Track */}
            <div className="w-full h-1 sm:h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
              {/* Animated Progress Fill */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 + index * 0.1 }}
                className={`h-full rounded-full bg-gradient-to-r ${badge.color} shadow-sm`}
              />
            </div>
          </div>
          {/* ========================================== */}

        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN BADGE SYSTEM SECTION
// ==========================================
export function BadgeSystem() {
  const badges = [
    {
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Good Samaritan",
      description: "Helped recover 5+ items",
      color: "from-amber-400 to-yellow-500",
      glow: "shadow-amber-500/30",
      current: 5,
      target: 5,
      isUnlocked: true
    },
    {
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Trusted Helper",
      description: "Verified by 10+ users",
      color: "from-yellow-500 to-amber-600",
      glow: "shadow-yellow-500/30",
      current: 7,
      target: 10,
      isUnlocked: false
    },
    {
      icon: <Star className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Community Star",
      description: "Top 10 helper this month",
      color: "from-amber-500 to-yellow-600",
      glow: "shadow-amber-500/30",
      current: 8,
      target: 10,
      isUnlocked: false
    },
    {
      icon: <Crown className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Recovery Champion",
      description: "Helped recover 50+ items",
      color: "from-yellow-400 to-amber-500",
      glow: "shadow-yellow-500/30",
      current: 50,
      target: 50,
      isUnlocked: true
    },
    {
      icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Legend",
      description: "Helped recover 100+ items",
      color: "from-amber-500 to-amber-700",
      glow: "shadow-amber-500/30",
      current: 42,
      target: 100,
      isUnlocked: false
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-amber-500/20">
            Rewards & Recognition
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">Heroes</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            Earn exclusive badges and recognition for helping others recover their lost items and resolving disputes.
          </p>
        </motion.div>

        {/* Badges Grid with 3D Perspective - 1 col mobile, 2 col sm, 3 col md, 5 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 px-2" style={{ perspective: "1000px" }}>
          {badges.map((badge, index) => (
            <BadgeCard key={index} badge={badge} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}