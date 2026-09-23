"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navLinks = [
    { href: "/track", label: "Track ID" },
    { href: "/report", label: t("action_report") },
    { href: "/complaints", label: t("action_complaint") },
    { href: "/legal-services", label: t("action_legal") },
    { href: "/claim", label: t("action_flagged") }, 
    { href: "/flagged", label: t("action_flagged_items") }, 
    { href: "/contact", label: t("action_contact") },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
      style={{ perspective: "1000px" }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-amber-900/5 border-b border-slate-200/80" 
          : "bg-transparent border-transparent"
      }`}
    >
      {/* ✅ UPDATED: Adjusted padding for better space management */}
      <div className="w-full max-w-7xl mx-auto flex h-20 md:h-24 lg:h-28 items-center justify-between px-3 md:px-6">
        
        {/* ✅ UPDATED: Optimized logo size to prevent horizontal overflow */}
        <Link href="/" className="flex items-center shrink-0 group py-2" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            alt="Homeland Recovery Services Ltd Logo"
            width={280}
            height={280}
            className="w-14 h-14 md:w-20 md:h-20 xl:w-28 xl:h-28 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out flex-shrink-0"
            priority
          />
        </Link>

        {/* ✅ UPDATED: Tighter gaps and smaller text on lg, normal on xl to fit longer translations */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-3">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative px-1 xl:px-2 py-2 text-[11px] xl:text-sm font-bold transition-colors group whitespace-nowrap ${
                isScrolled 
                  ? "text-slate-700 hover:text-amber-600" 
                  : "text-slate-800 hover:text-amber-600"
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 bg-gradient-to-r from-amber-500 to-yellow-600 group-hover:w-3/4 w-0`} />
            </Link>
          ))}
        </div>

        {/* ✅ UPDATED: Language Dropdown with shrink-0 to prevent squishing */}
        <div className="hidden lg:block shrink-0">
          <div className="relative">
            <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 xl:h-4 xl:w-4 text-slate-500 pointer-events-none z-10" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="appearance-none bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] xl:text-sm font-bold rounded-full py-2 xl:py-2.5 pl-8 xl:pl-9 pr-6 xl:pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-700"
            >
              <option value="en">🇬🇧 English</option>
              <option value="pid">🇳🇬 Pidgin</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
              <option value="zh">🇨🇳 Chinese</option>
              <option value="ar">🇸🇦 Arabic</option>
            </select>
            <div className="absolute right-2 xl:right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <svg className="w-3 h-3 xl:w-4 xl:h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* ✅ UPDATED: Mobile Toggles (shows on lg and below now to save space) */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 shrink-0"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-5 w-5 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-5 w-5 text-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 overflow-hidden"
          >
            <div className="w-full max-w-7xl mx-auto px-5 py-6 flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-slate-800 font-bold text-base hover:bg-amber-50 rounded-xl transition-colors group"
                  >
                    <span>{link.label}</span>
                    <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity text-xl">→</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Language Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-3 pt-5 border-t border-slate-200"
              >
                <div className="relative w-full">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none z-10" />
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as any)}
                    className="appearance-none w-full bg-white border border-slate-200 text-slate-800 text-sm font-bold rounded-xl py-3 pl-9 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer"
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="pid">🇳🇬 Pidgin</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="de">🇩🇪 German</option>
                    <option value="zh">🇨🇳 Chinese</option>
                    <option value="ar">🇸🇦 Arabic</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}