"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, MessageCircle, Lock, FileCheck, BadgeCheck, Building2, ArrowUp, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ==========================================
// MAGNETIC BACK TO TOP BUTTON COMPONENT
// ==========================================
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      
      setScrollProgress(Number(scroll));
      setIsVisible(totalScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = Math.max(-15, Math.min(15, e.clientX - centerX));
    const y = Math.max(-15, Math.min(15, e.clientY - centerY));
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mobile: 48x48 (r=20), Desktop: 56x56 (r=24)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const radius = isMobile ? 20 : 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress * circumference);
  const center = isMobile ? 24 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40"
    >
      <motion.button
        ref={buttonRef}
        onClick={scrollToTop}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 dark:shadow-white/10 border border-slate-700 dark:border-slate-200 group"
        aria-label="Back to top"
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-800" />
          <motion.circle
            cx={center} cy={center} r={radius} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            className="text-cyan-500 dark:text-cyan-500"
            style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
          />
        </svg>
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span className="absolute right-full mr-2 sm:mr-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
          Back to Top
        </span>
      </motion.button>
    </motion.div>
  );
}

// ==========================================
// SPOTLIGHT COLUMN COMPONENT
// ==========================================
function SpotlightColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const columnRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!columnRef.current) return;
    const rect = columnRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
  };

  return (
    <div
      ref={columnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl p-3 sm:p-4 -m-3 sm:-m-4 transition-colors duration-300"
    >
      <motion.div
        className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
        }}
      />
      
      <div className="relative z-10">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">{title}</h4>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// ANIMATED FOOTER LINK COMPONENT
// ==========================================
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group/link relative inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" />
        </span>
        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
      </Link>
    </li>
  );
}

