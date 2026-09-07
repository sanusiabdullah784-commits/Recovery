"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageCheck, Search, MapPin, Calendar, FileText, Info, ShieldCheck, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FlaggedItemsSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  // Modal State
  const [claimingItem, setClaimingItem] = useState<any>(null);

  // Mock Unclaimed/Secured Items Data with Vault Status
  const flaggedItems = [
    {
      id: "UC-001",
      title: t("Toyota Camry 2018 Keys (Black)", "Toyota Camry 2018 Keys (Black)"),
      status: "Ready for Pickup",
      vaultStatus: t("Secured in Biometric Vault", "Secured for Biometric Vault"),
      location: t("Wuse 2, Abuja", "Wuse 2, Abuja"),
      date: "Sep 01, 2026",
      desc: t("Set of car keys found and safely stored. Owner must provide vehicle registration details to claim.", "Set of car keys wey dem find and keep safe. Owner must show vehicle registration details before dem go give am.")
    },
    {
      id: "UC-002",
      title: t("MacBook Pro M2 (Silver)", "MacBook Pro M2 (Silver)"),
      status: "Awaiting Verification",
      vaultStatus: t("Held in Climate-Controlled Storage", "Held for Climate-Controlled Storage"),
      location: t("Computer Village, Ikeja, Lagos", "Computer Village, Ikeja, Lagos"),
      date: "Sep 02, 2026",
      desc: t("Laptop received and secured. Claimant must provide proof of purchase or unlock the device to verify ownership.", "Laptop wey dem receive and keep safe. Person wey wan claim am must show proof of purchase or unlock the device.")
    },
    {
      id: "UC-003",
      title: t("Property Documents (Lekki Phase 1)", "Property Documents (Lekki Phase 1)"),
      status: "Ready for Pickup",
      vaultStatus: t("Locked in Secure Evidence Room", "Locked for Secure Evidence Room"),
      location: t("Lekki, Lagos", "Lekki, Lagos"),
      date: "Aug 28, 2026",
      desc: t("Crucial property documents safely secured in our vault. Valid ID and notarized affidavit required for collection.", "Important property documents wey dey safe for our vault. Valid ID and notarized affidavit na him you need to collect am.")
    },
    {
      id: "UC-004",
      title: t("18k Gold Chain & Pendant", "18k Gold Chain & Pendant"),
      status: "Awaiting Verification",
      vaultStatus: t("Stored in High-Security Safe", "Stored for High-Security Safe"),
      location: t("Garki, Abuja", "Garki, Abuja"),
      date: "Sep 03, 2026",
      desc: t("Valuable jewelry found and logged into our secure inventory. Detailed description and photos required for claim.", "Valuable jewelry wey dem find and put for our secure inventory. You go need to give detailed description and photos to claim am.")
    },
    {
      id: "UC-005",
      title: t("iPhone 14 Pro Max (256GB)", "iPhone 14 Pro Max (256GB)"),
      status: "Ready for Pickup",
      vaultStatus: t("Protected in Tamper-Evident Vault", "Protected for Tamper-Evident Vault"),
      location: t("Banex Plaza, Wuse, Abuja", "Banex Plaza, Wuse, Abuja"),
      date: "Sep 04, 2026",
      desc: t("Smartphone secured in our facility. Owner must provide the correct iCloud credentials or original purchase receipt.", "Smartphone wey dem keep safe for our facility. Owner must provide the correct iCloud credentials or original purchase receipt.")
    },
    {
      id: "UC-006",
      title: t("Mikano 20kVA Generator", "Mikano 20kVA Generator"),
      status: "Pending Documentation",
      vaultStatus: t("Secured in Industrial Safe Yard", "Secured for Industrial Safe Yard"),
      location: t("Kado, Abuja", "Kado, Abuja"),
      date: "Aug 30, 2026",
      desc: t("Large industrial generator safely stored at our secure yard. Claimant must provide serial number and proof of ownership.", "Big generator wey dem keep safe for our secure yard. Person wey wan claim am must provide serial number and proof of ownership.")
    }
  ];

  const filters = ["All", "Ready for Pickup", "Awaiting Verification", "Pending Documentation"];

  const filteredItems = flaggedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Pickup": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Awaiting Verification": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Pending Documentation": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 overflow-hidden bg-gradient-to-br from-[#C2185B] to-[#E0F2FE]">
      
      {/* Calm, Secure Ambient Orbs adapted for new gradient */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E0F2FE]/40 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.06]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 px-2"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-black/10">
            <PackageCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-sm">
            {t("Unclaimed & Secured Items", "Unclaimed & Secured Items")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t("Items safely received and stored in our secure warehouse awaiting their rightful owners. Search below to see if your lost property is here.", "Items wey dem safely receive and keep for our secure warehouse, wey dey wait for their rightful owners. Search below to see if your lost property dey here.")}
          </p>
        </motion.div>

        {/* Claiming Process Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-4 mx-2 sm:mx-0"
        >
          <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold mb-1 text-sm sm:text-base">{t("How to Claim Your Item", "How to Claim Your Item")}</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {t("To claim an item, you must provide valid proof of ownership (e.g., purchase receipt, serial number, or detailed description) along with a government-issued ID. All claims are thoroughly verified by our team to prevent fraud.", "To claim any item, you must provide valid proof of ownership (e.g., purchase receipt, serial number, or detailed description) along with a government-issued ID. We go thoroughly verify all claims to prevent fraud.")}
            </p>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-8 sm:mb-10 px-2 sm:px-0"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search by item name or location...", "Search by item name or location...")}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all text-sm sm:text-base" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  selectedFilter === filter 
                    ? "bg-white text-[#C2185B] border-white shadow-lg" 
                    : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-white/30 hover:bg-slate-900/70 transition-all duration-300"
              >
                {/* Top Image/Icon Area */}
                <div className="relative h-36 sm:h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5">
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {/* High-Security Vault Status Indicator */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-950/60 backdrop-blur-md border border-emerald-500/20">
                    <div className="relative flex h-2 w-2 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-300/90 uppercase tracking-wider truncate">
                      {item.vaultStatus}
                    </span>
                  </div>

                  <PackageCheck className="h-14 w-14 sm:h-16 sm:w-16 text-slate-600 group-hover:text-white/20 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 line-clamp-2 flex-grow">
                    {item.desc}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{t("Received on", "Received on")} {item.date}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setClaimingItem(item)}
                    className="w-full py-3 bg-gradient-to-r from-[#C2185B] to-pink-600 hover:from-pink-600 hover:to-[#C2185B] text-white font-bold rounded-xl shadow-lg shadow-black/20 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:shadow-pink-500/20 text-sm sm:text-base"
                  >
                    <FileText className="h-4 w-4" />
                    {t("Claim This Item", "Claim This Item")}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-16 sm:py-20 px-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white/50" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t("No items found", "No items found")}</h3>
            <p className="text-sm sm:text-base text-white/60">{t("Try adjusting your search or filter.", "Try adjust your search or filter.")}</p>
          </motion.div>
        )}

      </div>

      {/* ==========================================
          SLEEK "START CLAIM" VERIFICATION MODAL
          ========================================== */}
      <AnimatePresence>
        {claimingItem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setClaimingItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-slate-900/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C2185B]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#E0F2FE]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button onClick={() => setClaimingItem(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-10">
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="relative z-10 text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#C2185B] to-pink-600 mb-4 shadow-lg shadow-pink-500/20">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t("Secure Claim Verification", "Secure Claim Verification")}</h3>
                <p className="text-sm text-slate-400 px-2">
                  {t("To claim", "To claim")} <span className="text-pink-400 font-semibold">{claimingItem.title}</span>, {t("please complete the following steps.", "abeg complete the steps wey dey below.")}
                </p>
              </div>

              {/* Steps */}
              <div className="relative z-10 space-y-3 sm:space-y-4 mb-8">
                {[
                  { icon: <FileText className="h-5 w-5" />, title: t("Upload Government ID", "Upload Government ID"), desc: t("Valid ID card, passport, or driver's license.", "Valid ID card, passport, or driver's license.") },
                  { icon: <PackageCheck className="h-5 w-5" />, title: t("Proof of Ownership", "Proof of Ownership"), desc: t("Receipt, serial number, or detailed photos.", "Receipt, serial number, or detailed photos.") },
                  { icon: <Calendar className="h-5 w-5" />, title: t("Schedule Pickup", "Schedule Pickup"), desc: t("Choose a secure time to collect your item.", "Choose a secure time to collect your item.") }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    className="flex items-start gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C2185B]/20 border border-[#C2185B]/30 flex items-center justify-center text-pink-400">
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white mb-0.5">{t("Step", "Step")} {i + 1}: {step.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <button 
                onClick={() => { setClaimingItem(null); /* Handle claim logic */ }}
                className="relative z-10 w-full py-3.5 bg-gradient-to-r from-[#C2185B] to-pink-600 hover:from-pink-600 hover:to-[#C2185B] text-white font-bold rounded-xl shadow-lg shadow-black/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                {t("Start Verification Process", "Start Verification Process")} 
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ========================================== */}

    </section>
  );
}