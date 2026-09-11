"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function LiveRecoveryToast() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mock Live Data (Fully Translated)
  const notifications = [
    {
      id: 1,
      title: t("iPhone 14 Pro Recovered", "iPhone 14 Pro Don Recover"),
      location: t("Wuse 2, Abuja", "Wuse 2, Abuja"),
      time: t("2 mins ago", "2 mins ago")
    },
    {
      id: 2,
      title: t("Land Dispute Resolved", "Land Dispute Don Resolve"),
      location: t("Lekki Phase 1, Lagos", "Lekki Phase 1, Lagos"),
      time: t("15 mins ago", "15 mins ago")
    },
    {
      id: 3,
      title: t("Stolen Vehicle Retrieved", "Stolen Vehicle Don Retrieve"),
      location: t("Garki, Abuja", "Garki, Abuja"),
      time: t("1 hour ago", "1 hour ago")
    },
    {
      id: 4,
      title: t("Missing Documents Found", "Missing Documents Don Find"),
      location: t("GRA, Port Harcourt", "GRA, Port Harcourt"),
      time: t("3 hours ago", "3 hours ago")
    }
  ];

  // Auto-rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true); // Fade in new one
      }, 500); // Wait for fade out animation
    }, 4500); // Change every 4.5 seconds

    return () => clearInterval(interval);
  }, [notifications.length]);

  const currentToast = notifications[currentIndex];

  return (
    // Positioned bottom-left on desktop, but slightly higher on mobile to avoid overlapping the AI Chat
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-6 md:right-auto z-40 md:max-w-sm">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentToast.id}
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-amber-200 dark:border-amber-800 rounded-2xl shadow-xl shadow-amber-500/10 dark:shadow-black/20"
          >
            {/* Icon */}
            <div className="flex-shrink-0 p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {currentToast.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3 w-3 flex-shrink-0 text-amber-500" />
                <span className="truncate">{currentToast.location}</span>
                <span className="flex items-center gap-1 flex-shrink-0">
                  <Clock className="h-3 w-3 text-amber-500" />
                  {currentToast.time}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}