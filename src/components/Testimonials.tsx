"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "Chinedu Okafor",
      role: t("Recovered Stolen Vehicle", "Dem Recover Im Stolen Vehicle"),
      text: t(
        "Homeland Recovery helped me get my car back in just 5 days. Their legal team was exceptional and kept me updated every step of the way. Truly world-class service!",
        "Homeland Recovery help me get my car back for just 5 days. Their legal team too sharp and dem keep me updated every step of the way. Truly world-class service!"
      ),
      rating: 5
    },
    {
      name: "Aisha Bello",
      role: t("Resolved Land Dispute", "Dem Resolve Land Dispute"),
      text: t(
        "The mediation service was professional, fast, and incredibly fair. I highly recommend their legal experts to anyone facing property conflicts. They saved my family's legacy.",
        "The mediation service professional, e fast, and e fair well well. I highly recommend their legal experts to anybody wey dey face property wahala. Dem save my family legacy."
      ),
      rating: 5
    },
    {
      name: "Tunde Kingsley",
      role: t("Found Missing Documents", "Dem Find Missing Documents"),
      text: t(
        "I lost my property documents and thought they were gone forever. The team tracked them down in 48 hours! The HLRS tracking system gave me total peace of mind.",
        "I lose my property documents and I think say dem don gone forever. The team track am down for 48 hours! The HLRS tracking system give me total peace of mind."
      ),
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-rose-950/20 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-rose-200 dark:border-rose-800">
            {t("Community Voices", "Wetin Dem Dey Talk")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            {t("Community", "Community")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-fuchsia-600">{t("Voices", "Voices")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            {t(
              "Don't just take our word for it. Hear from the thousands of individuals and businesses we have successfully helped recover what matters most.",
              "No just take our word for am. Hear from thousands of people and businesses wey we don help recover wetin matter pass to dem."
            )}
          </p>
        </motion.div>

        {/* Reviews Grid with 3D Staggered Animation - Mobile Optimized */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 perspective-[1000px]"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02, 
                rotateX: 4, 
                rotateY: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="h-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-200 dark:hover:border-rose-800/50 transition-all duration-300">
                
                {/* Large Background Quote Icon - Mobile Optimized */}
                <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 sm:h-12 sm:w-12 text-rose-100 dark:text-rose-900/30 -z-0" />

                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Stars - Mobile Optimized */}
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-rose-500 text-rose-500" />
                    ))}
                  </div>
                  
                  {/* Review Text - Mobile Optimized */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-8 italic flex-grow">
                    "{review.text}"
                  </p>
                  
                  {/* User Info - Mobile Optimized */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base text-slate-900 dark:text-white font-bold leading-tight">{review.name}</h4>
                      <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{review.role}</p>
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