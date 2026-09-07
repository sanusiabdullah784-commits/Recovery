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
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentToast.id}
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 p-4 bg-[#03313A]/80 backdrop-blur-xl border border-[#8FFFE0]/20 rounded-2xl shadow-2xl shadow-[#8FFFE0]/5 max-w-sm"
          >
            {/* Icon */}
            <div className="flex-shrink-0 p-2.5 bg-[#8FFFE0]/10 rounded-xl border border-[#8FFFE0]/20">
              <CheckCircle className="h-5 w-5 text-[#8FFFE0]" />
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {currentToast.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#8FFFE0]/70">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{currentToast.location}</span>
                <span className="flex items-center gap-1 flex-shrink-0">
                  <Clock className="h-3 w-3" />
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