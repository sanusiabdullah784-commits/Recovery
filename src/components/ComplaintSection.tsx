"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lock, Mail, User, Package, MapPin, Calendar, 
  Upload, AlertCircle, CheckCircle, ArrowRight, LogIn, UserPlus, Scale,
  FileText, X, Mic, MicOff, ChevronRight, ChevronLeft, Check, CreditCard, Loader2
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

export function ComplaintSection() {
  const { t, lang } = useLanguage();
  
  // Auth State
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = !!user;
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFullName, setAuthFullName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  const [paymentReference, setPaymentReference] = useState("");
  const [trackingId, setTrackingId] = useState(""); 
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [customItem, setCustomItem] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [incidentDate, setIncidentDate] = useState(""); 
  const [location, setLocation] = useState(""); 
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"paystack" | "flutterwave" | "paypal" | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const categories = [
    { id: "A", title: "Category A", desc: t("Items worth ₦20,000 and below", "Items wey worth ₦20,000 and below"), price: "3,000", priceNum: 3000, icon: <Package className="h-5 w-5" /> },
    { id: "B", title: "Category B", desc: t("Items worth ₦20,000 to ₦100,000", "Items wey worth ₦20,000 to ₦100,000"), price: "5,000", priceNum: 5000, icon: <Package className="h-5 w-5" /> },
    { id: "C", title: "Category C", desc: t("Missing Persons", "Missing Persons"), price: "5,000", priceNum: 5000, icon: <User className="h-5 w-5" /> },
    { id: "D", title: "Category D", desc: t("Legal Services", "Legal Services"), price: "20,000", priceNum: 20000, icon: <Scale className="h-5 w-5" /> },
  ];

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        if (session.user.user_metadata?.full_name) setFullName(session.user.user_metadata.full_name);
        if (session.user.email) setEmail(session.user.email);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (session.user.user_metadata?.full_name) setFullName(session.user.user_metadata.full_name);
        if (session.user.email) setEmail(session.user.email);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const generateTrackingId = () => {
    const newId = `HLRS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(newId);
    return newId;
  };

  // ==========================================
  // REAL SUPABASE AUTH HANDLER
  // ==========================================
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: { full_name: authFullName },
          },
        });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          setFullName(authFullName);
          setEmail(authEmail);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          if (data.user.user_metadata?.full_name) setFullName(data.user.user_metadata.full_name);
          setEmail(data.user.email || "");
        }
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsSuccess(false);
    setCurrentStep(1);
    setSelectedCategory(null);
    setSelectedItem("");
    setCustomItem("");
    setUploadedFile(null);
    setDescription("");
    setIncidentDate("");
    setLocation("");
    setFullName("");
    setPhone("");
    setEmail("");
    setSelectedPaymentMethod(null);
    setPaymentReference("");
    setTrackingId("");
  };

  // ==========================================
  // SUPABASE SAVE FUNCTION
  // ==========================================
  const saveComplaintToSupabase = async (ref: string, tId: string, method: string) => {
    setIsSaving(true);
    let fileUrl = null;

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

    const { data: insertData, error: dbError } = await supabase.from('complaints').insert({
      user_id: user?.id || null, // ✅ Links complaint to the logged-in user
      tracking_id: tId,
      category: selectedCategory,
      item_type: selectedItem,
      custom_item: customItem || null,
      description: description,
      location: location,
      incident_date: incidentDate || null,
      full_name: fullName,
      phone: phone,
      email: email,
      payment_reference: ref,
      payment_method: method,
      status: 'pending',
      file_url: fileUrl,
    });

    if (dbError) {
      console.error("❌ Supabase Database Insert Error:", dbError);
      alert(`⚠️ Payment was successful, but there was an error saving your details.\n\nError: ${dbError.message}\n\nTracking ID: ${tId}`);
      setIsSaving(false);
    } else {
      console.log("✅ Successfully saved to Supabase:", insertData);
      setIsSaving(false);
      setIsSuccess(true);
    }
  };

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

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedItem("");
    setCustomItem("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePaystackPayment = () => {
    if (!selectedCategory) return;
    setIsProcessingPayment(true);
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      email: email,
      amount: categories.find(c => c.id === selectedCategory)?.priceNum * 100,
      currency: "NGN",
      ref: "HLRS_" + Date.now() + "_" + Math.floor(Math.random() * 1000000),
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Category", variable_name: "category", value: selectedCategory },
          { display_name: "Item", variable_name: "item", value: selectedItem === "Other" ? customItem : selectedItem }
        ]
      },
      callback: (response: any) => {
        const tId = generateTrackingId();
        setPaymentReference(response.reference);
        saveComplaintToSupabase(response.reference, tId, 'paystack');
      },
      onClose: () => {
        setIsProcessingPayment(false);
      }
    });
    handler.openIframe();
  };

  const handleFlutterwavePayment = () => {
    if (!selectedCategory) return;
    setIsProcessingPayment(true);
    const tx_ref = "HLRS_FLW_" + Date.now() + "_" + Math.floor(Math.random() * 1000000);
    
    (window as any).FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-XID",
      tx_ref: tx_ref,
      amount: categories.find(c => c.id === selectedCategory)?.priceNum || 0,
      currency: "NGN",
      payment_options: "card, mobilemoney, bank, ussd",
      customer: {
        email: email,
        phone_number: phone,
        name: fullName,
      },
      customizations: {
        title: "Homeland Recovery Services",
        description: `Payment for ${selectedCategory} - ${selectedItem === "Other" ? customItem : selectedItem}`,
        logo: "https://your-logo-url.com/logo.png",
      },
      callback: (response: any) => {
        console.log("✅ Flutterwave Callback Response:", response);
        const isSuccess = response.status === "successful" || response.status === "success" || response.transaction_id;

        if (isSuccess) {
          const ref = response.transaction_id || response.tx_ref || "FLW-SUCCESS";
          const tId = generateTrackingId();
          setPaymentReference(ref);
          saveComplaintToSupabase(ref, tId, 'flutterwave');
        } else {
          setIsProcessingPayment(false);
          if (response.status !== "cancelled" && response.status !== "incomplete") {
            alert("Payment was not successful. Please check your card details and try again.");
          }
        }
      },
      onclose: () => {
        setIsProcessingPayment(false);
      }
    });
  };

  const handlePayPalPayment = () => {
    if (!selectedCategory || !(window as any).paypal) return;
    setIsProcessingPayment(true);
    const amount = categories.find(c => c.id === selectedCategory)?.priceNum || 0;
    
    (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: (amount / 750).toFixed(2),
              currency_code: 'USD'
            },
            description: `Homeland Recovery - ${selectedCategory}`
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          const tId = generateTrackingId();
          setPaymentReference(details.id);
          saveComplaintToSupabase(details.id, tId, 'paypal');
        });
      },
      onCancel: () => {
        setIsProcessingPayment(false);
      },
      onError: (err: any) => {
        console.error("PayPal error:", err);
        setIsProcessingPayment(false);
        alert("Payment failed. Please try again.");
      }
    }).render('#paypal-button-container');
  };

  const initiatePayment = () => {
    if (!selectedPaymentMethod) return;
    switch (selectedPaymentMethod) {
      case "paystack": handlePaystackPayment(); break;
      case "flutterwave": handleFlutterwavePayment(); break;
      case "paypal": handlePayPalPayment(); break;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("paystack-js")) {
        const paystackScript = document.createElement("script");
        paystackScript.src = "https://js.paystack.co/v1/inline.js";
        paystackScript.id = "paystack-js";
        document.body.appendChild(paystackScript);
      }
      if (!document.getElementById("flutterwave-js")) {
        const flutterwaveScript = document.createElement("script");
        flutterwaveScript.src = "https://checkout.flutterwave.com/v3.js";
        flutterwaveScript.id = "flutterwave-js";
        document.body.appendChild(flutterwaveScript);
      }
      if (!document.getElementById("paypal-js")) {
        const paypalScript = document.createElement("script");
        paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"}&currency=USD`;
        paypalScript.id = "paypal-js";
        document.body.appendChild(paypalScript);
      }
    }
  }, []);

  const canProceedStep1 = selectedCategory !== null;
  const canProceedStep2 = selectedItem !== "" && (selectedItem !== "Other" || customItem.trim() !== "") && description.trim() !== "";
  const canProceedStep3 = fullName.trim() !== "" && phone.trim() !== "" && email.trim() !== "";
  const canProceedStep4 = selectedPaymentMethod !== null;

  const nextStep = () => {
    if (currentStep === 1 && canProceedStep1) setCurrentStep(2);
    else if (currentStep === 2 && canProceedStep2) setCurrentStep(3);
    else if (currentStep === 3 && canProceedStep3) setCurrentStep(4);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const bgMain = "bg-[#D9B8FF]";
  const textMain = "text-slate-900";
  const textMuted = "text-slate-600";
  const glassBg = "bg-white/60";
  const glassBorder = "border-white/50";
  const inputBg = "bg-white/80";
  const inputBorder = "border-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20";

  return (
    <section className={`relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-3 sm:px-4 flex items-center justify-center overflow-hidden ${bgMain}`}>
      <AnimatePresence>
        {isSuccess && <CelebrationRain />}
      </AnimatePresence>

      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-400/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-400/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }} />

      <div className="container mx-auto max-w-4xl relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div key="auth-gate" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }} className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] border ${glassBorder} ${glassBg} backdrop-blur-2xl shadow-2xl shadow-purple-900/10 p-6 sm:p-8 md:p-12`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-white/60 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6 border border-purple-200 shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${textMain}`}>
                  {t("Secure Access", "Secure Access")}
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`text-sm sm:text-base ${textMuted} mb-8 px-2`}>
                  {t("Please login or create an account to lodge your complaint securely.", "Abeg login or create account make you fit lodge your complaint securely.")}
                </motion.p>
                <div className="relative flex w-full bg-purple-900/5 rounded-xl p-1 mb-8 border border-purple-200/50">
                  <motion.div layoutId="active-auth-tab" className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg shadow-md" animate={{ left: authMode === "login" ? "4px" : "calc(50% + 0px)" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  <button onClick={() => { setAuthMode("login"); setAuthError(null); }} className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors ${authMode === "login" ? "text-white" : "text-slate-500 hover:text-slate-900"}`}>{t("Login", "Login")}</button>
                  <button onClick={() => { setAuthMode("signup"); setAuthError(null); }} className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors ${authMode === "signup" ? "text-white" : "text-slate-500 hover:text-slate-900"}`}>{t("Sign Up", "Sign Up")}</button>
                </div>
                
                <motion.form key={authMode} initial={{ opacity: 0, x: authMode === "login" ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} onSubmit={handleAuth} className="w-full space-y-4 text-left px-2 sm:px-0">
                  {authError && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-200">
                      {authError}
                    </motion.p>
                  )}
                  
                  {authMode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input required type="text" value={authFullName} onChange={(e) => setAuthFullName(e.target.value)} placeholder={t("Full Name", "Full Name")} className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input required type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder={t("Email Address", "Email Address")} className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input required type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder={t("Password", "Password")} className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                  </div>
                  <button type="submit" disabled={authLoading} className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-sm sm:text-base">
                    {authLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (authMode === "login" ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />)}
                    {authLoading ? t("Processing...", "E dey process...") : (authMode === "login" ? t("Login to Continue", "Login to Continue") : t("Create Account", "Create Account"))}
                  </button>
                </motion.form>
              </div>
            </motion.div>
          ) : (
            <motion.div key="complaint-form" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }} className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] border ${glassBorder} ${glassBg} backdrop-blur-2xl shadow-2xl shadow-purple-900/10 p-6 sm:p-8 md:p-10`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-white/60 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                
                {isSaving ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16 px-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6" />
                    <h2 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${textMain}`}>{t("Saving Your Complaint...", "We dey save your complaint...")}</h2>
                    <p className={`${textMuted} max-w-md mx-auto text-sm sm:text-base`}>{t("Please do not close this window while we secure your data.", "Abeg no close this window while we dey secure your data.")}</p>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 sm:py-12 px-4">
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
                      <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" />
                    </div>
                    <h2 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${textMain}`}>{t("Payment Successful!", "Payment Successful!")}</h2>
                    <p className={`${textMuted} max-w-lg mx-auto mb-4 text-sm sm:text-base px-2`}>{t("Your complaint has been lodged and payment received.", "Your complaint don lodge and we don receive your payment.")}</p>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 max-w-md mx-auto space-y-3">
                      <div>
                        <p className="text-xs text-purple-600 font-semibold mb-1">{t("Payment Reference", "Payment Reference")}:</p>
                        <p className="text-sm font-mono font-bold text-slate-900 break-all">{paymentReference}</p>
                      </div>
                      <div className="pt-3 border-t border-purple-200">
                        <p className="text-xs text-purple-600 font-semibold mb-1">{t("Your Tracking ID", "Your Tracking ID")}:</p>
                        <p className="text-xl font-mono font-extrabold text-purple-700 break-all">{trackingId}</p>
                      </div>
                    </div>
                    
                    <p className={`${textMuted} max-w-lg mx-auto mb-8 text-sm sm:text-base px-2`}>{t("Save this Tracking ID to track your case status.", "Keep this Tracking ID make you fit track your case status.")}</p>
                    
                    <button onClick={handleSignOut} className={`px-6 sm:px-8 py-3 bg-purple-100 hover:bg-purple-200 ${textMain} font-bold rounded-xl border border-purple-200 transition-all text-sm sm:text-base`}>
                      {t("Return Home & Sign Out", "Go Back Home & Sign Out")}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                      <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                        <motion.div 
                          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 -translate-y-1/2 z-0"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                            <motion.div 
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                currentStep > step ? "bg-purple-600 border-purple-600 text-white" :
                                currentStep === step ? "bg-white border-purple-600 text-purple-600 shadow-md shadow-purple-500/20" :
                                "bg-white border-slate-300 text-slate-400"
                              }`}
                              animate={{ scale: currentStep === step ? 1.1 : 1 }}
                            >
                              {currentStep > step ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <span className="text-xs sm:text-sm font-bold">{step}</span>}
                            </motion.div>
                            <span className={`hidden sm:block text-xs font-semibold transition-colors ${currentStep >= step ? "text-purple-700" : "text-slate-400"}`}>
                              {step === 1 ? t("Category", "Category") : step === 2 ? t("Details", "Details") : step === 3 ? t("Review", "Review") : t("Payment", "Payment")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <div className="text-center mb-6 sm:mb-8 px-2">
                            <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4 border border-amber-200">
                              <AlertCircle className="h-6 w-6 text-amber-600" />
                            </div>
                            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${textMain}`}>{t("Select Category & Fee", "Select Category & Fee")}</h2>
                            <p className={`${textMuted} max-w-xl mx-auto text-sm sm:text-base`}>{t("Choose the category that best matches your complaint.", "Choose the category wey best match your complaint.")}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {categories.map((cat) => (
                              <motion.button key={cat.id} type="button" onClick={() => handleCategorySelect(cat.id)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${selectedCategory === cat.id ? "bg-purple-100 border-purple-500 shadow-md" : "bg-white/60 border-slate-200 hover:border-purple-300 hover:bg-white/80"}`}>
                                {selectedCategory === cat.id && <motion.div layoutId="selected-cat-bg" className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5" />}
                                <div className="relative z-10 flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`p-1.5 rounded-lg ${selectedCategory === cat.id ? "bg-purple-500/20 text-purple-700" : "bg-slate-100 text-slate-500"}`}>{cat.icon}</span>
                                      <h4 className={`font-bold text-sm sm:text-base ${selectedCategory === cat.id ? "text-slate-900" : "text-slate-700"}`}>{cat.title}</h4>
                                    </div>
                                    <p className={`text-xs mt-1 leading-relaxed ${selectedCategory === cat.id ? "text-purple-800" : "text-slate-500"}`}>{cat.desc}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Fee</p>
                                    <p className={`text-lg font-extrabold ${selectedCategory === cat.id ? "text-amber-600" : "text-slate-700"}`}>₦{cat.price}</p>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                          <div className="flex justify-end px-2 sm:px-0">
                            <button type="button" onClick={nextStep} disabled={!canProceedStep1} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base">
                              {t("Continue", "Continue")} <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <div className="text-center mb-6 sm:mb-8 px-2">
                            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${textMain}`}>{t("Incident Details", "Incident Details")}</h2>
                            <p className={`${textMuted} max-w-xl mx-auto text-sm sm:text-base`}>{t("Provide specific details about what happened.", "Provide specific details about wetin happen.")}</p>
                          </div>
                          <div className="space-y-5 mb-8 px-2 sm:px-0">
                            <div>
                              <label className={`text-xs sm:text-sm font-medium ${textMuted} mb-2 block`}>{t("Select Item / Issue Type", "Select Item / Issue Type")}</label>
                              <select required value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} focus:outline-none transition-all appearance-none text-sm sm:text-base`}>
                                <option value="" disabled className="bg-white">{t("-- Choose from list --", "-- Choose from list --")}</option>
                                {selectedCategory && {
                                  A: ["Phone Charger", "Earphones", "Wallet", "Keys", "Umbrella", "Water Bottle", "Small Bag", "ID Card", "Calculator", "Flash Drive", "Other"],
                                  B: ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Bicycle", "Jewelry", "Camera", "Designer Handbag", "Shoes", "Gaming Console", "Other"],
                                  C: ["Child", "Teenager", "Adult", "Elderly Person", "Pet (Dog/Cat)", "Other"],
                                  D: ["Litigation", "Arbitration", "Mediation", "Negotiation", "Online Dispute Resolution (ODR)", "Other"]
                                }[selectedCategory]?.map(item => (
                                  <option key={item} value={item} className="bg-white text-slate-900">{item}</option>
                                ))}
                              </select>
                            </div>
                            <AnimatePresence>
                              {selectedItem === "Other" && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                  <input required type="text" value={customItem} onChange={(e) => setCustomItem(e.target.value)} placeholder={t("Please specify the item or issue...", "Abeg specify the item or issue...")} className={`w-full px-4 py-3.5 ${inputBg} border border-amber-500/30 rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base`} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <div className="relative">
                              <label className={`text-xs sm:text-sm font-medium ${textMuted} mb-2 block`}>{t("Description of Incident", "Description of Incident")}</label>
                              <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("Describe what happened in detail...", "Describe wetin happen in detail...")} className={`w-full px-4 py-3.5 pr-12 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all resize-none text-sm sm:text-base`} />
                              <button type="button" onClick={toggleListening} className={`absolute right-3 top-9 p-2 rounded-lg transition-all ${isListening ? "bg-red-100 text-red-600 animate-pulse" : "bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"}`} title={t("Voice Type", "Voice Type")}>
                                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                              </button>
                              {isListening && <span className="absolute right-14 top-10 text-xs text-red-600 font-medium animate-pulse">{t("Listening...", "E dey listen...")}</span>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="relative">
                                <label className={`text-xs sm:text-sm font-medium ${textMuted} mb-2 block`}>{t("Location of Loss / Incident", "Location of Loss / Incident")}</label>
                                <div className="relative">
                                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                                  <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t("e.g., Wuse Zone 5, Abuja", "e.g., Wuse Zone 5, Abuja")} className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                                </div>
                              </div>
                              <div className="relative">
                                <label className={`text-xs sm:text-sm font-medium ${textMuted} mb-2 block`}>{t("Date of Incident", "Date of Incident")}</label>
                                <div className="relative">
                                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                                  <input required type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className={`w-full pl-12 pr-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl text-slate-900 focus:outline-none transition-all text-sm sm:text-base`} />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className={`text-xs sm:text-sm font-medium ${textMuted} mb-2 block`}>{t("Upload Evidence (Photos, Documents)", "Upload Evidence (Photos, Documents)")}</label>
                              <input ref={fileInputRef} type="file" id="file-upload" className="hidden" accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} />
                              <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${uploadedFile ? "border-emerald-500/30 bg-emerald-50" : "border-slate-200 hover:border-purple-400 hover:bg-purple-50/50"}`}>
                                {uploadedFile ? (
                                  <div className="flex items-center gap-3 w-full">
                                    <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0"><FileText className="h-6 w-6 text-emerald-600" /></div>
                                    <div className="text-left min-w-0 flex-1">
                                      <p className="text-sm font-bold text-emerald-700 truncate">{uploadedFile.name}</p>
                                      <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button type="button" onClick={(e) => { e.preventDefault(); removeFile(); }} className="ml-2 p-1 rounded-full hover:bg-slate-200 transition-colors flex-shrink-0"><X className="h-4 w-4 text-slate-500" /></button>
                                  </div>
                                ) : (
                                  <>
                                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                    <p className={`text-sm font-medium ${textMain}`}>{t("Click to upload or drag and drop", "Click to upload or drag and drop")}</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                                  </>
                                )}
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4 px-2 sm:px-0">
                            <button type="button" onClick={prevStep} className="px-6 py-3 sm:py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /> {t("Back", "Back")}
                            </button>
                            <button type="button" onClick={nextStep} disabled={!canProceedStep2} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base">
                              {t("Continue", "Continue")} <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <div className="text-center mb-6 sm:mb-8 px-2">
                            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${textMain}`}>{t("Review & Submit", "Review & Submit")}</h2>
                            <p className={`${textMuted} max-w-xl mx-auto text-sm sm:text-base`}>{t("Confirm your details before proceeding to payment.", "Confirm your details before proceeding to payment.")}</p>
                          </div>
                          <div className="space-y-6 mb-8 px-2 sm:px-0">
                            <div className="p-4 sm:p-5 rounded-2xl bg-white/50 border border-slate-200/50">
                              <h3 className={`text-sm font-bold ${textMain} mb-4 flex items-center gap-2`}><User className="h-4 w-4 text-purple-600" /> {t("Contact Information", "Contact Information")}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t("Full Name", "Full Name")} className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("Phone Number", "Phone Number")} className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base`} />
                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("Email Address", "Email Address")} className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-slate-400 focus:outline-none transition-all md:col-span-2 text-sm sm:text-base`} />
                              </div>
                            </div>
                            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/50 border border-purple-200/50">
                              <h3 className={`text-sm font-bold ${textMain} mb-4 flex items-center gap-2`}><Package className="h-4 w-4 text-purple-600" /> {t("Case Summary", "Case Summary")}</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">{t("Category", "Category")}:</span>
                                  <span className={`font-semibold ${textMain}`}>{categories.find(c => c.id === selectedCategory)?.title}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">{t("Item / Issue", "Item / Issue")}:</span>
                                  <span className={`font-semibold ${textMain}`}>{selectedItem === "Other" ? customItem : selectedItem}</span>
                                </div>
                                <div className="pt-3 border-t border-purple-200/50 flex justify-between items-center">
                                  <span className="font-bold text-slate-700">{t("Total Registration Fee", "Total Registration Fee")}:</span>
                                  <span className="text-xl font-extrabold text-amber-600">₦{categories.find(c => c.id === selectedCategory)?.price}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4 px-2 sm:px-0">
                            <button type="button" onClick={prevStep} className="px-6 py-3 sm:py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /> {t("Back", "Back")}
                            </button>
                            <button type="button" onClick={nextStep} disabled={!canProceedStep3} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base">
                              {t("Continue to Payment", "Continue to Payment")} <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <div className="text-center mb-6 sm:mb-8 px-2">
                            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 border border-purple-200">
                              <CreditCard className="h-6 w-6 text-purple-600" />
                            </div>
                            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${textMain}`}>{t("Select Payment Method", "Select Payment Method")}</h2>
                            <p className={`${textMuted} max-w-xl mx-auto text-sm sm:text-base`}>{t("Choose your preferred payment gateway to complete the registration.", "Choose your preferred payment gateway to complete the registration.")}</p>
                          </div>
                          <div className="space-y-4 mb-8 px-2 sm:px-0">
                            <motion.button type="button" onClick={() => setSelectedPaymentMethod("paystack")} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${selectedPaymentMethod === "paystack" ? "bg-purple-100 border-purple-500 shadow-md" : "bg-white/60 border-slate-200 hover:border-purple-300 hover:bg-white/80"}`}>
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${selectedPaymentMethod === "paystack" ? "bg-purple-500/20" : "bg-slate-100"}`}><CreditCard className={`h-6 w-6 ${selectedPaymentMethod === "paystack" ? "text-purple-700" : "text-slate-500"}`} /></div>
                                <div className="flex-1">
                                  <h4 className={`font-bold text-base ${selectedPaymentMethod === "paystack" ? "text-slate-900" : "text-slate-700"}`}>Paystack</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">{t("Pay with Card, Bank Transfer, or USSD", "Pay with Card, Bank Transfer, or USSD")}</p>
                                </div>
                                {selectedPaymentMethod === "paystack" && <Check className="h-5 w-5 text-purple-600" />}
                              </div>
                            </motion.button>
                            <motion.button type="button" onClick={() => setSelectedPaymentMethod("flutterwave")} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${selectedPaymentMethod === "flutterwave" ? "bg-purple-100 border-purple-500 shadow-md" : "bg-white/60 border-slate-200 hover:border-purple-300 hover:bg-white/80"}`}>
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${selectedPaymentMethod === "flutterwave" ? "bg-purple-500/20" : "bg-slate-100"}`}><CreditCard className={`h-6 w-6 ${selectedPaymentMethod === "flutterwave" ? "text-purple-700" : "text-slate-500"}`} /></div>
                                <div className="flex-1">
                                  <h4 className={`font-bold text-base ${selectedPaymentMethod === "flutterwave" ? "text-slate-900" : "text-slate-700"}`}>Flutterwave</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">{t("Pay with Card, Mobile Money, or Bank", "Pay with Card, Mobile Money, or Bank")}</p>
                                </div>
                                {selectedPaymentMethod === "flutterwave" && <Check className="h-5 w-5 text-purple-600" />}
                              </div>
                            </motion.button>
                            <motion.button type="button" onClick={() => setSelectedPaymentMethod("paypal")} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${selectedPaymentMethod === "paypal" ? "bg-purple-100 border-purple-500 shadow-md" : "bg-white/60 border-slate-200 hover:border-purple-300 hover:bg-white/80"}`}>
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${selectedPaymentMethod === "paypal" ? "bg-purple-500/20" : "bg-slate-100"}`}><CreditCard className={`h-6 w-6 ${selectedPaymentMethod === "paypal" ? "text-purple-700" : "text-slate-500"}`} /></div>
                                <div className="flex-1">
                                  <h4 className={`font-bold text-base ${selectedPaymentMethod === "paypal" ? "text-slate-900" : "text-slate-700"}`}>PayPal</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">{t("Pay with PayPal account (International)", "Pay with PayPal account (International)")}</p>
                                </div>
                                {selectedPaymentMethod === "paypal" && <Check className="h-5 w-5 text-purple-600" />}
                              </div>
                            </motion.button>
                          </div>
                          <div className="flex items-center justify-between gap-4 px-2 sm:px-0">
                            <button type="button" onClick={prevStep} className="px-6 py-3 sm:py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /> {t("Back", "Back")}
                            </button>
                            <button type="button" onClick={initiatePayment} disabled={!canProceedStep4 || isProcessingPayment} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base">
                              {isProcessingPayment ? (
                                <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />{t("Processing...", "Processing...")}</>
                              ) : (
                                <>{t("Pay Now", "Pay Now")}<ArrowRight className="h-5 w-5" /></>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div id="paypal-button-container" className="hidden"></div>
    </section>
  );
}