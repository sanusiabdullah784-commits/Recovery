"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ✅ UPDATE THESE: Replace the 'src' with the actual names of the 6 images you put in your public folder.
// If your images are PNGs, change .jpg to .png
const teamMembers = [
  { id: 1, name: "Team Member 1", role: "Executive Director", src: "/team1.jpg" },
  { id: 2, name: "Team Member 2", role: "Head of Operations", src: "/team2.jpg" },
  { id: 3, name: "Team Member 3", role: "Legal Counsel", src: "/team3.jpg" },
  { id: 4, name: "Team Member 4", role: "Security Lead", src: "/team4.jpg" },
  { id: 5, name: "Team Member 5", role: "Recovery Specialist", src: "/team5.jpg" },
  { id: 6, name: "Team Member 6", role: "Client Relations", src: "/team6.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export function TeamSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-bold mb-4">
            Our Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Meet The <span className="text-amber-600">Expert Team</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The dedicated professionals behind Homeland Recovery Services Ltd, committed to securing your assets and resolving disputes.
          </p>
        </motion.div>

        {/* Team Grid (6 Images) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-700">
                <Image 
                  src={member.src} 
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Name & Role on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight mb-1">{member.name}</h3>
                  <p className="text-xs sm:text-sm text-amber-400 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}