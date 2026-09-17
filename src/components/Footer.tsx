"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, MessageCircle, Lock, FileCheck, BadgeCheck, Building2, ArrowUp, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      setScrollProgress(totalScroll / windowHeight);
      setIsVisible(totalScroll > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    mouseX.set(Math.max(-15, Math.min(15, e.clientX - (rect.left + rect.width / 2))));
    mouseY.set(Math.max(-15, Math.min(15, e.clientY - (rect.top + rect.height / 2))));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40"
    >
      <motion.button
        ref={buttonRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        style={{ x: springX, y: springY }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 text-white shadow-xl border border-slate-700 group"
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
}

function SpotlightColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const columnRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  return (
    <div
      ref={columnRef}
      onMouseMove={(e) => {
        const rect = columnRef.current!.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => { mouseX.set(-200); mouseY.set(-200); }}
      className="relative overflow-hidden rounded-2xl p-3 sm:p-4 -m-3 sm:-m-4 transition-colors duration-300 group"
    >
      <motion.div
        className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 40%, transparent 70%)" }}
      />
      <div className="relative z-10">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-6">{title}</h4>
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group/link relative inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors duration-200">
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover/link:w-full transition-all duration-300 ease-out" />
        </span>
        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
      </Link>
    </li>
  );
}

function SmartNewsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"empty" | "valid" | "invalid">("empty");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (!email) { setValidationStatus("empty"); return; }
    setValidationStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "valid" : "invalid");
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

  return (
    <div className="lg:text-right flex flex-col justify-center">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t("footer_newsletter_title")}</h3>
      <p className="text-xs sm:text-sm text-slate-600 mb-4">{t("footer_newsletter_desc")}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 lg:justify-end">
        <div className="relative w-full sm:w-64">
          <label className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none ${email || isFocused ? "top-1 text-[10px] font-semibold text-amber-600" : "top-1/2 -translate-y-1/2 text-sm text-slate-500"}`}>
            {t("footer_newsletter_input")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={submissionStatus === "success"}
            className={`w-full px-3 sm:px-4 pt-6 pb-2 bg-white border-2 rounded-xl text-sm sm:text-base text-slate-900 focus:outline-none transition-all duration-300 ${
              submissionStatus === "success" ? "border-emerald-500 bg-emerald-50" :
              validationStatus === "invalid" && email ? "border-red-500" :
              validationStatus === "valid" ? "border-amber-500" : "border-slate-200 focus:border-amber-500/50"
            }`}
          />
          {email && submissionStatus !== "success" && (
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
              {validationStatus === "valid" ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" /> : <span className="text-red-500 text-base sm:text-lg font-bold">×</span>}
            </div>
          )}
        </div>
        <motion.button
          type="submit"
          disabled={validationStatus !== "valid" || submissionStatus !== "idle"}
          whileHover={{ scale: validationStatus === "valid" && submissionStatus === "idle" ? 1.02 : 1 }}
          whileTap={{ scale: validationStatus === "valid" && submissionStatus === "idle" ? 0.98 : 1 }}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base ${
            submissionStatus === "success" ? "bg-emerald-500 text-white" :
            validationStatus === "valid" ? "bg-amber-600 hover:bg-amber-700 text-white hover:shadow-lg" : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {submissionStatus === "submitting" ? "Subscribing..." : submissionStatus === "success" ? "Subscribed!" : t("footer_newsletter_button")}
        </motion.button>
      </form>
      {validationStatus === "invalid" && email && (
        <p className="text-xs text-red-500 mt-2 lg:text-right">{t("footer_newsletter_error")}</p>
      )}
    </div>
  );
}

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
      { name: t("footer_link_about"), href: "/about" },
      { name: t("footer_link_careers"), href: "/careers" },
      { name: t("footer_link_press"), href: "/press" },
      { name: t("footer_link_contact"), href: "/contact" },
    ],
    services: [
      { name: t("footer_link_lost"), href: "/complaints" },
      { name: t("footer_link_found"), href: "/report" },
      { name: t("footer_link_legal"), href: "/legal-services" },
      { name: t("footer_link_track"), href: "/track" },
    ],
    legal: [
      { name: t("footer_link_privacy"), href: "/privacy" },
      { name: t("footer_link_terms"), href: "/terms" },
      { name: t("footer_link_cookies"), href: "/cookies" },
    ],
  };

  const trustBadges = [
    { icon: <Lock className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("footer_badge_ssl"), sublabel: t("footer_badge_ssl_sub") },
    { icon: <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("footer_badge_cac"), sublabel: t("footer_badge_cac_sub") },
    { icon: <FileCheck className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("footer_badge_ndpr"), sublabel: t("footer_badge_ndpr_sub") },
    { icon: <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />, label: t("footer_badge_paystack"), sublabel: t("footer_badge_paystack_sub") },
  ];

  return (
    <footer className="relative bg-white text-slate-600 border-t border-slate-200 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[300px] bg-amber-500/5 blur-[80px] sm:blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 pt-16 sm:pt-20 pb-8 sm:pb-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 pb-8 sm:pb-12 border-b border-slate-200"
        >
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl text-slate-900 mb-4 group">
              <div className="p-1.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span>Homeland Recovery <br className="hidden sm:block" /><span className="text-amber-600">Services Ltd</span></span>
            </Link>
            <p className="text-sm sm:text-base text-slate-600 max-w-sm leading-relaxed mb-6">
              {t("footer_about_text")}
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {socialIcons.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/30 hover:bg-amber-50 transition-all duration-300">
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>
          <SmartNewsletter />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <SpotlightColumn title={t("footer_col_company")}>
            <ul className="space-y-3 sm:space-y-4">{footerLinks.company.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}</ul>
          </SpotlightColumn>
          <SpotlightColumn title={t("footer_col_services")}>
            <ul className="space-y-3 sm:space-y-4">{footerLinks.services.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}</ul>
          </SpotlightColumn>
          <SpotlightColumn title={t("footer_col_legal")}>
            <ul className="space-y-3 sm:space-y-4">{footerLinks.legal.map((link) => (<FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>))}</ul>
          </SpotlightColumn>
          <SpotlightColumn title={t("footer_col_contact")}>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <span>Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm">
                <MessageCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <a href="https://wa.me/2349136931832" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors font-medium">WhatsApp: 09136931832</a>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm">
                <Phone className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <a href="tel:+2349065173333" className="hover:text-amber-600 transition-colors font-medium">Call: +234 906 517 3333</a>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm">
                <Mail className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="hover:text-amber-600 transition-colors break-all font-medium">homelandrecoveryservicesltd@gmail.com</a>
              </li>
            </ul>
          </SpotlightColumn>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-6 sm:py-8 mb-6 sm:mb-8 border-y border-slate-200"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-2">
            {trustBadges.map((badge, index) => (
              <div key={index} className="group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-slate-50/50 border border-slate-200 hover:border-amber-500/40 hover:bg-amber-50/50 hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="p-1.5 sm:p-2 rounded-lg bg-white group-hover:bg-amber-100 transition-colors duration-300">
                  <div className="text-slate-500 group-hover:text-amber-600 transition-colors duration-300">{badge.icon}</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-amber-700 transition-colors duration-300">{badge.label}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-wider group-hover:text-amber-600/70 transition-colors duration-300">{badge.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} Homeland Recovery Services Ltd. {t("footer_rights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors">
              <span className="relative">{t("footer_privacy")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
            <Link href="/terms" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors">
              <span className="relative">{t("footer_terms")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
            <Link href="/cookies" className="group/link relative inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors">
              <span className="relative">{t("footer_cookies")}<span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover/link:w-full transition-all duration-300 ease-out" /></span>
            </Link>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </footer>
  );
}