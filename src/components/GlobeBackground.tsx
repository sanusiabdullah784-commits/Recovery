"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function GlobeBackground() {
  const globeRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for interactive 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!globeRef.current) return;
    const rect = globeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const x = (e.clientX - centerX) / 20;
    const y = (e.clientY - centerY) / 20;
    
    mouseX.set(x);
    mouseY.set(-y); // Invert Y for natural tilt
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={globeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      style={{ perspective: "1000px" }}
    >
      {/* Soft Glow Behind Globe */}
      <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-amber-200/20 to-yellow-100/10 rounded-full blur-[100px] sm:blur-[150px]" />

      {/* 3D Globe Container */}
      <motion.div
        className="relative w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX: smoothY,
          rotateY: smoothX,
        }}
      >
        {/* Wireframe Rings (Latitude & Longitude) */}
        {[0, 30, 60, 90].map((rotate, i) => (
          <motion.div
            key={`ring-x-${i}`}
            className="absolute inset-0 rounded-full border border-amber-200/20"
            style={{ transform: `rotateX(${rotate}deg)` }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {[0, 30, 60, 90].map((rotate, i) => (
          <motion.div
            key={`ring-y-${i}`}
            className="absolute inset-0 rounded-full border border-amber-200/20"
            style={{ transform: `rotateY(${rotate}deg)` }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Outer Equator Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]" />

        {/* Glowing Recovery Nodes (Simulating Active Cases) */}
        {/* Node 1: North America */}
        <motion.div 
          className="absolute top-[30%] left-[25%] w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Node 2: Europe */}
        <motion.div 
          className="absolute top-[25%] right-[35%] w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Node 3: Africa (Nigeria - Main Hub) */}
        <motion.div 
          className="absolute top-[55%] left-[50%] w-4 h-4 sm:w-5 sm:h-5 bg-amber-600 rounded-full shadow-[0_0_20px_rgba(217,119,6,0.9)] z-10"
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Node 4: Asia */}
        <motion.div 
          className="absolute top-[40%] right-[20%] w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Node 5: South America */}
        <motion.div 
          className="absolute bottom-[30%] left-[35%] w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100">
          <motion.path 
            d="M 25 30 Q 50 10 65 25" 
            fill="none" 
            stroke="url(#gold-gradient)" 
            strokeWidth="0.2" 
            strokeDasharray="2 2"
            animate={{ strokeDashoffset: [0, -4] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M 65 25 Q 75 40 50 55" 
            fill="none" 
            stroke="url(#gold-gradient)" 
            strokeWidth="0.2" 
            strokeDasharray="2 2"
            animate={{ strokeDashoffset: [0, -4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M 50 55 Q 30 70 35 70" 
            fill="none" 
            stroke="url(#gold-gradient)" 
            strokeWidth="0.2" 
            strokeDasharray="2 2"
            animate={{ strokeDashoffset: [0, -4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}