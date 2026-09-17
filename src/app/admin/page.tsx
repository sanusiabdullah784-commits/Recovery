"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FileText, Package, CheckCircle, Clock, 
  AlertTriangle, TrendingUp, RefreshCw, ShieldCheck, 
  BarChart3, Sun, Moon, Eye, X, MapPin, Calendar, 
  User, Mail, Phone, Image as ImageIcon, CreditCard,
  Search, Filter, XCircle, Activity, Zap, Briefcase
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "@/context/LanguageContext";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// UTILITY: Time Ago Formatter
// ==========================================
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "Just now";
}

// ==========================================
// THEME TOGGLE COMPONENT
// ==========================================
function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} className="relative p-2 rounded-xl border transition-all duration-300 bg-[#F3FF74] text-[#283113] border-[#283113]/20 hover:bg-[#E6F060] dark:bg-[#283113] dark:text-[#F3FF74] dark:border-[#F3FF74]/20 dark:hover:bg-[#1A220D]" aria-label="Toggle theme">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}><Moon className="h-5 w-5" /></motion.div>
        ) : (
          <motion.div key="sun" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}><Sun className="h-5 w-5" /></motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// ==========================================
// STATUS BADGE COMPONENT
// ==========================================
function StatusBadge({ status }: { status: string }) {
  const cleanStatus = status?.toLowerCase().replace(" ", "_") || "pending";
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    in_progress: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    under_review: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    matched: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
    resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    claimed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    rejected: "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  };
  const labels: Record<string, string> = { 
    pending: "Pending", in_progress: "In Progress", under_review: "Under Review", matched: "Matched", 
    resolved: "Resolved", claimed: "Claimed", approved: "Approved", confirmed: "Confirmed", 
    completed: "Completed", cancelled: "Cancelled", rejected: "Rejected" 
  };
  const style = styles[cleanStatus] || styles.pending;
  const label = labels[cleanStatus] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${cleanStatus === 'resolved' || cleanStatus === 'claimed' || cleanStatus === 'approved' || cleanStatus === 'confirmed' || cleanStatus === 'completed' ? 'bg-emerald-500' : cleanStatus === 'in_progress' || cleanStatus === 'matched' || cleanStatus === 'under_review' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
      {label}
    </span>
  );
}

// ==========================================
// STAT CARD COMPONENT
// ==========================================
function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border p-5 sm:p-6 backdrop-blur-sm group transition-all duration-300 bg-white/80 border-[#283113]/10 hover:border-[#F3FF74]/50 hover:shadow-lg hover:shadow-[#F3FF74]/10 dark:bg-[#283113]/60 dark:border-[#F3FF74]/10 dark:hover:border-[#F3FF74]/30 dark:hover:shadow-[#F3FF74]/5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3FF74]/10 dark:bg-[#F3FF74]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#F3FF74]/20 dark:group-hover:bg-[#F3FF74]/10" />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#283113]/70 dark:text-[#F3FF74]/70 mb-1">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#283113] dark:text-[#F3FF74] tracking-tight">{value}</h3>
          {trend && <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {trend}</p>}
        </div>
        <div className="p-3 rounded-xl bg-[#F3FF74]/20 dark:bg-[#F3FF74]/10 text-[#283113] dark:text-[#F3FF74]"><Icon className="h-6 w-6" /></div>
      </div>
    </motion.div>
  );
}

