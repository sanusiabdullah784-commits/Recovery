"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageCheck, Search, MapPin, Calendar, FileText, Info, ShieldCheck, X, ArrowRight, User, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function ClaimYourItemSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  // Modal & Form State
  const [claimingItem, setClaimingItem] = useState<any>(null);
  const [claimForm, setClaimForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    proofDetails: ""
  });
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Registration Fee Categories (Excluding Legal Services)
  const feeCategories = [
    {
      title: t("Category A", "Category A"),
      desc: t("Items worth ₦20,000 and below", "Items worth ₦20,000 and below"),
      price: "₦3,000"
    },
    {
      title: t("Category B", "Category B"),
      desc: t("Items worth ₦20,000 to ₦100,000", "Items worth ₦20,000 to ₦100,000"),
      price: "₦5,000"
    },
    {
      title: t("Category C", "Category C"),
      desc: t("Missing Persons", "Missing Persons"),
      price: "₦5,000"
    }
  ];

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
      case "Ready for Pickup": return "bg-emerald-500/10 text-emerald-700 border-emerald-500/30";
      case "Awaiting Verification": return "bg-amber-500/10 text-amber-700 border-amber-500/30";
      case "Pending Documentation": return "bg-blue-500/10 text-blue-700 border-blue-500/30";
      default: return "bg-slate-500/10 text-slate-700 border-slate-500/30";
    }
  };

  // ✅ Handle Claim Submission to Supabase
  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingClaim(true);

    try {
      const { error } = await supabase.from("item_claims").insert({
        tracking_id: claimingItem.id,
        full_name: claimForm.fullName,
        email: claimForm.email,
        phone: claimForm.phone,
        proof_details: claimForm.proofDetails,
        status: "pending"
      });

      if (error) throw error;

      setClaimSuccess(true);
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert(t("Failed to submit claim. Please try again.", "E fail to submit claim. Abeg try again."));
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 overflow-hidden bg-[#D9B8FF]">
      {/* Ambient Orbs matching the purple theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-400/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-400/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      {/* Grid Pattern matching the light theme */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.04]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`, 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 px-2"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 border border-purple-200/50 bg-purple-50/50 backdrop-blur-md shadow-lg shadow-purple-500/10">
            <PackageCheck className="h-6 w-6 text-purple-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-slate-900 drop-shadow-sm">
            {t("CLAIM YOUR ITEM", "CLAIM YOUR ITEM")}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-6">
            {t("Items safely received and stored in our secure warehouse awaiting their rightful owners. Search below to see if your lost property is here.", "Items wey dem safely receive and keep for our secure warehouse, wey dey wait for their rightful owners. Search below to see if your lost property dey here.")}
          </p>
          
          {/* ✅ REMOVED: The redundant "Claim an Item" button that was linking to /complaints and causing 404 */}
        </motion.div>

        {/* Registration Fee Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 sm:mb-10 px-2 sm:px-0"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">
            {t("Registration Fee Categories for Claims", "Registration Fee Categories for Claims")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {feeCategories.map((cat, index) => (
              <div key={index} className="p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/50 text-center hover:bg-white/80 transition-colors shadow-sm">
                <h4 className="font-bold text-purple-600 mb-2 text-lg">{cat.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{cat.desc}</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{cat.price}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-slate-500 mt-4 italic">
            {t("* Legal Services fees are not applicable here as this section is strictly for claiming lost items.", "* Legal Services fees no dey here because this section na strictly for claiming lost items.")}
          </p>
        </motion.div>

        {/* Claiming Process Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-500/30 flex flex-col sm:flex-row items-start gap-4 mx-2 sm:mx-0 shadow-sm"
        >
          <Info className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h3 className="text-slate-900 font-bold text-sm sm:text-base">{t("Important Claim Information", "Important Claim Information")}</h3>
            <ul className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>{t("To claim an item, you must provide valid proof of ownership (e.g., purchase receipt, serial number, or detailed description) along with a government-issued ID. All claims are thoroughly verified to prevent fraud.", "To claim any item, you must provide valid proof of ownership along with a government-issued ID. We go thoroughly verify all claims to prevent fraud.")}</span>
              </li>
              <li className="flex items-start gap-2 text-amber-700 font-semibold">
                <span className="mt-1">•</span>
                <span>{t("Pay registration fee to claim your item if you haven't registered. Items are charged based on the value during collection.", "Pay registration fee to claim your item if you no don register. Dem go charge based on the value of the item during collection.")}</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-700 font-semibold">
                <span className="mt-1">•</span>
                <span>{t("Registered before on same item? No need to pay. Log in with your reference ID to make a claim.", "You don register for this same item before? No need to pay again. Just log in with your reference ID to make your claim.")}</span>
              </li>
            </ul>
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search by item name or location...", "Search by item name or location...")}
              className="w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base shadow-sm" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  selectedFilter === filter 
                    ? "bg-purple-600 text-white border-purple-600 shadow-lg" 
                    : "bg-white/60 text-slate-700 border-slate-200/50 hover:bg-white/80 hover:text-slate-900"
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
                className="group relative flex flex-col bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-purple-300 hover:bg-white/90 transition-all duration-300 shadow-sm"
              >
                <div className="relative h-36 sm:h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-b border-slate-200/50">
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-emerald-500/20">
                    <div className="relative flex h-2 w-2 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-300 uppercase tracking-wider truncate">
                      {item.vaultStatus}
                    </span>
                  </div>

                  <PackageCheck className="h-14 w-14 sm:h-16 sm:w-16 text-slate-400 group-hover:text-purple-600/40 transition-colors duration-500" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                    {item.desc}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{t("Received on", "Received on")} {item.date}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setClaimingItem(item);
                      setClaimSuccess(false);
                      setClaimForm({ fullName: "", email: "", phone: "", proofDetails: "" });
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:shadow-purple-500/30 text-sm sm:text-base"
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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{t("No items found", "No items found")}</h3>
            <p className="text-sm sm:text-base text-slate-600">{t("Try adjusting your search or filter.", "Try adjust your search or filter.")}</p>
          </motion.div>
        )}
      </div>

      {/* ==========================================
          SLEEK "START CLAIM" VERIFICATION MODAL (WORKING FORM)
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
              className="relative w-full max-w-md bg-slate-900/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

              <button onClick={() => setClaimingItem(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-10">
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 mb-4 shadow-lg shadow-purple-500/20">
                  {claimSuccess ? <CheckCircle2 className="h-7 w-7 text-white" /> : <ShieldCheck className="h-7 w-7 text-white" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {claimSuccess ? t("Claim Submitted Successfully!", "Claim Submitted Successfully!") : t("Secure Claim Verification", "Secure Claim Verification")}
                </h3>
                <p className="text-sm text-slate-400 px-2">
                  {claimSuccess 
                    ? t("Our team will review your proof of ownership and contact you shortly.", "Our team go review your proof of ownership and contact you shortly.")
                    : `${t("To claim", "To claim")} ${claimingItem.title}, ${t("please provide your details and proof of ownership.", "abeg provide your details and proof of ownership.")}`
                  }
                </p>
              </div>

              {!claimSuccess ? (
                <form onSubmit={handleClaimSubmit} className="relative z-10 space-y-4 mb-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      value={claimForm.fullName}
                      onChange={(e) => setClaimForm({ ...claimForm, fullName: e.target.value })}
                      placeholder={t("Full Name", "Full Name")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      value={claimForm.email}
                      onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                      placeholder={t("Email Address", "Email Address")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="tel"
                      value={claimForm.phone}
                      onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                      placeholder={t("Phone Number", "Phone Number")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      required
                      rows={3}
                      value={claimForm.proofDetails}
                      onChange={(e) => setClaimForm({ ...claimForm, proofDetails: e.target.value })}
                      placeholder={t("Describe your proof of ownership (e.g., serial number, receipt details)...", "Describe your proof of ownership (e.g., serial number, receipt details)...")}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingClaim}
                    className="relative z-10 w-full py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-xl shadow-lg shadow-black/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmittingClaim ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        {t("Submitting Claim...", "E dey submit...")}
                      </>
                    ) : (
                      <>
                        {t("Start Verification Process", "Start Verification Process")} 
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
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
                    onClick={() => { setClaimingItem(null); setClaimSuccess(false); setClaimForm({ fullName: "", email: "", phone: "", proofDetails: "" }); }}
                    className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {t("Close", "Close")}
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