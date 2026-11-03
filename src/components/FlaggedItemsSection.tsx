"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flag, AlertTriangle, MapPin, Calendar, ShieldAlert, Search, 
  FileText, User, Mail, Phone, Loader2, CheckCircle2, X 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function FlaggedItemsSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Modal & Form State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [reportForm, setReportForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    information: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Fetch Flagged Items from Supabase
  const [flaggedItems, setFlaggedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlaggedItems = async () => {
      const { data, error } = await supabase
        .from("flagged_items")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setFlaggedItems(data);
      }
      setLoading(false);
    };
    fetchFlaggedItems();
  }, []);

  const filters = ["All", "Active Alert", "Under Investigation", "Resolved"];

  // Helper to get status color dynamically
  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "active alert") return "bg-red-500/10 text-red-600 border-red-500/30";
    if (s === "under investigation") return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    if (s === "resolved") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
    return "bg-slate-500/10 text-slate-600 border-slate-500/30";
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  const filteredItems = flaggedItems.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // ✅ Handle Report Submission to Supabase
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("flagged_item_reports") // ⚠️ Ensure this table exists in Supabase!
        .insert({
          item_title: selectedItem.title,
          full_name: reportForm.fullName,
          email: reportForm.email,
          phone: reportForm.phone,
          information: reportForm.information,
          status: "pending"
        })
        .select();

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        setReportForm({ fullName: "", email: "", phone: "", information: "" });
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please check your connection or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 px-2"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 border border-red-200/50 bg-red-50/50 dark:bg-red-900/20 dark:border-red-800/50 backdrop-blur-md shadow-lg shadow-red-500/10">
            <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
            Flagged Items Database
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A secure registry of items currently under investigation, reported stolen, or involved in ownership disputes. 
            Help us maintain integrity by verifying before you buy.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8 sm:mb-12 px-2 sm:px-0"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by item name or location..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition-all text-sm sm:text-base shadow-sm" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  selectedFilter === filter 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg" 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-red-500 animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Loading flagged items...</p>
          </div>
        ) : (
          /* Premium Items Grid */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200/50 dark:hover:border-red-800/50 transition-all duration-300"
                >
                  {/* Top Accent Bar based on status */}
                  <div className={`h-1.5 w-full ${item.status === "Active Alert" ? "bg-red-500" : item.status === "Under Investigation" ? "bg-amber-500" : "bg-emerald-500"}`} />
                  
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border uppercase tracking-wider ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <Flag className="h-4 w-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.reason}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-3 flex-grow leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 mb-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>Flagged: {formatDate(item.created_at || item.date_flagged)}</span>
                      </div>
                    </div>

                    {/* Submit Information Button */}
                    <button 
                      onClick={() => {
                        setSelectedItem(item);
                        setIsReportModalOpen(true);
                        setIsSuccess(false);
                        setReportForm({ fullName: "", email: "", phone: "", information: "" });
                      }}
                      className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold rounded-xl border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm group/btn"
                    >
                      <FileText className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Submit Information
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-16 sm:py-20 px-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">No flagged items found</h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      {/* ==========================================
          PREMIUM "SUBMIT INFORMATION" MODAL
          ========================================== */}
      <AnimatePresence>
        {isReportModalOpen && selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsReportModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsReportModalOpen(false)} 
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="relative z-10 text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-rose-600 mb-4 shadow-lg shadow-red-500/20">
                  {isSuccess ? <CheckCircle2 className="h-7 w-7 text-white" /> : <ShieldAlert className="h-7 w-7 text-white" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {isSuccess ? "Information Submitted!" : "Submit Information"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-2">
                  {isSuccess 
                    ? "Thank you for helping us maintain integrity. Our team will review your submission shortly."
                    : `Provide any details or tips you have regarding: ${selectedItem.title}`
                  }
                </p>
              </div>

              {/* Form */}
              {!isSuccess ? (
                <form onSubmit={handleReportSubmit} className="relative z-10 space-y-4 mb-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      value={reportForm.fullName}
                      onChange={(e) => setReportForm({ ...reportForm, fullName: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      value={reportForm.email}
                      onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                      placeholder="Your Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="tel"
                      value={reportForm.phone}
                      onChange={(e) => setReportForm({ ...reportForm, phone: e.target.value })}
                      placeholder="Your Phone Number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      required
                      rows={3}
                      value={reportForm.information}
                      onChange={(e) => setReportForm({ ...reportForm, information: e.target.value })}
                      placeholder="Describe the information or tip you have..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="relative z-10 w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Information
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 text-center"
                >
                  <button 
                    onClick={() => { setIsReportModalOpen(false); setIsSuccess(false); }}
                    className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}