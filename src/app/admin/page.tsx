"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FileText, Package, CheckCircle, Clock, 
  AlertTriangle, TrendingUp, RefreshCw, ShieldCheck, 
  BarChart3, Sun, Moon, Eye, X, MapPin, Calendar, 
  User, Mail, Phone, Image as ImageIcon, CreditCard,
  Search, Filter, XCircle, Activity, Zap, Briefcase, Flag, Plus, Loader2, Smartphone, Building2, Pencil, Trash2
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
    <button onClick={toggle} className="relative p-2 rounded-xl border transition-all duration-300 bg-[#D97706] text-[#431407] border-[#431407]/20 hover:bg-[#B45309] dark:bg-[#431407] dark:text-[#D97706] dark:border-[#D97706]/20 dark:hover:bg-[#2A1205]" aria-label="Toggle theme">
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
    under_investigation: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    active_alert: "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
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
    pending: "Pending", in_progress: "In Progress", under_review: "Under Review", under_investigation: "Under Investigation",
    active_alert: "Active Alert", matched: "Matched", resolved: "Resolved", claimed: "Claimed", 
    approved: "Approved", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled", rejected: "Rejected" 
  };
  const style = styles[cleanStatus] || styles.pending;
  const label = labels[cleanStatus] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        cleanStatus === 'resolved' || cleanStatus === 'claimed' || cleanStatus === 'approved' || cleanStatus === 'confirmed' || cleanStatus === 'completed' ? 'bg-emerald-500' : 
        cleanStatus === 'in_progress' || cleanStatus === 'matched' || cleanStatus === 'under_review' || cleanStatus === 'under_investigation' ? 'bg-blue-500 animate-pulse' : 
        cleanStatus === 'active_alert' ? 'bg-red-500 animate-pulse' : 
        'bg-amber-500'
      }`} />
      {label}
    </span>
  );
}

// ==========================================
// STAT CARD COMPONENT
// ==========================================
function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border p-5 sm:p-6 backdrop-blur-sm group transition-all duration-300 bg-white/80 border-[#431407]/10 hover:border-[#D97706]/50 hover:shadow-lg hover:shadow-[#D97706]/10 dark:bg-[#431407]/60 dark:border-[#D97706]/10 dark:hover:border-[#D97706]/30 dark:hover:shadow-[#D97706]/5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/10 dark:bg-[#D97706]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#D97706]/20 dark:group-hover:bg-[#D97706]/10" />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#431407]/70 dark:text-[#D97706]/70 mb-1">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#431407] dark:text-[#D97706] tracking-tight">{value}</h3>
          {trend && <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {trend}</p>}
        </div>
        <div className="p-3 rounded-xl bg-[#D97706]/20 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706]"><Icon className="h-6 w-6" /></div>
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 backdrop-blur-sm h-full bg-white/80 border-[#431407]/10 dark:bg-[#431407]/60 dark:border-[#D97706]/10">
      <div className="flex items-center gap-2 mb-6"><BarChart3 className="h-5 w-5 text-[#431407] dark:text-[#D97706]" /><h3 className="text-lg font-bold text-[#431407] dark:text-[#D97706]">Case Status Overview</h3></div>
      <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-64">
        {bars.map((bar, index) => {
          const heightPercent = (bar.value / maxVal) * 100;
          return (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center h-full">
                <motion.div initial={{ height: 0 }} animate={{ height: `${heightPercent}%` }} transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }} className={`w-full max-w-[60px] rounded-t-lg ${bar.color} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#431407] dark:bg-[#D97706] text-white dark:text-[#431407] text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">{bar.value} Cases</div>
                </motion.div>
              </div>
              <span className="text-xs font-medium text-[#431407]/70 dark:text-[#D97706]/70 text-center">{bar.label}</span>
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
function ActivityFeed({ complaints, foundItems, consultations, claims, flaggedItems }: { complaints: any[]; foundItems: any[]; consultations: any[]; claims: any[]; flaggedItems: any[] }) {
  const recentActivities = useMemo(() => {
    const combined = [
      ...complaints.map(c => ({ ...c, type: 'complaint' })),
      ...foundItems.map(f => ({ ...f, type: 'found' })),
      ...consultations.map(c => ({ ...c, type: 'consultation' })),
      ...claims.map(c => ({ ...c, type: 'claim' })),
      ...flaggedItems.map(f => ({ ...f, type: 'flagged' }))
    ];
    return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);
  }, [complaints, foundItems, consultations, claims, flaggedItems]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 backdrop-blur-sm bg-white/80 border-[#431407]/10 dark:bg-[#431407]/60 dark:border-[#D97706]/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#431407] dark:text-[#D97706]" />
          <h3 className="text-lg font-bold text-[#431407] dark:text-[#D97706]">Live Activity</h3>
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
            <div className="text-center py-8 text-[#431407]/50 dark:text-[#D97706]/50 text-sm">No recent activity.</div>
          ) : (
            recentActivities.map((activity, index) => {
              let icon = <FileText className="h-4 w-4" />;
              let colorClass = "bg-purple-500/10 text-purple-600 dark:text-purple-400";
              let title = "New Complaint Lodged";

              if (activity.type === 'found') { icon = <Package className="h-4 w-4" />; colorClass = "bg-blue-500/10 text-blue-600 dark:text-blue-400"; title = "New Item Reported"; }
              else if (activity.type === 'consultation') { icon = <Calendar className="h-4 w-4" />; colorClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"; title = "New Consultation Booked"; }
              else if (activity.type === 'claim') { icon = <Briefcase className="h-4 w-4" />; colorClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400"; title = "New Item Claim Submitted"; }
              else if (activity.type === 'flagged') { icon = <Flag className="h-4 w-4" />; colorClass = "bg-red-500/10 text-red-600 dark:text-red-400"; title = "New Item Flagged"; }

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                    index === 0 
                      ? "bg-[#D97706]/10 border-[#D97706]/20 dark:bg-[#D97706]/5" 
                      : "bg-white/50 border-[#431407]/5 dark:bg-[#2A1205]/50 dark:border-[#D97706]/5"
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#431407] dark:text-[#D97706] truncate">
                      {title}
                    </p>
                    <p className="text-[10px] text-[#431407]/60 dark:text-[#D97706]/60 truncate mt-0.5">
                      {activity.tracking_id || activity.full_name || activity.title} • {activity.category || activity.service_type || activity.reason || 'Claim'}
                    </p>
                  </div>
                  <div className="text-[10px] font-medium text-[#431407]/40 dark:text-[#D97706]/40 whitespace-nowrap flex-shrink-0">
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [activeTab, setActiveTab] = useState<"complaints" | "found" | "consultations" | "claims" | "flagged" | "security">("complaints");
  
  const [complaints, setComplaints] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [flaggedItems, setFlaggedItems] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [newFlaggedItem, setNewFlaggedItem] = useState({
    title: "",
    description: "",
    reason: "",
    location: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [mfaStep, setMfaStep] = useState<"idle" | "enroll" | "verify">("idle");
  const [enrollData, setEnrollData] = useState<any>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [has2FA, setHas2FA] = useState(false);
  const [currentFactorId, setCurrentFactorId] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const check2FA = async () => {
      const { data } = await supabase.auth.mfa.listFactors();
      const totp = data?.factors?.find((f: any) => f.factor_type === 'totp' && f.status === 'verified');
      setHas2FA(!!totp);
      if (totp) setCurrentFactorId(totp.id);
    };
    if (isAuthenticated) check2FA();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleEnroll2FA = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    if (error) {
      alert("Failed to enroll 2FA: " + error.message);
      return;
    }
    setEnrollData(data);
    setMfaStep("enroll");
  };

  const handleVerify2FASetup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.mfa.verify({
      factorId: enrollData.id,
      code: verifyCode,
    });
    
    if (error) {
      alert("Invalid code. Please try again.");
    } else {
      alert("Two-Factor Authentication enabled successfully!");
      setMfaStep("idle");
      setHas2FA(true);
      setCurrentFactorId(enrollData.id);
      setVerifyCode("");
      setEnrollData(null);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm("Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.")) return;
    
    const { error } = await supabase.auth.mfa.unenroll({ factorId: currentFactorId });
    if (error) {
      alert("Failed to disable 2FA: " + error.message);
    } else {
      alert("Two-Factor Authentication disabled.");
      setHas2FA(false);
      setCurrentFactorId("");
      setMfaStep("idle");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [compRes, foundRes, consultRes, claimsRes, flaggedRes] = await Promise.all([
      supabase.from("complaints").select("*").order("created_at", { ascending: false }),
      supabase.from("found_items").select("*").order("created_at", { ascending: false }),
      supabase.from("consultation_bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("item_claims").select("*").order("created_at", { ascending: false }),
      supabase.from("flagged_items").select("*").order("created_at", { ascending: false })
    ]);
    if (compRes.data) setComplaints(compRes.data);
    if (foundRes.data) setFoundItems(foundRes.data);
    if (consultRes.data) setConsultations(consultRes.data);
    if (claimsRes.data) setClaims(claimsRes.data);
    if (flaggedRes.data) setFlaggedItems(flaggedRes.data);
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
      else if (type === "flagged_items") setFlaggedItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
    setUpdatingId(null);
  };

  const handleEditFlaggedItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    
    let fileUrl = editingItem.file_url;

    try {
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `flagged-${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('flagged-items-images')
          .upload(filePath, selectedImage, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('flagged-items-images').getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      }

      const payload = {
        title: newFlaggedItem.title,
        reason: newFlaggedItem.reason,
        location: newFlaggedItem.location,
        description: newFlaggedItem.description,
        file_url: fileUrl,
      };

      const { error } = await supabase.from("flagged_items").update(payload).eq("id", editingItem.id);
      
      if (error) throw error;

      setFlaggedItems(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...payload } : item));
      setIsAddModalOpen(false);
      setEditingItem(null);
      setNewFlaggedItem({ title: "", description: "", reason: "", location: "" });
      setSelectedImage(null);
      alert("Flagged item updated successfully!");
    } catch (error: any) {
      alert("Error updating flagged item: " + (error?.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFlaggedItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flagged item? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase.from("flagged_items").delete().eq("id", id);
      if (error) throw error;
      
      setFlaggedItems(prev => prev.filter(item => item.id !== id));
      alert("Flagged item deleted successfully!");
    } catch (error: any) {
      alert("Error deleting flagged item: " + (error?.message || "Unknown error"));
    }
  };

  const handleAddFlaggedItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let fileUrl = null;

    try {
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `flagged-${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('flagged-items-images')
          .upload(filePath, selectedImage, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          alert("Failed to upload image: " + uploadError.message);
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('flagged-items-images')
          .getPublicUrl(filePath);
        
        fileUrl = urlData.publicUrl;
      }

      const payload = {
        title: newFlaggedItem.title,
        reason: newFlaggedItem.reason,
        location: newFlaggedItem.location,
        description: newFlaggedItem.description,
        file_url: fileUrl,
        status: "Active Alert",
        date_flagged: new Date().toISOString().split('T')[0],
        tracking_id: "FLAG-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from("flagged_items").insert([payload]).select();
      
      if (error) throw error;

      setFlaggedItems([data[0], ...flaggedItems]);
      setIsAddModalOpen(false);
      setNewFlaggedItem({ title: "", description: "", reason: "", location: "" });
      setSelectedImage(null);
      alert("Flagged item added successfully and is now live on the website!");
    } catch (error: any) {
      console.error("Error adding flagged item:", error);
      alert("Error adding flagged item: " + (error?.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "complaints": return complaints;
      case "found": return foundItems;
      case "consultations": return consultations;
      case "claims": return claims;
      case "flagged": return flaggedItems;
      default: return complaints;
    }
  };

  const activeData = getActiveData();
  const tableType = activeTab === "complaints" ? "complaints" : activeTab === "found" ? "found_items" : activeTab === "consultations" ? "consultation_bookings" : activeTab === "claims" ? "item_claims" : "flagged_items";

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
        item.description?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.reason?.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeData, searchQuery, statusFilter]);

  const totalCases = complaints.length + foundItems.length;
  const resolvedCases = complaints.filter(c => c.status === "resolved").length + foundItems.filter(f => f.status === "claimed").length;
  const pendingConsultations = consultations.filter(c => c.status === "pending").length;
  const activeAlerts = flaggedItems.filter(f => f.status === "Active Alert").length;

  const clearFilters = () => { setSearchQuery(""); setStatusFilter("all"); };
  const isFiltering = searchQuery !== "" || statusFilter !== "all";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED] dark:bg-[#431407]">
        <Loader2 className="h-8 w-8 text-[#D97706] animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#431407]' : 'bg-[#FFF7ED]'}`}>
      <div className="min-h-screen text-[#431407] dark:text-[#D97706]">
        
        <header className="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 bg-[#FFF7ED]/80 border-[#431407]/10 dark:bg-[#431407]/80 dark:border-[#D97706]/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D97706] dark:bg-[#D97706]/10 rounded-lg"><ShieldCheck className="h-5 w-5 text-[#431407]" /></div>
              <h1 className="text-lg sm:text-xl font-bold text-[#431407] dark:text-[#D97706] tracking-tight">HLRS Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchData} className="p-2 rounded-lg hover:bg-[#431407]/5 dark:hover:bg-[#D97706]/10 text-[#431407]/60 dark:text-[#D97706]/60 hover:text-[#431407] dark:hover:text-[#D97706] transition-colors" title="Refresh Data">
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <ThemeToggle isDark={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
              
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-semibold border border-red-200 dark:border-red-800"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D97706]/20 dark:bg-[#D97706]/10 border border-[#431407]/10 dark:border-[#D97706]/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-[#431407] dark:text-[#D97706]">System Online</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#431407]/10 dark:border-[#D97706]/10 overflow-x-auto no-scrollbar">
              <button onClick={() => { setActiveTab("complaints"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "complaints" ? "text-[#431407] dark:text-[#D97706]" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-[#431407] dark:hover:text-[#D97706]"}`}>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Complaints ({complaints.length})</span>
                {activeTab === "complaints" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />}
              </button>
              <button onClick={() => { setActiveTab("found"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "found" ? "text-[#431407] dark:text-[#D97706]" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-[#431407] dark:hover:text-[#D97706]"}`}>
                <span className="flex items-center gap-2"><Package className="h-4 w-4" /> Found Items ({foundItems.length})</span>
                {activeTab === "found" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />}
              </button>
              <button onClick={() => { setActiveTab("consultations"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "consultations" ? "text-[#431407] dark:text-[#D97706]" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-[#431407] dark:hover:text-[#D97706]"}`}>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Consultations ({consultations.length})</span>
                {activeTab === "consultations" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />}
              </button>
              <button onClick={() => { setActiveTab("claims"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "claims" ? "text-[#431407] dark:text-[#D97706]" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-[#431407] dark:hover:text-[#D97706]"}`}>
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Item Claims ({claims.length})</span>
                {activeTab === "claims" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />}
              </button>
              <button onClick={() => { setActiveTab("flagged"); clearFilters(); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "flagged" ? "text-red-600 dark:text-red-400" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-red-600 dark:hover:text-red-400"}`}>
                <span className="flex items-center gap-2"><Flag className="h-4 w-4" /> Flagged Items ({flaggedItems.length})</span>
                {activeTab === "flagged" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />}
              </button>
              <button onClick={() => { setActiveTab("security"); }} className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === "security" ? "text-[#431407] dark:text-[#D97706]" : "text-[#431407]/50 dark:text-[#D97706]/50 hover:text-[#431407] dark:hover:text-[#D97706]"}`}>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Security</span>
                {activeTab === "security" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />}
              </button>
            </div>
          </div>

          {activeTab !== "security" && (
            <>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#431407] dark:text-[#D97706]">Dashboard Overview</h2>
                  <p className="text-[#431407]/60 dark:text-[#D97706]/60 mt-1">Monitor and manage all recovery cases, found items, consultations, claims, and flagged items.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Total Cases" value={totalCases} icon={LayoutDashboard} trend="+12% this month" />
                  <StatCard title="Pending Review" value={complaints.filter(c => c.status === 'pending').length + foundItems.filter(f => f.status === 'pending').length} icon={Clock} />
                  <StatCard title="Active Alerts" value={activeAlerts} icon={AlertTriangle} />
                  <StatCard title="Successfully Resolved" value={resolvedCases} icon={CheckCircle} trend="98% success rate" />
                </div>
              </div>

              {activeTab === "flagged" && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setNewFlaggedItem({ title: "", description: "", reason: "", location: "" });
                      setSelectedImage(null);
                      setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add Flagged Item
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl border bg-white/80 border-[#431407]/10 dark:bg-[#431407]/60 dark:border-[#D97706]/10 backdrop-blur-sm">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#431407]/40 dark:text-[#D97706]/40" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by ID, Name, Title, or Reason..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10 text-sm text-[#431407] dark:text-[#D97706] placeholder:text-[#431407]/40 dark:placeholder:text-[#D97706]/40 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all" />
                </div>
                <div className="relative sm:w-48">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#431407]/40 dark:text-[#D97706]/40 pointer-events-none" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10 text-sm text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all appearance-none cursor-pointer">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="Active Alert">Active Alert</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                    <option value="claimed">Claimed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <AnimatePresence>
                  {isFiltering && (
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={clearFilters} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#431407]/5 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706] hover:bg-[#431407]/10 dark:hover:bg-[#D97706]/20 transition-colors text-sm font-medium whitespace-nowrap">
                      <XCircle className="h-4 w-4" /> Clear
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-2xl border overflow-hidden transition-colors duration-300 bg-white/80 border-[#431407]/10 dark:bg-[#431407]/60 dark:border-[#D97706]/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#431407]/5 dark:bg-[#D97706]/5 text-[#431407]/70 dark:text-[#D97706]/70 font-medium border-b border-[#431407]/10 dark:border-[#D97706]/10">
                      <tr>
                        {activeTab === "flagged" ? (
                          <>
                            <th className="px-6 py-4">Tracking ID</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4 hidden md:table-cell">Reason</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        ) : activeTab === "consultations" ? (
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
                            <th className="px-6 py-4 hidden md:table-cell">Payment</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-4">Tracking ID</th>
                            <th className="px-6 py-4">Category / Item</th>
                            <th className="px-6 py-4 hidden md:table-cell">Payment</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#431407]/5 dark:divide-[#D97706]/5">
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <tr><td colSpan={6} className="px-6 py-12 text-center text-[#431407]/50 dark:text-[#D97706]/50"><RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />Loading data...</td></tr>
                        ) : filteredData.length === 0 ? (
                          <tr><td colSpan={6} className="px-6 py-12 text-center"><div className="flex flex-col items-center justify-center text-[#431407]/50 dark:text-[#D97706]/50"><AlertTriangle className="h-8 w-8 mb-2 text-[#431407]/30 dark:text-[#D97706]/30" /><p className="font-medium">No records found.</p></div></td></tr>
                        ) : (
                          filteredData.map((item: any, index: number) => (
                            <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="group hover:bg-[#D97706]/5 dark:hover:bg-[#D97706]/5 transition-colors">
                              {activeTab === "flagged" ? (
                                <>
                                  <td className="px-6 py-4"><span className="font-mono font-semibold text-[#431407] dark:text-[#D97706]">{item.tracking_id}</span></td>
                                  <td className="px-6 py-4 font-medium text-[#431407] dark:text-[#D97706]">{item.title}</td>
                                  <td className="px-6 py-4 hidden md:table-cell text-sm text-[#431407]/70 dark:text-[#D97706]/70">{item.reason}</td>
                                  <td className="px-6 py-4 hidden sm:table-cell text-sm text-[#431407]/60 dark:text-[#D97706]/60">{item.location}</td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#D97706]/20 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706] hover:bg-[#D97706]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select 
                                        value={item.status} 
                                        onChange={(e) => updateStatus(item.id, tableType, e.target.value)} 
                                        disabled={updatingId === item.id} 
                                        className="bg-white dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 disabled:opacity-50 cursor-pointer hover:border-[#D97706]/50 transition-colors"
                                      >
                                        <option value="Active Alert">Active Alert</option>
                                        <option value="Under Investigation">Under Investigation</option>
                                        <option value="Resolved">Resolved</option>
                                      </select>
                                      <button onClick={() => { setEditingItem(item); setNewFlaggedItem({ title: item.title, description: item.description, reason: item.reason, location: item.location }); setSelectedImage(null); setIsAddModalOpen(true); }} className="p-1.5 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/40 transition-colors" title="Edit"><Pencil className="h-4 w-4" /></button>
                                      <button onClick={() => handleDeleteFlaggedItem(item.id)} className="p-1.5 rounded-lg bg-red-500/20 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/40 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                  </td>
                                </>
                              ) : activeTab === "consultations" ? (
                                <>
                                  <td className="px-6 py-4 font-medium text-[#431407] dark:text-[#D97706]">{item.full_name}</td>
                                  <td className="px-6 py-4 text-sm text-[#431407]/70 dark:text-[#D97706]/70">{item.service_type}</td>
                                  <td className="px-6 py-4 hidden md:table-cell text-sm text-[#431407]/60 dark:text-[#D97706]/60">{item.preferred_date} at {item.preferred_time}</td>
                                  <td className="px-6 py-4 hidden sm:table-cell"><div className="text-sm text-[#431407] dark:text-[#D97706]">{item.email}</div><div className="text-xs text-[#431407]/50 dark:text-[#D97706]/50">{item.phone}</div></td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#D97706]/20 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706] hover:bg-[#D97706]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 disabled:opacity-50 cursor-pointer hover:border-[#D97706]/50 transition-colors">
                                        <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option><option value="completed">Completed</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                              ) : activeTab === "claims" ? (
                                <>
                                  <td className="px-6 py-4"><span className="font-mono font-semibold text-[#431407] dark:text-[#D97706]">{item.tracking_id}</span></td>
                                  <td className="px-6 py-4"><div className="font-medium text-[#431407] dark:text-[#D97706]">{item.full_name}</div></td>
                                  <td className="px-6 py-4 hidden md:table-cell">
                                    {item.payment_method === 'bank_transfer' ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                                        <Building2 className="h-3 w-3" /> Bank Transfer
                                      </span>
                                    ) : item.payment_method ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                                        <CreditCard className="h-3 w-3" /> Online
                                      </span>
                                    ) : <span className="text-xs text-slate-400">-</span>}
                                  </td>
                                  <td className="px-6 py-4 hidden sm:table-cell text-[#431407]/60 dark:text-[#D97706]/60">{new Date(item.created_at).toLocaleDateString()}</td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#D97706]/20 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706] hover:bg-[#D97706]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 disabled:opacity-50 cursor-pointer hover:border-[#D97706]/50 transition-colors">
                                        <option value="pending">Pending</option><option value="under_review">Under Review</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-6 py-4"><span className="font-mono font-semibold text-[#431407] dark:text-[#D97706]">{item.tracking_id}</span></td>
                                  <td className="px-6 py-4"><div className="font-medium text-[#431407] dark:text-[#D97706]">{item.category || item.item_type}</div><div className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 truncate max-w-[200px]">{activeTab === "complaints" ? item.item_type : item.description}</div></td>
                                  <td className="px-6 py-4 hidden md:table-cell">
                                    {item.payment_method === 'bank_transfer' ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                                        <Building2 className="h-3 w-3" /> Bank Transfer
                                      </span>
                                    ) : item.payment_method ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                                        <CreditCard className="h-3 w-3" /> Online
                                      </span>
                                    ) : <span className="text-xs text-slate-400">-</span>}
                                  </td>
                                  <td className="px-6 py-4 hidden sm:table-cell text-[#431407]/60 dark:text-[#D97706]/60">{new Date(item.created_at).toLocaleDateString()}</td>
                                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => setSelectedItem(item)} className="p-1.5 rounded-lg bg-[#D97706]/20 dark:bg-[#D97706]/10 text-[#431407] dark:text-[#D97706] hover:bg-[#D97706]/40 transition-colors" title="View Details"><Eye className="h-4 w-4" /></button>
                                      <select value={item.status} onChange={(e) => updateStatus(item.id, tableType, e.target.value)} disabled={updatingId === item.id} className="bg-white dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 disabled:opacity-50 cursor-pointer hover:border-[#D97706]/50 transition-colors">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChart complaints={complaints} foundItems={foundItems} />
                <ActivityFeed complaints={complaints} foundItems={foundItems} consultations={consultations} claims={claims} flaggedItems={flaggedItems} />
              </div>
            </>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto w-full">
              <div className="bg-white/80 dark:bg-[#431407]/60 backdrop-blur-sm border border-[#431407]/10 dark:border-[#D97706]/10 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#D97706]/10 dark:bg-[#D97706]/20">
                    <Smartphone className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#431407] dark:text-[#D97706]">Two-Factor Authentication</h3>
                    <p className="text-sm text-[#431407]/60 dark:text-[#D97706]/60">Add an extra layer of security to your admin account.</p>
                  </div>
                </div>

                {mfaStep === "idle" && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${has2FA ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'}`}>
                      <p className={`text-sm font-medium ${has2FA ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {has2FA ? "✅ Two-Factor Authentication is currently ACTIVE." : "⚠️ Two-Factor Authentication is currently DISABLED."}
                      </p>
                    </div>
                    
                    {has2FA ? (
                      <button onClick={handleDisable2FA} className="w-full py-3 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Disable Two-Factor Authentication
                      </button>
                    ) : (
                      <button onClick={handleEnroll2FA} className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-semibold transition-colors shadow-lg shadow-[#D97706]/20">
                        Enable Two-Factor Authentication
                      </button>
                    )}
                  </div>
                )}

                {mfaStep === "enroll" && enrollData && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-[#431407] dark:text-[#D97706] mb-4">1. Scan this QR code with your Google Authenticator app:</p>
                      <div className="inline-block p-4 bg-white rounded-xl border border-[#431407]/10 dark:border-[#D97706]/20">
                        <img src={enrollData.totp.qr_code} alt="2FA QR Code" className="w-48 h-48" />
                      </div>
                      <div className="mt-4 p-3 bg-[#FFF7ED] dark:bg-[#2A1205] rounded-lg border border-[#431407]/10 dark:border-[#D97706]/20">
                        <p className="text-xs text-[#431407]/60 dark:text-[#D97706]/60 mb-1">Manual entry key (save this securely):</p>
                        <p className="font-mono text-sm font-bold text-[#431407] dark:text-[#D97706] tracking-wider">{enrollData.totp.secret}</p>
                      </div>
                    </div>

                    <form onSubmit={handleVerify2FASetup} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1.5">2. Enter the 6-digit code from your app:</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          required
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all text-center text-2xl tracking-widest font-mono"
                          placeholder="000 000"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => { setMfaStep("idle"); setEnrollData(null); }} className="flex-1 py-3 rounded-xl border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] font-semibold hover:bg-[#431407]/5 dark:hover:bg-[#D97706]/10 transition-colors">
                          Cancel
                        </button>
                        <button type="submit" className="flex-1 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-semibold transition-colors">
                          Verify & Enable
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </main>

        <AnimatePresence>
          {isAddModalOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }} 
                className="fixed inset-0 z-50 bg-[#431407]/60 dark:bg-black/80 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-[#FFF7ED] dark:bg-[#431407] border border-[#431407]/10 dark:border-[#D97706]/20 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#431407] dark:text-[#D97706]">{editingItem ? "Edit Flagged Item" : "Add Flagged Item"}</h3>
                  <button onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }} className="p-2 rounded-lg hover:bg-[#431407]/5 dark:hover:bg-[#D97706]/10 text-[#431407]/60 dark:text-[#D97706]/60 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={editingItem ? handleEditFlaggedItem : handleAddFlaggedItem} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1">Title *</label>
                    <input 
                      required
                      type="text" 
                      value={newFlaggedItem.title}
                      onChange={(e) => setNewFlaggedItem({...newFlaggedItem, title: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all"
                      placeholder="e.g., Stolen Vehicle, Suspicious Package"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1">Reason for Flagging *</label>
                    <input 
                      required
                      type="text" 
                      value={newFlaggedItem.reason}
                      onChange={(e) => setNewFlaggedItem({...newFlaggedItem, reason: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all"
                      placeholder="e.g., Reported stolen in Lagos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1">Location *</label>
                    <input 
                      required
                      type="text" 
                      value={newFlaggedItem.location}
                      onChange={(e) => setNewFlaggedItem({...newFlaggedItem, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all"
                      placeholder="e.g., Ikeja, Lagos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1">Description *</label>
                    <textarea 
                      required
                      rows={3}
                      value={newFlaggedItem.description}
                      onChange={(e) => setNewFlaggedItem({...newFlaggedItem, description: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all resize-none"
                      placeholder="Detailed description of the item..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1">Upload Image (Optional)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#D97706]/10 file:text-[#431407] dark:file:bg-[#D97706]/20 dark:file:text-[#D97706] hover:file:bg-[#D97706]/20 dark:hover:file:bg-[#D97706]/30"
                    />
                    {selectedImage && (
                      <p className="text-xs text-[#431407]/60 dark:text-[#D97706]/60 mt-1">
                        Selected: {selectedImage.name}
                      </p>
                    )}
                    {editingItem && editingItem.file_url && !selectedImage && (
                      <p className="text-xs text-[#431407]/60 dark:text-[#D97706]/60 mt-1">
                        Current image will be kept if no new file is selected.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] font-semibold hover:bg-[#431407]/5 dark:hover:bg-[#D97706]/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                    >
                      {isSubmitting ? (
                        <><RefreshCw className="h-4 w-4 animate-spin" /> {editingItem ? "Updating..." : "Uploading & Saving..."}</>
                      ) : (
                        <>{editingItem ? "Update" : "Add"} Item</>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 z-50 bg-[#431407]/40 dark:bg-[#2A1205]/80 backdrop-blur-sm" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] shadow-2xl overflow-y-auto border-l border-[#431407]/10 dark:border-[#D97706]/10 bg-[#FFF7ED] dark:bg-[#431407]">
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#431407]/10 dark:border-[#D97706]/10 bg-[#FFF7ED]/90 dark:bg-[#431407]/90 backdrop-blur-md">
                  <div>
                    <h3 className="text-lg font-bold text-[#431407] dark:text-[#D97706]">
                      {activeTab === "consultations" ? "Consultation Details" : activeTab === "claims" ? "Claim Details" : activeTab === "flagged" ? "Flagged Item Details" : "Case Details"}
                    </h3>
                    <p className="text-xs font-mono text-[#431407]/60 dark:text-[#D97706]/60">{selectedItem.tracking_id || selectedItem.id}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-2 rounded-lg hover:bg-[#431407]/5 dark:hover:bg-[#D97706]/10 text-[#431407]/60 dark:text-[#D97706]/60 transition-colors"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={selectedItem.status} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#431407]/50 dark:text-[#D97706]/50">
                      {activeTab === "complaints" ? "Complaint" : activeTab === "found" ? "Found Item" : activeTab === "consultations" ? "Consultation" : activeTab === "claims" ? "Item Claim" : "Flagged Item"}
                    </span>
                  </div>
                  
                  {activeTab === "flagged" ? (
                    <>
                      {selectedItem.file_url && (
                        <div className="rounded-xl overflow-hidden border border-[#431407]/10 dark:border-[#D97706]/10 bg-white dark:bg-[#2A1205] mb-4">
                          <div className="px-4 py-2 bg-[#431407]/5 dark:bg-[#D97706]/5 border-b border-[#431407]/10 dark:border-[#D97706]/10 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-[#431407] dark:text-[#D97706]" />
                            <span className="text-xs font-bold text-[#431407] dark:text-[#D97706]">Flagged Item Image</span>
                          </div>
                          <img src={selectedItem.file_url} alt="Flagged Item" className="w-full h-48 object-cover" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#431407]/50 dark:text-[#D97706]/50">Reason for Flagging</h4>
                        <p className="text-sm text-[#431407] dark:text-[#D97706] leading-relaxed bg-white dark:bg-[#2A1205] p-4 rounded-xl border border-[#431407]/10 dark:border-[#D97706]/10">{selectedItem.reason}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#431407]/50 dark:text-[#D97706]/50">Description</h4>
                        <p className="text-sm text-[#431407] dark:text-[#D97706] leading-relaxed bg-white dark:bg-[#2A1205] p-4 rounded-xl border border-[#431407]/10 dark:border-[#D97706]/10">{selectedItem.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                          <MapPin className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                          <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Location</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.location}</p></div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                          <Calendar className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                          <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Date Flagged</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.date_flagged}</p></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {selectedItem.file_url && (
                        <div className="rounded-xl overflow-hidden border border-[#431407]/10 dark:border-[#D97706]/10 bg-white dark:bg-[#2A1205]">
                          <div className="px-4 py-2 bg-[#431407]/5 dark:bg-[#D97706]/5 border-b border-[#431407]/10 dark:border-[#D97706]/10 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-[#431407] dark:text-[#D97706]" />
                            <span className="text-xs font-bold text-[#431407] dark:text-[#D97706]">Uploaded Evidence</span>
                          </div>
                          <img src={selectedItem.file_url} alt="Evidence" className="w-full h-48 object-cover" />
                        </div>
                      )}
                      {(selectedItem.description || selectedItem.proof_details) && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#431407]/50 dark:text-[#D97706]/50">Details</h4>
                          <p className="text-sm text-[#431407] dark:text-[#D97706] leading-relaxed bg-white dark:bg-[#2A1205] p-4 rounded-xl border border-[#431407]/10 dark:border-[#D97706]/10">
                            {selectedItem.description || selectedItem.proof_details}
                          </p>
                        </div>
                      )}
                      
                      {(activeTab === "complaints" || activeTab === "claims") && selectedItem.payment_reference && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#D97706]/10 dark:bg-[#D97706]/5 border border-[#D97706]/30 dark:border-[#D97706]/20 mb-4">
                          <CreditCard className="h-5 w-5 text-[#431407] dark:text-[#D97706] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-[#431407]/70 dark:text-[#D97706]/70 font-bold mb-1">Payment Information</p>
                            <p className="text-sm font-mono text-[#431407] dark:text-[#D97706] break-all">{selectedItem.payment_reference}</p>
                            <p className="text-[10px] uppercase mt-1.5 font-bold text-[#431407]/60 dark:text-[#D97706]/60 flex items-center gap-1">
                              {selectedItem.payment_method === 'bank_transfer' ? <Building2 className="h-3 w-3" /> : <CreditCard className="h-3 w-3" />}
                              Method: {selectedItem.payment_method === 'bank_transfer' ? 'Bank Transfer (Needs Verification)' : selectedItem.payment_method}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4">
                        {activeTab === "consultations" ? (
                          <>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <Briefcase className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Service Type</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.service_type}</p></div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <Calendar className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Preferred Date & Time</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.preferred_date} at {selectedItem.preferred_time}</p></div>
                            </div>
                          </>
                        ) : activeTab !== "consultations" && (
                          <>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <MapPin className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Location</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.location || selectedItem.location_found}</p></div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <Calendar className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Date</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.incident_date || selectedItem.date_found}</p></div>
                            </div>
                          </>
                        )}
                        {!selectedItem.is_anonymous && (
                          <>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <User className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Full Name</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.full_name}</p></div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                              <Mail className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                              <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Email</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.email}</p></div>
                            </div>
                            {selectedItem.phone && (
                              <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#2A1205] border border-[#431407]/10 dark:border-[#D97706]/10">
                                <Phone className="h-5 w-5 text-[#431407]/60 dark:text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                                <div><p className="text-xs text-[#431407]/50 dark:text-[#D97706]/50 font-bold">Phone</p><p className="text-sm text-[#431407] dark:text-[#D97706]">{selectedItem.phone}</p></div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}