// ==========================================
// CUSTOM ANIMATED BAR CHART
// ==========================================
function DashboardChart({ complaints, foundItems }: { complaints: any[]; foundItems: any[] }) {
  const allItems = [...complaints, ...foundItems];
  const statusCounts = {
    pending: allItems.filter(i => i.status === 'pending').length,
    in_progress: allItems.filter(i => i.status === 'in_progress').length,
    resolved: allItems.filter(i => i.status === 'resolved' || i.status === 'claimed').length,
    cancelled: allItems.filter(i => i.status === 'cancelled').length,
  };
  const maxVal = Math.max(...Object.values(statusCounts), 1);
  const bars = [
    { label: "Pending", value: statusCounts.pending, color: "bg-amber-500" },
    { label: "In Progress", value: statusCounts.in_progress, color: "bg-blue-500" },
    { label: "Resolved", value: statusCounts.resolved, color: "bg-emerald-500" },
    { label: "Cancelled", value: statusCounts.cancelled, color: "bg-red-500" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 backdrop-blur-sm h-full bg-white/80 border-[#283113]/10 dark:bg-[#283113]/60 dark:border-[#F3FF74]/10">
      <div className="flex items-center gap-2 mb-6"><BarChart3 className="h-5 w-5 text-[#283113] dark:text-[#F3FF74]" /><h3 className="text-lg font-bold text-[#283113] dark:text-[#F3FF74]">Case Status Overview</h3></div>
      <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-64">
        {bars.map((bar, index) => {
          const heightPercent = (bar.value / maxVal) * 100;
          return (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center h-full">
                <motion.div initial={{ height: 0 }} animate={{ height: `${heightPercent}%` }} transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }} className={`w-full max-w-[60px] rounded-t-lg ${bar.color} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#283113] dark:bg-[#F3FF74] text-white dark:text-[#283113] text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">{bar.value} Cases</div>
                </motion.div>
              </div>
              <span className="text-xs font-medium text-[#283113]/70 dark:text-[#F3FF74]/70 text-center">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ==========================================
// LIVE ACTIVITY / AUDIT LOG FEED
// ==========================================
function ActivityFeed({ complaints, foundItems, consultations, claims }: { complaints: any[]; foundItems: any[]; consultations: any[]; claims: any[] }) {
  const recentActivities = useMemo(() => {
    const combined = [
      ...complaints.map(c => ({ ...c, type: 'complaint' })),
      ...foundItems.map(f => ({ ...f, type: 'found' })),
      ...consultations.map(c => ({ ...c, type: 'consultation' })),
      ...claims.map(c => ({ ...c, type: 'claim' }))
    ];
    return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);
  }, [complaints, foundItems, consultations, claims]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 backdrop-blur-sm bg-white/80 border-[#283113]/10 dark:bg-[#283113]/60 dark:border-[#F3FF74]/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#283113] dark:text-[#F3FF74]" />
          <h3 className="text-lg font-bold text-[#283113] dark:text-[#F3FF74]">Live Activity</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-[#283113]/50 dark:text-[#F3FF74]/50 text-sm">No recent activity.</div>
          ) : (
            recentActivities.map((activity, index) => {
              let icon = <FileText className="h-4 w-4" />;
              let colorClass = "bg-purple-500/10 text-purple-600 dark:text-purple-400";
              let title = "New Complaint Lodged";

              if (activity.type === 'found') { icon = <Package className="h-4 w-4" />; colorClass = "bg-blue-500/10 text-blue-600 dark:text-blue-400"; title = "New Item Reported"; }
              else if (activity.type === 'consultation') { icon = <Calendar className="h-4 w-4" />; colorClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"; title = "New Consultation Booked"; }
              else if (activity.type === 'claim') { icon = <Briefcase className="h-4 w-4" />; colorClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400"; title = "New Item Claim Submitted"; }

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                    index === 0 
                      ? "bg-[#F3FF74]/10 border-[#F3FF74]/20 dark:bg-[#F3FF74]/5" 
                      : "bg-white/50 border-[#283113]/5 dark:bg-[#1A220D]/50 dark:border-[#F3FF74]/5"
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#283113] dark:text-[#F3FF74] truncate">
                      {title}
                    </p>
                    <p className="text-[10px] text-[#283113]/60 dark:text-[#F3FF74]/60 truncate mt-0.5">
                      {activity.tracking_id || activity.full_name} • {activity.category || activity.service_type || 'Claim'}
                    </p>
                  </div>
                  <div className="text-[10px] font-medium text-[#283113]/40 dark:text-[#F3FF74]/40 whitespace-nowrap flex-shrink-0">
                    {timeAgo(activity.created_at)}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN ADMIN DASHBOARD
// ==========================================
export default function AdminDashboard() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"complaints" | "found" | "consultations" | "claims">("complaints");
  
  const [complaints, setComplaints] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    const [compRes, foundRes, consultRes, claimsRes] = await Promise.all([
      supabase.from("complaints").select("*").order("created_at", { ascending: false }),
      supabase.from("found_items").select("*").order("created_at", { ascending: false }),
      supabase.from("consultation_bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("item_claims").select("*").order("created_at", { ascending: false }) // Ensure this table exists in Supabase
    ]);
    if (compRes.data) setComplaints(compRes.data);
    if (foundRes.data) setFoundItems(foundRes.data);
    if (consultRes.data) setConsultations(consultRes.data);
    if (claimsRes.data) setClaims(claimsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setIsDarkMode(false);
  }, []);

  const updateStatus = async (id: string, type: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase.from(type).update({ status: newStatus }).eq("id", id);
    if (!error) {
      if (type === "complaints") setComplaints(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      else if (type === "found_items") setFoundItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      else if (type === "consultation_bookings") setConsultations(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      else if (type === "item_claims") setClaims(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
    setUpdatingId(null);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "complaints": return complaints;
      case "found": return foundItems;
      case "consultations": return consultations;
      case "claims": return claims;
      default: return complaints;
    }
  };

  const activeData = getActiveData();
  const tableType = activeTab === "complaints" ? "complaints" : activeTab === "found" ? "found_items" : activeTab === "consultations" ? "consultation_bookings" : "item_claims";

  const filteredData = useMemo(() => {
    return activeData.filter((item: any) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        item.tracking_id?.toLowerCase().includes(query) ||
        item.full_name?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.item_type?.toLowerCase().includes(query) ||
        item.service_type?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeData, searchQuery, statusFilter]);

  const totalCases = complaints.length + foundItems.length;
  const resolvedCases = complaints.filter(c => c.status === "resolved").length + foundItems.filter(f => f.status === "claimed").length;
  const pendingConsultations = consultations.filter(c => c.status === "pending").length;

  const clearFilters = () => { setSearchQuery(""); setStatusFilter("all"); };
  const isFiltering = searchQuery !== "" || statusFilter !== "all";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#283113]' : 'bg-[#FDFDF5]'}`}>
      <div className="min-h-screen text-[#283113] dark:text-[#F3FF74]">
        
        <header className="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 bg-[#FDFDF5]/80 border-[#283113]/10 dark:bg-[#283113]/80 dark:border-[#F3FF74]/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F3FF74] dark:bg-[#F3FF74]/10 rounded-lg"><ShieldCheck className="h-5 w-5 text-[#283113]" /></div>
              <h1 className="text-lg sm:text-xl font-bold text-[#283113] dark:text-[#F3FF74] tracking-tight">HLRS Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchData} className="p-2 rounded-lg hover:bg-[#283113]/5 dark:hover:bg-[#F3FF74]/10 text-[#283113]/60 dark:text-[#F3FF74]/60 hover:text-[#283113] dark:hover:text-[#F3FF74] transition-colors" title="Refresh Data">
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <ThemeToggle isDark={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3FF74]/20 dark:bg-[#F3FF74]/10 border border-[#283113]/10 dark:border-[#F3FF74]/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-[#283113] dark:text-[#F3FF74]">System Online</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#283113] dark:text-[#F3FF74]">Dashboard Overview</h2>
              <p className="text-[#283113]/60 dark:text-[#F3FF74]/60 mt-1">Monitor and manage all recovery cases, found items, consultations, and claims.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Cases" value={totalCases} icon={LayoutDashboard} trend="+12% this month" />
              <StatCard title="Pending Review" value={complaints.filter(c => c.status === 'pending').length + foundItems.filter(f => f.status === 'pending').length} icon={Clock} />
              <StatCard title="Pending Consultations" value={pendingConsultations} icon={Calendar} />
              <StatCard title="Successfully Resolved" value={resolvedCases} icon={CheckCircle} trend="98% success rate" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Chart & Live Feed */}
            <div className="lg:col-span-1 space-y-6">
              <DashboardChart complaints={complaints} foundItems={foundItems} />
              <ActivityFeed complaints={complaints} foundItems={foundItems} consultations={consultations} claims={claims} />
            </div>

            {/* Right Column: Tabs & Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#283113]/10 dark:border-[#F3FF74]/10 overflow-x-auto no-scrollbar">
                <button onClick={() => { setActiveTab("complaints"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "complaints" ? "text-[#283113] dark:text-[#F3FF74]" : "text-[#283113]/50 dark:text-[#F3FF74]/50 hover:text-[#283113] dark:hover:text-[#F3FF74]"}`}>
                  <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Complaints ({complaints.length})</span>
                  {activeTab === "complaints" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F3FF74]" />}
                </button>
                <button onClick={() => { setActiveTab("found"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "found" ? "text-[#283113] dark:text-[#F3FF74]" : "text-[#283113]/50 dark:text-[#F3FF74]/50 hover:text-[#283113] dark:hover:text-[#F3FF74]"}`}>
                  <span className="flex items-center gap-2"><Package className="h-4 w-4" /> Found Items ({foundItems.length})</span>
                  {activeTab === "found" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F3FF74]" />}
                </button>
                <button onClick={() => { setActiveTab("consultations"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "consultations" ? "text-[#283113] dark:text-[#F3FF74]" : "text-[#283113]/50 dark:text-[#F3FF74]/50 hover:text-[#283113] dark:hover:text-[#F3FF74]"}`}>
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Consultations ({consultations.length})</span>
                  {activeTab === "consultations" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F3FF74]" />}
                </button>
                <button onClick={() => { setActiveTab("claims"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "claims" ? "text-[#283113] dark:text-[#F3FF74]" : "text-[#283113]/50 dark:text-[#F3FF74]/50 hover:text-[#283113] dark:hover:text-[#F3FF74]"}`}>
                  <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Item Claims ({claims.length})</span>
                  {activeTab === "claims" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F3FF74]" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl border bg-white/80 border-[#283113]/10 dark:bg-[#283113]/60 dark:border-[#F3FF74]/10 backdrop-blur-sm">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#283113]/40 dark:text-[#F3FF74]/40" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by ID, Name, Email, or Category..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10 text-sm text-[#283113] dark:text-[#F3FF74] placeholder:text-[#283113]/40 dark:placeholder:text-[#F3FF74]/40 focus:outline-none focus:ring-2 focus:ring-[#F3FF74]/50 transition-all" />
                </div>
                <div className="relative sm:w-48">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#283113]/40 dark:text-[#F3FF74]/40 pointer-events-none" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10 text-sm text-[#283113] dark:text-[#F3FF74] focus:outline-none focus:ring-2 focus:ring-[#F3FF74]/50 transition-all appearance-none cursor-pointer">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="under_review">Under Review</option>
                    <option value="matched">Matched</option>
                    <option value="resolved">Resolved</option>
                    <option value="claimed">Claimed</option>
                    <option value="approved">Approved</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <AnimatePresence>
                  {isFiltering && (
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={clearFilters} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#283113]/5 dark:bg-[#F3FF74]/10 text-[#283113] dark:text-[#F3FF74] hover:bg-[#283113]/10 dark:hover:bg-[#F3FF74]/20 transition-colors text-sm font-medium whitespace-nowrap">
                      <XCircle className="h-4 w-4" /> Clear
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-2xl border overflow-hidden transition-colors duration-300 bg-white/80 border-[#283113]/10 dark:bg-[#283113]/60 dark:border-[#F3FF74]/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#283113]/5 dark:bg-[#F3FF74]/5 text-[#283113]/70 dark:text-[#F3FF74]/70 font-medium border-b border-[#283113]/10 dark:border-[#F3FF74]/10">
                      <tr>
                        {activeTab === "consultations" ? (
                          <>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Service Type</th>
                            <th className="px-6 py-4 hidden md:table-cell">Date & Time</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Contact</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        ) : activeTab === "claims" ? (
                          <>
                            <th className="px-6 py-4">Tracking ID</th>
                            <th className="px-6 py-4">Claimant</th>
                            <th className="px-6 py-4 hidden md:table-cell">Contact</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-4">Tracking ID</th>
                            <th className="px-6 py-4">Category / Item</th>
                            <th className="px-6 py-4 hidden md:table-cell">Contact</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#283113]/5 dark:divide-[#F3FF74]/5">
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <tr><td colSpan={6} className="px-6 py-12 text-center text-[#283113]/50 dark:text-[#F3FF74]/50"><RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />Loading data...</td></tr>
                        ) : filteredData.length === 0 ? (
                          <tr><td colSpan={6} className="px-6 py-12 text-center"><div className="flex flex-col items-center justify-center text-[#283113]/50 dark:text-[#F3FF74]/50">{isFiltering ? <><Search className="h-8 w-8 mb-2 text-[#283113]/30 dark:text-[#F3FF74]/30" /><p className="font-medium">No records match your search.</p><p className="text-xs mt-1">Try adjusting your filters.</p></> : <><AlertTriangle className="h-8 w-8 mb-2 text-[#283113]/30 dark:text-[#F3FF74]/30" /><p className="font-medium">No records found.</p></>}</div></td></tr>
                        ) : (
                          filteredData.map((item: any, index: number) => (
                            <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="group hover:bg-[#F3FF74]/5 dark:hover:bg-[#F3FF74]/5 transition-colors">
                              {activeTab === "consultations" ? (
                                <>
                                  <td className="px-6 py-4 font-medium text-[#283113] dark:text-[#F3FF74]">{item.full_name}</td>
                                  <td className="px-6 py-4 text-sm text-[#283113]/70 dark:text-[#F3FF74]/70">{item.service_type}</td>
                                  <td className="px-6 py-4 hidden md:table-cell text-sm text-[#283113]/60 dark:text-[#F3FF74]/60">
                                    {item.preferred_date} at {item.preferred_time}
                                  </td>
                                  <td className="px-6 py-4 hidden sm:table-cell">
                                    <div className="text-sm text-[#283113] dark:text-[#F3FF74]">{item.email}</div>
                                    <div className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50">{item.phone}</div>
                                  </td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#F3FF74]/20 dark:bg-[#F3FF74]/10 text-[#283113] dark:text-[#F3FF74] hover:bg-[#F3FF74]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#283113] border border-[#283113]/20 dark:border-[#F3FF74]/20 text-[#283113] dark:text-[#F3FF74] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#F3FF74]/50 disabled:opacity-50 cursor-pointer hover:border-[#F3FF74]/50 transition-colors">
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="completed">Completed</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                              ) : activeTab === "claims" ? (
                                <>
                                  <td className="px-6 py-4"><span className="font-mono font-semibold text-[#283113] dark:text-[#F3FF74]">{item.tracking_id}</span></td>
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-[#283113] dark:text-[#F3FF74]">{item.full_name}</div>
                                  </td>
                                  <td className="px-6 py-4 hidden md:table-cell">
                                    <div className="text-[#283113] dark:text-[#F3FF74]">{item.email}</div>
                                    <div className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50">{item.phone}</div>
                                  </td>
                                  <td className="px-6 py-4 hidden sm:table-cell text-[#283113]/60 dark:text-[#F3FF74]/60">{new Date(item.created_at).toLocaleDateString()}</td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#F3FF74]/20 dark:bg-[#F3FF74]/10 text-[#283113] dark:text-[#F3FF74] hover:bg-[#F3FF74]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#283113] border border-[#283113]/20 dark:border-[#F3FF74]/20 text-[#283113] dark:text-[#F3FF74] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#F3FF74]/50 disabled:opacity-50 cursor-pointer hover:border-[#F3FF74]/50 transition-colors">
                                        <option value="pending">Pending</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-6 py-4"><span className="font-mono font-semibold text-[#283113] dark:text-[#F3FF74]">{item.tracking_id}</span></td>
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-[#283113] dark:text-[#F3FF74]">{item.category || item.item_type}</div>
                                    <div className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 truncate max-w-[200px]">{activeTab === "complaints" ? item.item_type : item.description}</div>
                                  </td>
                                  <td className="px-6 py-4 hidden md:table-cell">
                                    <div className="text-[#283113] dark:text-[#F3FF74]">{item.is_anonymous ? "Anonymous" : item.full_name}</div>
                                    <div className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50">{item.email}</div>
                                  </td>
                                  <td className="px-6 py-4 hidden sm:table-cell text-[#283113]/60 dark:text-[#F3FF74]/60">{new Date(item.created_at).toLocaleDateString()}</td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#F3FF74]/20 dark:bg-[#F3FF74]/10 text-[#283113] dark:text-[#F3FF74] hover:bg-[#F3FF74]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#283113] border border-[#283113]/20 dark:border-[#F3FF74]/20 text-[#283113] dark:text-[#F3FF74] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#F3FF74]/50 disabled:opacity-50 cursor-pointer hover:border-[#F3FF74]/50 transition-colors">
                                        <option value="pending">Pending</option><option value="in_progress">In Progress</option><option value="matched">Matched</option><option value="resolved">Resolved</option><option value="claimed">Claimed</option><option value="cancelled">Cancelled</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                              )}
                            </motion.tr>
                          ))
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Slide-Over Case Details Drawer */}
        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 z-50 bg-[#283113]/40 dark:bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] shadow-2xl overflow-y-auto border-l border-[#283113]/10 dark:border-[#F3FF74]/10 bg-[#FDFDF5] dark:bg-[#283113]">
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#283113]/10 dark:border-[#F3FF74]/10 bg-[#FDFDF5]/90 dark:bg-[#283113]/90 backdrop-blur-md">
                  <div>
                    <h3 className="text-lg font-bold text-[#283113] dark:text-[#F3FF74]">
                      {activeTab === "consultations" ? "Consultation Details" : activeTab === "claims" ? "Claim Details" : "Case Details"}
                    </h3>
                    <p className="text-xs font-mono text-[#283113]/60 dark:text-[#F3FF74]/60">{selectedItem.tracking_id || selectedItem.id}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-2 rounded-lg hover:bg-[#283113]/5 dark:hover:bg-[#F3FF74]/10 text-[#283113]/60 dark:text-[#F3FF74]/60 transition-colors"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={selectedItem.status} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#283113]/50 dark:text-[#F3FF74]/50">
                      {activeTab === "complaints" ? "Complaint" : activeTab === "found" ? "Found Item" : activeTab === "consultations" ? "Consultation" : "Item Claim"}
                    </span>
                  </div>
                  
                  {selectedItem.file_url && (
                    <div className="rounded-xl overflow-hidden border border-[#283113]/10 dark:border-[#F3FF74]/10 bg-white dark:bg-[#1A220D]">
                      <div className="px-4 py-2 bg-[#283113]/5 dark:bg-[#F3FF74]/5 border-b border-[#283113]/10 dark:border-[#F3FF74]/10 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-[#283113] dark:text-[#F3FF74]" />
                        <span className="text-xs font-bold text-[#283113] dark:text-[#F3FF74]">Uploaded Evidence</span>
                      </div>
                      <img src={selectedItem.file_url} alt="Evidence" className="w-full h-48 object-cover" />
                    </div>
                  )}

                  {(selectedItem.description || selectedItem.proof_details) && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#283113]/50 dark:text-[#F3FF74]/50">Details</h4>
                      <p className="text-sm text-[#283113] dark:text-[#F3FF74] leading-relaxed bg-white dark:bg-[#1A220D] p-4 rounded-xl border border-[#283113]/10 dark:border-[#F3FF74]/10">
                        {selectedItem.description || selectedItem.proof_details}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {activeTab === "consultations" ? (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <Briefcase className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Service Type</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.service_type}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <Calendar className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Preferred Date & Time</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.preferred_date} at {selectedItem.preferred_time}</p>
                          </div>
                        </div>
                      </>
                    ) : activeTab !== "consultations" && (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <MapPin className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Location</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.location || selectedItem.location_found}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <Calendar className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Date</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.incident_date || selectedItem.date_found}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {!selectedItem.is_anonymous && (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <User className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Full Name</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.full_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                          <Mail className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Email</p>
                            <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.email}</p>
                          </div>
                        </div>
                        {selectedItem.phone && (
                          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A220D] border border-[#283113]/10 dark:border-[#F3FF74]/10">
                            <Phone className="h-5 w-5 text-[#283113]/60 dark:text-[#F3FF74]/60 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-[#283113]/50 dark:text-[#F3FF74]/50 font-bold">Phone</p>
                              <p className="text-sm text-[#283113] dark:text-[#F3FF74]">{selectedItem.phone}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === "complaints" && selectedItem.payment_reference && (
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F3FF74]/20 dark:bg-[#F3FF74]/5 border border-[#F3FF74]/30 dark:border-[#F3FF74]/20">
                        <CreditCard className="h-5 w-5 text-[#283113] dark:text-[#F3FF74] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-[#283113]/70 dark:text-[#F3FF74]/70 font-bold">Payment Reference</p>
                          <p className="text-xs font-mono text-[#283113] dark:text-[#F3FF74] break-all">{selectedItem.payment_reference}</p>
                          <p className="text-[10px] uppercase mt-1 font-bold text-[#283113]/50 dark:text-[#F3FF74]/50">Method: {selectedItem.payment_method}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}