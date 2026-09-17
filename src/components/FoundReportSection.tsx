"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lock, Mail, User, Package, MapPin, Calendar, 
  Upload, CheckCircle, ArrowRight, FileText, X, Mic, MicOff, Coins, Crosshair, Loader2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// CELEBRATION RAIN COMPONENT
// ==========================================
function CelebrationRain() {
  const colors = ["#B6FF2E", "#A855F7", "#F472B6", "#34D399", "#FBBF24"];
  const bubbles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: Math.random() * 2 + 2.5,
    delay: Math.random() * 1.5,
    size: Math.random() * 16 + 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    drift: Math.random() * 100 - 50,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: -50, opacity: 0, x: 0 }}
          animate={{ 
            y: "110vh", 
            x: b.drift,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: b.duration, delay: b.delay, ease: "easeIn" }}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            boxShadow: `0 0 12px ${b.color}60`,
          }}
        />
      ))}
    </div>
  );
}
// ==========================================

export function FoundReportSection() {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Location & Date State
  const [location, setLocation] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [dateFound, setDateFound] = useState("");

  // Contact & Anonymous State
  const [fullName, setFullName] = useState("Chinedu Okafor");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("chinedu@example.com");
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const foundCategories = [
    "Electronics (Phone, Laptop, etc.)",
    "Wallet / IDs / Cards",
    "Keys",
    "Documents / Files",
    "Vehicle / Parts",
    "Jewelry / Valuables",
    "Other"
  ];

  // Fix hydration: Only mount animations after client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const generateTrackingId = () => {
    const newId = `FR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(newId);
    return newId;
  };

  // ==========================================
  // SUPABASE SAVE FUNCTION
  // ==========================================
  const saveFoundItemToSupabase = async () => {
    setIsSaving(true);
    let fileUrl = null;
    const tId = generateTrackingId();

    // 1. Upload File to Supabase Storage
    if (uploadedFile) {
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${tId}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('complaint-evidence') 
        .upload(fileName, uploadedFile);
      
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('complaint-evidence').getPublicUrl(fileName);
        fileUrl = publicUrl;
        console.log("✅ File uploaded successfully:", publicUrl);
      } else {
        console.warn("⚠️ File upload failed:", uploadError.message);
      }
    }

    // 2. Insert Data into Database
    const { error: dbError } = await supabase.from('found_items').insert({
      tracking_id: tId,
      category: selectedCategory === "Other" ? customCategory : selectedCategory,
      custom_category: selectedCategory === "Other" ? customCategory : null,
      description: description,
      location_found: location,
      date_found: dateFound || null,
      full_name: isAnonymous ? null : fullName,
      phone: isAnonymous ? null : phone,
      email: isAnonymous ? null : email,
      is_anonymous: isAnonymous,
      file_url: fileUrl,
      status: 'pending'
    });

    // 3. Handle Result
    if (dbError) {
      console.error("❌ Supabase Database Insert Error:", dbError);
      alert(`⚠️ There was an error saving your report.\n\nError: ${dbError.message}\n\nPlease contact support with your Tracking ID: ${tId}`);
      setIsSaving(false);
    } else {
      console.log("✅ Successfully saved found item to Supabase:", tId);
      setIsSaving(false);
      setIsSuccess(true);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = lang === "pid" ? "en-NG" : "en-US";

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript) {
            setDescription((prev) => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [lang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice typing is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setDescription((prev) => prev + (prev ? " " : ""));
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t("Geolocation is not supported by your browser", "Browser no support location feature"));
      return;
    }

    setIsDetectingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.display_name) {
            const cleanAddress = data.display_name.split(',').slice(0, 4).join(',').trim();
            setLocation(cleanAddress);
          } else {
            setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          }
        } catch (error) {
          setLocationError(t("Failed to fetch address. Please enter manually.", "No fit fetch address. Abeg enter am manually."));
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        let errorMsg = t("Location access denied. Please enter manually.", "You no allow location. Abeg enter am manually.");
        if (error.code === error.TIMEOUT) {
          errorMsg = t("Location request timed out.", "Location request don take too long.");
        }
        setLocationError(errorMsg);
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    if (selectedCategory === "Other" && !customCategory.trim()) return;
    
    saveFoundItemToSupabase();
  };

  // ==========================================
  // ✅ UPDATED COLOR VARIABLES TO MATCH LOST/COMPLAINT
  // ==========================================
  const bgMain = "bg-[#D9B8FF]";
  const textMain = "text-slate-900";
  const textMuted = "text-slate-600";
  const glassBg = "bg-white/60";
  const glassBorder = "border-white/50";
  const inputBg = "bg-white/80";
  const inputBorder = "border-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20";

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <section className={`relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 flex items-center justify-center ${bgMain}`}>
        <div className="container mx-auto max-w-4xl relative z-10 w-full">
          <div className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] border ${glassBorder} ${glassBg} backdrop-blur-xl shadow-2xl p-6 sm:p-8 md:p-12`}>
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
              <p className={textMain}>Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 flex items-center justify-center overflow-hidden ${bgMain}`}>
      
      {/* Celebration Rain - Only render when success */}
      {isSuccess && <CelebrationRain />}

      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-400/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-400/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      <div 
        className={`absolute inset-0 -z-10 opacity-[0.04]`} 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`, 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />

      <div className="container mx-auto max-w-4xl relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] border ${glassBorder} ${glassBg} backdrop-blur-2xl shadow-2xl shadow-purple-900/10 p-6 sm:p-8 md:p-12`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-white/60 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            
            {/* Saving State */}
            {isSaving ? (
              <div className="text-center py-12 sm:py-16 px-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6" />
                <h2 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${textMain}`}>{t("Saving Your Report...", "We dey save your report...")}</h2>
                <p className={`${textMuted} max-w-md mx-auto text-sm sm:text-base`}>{t("Please do not close this window while we secure your data.", "Abeg no close this window while we dey secure your data.")}</p>
              </div>
            ) : isSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 sm:py-12 px-4">
                <div className="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full mb-6 border border-purple-200">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600" />
                </div>
                <h2 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${textMain}`}>{t("Item Reported Successfully!", "Item Don Report Successfully!")}</h2>
                <p className={`${textMuted} max-w-lg mx-auto mb-4 text-sm sm:text-base`}>{t("Thank you for your honesty.", "Thank you for your honesty.")}</p>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 max-w-md mx-auto space-y-3">
                  <div>
                    <p className="text-xs text-purple-600 font-semibold mb-1">{t("Your Report ID", "Your Report ID")}:</p>
                    <p className="text-xl font-mono font-extrabold text-purple-700 break-all">{trackingId}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs sm:text-sm font-bold mb-8">
                  <Coins className="h-4 w-4" />
                  {t("If matched with the owner, you will earn a commission!", "If we match am with owner, you go earn commission!")}
                </div>
                <br />
                <button onClick={() => { 
                  setIsSuccess(false); 
                  setSelectedCategory(""); 
                  setCustomCategory(""); 
                  setDescription(""); 
                  setLocation(""); 
                  setDateFound("");
                  setUploadedFile(null); 
                  setIsAnonymous(false);
                  setFullName("Chinedu Okafor");
                  setPhone("");
                  setEmail("chinedu@example.com");
                  setTrackingId("");
                }} className={`px-6 sm:px-8 py-3 bg-purple-100 hover:bg-purple-200 ${textMain} font-bold rounded-xl border border-purple-200 transition-all text-sm sm:text-base`}>
                  {t("Report Another Item", "Report Another Item")}
                </button>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-6 sm:mb-8 px-2">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 border border-purple-200">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${textMain}`}>{t("Report a Found Item", "Report Found Item")}</h2>
                  <p className={`${textMuted} max-w-xl mx-auto text-sm sm:text-base`}>{t("Provide details about the item you found. Your honesty helps reunite people with their belongings.", "Give details about the item you find. Your honesty go help reunite people with their belongings.")}</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-purple-100 border border-purple-200 flex items-start gap-3 mb-6 mx-2 sm:mx-0">
                  <div className="p-1.5 bg-purple-500/20 rounded-lg mt-0.5 flex-shrink-0">
                    <Coins className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${textMain}`}>{t("How the commission works:", "How the commission dey work:")}</h4>
                    <p className={`text-xs ${textMuted} mt-1 leading-relaxed`}>
                      {t("Report the item you found. If the rightful owner claims it through our system, you automatically earn a commission as a reward for your honesty.", "Report the item you find. If the real owner claim am through our system, you go automatically earn commission as reward for your honesty.")}
                    </p>
                  </div>
                </motion.div>

                {/* Anonymous Toggle */}
                <div className="mx-2 sm:mx-0">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-white/50 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${textMain}`}>{t("Report Anonymously", "Report Anonymously")}</h4>
                        <p className="text-xs text-slate-500">{t("Hide your personal details from the public", "Hide your personal details from the public")}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 flex-shrink-0 ${isAnonymous ? 'bg-purple-600' : 'bg-slate-200'}`}
                      aria-label="Toggle anonymous reporting"
                    >
                      <motion.div 
                        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: isAnonymous ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                  {/* Anonymous Message or Contact Fields */}
                  {isAnonymous ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 flex items-start gap-3 mb-6"
                    >
                      <Lock className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {t("Your identity is fully protected. We will assign you a secure, anonymous ID. If the owner claims this item, we will facilitate the return and commission payout without revealing your personal details.", "Your identity don safe. We go give you secure, anonymous ID. If owner claim the item, we go facilitate the return and commission payout without exposing your personal details.")}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-6"
                    >
                      <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${textMain}`}>
                        <User className="h-5 w-5 text-purple-600" /> {t("Your Contact Info", "Your Contact Info")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t("Full Name", "Full Name")} 
                          className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} 
                        />
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t("Phone Number", "Phone Number")} 
                          className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} 
                        />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("Email Address", "Email Address")} 
                          className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all md:col-span-2 text-sm sm:text-base`} 
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 px-2 sm:px-0">
                  {/* Category Selection */}
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${textMain}`}><ShieldCheck className="h-5 w-5 text-purple-600" /> {t("Item Category", "Item Category")}</h3>
                    <select 
                      required 
                      value={selectedCategory} 
                      onChange={(e) => { setSelectedCategory(e.target.value); setCustomCategory(""); }}
                      className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} focus:outline-none transition-all appearance-none text-sm sm:text-base`}
                    >
                      <option value="" disabled className="bg-white">{t("-- Select Category --", "-- Select Category --")}</option>
                      {foundCategories.map(cat => (
                        <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>
                      ))}
                    </select>

                    {selectedCategory === "Other" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden mt-4">
                        <input 
                          required type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder={t("Please specify the item you found...", "Abeg specify the item you find...")} 
                          className={`w-full px-4 py-3.5 ${inputBg} border border-purple-500/30 rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`} 
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${textMain}`}><Package className="h-5 w-5 text-purple-600" /> {t("Item Details", "Item Details")}</h3>
                    <div className="space-y-4">
                      
                      <div className="relative">
                        <label className={`text-xs sm:text-sm font-medium mb-2 block ${textMuted}`}>{t("Describe the item (color, brand, distinguishing marks)", "Describe the item (color, brand, distinguishing marks)")}</label>
                        <textarea 
                          required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                          placeholder={t("e.g., Black iPhone 14 Pro with a cracked screen...", "e.g., Black iPhone 14 Pro with cracked screen...")} 
                          className={`w-full px-4 py-3.5 pr-12 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all resize-none text-sm sm:text-base`} 
                        />
                        <button type="button" onClick={toggleListening} className={`absolute right-3 top-[38px] sm:top-9 p-2 rounded-lg transition-all ${isListening ? "bg-red-100 text-red-600 animate-pulse" : "bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"}`} title={t("Voice Type", "Voice Type")}>
                          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </button>
                        {isListening && <span className="absolute right-14 top-10 text-xs text-red-600 font-medium animate-pulse">{t("Listening...", "E dey listen...")}</span>}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Location */}
                        <div className="relative md:col-span-2">
                          <label className={`text-xs sm:text-sm font-medium mb-2 block ${textMuted}`}>{t("Location where found", "Location where you find am")}</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                              required 
                              type="text" 
                              value={location}
                              onChange={(e) => { setLocation(e.target.value); setLocationError(""); }}
                              placeholder={t("e.g., Wuse Zone 5, Abuja", "e.g., Wuse Zone 5, Abuja")} 
                              className={`w-full pl-12 pr-12 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} 
                            />
                            <button
                              type="button"
                              onClick={handleDetectLocation}
                              disabled={isDetectingLocation}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-purple-600 hover:bg-purple-500/10 transition-all disabled:opacity-50"
                              title={t("Use my current location", "Use my current location")}
                            >
                              {isDetectingLocation ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Crosshair className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          {locationError && (
                            <p className="text-xs text-red-600 mt-1.5 ml-1 flex items-center gap-1">
                              <X className="h-3 w-3" /> {locationError}
                            </p>
                          )}
                        </div>

                        {/* Date */}
                        <div className="relative">
                          <label className={`text-xs sm:text-sm font-medium mb-2 block ${textMuted}`}>{t("Date found", "Date you find am")}</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input 
                              required 
                              type="date" 
                              value={dateFound}
                              onChange={(e) => setDateFound(e.target.value)}
                              className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl text-slate-900 focus:outline-none transition-all text-sm sm:text-base`} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className={`text-xs sm:text-sm font-medium mb-2 block ${textMuted}`}>{t("Upload Photo of Item (Optional but helpful)", "Upload Photo of Item (Optional but helpful)")}</label>
                        <input ref={fileInputRef} type="file" id="file-upload" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
                        <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${uploadedFile ? "border-purple-500/30 bg-purple-50" : `border-slate-200 hover:border-purple-400 hover:bg-purple-50/50`}`}>
                          {uploadedFile ? (
                            <div className="flex items-center gap-3 w-full">
                              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0"><FileText className="h-6 w-6 text-purple-600" /></div>
                              <div className="text-left min-w-0 flex-1">
                                <p className="text-sm font-bold text-purple-700 truncate">{uploadedFile.name}</p>
                                <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                              <button type="button" onClick={(e) => { e.preventDefault(); removeFile(); }} className="ml-2 p-1 rounded-full hover:bg-slate-200 transition-colors flex-shrink-0"><X className="h-4 w-4 text-slate-500" /></button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-slate-400 mb-2" />
                              <p className={`text-sm font-medium ${textMain}`}>{t("Click to upload photo", "Click to upload photo")}</p>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-200/50">
                    <button type="submit" disabled={isSubmitting || isSaving || !selectedCategory || (selectedCategory === "Other" && !customCategory.trim())} className={`w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-lg`}>
                      {(isSubmitting || isSaving) ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-white/30 border-t-white rounded-full" />
                      ) : (
                        <>{t("Submit Report & Earn", "Submit Report & Earn")}<ArrowRight className="h-5 w-5" /></>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}