// ==========================================
// SMART NEWSLETTER COMPONENT
// ==========================================
function SmartNewsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"empty" | "valid" | "invalid">("empty");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (!email) {
      setValidationStatus("empty");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidationStatus(emailRegex.test(email) ? "valid" : "invalid");
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationStatus !== "valid") return;
    setSubmissionStatus("submitting");
    setTimeout(() => {
      setSubmissionStatus("success");
      setEmail("");
      setTimeout(() => setSubmissionStatus("idle"), 3000);
    }, 1500);
  };

  const hasValue = email.length > 0;

  return (
    <div className="lg:text-right flex flex-col justify-center">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("Stay Updated", "Stay Updated")}</h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">{t("Get the latest recovery tips and company news.", "Get the latest recovery tips and company news.")}</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 lg:justify-end">
        <div className="relative w-full sm:w-64">
          <label className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none ${hasValue || isFocused ? "top-1 text-[10px] font-semibold text-cyan-600 dark:text-cyan-400" : "top-1/2 -translate-y-1/2 text-sm text-slate-500"}`}>
            {t("Enter your email", "Enter your email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={submissionStatus === "success"}
            className={`w-full px-3 sm:px-4 pt-6 pb-2 bg-white dark:bg-slate-800 border-2 rounded-xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none transition-all duration-300 ${
              submissionStatus === "success" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" :
              validationStatus === "invalid" && hasValue ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" :
              validationStatus === "valid" ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" :
              "border-slate-200 dark:border-slate-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            }`}
          />
          <AnimatePresence>
            {hasValue && submissionStatus !== "success" && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                {validationStatus === "valid" ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" /> : validationStatus === "invalid" ? <span className="text-red-500 text-base sm:text-lg font-bold">×</span> : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={validationStatus !== "valid" || submissionStatus !== "idle"}
          whileHover={{ scale: submissionStatus === "idle" && validationStatus === "valid" ? 1.02 : 1 }}
          whileTap={{ scale: submissionStatus === "idle" && validationStatus === "valid" ? 0.98 : 1 }}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base ${
            submissionStatus === "success" ? "bg-emerald-500 text-white" :
            validationStatus === "valid" ? "bg-cyan-600 hover:bg-cyan-700 text-white hover:shadow-lg hover:shadow-cyan-500/20" :
            "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          <AnimatePresence mode="wait">
            {submissionStatus === "submitting" ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white/30 border-t-white rounded-full" />
                <span>Subscribing...</span>
              </motion.div>
            ) : submissionStatus === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex items-center gap-2">
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Subscribed!</span>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                {t("Subscribe", "Subscribe")}
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <AnimatePresence>
        {validationStatus === "invalid" && hasValue && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-500 mt-2 lg:text-right">
            {t("Please enter a valid email address", "Please enter a valid email address")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom SVG Icons for Social Media
const FacebookIcon = () => (<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const LinkedinIcon = () => (<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);
const TikTokIcon = () => (<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>);

const socialIcons = [
  { Icon: FacebookIcon, href: "https://www.facebook.com/homelandrec", label: "Facebook" },
  { Icon: TwitterIcon, href: "https://x.com/Homelandrec", label: "X (Twitter)" },
  { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/homelandrec/", label: "LinkedIn" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@homelandrec", label: "TikTok" },
];

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: t("About Us", "About Us"), href: "/about" },
      { name: t("Careers", "Careers"), href: "/careers" },
      { name: t("Press", "Press"), href: "/press" },
      { name: t("Contact", "Contact Us"), href: "/contact" },
    ],
    services: [
      { name: t("Lost/Complaint", "Lost/Complain"), href: "/complaints" },
      { name: t("Found/Report", "Find/Report"), href: "/report" },
      { name: t("Legal Services", "Legal Services"), href: "/legal-services" },
      { name: t("Track ID", "Track ID"), href: "/track" },
    ],
    legal: [
      { name: t("Privacy Policy", "Privacy Policy"), href: "/privacy" },
      { name: t("Terms of Service", "Terms of Service"), href: "/terms" },
      { name: t("NDPR Compliance", "NDPR Compliance"), href: "/compliance" },
      { name: t("Cookie Policy", "Cookie Policy"), href: "/cookies" },
    ],
  };

  const trustBadges = [
    { icon: <Lock className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("256-Bit SSL Encrypted", "256-Bit SSL Encrypted"), sublabel: t("Secure Connection", "Secure Connection") },
    { icon: <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("CAC Registered: RC 9578175", "CAC Registered: RC 9578175"), sublabel: t("Officially Mandated", "Officially Mandated") },
    { icon: <FileCheck className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("NDPR Compliant", "NDPR Compliant"), sublabel: t("Data Protection", "Data Protection") },
    { icon: <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("Paystack Verified", "Paystack Verified"), sublabel: t("Secure Payments", "Secure Payments") },
  ];

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[300px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 pt-16 sm:pt-20 pb-8 sm:pb-10 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 pb-8 sm:pb-12 border-b border-slate-200 dark:border-slate-800"
        >
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white mb-4 group">
              <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span>
                Homeland Recovery <br className="hidden sm:block" />
                <span className="text-cyan-600 dark:text-cyan-400">Service Ltd</span>
              </span>
            </Link>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
              {t("Global leaders in secure recovery. We provide the fastest, most verified way to recover lost property and resolve legal disputes.", "The number one place for secure recovery. We dey provide the fastest and most verified way to recover lost property and settle legal wahala.")}
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {socialIcons.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all duration-300">
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          <SmartNewsletter />
        </motion.div>

        {/* Middle Section: Spotlight Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <SpotlightColumn title={t("Company", "Company")}>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}
            </ul>
          </SpotlightColumn>

          <SpotlightColumn title={t("Services", "Services")}>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.services.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}
            </ul>
          </SpotlightColumn>

          <SpotlightColumn title={t("Legal", "Legal")}>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.legal.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}
            </ul>
          </SpotlightColumn>

          <SpotlightColumn title={t("Contact", "Contact Us")}>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span>Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm">
                <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <a href="https://wa.me/2349136931832" target="_blank" rel="noopener noreferrer" className="group/link relative inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                  <span className="relative">WhatsApp: 09136931832<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm">
                <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <a href="tel:+2349065173333" className="group/link relative inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                  <span className="relative">Call: +234 906 517 3333<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm">
                <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="group/link relative inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors break-all font-medium">
                  <span className="relative">homelandrecoveryservicesltd@gmail.com<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              </li>
            </ul>
          </SpotlightColumn>
        </div>

        {/* Trust & Security Badge Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-6 sm:py-8 mb-6 sm:mb-8 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-2">
            {trustBadges.map((badge, index) => (
              <div key={index} className="group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-default">
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/40 transition-colors duration-300">
                  <div className="text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{badge.icon}</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors duration-300">{badge.label}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider group-hover:text-cyan-600/70 dark:group-hover:text-cyan-400/70 transition-colors duration-300">{badge.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center md:text-left">
            &copy; {currentYear} Homeland Recovery Service Ltd. {t("All rights reserved.", "All rights reserved.")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <span className="relative">{t("Privacy", "Privacy")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
            <Link href="/terms" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <span className="relative">{t("Terms", "Terms")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
            <Link href="/cookies" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <span className="relative">{t("Cookies", "Cookies")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
          </div>
        </div>

      </div>

      <BackToTopButton />
    </footer>
  );
}