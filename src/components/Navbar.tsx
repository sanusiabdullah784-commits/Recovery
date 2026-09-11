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
  const { lang, setLang } = useLanguage();
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
    { href: "/track", label: lang === "en" ? "Track ID" : "Track ID" },
    { href: "/report", label: lang === "en" ? "Found/Report" : "Find/Report" },
    { href: "/complaints", label: lang === "en" ? "Lost/Complaint" : "Lost/Complain" },
    { href: "/legal-services", label: lang === "en" ? "Legal Services" : "Legal Work" },
    { href: "/flagged", label: lang === "en" ? "Flagged Items" : "Flagged Items" },
    { href: "/contact", label: lang === "en" ? "Contact" : "Contact Us" },
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
      <div className="w-full max-w-7xl mx-auto flex h-16 md:h-24 items-center justify-between px-3 md:px-6">
        
        {/* Brand with Mobile-Optimized Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0 group" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            alt="Homeland Recovery Services Ltd Logo"
            width={120}
            height={120}
            className="w-10 h-10 md:w-20 md:h-20 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
            priority
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className={`font-extrabold text-sm md:text-xl transition-colors truncate ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>
              Homeland Recovery
            </span>
            <span className={`font-bold text-[10px] md:text-sm hidden sm:block transition-colors truncate ${isScrolled ? "text-amber-600" : "text-amber-600"}`}>
              Services Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Links - Strictly hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative px-2 py-2 text-sm xl:text-base font-semibold transition-colors group whitespace-nowrap ${
                isScrolled 
                  ? "text-slate-600 hover:text-amber-600" 
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 bg-gradient-to-r from-amber-500 to-yellow-600 group-hover:w-3/4 w-0`} />
            </Link>
          ))}
        </div>

        {/* Desktop Actions - Theme toggle removed */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
          <button 
            onClick={() => setLang(lang === "en" ? "pid" : "en")}
            className={`flex items-center gap-2 px-3 xl:px-4 py-2 xl:py-2.5 rounded-full transition-all border text-sm ${
              isScrolled 
                ? "bg-slate-100 hover:bg-amber-100 border-transparent hover:border-amber-200" 
                : "bg-slate-100/50 hover:bg-amber-100 border-slate-200 hover:border-amber-200 backdrop-blur-sm"
            }`}
          >
            <Globe className="h-4 w-4 xl:h-5 xl:w-5 transition-colors text-slate-600" />
            <span className="font-bold transition-colors text-slate-700">
              {lang === "en" ? "English" : "Pidgin"}
            </span>
          </button>
        </div>

        {/* Mobile Toggles - Theme toggle removed */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button 
            onClick={() => setLang(lang === "en" ? "pid" : "en")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full border transition-all ${
              isScrolled 
                ? "bg-slate-100 border-slate-200" 
                : "bg-slate-100/50 border-slate-200 backdrop-blur-sm"
            }`}
          >
            <Globe className="h-4 w-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-700">
              {lang === "en" ? "English" : "Pidgin"}
            </span>
          </button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 shrink-0"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6 text-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Optimized padding and text sizes */}
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
            <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
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
                    className="flex items-center justify-between px-4 py-3 text-slate-700 font-semibold text-base hover:bg-amber-50 rounded-xl transition-colors group"
                  >
                    <span>{link.label}</span>
                    <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Language Toggle inside menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-2 pt-4 border-t border-slate-200"
              >
                <button 
                  onClick={() => setLang(lang === "en" ? "pid" : "en")}
                  className="flex items-center justify-between w-full px-4 py-3 text-slate-700 font-semibold text-base hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    {lang === "en" ? "Switch to Pidgin" : "Switch to English"}
                  </span>
                  <span className="text-xs font-bold bg-amber-100 text-amber-600 px-3 py-1.5 rounded-md">
                    {lang === "en" ? "English → Pidgin" : "Pidgin → English"}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}