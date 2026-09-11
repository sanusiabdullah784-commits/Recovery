"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, CheckCircle, Clock, ShieldCheck, Loader2, ArrowRight, MessageCircle, BadgeCheck, Zap, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function TrackSection() {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [trackData, setTrackData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackingId.trim().toUpperCase();
    if (!cleanId) return;
    
    setIsLoading(true);
    setShowResult(false);
    setError("");
    setTrackData(null);
    
    try {
      let data = null;
      let type = "";

      if (cleanId.startsWith("HLRS")) {
        const { data: complaintData, error: compError } = await supabase
          .from("complaints")
          .select("*")
          .eq("tracking_id", cleanId)
          .single();
        if (compError && compError.code !== "PGRST116") throw compError;
        data = complaintData;
        type = "complaint";
      } else if (cleanId.startsWith("FR")) {
        const { data: foundData, error: foundError } = await supabase
          .from("found_items")
          .select("*")
          .eq("tracking_id", cleanId)
          .single();
        if (foundError && foundError.code !== "PGRST116") throw foundError;
        data = foundData;
        type = "found";
      } else {
        setError(t("Invalid Tracking ID format. Must start with HLRS or FR.", "Tracking ID format no correct. E must start with HLRS or FR."));
        setIsLoading(false);
        return;
      }

      if (!data) {
        setError(t("No records found for this Tracking ID. Please check and try again.", "We no see any record for this Tracking ID. Abeg check am well make you try again."));
      } else {
        setTrackData({ ...data, type });
        setShowResult(true);
      }
    } catch (err: any) {
      console.error("Tracking error:", err);
      setError(t("An error occurred while fetching your case. Please try again.", "Error don occur while we dey fetch your case. Abeg try again."));
    } finally {
      setIsLoading(false);
    }
  };

  const getTimelineSteps = (data: any) => {
    const dateStr = new Date(data.created_at).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
    
    if (data.type === "complaint") {
      const isResolved = data.status === "resolved" || data.status === "cancelled";
      const isActive = data.status === "in_progress" || data.status === "pending";
      return [
        { title: t("Complaint Lodged", "Complaint Lodged"), date: dateStr, status: "completed", icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Verification & Payment", "Verification & Payment"), date: dateStr, status: "completed", icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Investigation Active", "Investigation Active"), date: isActive ? t("Currently in progress...", "E dey progress now...") : dateStr, status: isActive ? "active" : (isResolved ? "completed" : "pending"), icon: <Search className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Recovery & Resolution", "Recovery & Resolution"), date: isResolved ? t("Resolved", "E don resolve") : t("Pending", "E still dey pending"), status: isResolved ? "completed" : "pending", icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" /> },
      ];
    } else {
      const isClaimed = data.status === "claimed" || data.status === "archived";
      const isMatched = data.status === "matched";
      return [
        { title: t("Item Reported", "Item Reported"), date: dateStr, status: "completed", icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Verification & Secure Storage", "Verification & Secure Storage"), date: dateStr, status: "completed", icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Owner Matching Active", "Owner Matching Active"), date: isMatched ? t("Owner Identified", "Dem don find owner") : t("Searching database...", "We dey search database..."), status: (isMatched || data.status === "pending") ? "active" : (isClaimed ? "completed" : "pending"), icon: <Search className="h-4 w-4 sm:h-5 sm:w-5" /> },
        { title: t("Item Claimed & Commission Processed", "Item Claimed & Commission Processed"), date: isClaimed ? t("Completed", "E don complete") : t("Pending", "E still dey pending"), status: isClaimed ? "completed" : "pending", icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> },
      ];
    }
  };

  const timelineSteps = trackData ? getTimelineSteps(trackData) : [];
  const activeIndex = timelineSteps.findIndex(step => step.status === "active");
  const progressPercentage = activeIndex !== -1 ? (activeIndex / (timelineSteps.length - 1)) * 100 : (trackData?.status === 'resolved' || trackData?.status === 'claimed' ? 100 : 0);

  return (
    <section className="relative min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-24 px-3 sm:px-4 flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Subtle gold grid pattern */}
      <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(217, 169, 56, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 169, 56, 0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }} />
      {/* Gold glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-amber-200/50 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl shadow-amber-900/5 dark:shadow-black/20 p-6 sm:p-8 md:p-12"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[200px] sm:h-[400px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-full mb-4 sm:mb-6 border border-amber-200 dark:border-amber-800 shadow-sm">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4 px-2">
              {t("Track Your Case", "Track Your Case")}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 sm:mb-10 px-2 leading-relaxed">
              {t("Enter your unique HLRS or FR Tracking ID to see the real-time status of your case.", "Enter your unique HLRS or FR Tracking ID to see the real-time status of your case.")}
            </motion.p>

            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onSubmit={handleTrack} className="w-full max-w-lg flex flex-col sm:flex-row gap-3 mb-8 px-2 sm:px-0">
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                <input 
                  type="text" 
                  value={trackingId} 
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())} 
                  placeholder={t("e.g., HLRS-2026-001 or FR-2026-001", "e.g., HLRS-2026-001 or FR-2026-001")} 
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 text-sm sm:text-base shadow-sm" 
                />
              </div>
              <button type="submit" disabled={isLoading} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-xl shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px] text-sm sm:text-base">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{t("Track Now", "Track Am")}<ArrowRight className="h-5 w-5" /></>}
              </button>
            </motion.form>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full max-w-lg text-center px-2 sm:px-0 mb-8">
                  <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                    <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-red-600 mb-1">{t("Tracking ID Not Found", "Tracking ID No Dey")}</h3>
                    <p className="text-sm text-red-600/80">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Result State */}
            <AnimatePresence>
              {showResult && trackData && (
                <motion.div initial={{ opacity: 0, height: 0, y: 20 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full max-w-lg text-left overflow-hidden px-2 sm:px-0">
                  <div className="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl border border-amber-200/50 dark:border-slate-800 p-5 sm:p-6 relative overflow-hidden shadow-lg shadow-amber-900/5 dark:shadow-black/20">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20" />
                    
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className={`relative flex h-2.5 w-2.5 ${trackData.status === 'resolved' || trackData.status === 'claimed' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current ring-2 ring-current/30"></span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          {trackData.type === 'complaint' ? t("Case Status", "Case Status") : t("Report Status", "Report Status")}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 capitalize">
                        {trackData.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Dynamic Info Card */}
                    {trackData.type === 'complaint' ? (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop" alt="Agent" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-amber-500 shadow-sm" />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border-[2.5px] border-white dark:border-slate-900 shadow-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider truncate">{t("Assigned Agent", "Assigned Agent")}</p>
                            <BadgeCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate leading-tight">Barr. Chinedu Okafor</h4>
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{t("Senior Recovery Specialist", "Senior Recovery Specialist")} • {t("Active", "Active")}</p>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0 p-2.5 sm:p-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-white shadow-sm hover:shadow-md transition-all" aria-label="Message Agent">
                          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4 text-amber-600 dark:text-amber-400" /> {t("Report Details", "Report Details")}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t("Category", "Category")}:</span>
                            <span className="font-semibold text-slate-900 dark:text-white text-right">{trackData.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t("Location", "Location")}:</span>
                            <span className="font-semibold text-slate-900 dark:text-white text-right">{trackData.location_found}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t("Reported By", "Reported By")}:</span>
                            <span className="font-semibold text-slate-900 dark:text-white text-right">{trackData.is_anonymous ? t("Anonymous", "Anonymous") : trackData.full_name}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Resolution Confidence Meter (Only for Complaints) */}
                    {trackData.type === 'complaint' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-slate-700/50 shadow-inner relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{t("Resolution Confidence", "Resolution Confidence")}</span>
                            </div>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-lg sm:text-xl font-extrabold text-amber-500 tabular-nums">
                              {trackData.status === 'resolved' ? '100' : '85'}%
                            </motion.span>
                          </div>
                          <div className="w-full h-2 sm:h-2.5 bg-slate-700/50 rounded-full overflow-hidden mb-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${trackData.status === 'resolved' ? 100 : 85}%` }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                              className="h-full bg-amber-500 rounded-full relative shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                            >
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                            </motion.div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-amber-500">{trackData.status === 'resolved' ? t("Resolved", "E don resolve") : t("High Probability", "High Probability")}</span>
                            <span className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-right">{trackData.status === 'resolved' ? t("Case Closed", "Case don close") : t("Estimated completion within 48 hours", "E go finish within 48 hours")}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Dynamic Timeline */}
                    <div className="relative pl-2 sm:pl-4 space-y-6 sm:space-y-8">
                      <div className="absolute left-[19px] sm:left-[23px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800">
                        <motion.div initial={{ height: 0 }} animate={{ height: `${progressPercentage}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="w-full bg-amber-500 rounded-full" />
                      </div>

                      {timelineSteps.map((step, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (index * 0.15) }} className="relative flex items-start gap-3 sm:gap-4">
                          <div className={`relative z-10 flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${
                            step.status === "completed" 
                              ? "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400" 
                              : step.status === "active" 
                                ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30" 
                                : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400"
                          }`}>
                            {step.status === "active" && <span className="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-20" />}
                            {step.icon}
                          </div>
                          <div className="pt-1.5 sm:pt-2 flex-1 min-w-0">
                            <h4 className={`font-bold text-sm sm:text-base break-words ${step.status === "completed" || step.status === "active" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{step.title}</h4>
                            <p className={`text-xs sm:text-sm mt-0.5 break-words ${step.status === "active" ? "text-amber-600 dark:text-amber-400 font-medium" : step.status === "completed" ? "text-slate-500 dark:text-slate-400" : "text-slate-400"}`}>{step.date}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}