"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Search, X, Package, CreditCard, Scale, SearchCheck, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Category = "all" | "recovery" | "payment" | "legal" | "tracking" | "general";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories = [
    { id: "all" as Category, label: t("All", "All"), icon: Globe },
    { id: "recovery" as Category, label: t("Recovery", "Recovery"), icon: Package },
    { id: "payment" as Category, label: t("Payment", "Payment"), icon: CreditCard },
    { id: "legal" as Category, label: t("Legal", "Legal"), icon: Scale },
    { id: "tracking" as Category, label: t("Tracking", "Tracking"), icon: SearchCheck },
  ];

  const faqs = [
    {
      category: "recovery" as Category,
      question: t("How long does the recovery process typically take?", "How long e go take make we recover the item?"),
      answer: t("The timeline varies depending on the complexity of the case. Simple item recoveries can take anywhere from 48 hours to 5 days, while complex legal disputes or missing persons cases may take a few weeks. You will receive real-time updates via your unique HLRS Tracking ID.", "The time go depend on how the case be. Simple cases fit take 48 hours to 5 days, while complex legal wahala or missing persons fit take few weeks. You go receive real-time updates via your unique HLRS Tracking ID.")
    },
    {
      category: "payment" as Category,
      question: t("Is my registration fee secure and refundable?", "My registration fee safe and I fit get am back?"),
      answer: t("Your payment is processed through highly secure, encrypted gateways (Paystack, Flutterwave, PayPal). The registration fee is non-refundable as it covers the immediate deployment of our verified agents and legal team to begin the investigation process.", "Your payment go process through highly secure gateways (Paystack, Flutterwave, PayPal). The registration fee no be refundable because e cover the immediate deployment of our verified agents and legal team to start the investigation.")
    },
    {
      category: "legal" as Category,
      question: t("What happens if my item or case is not resolved?", "Wetin go happen if my item or case no resolve?"),
      answer: t("If our agents are unable to locate your item or resolve the dispute within the agreed timeframe, its will be kept in view. We placed ourselves on a 98% success rate and will work tirelessly until a conclusion is reached.", "If our agents no fit locate your item or resolve the dispute within the agreed time, . We get 98% success rate and we go work tireless until we reach conclusion.")
    },
    {
      category: "general" as Category,
      question: t("Do you operate outside of Nigeria?", "Una dey work outside Nigeria?"),
      answer: t("Yes! While we are headquartered in Nigeria, Homeland Recovery Service Ltd has a global network of partners and legal experts. We can assist with cross-border recoveries and international legal disputes.", "Yes! Even though we dey headquarters for Nigeria, Homeland Recovery Service Ltd get global network of partners and legal experts. We fit assist with cross-border recoveries and international legal disputes.")
    },
    {
      category: "tracking" as Category,
      question: t("How do I track the status of my complaint?", "How I fit track the status of my complaint?"),
      answer: t("Once you submit your complaint and payment is verified, you will receive a unique HLRS Tracking ID. Simply navigate to the 'Track ID' page on our website and enter your ID to see the real-time, step-by-step progress of your case.", "Once you submit your complaint and payment don verify, you go receive unique HLRS Tracking ID. Just go to the 'Track ID' page for our website and enter your ID to see the real-time, step-by-step progress of your case.")
    }
  ];

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    if (activeCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((faq) => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery, faqs]);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-amber-500/30 text-amber-800 dark:text-amber-300 px-0.5 rounded font-semibold">
          {part}
        </mark>
      ) : part
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[80px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Section Header - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-amber-500/20">
            {t("Frequently Asked Questions", "Questions Weey Dey Ask Pass")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            {t("Got Questions?", "You Get Questions?")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            {t("Everything you need to know about our recovery process, payments, and legal services.", "Everything wey you need to know about how we dey recover items, payment, and our legal services.")}
          </p>
        </motion.div>

        {/* Smart Search Bar - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative max-w-2xl mx-auto px-2 sm:px-0">
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search questions...", "Search questions...")}
                className="w-full pl-9 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-slate-50 dark:bg-slate-900 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 sm:right-4 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Tabs - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => { setActiveCategory(category.id); setOpenIndex(0); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Counter */}
        {searchQuery && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-slate-500 dark:text-slate-400 mb-4 text-center px-2">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? t("result found", "result found") : t("results found", "results found")}
          </motion.p>
        )}

        {/* Accordion List - Mobile Optimized */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-3 sm:space-y-4 px-2 sm:px-0">
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const originalIndex = faqs.findIndex(f => f.question === faq.question);
                const isOpen = openIndex === originalIndex;
                return (
                  <motion.div key={index} variants={itemVariants} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }} className={`group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800/50 shadow-lg shadow-amber-500/5" : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800/50 hover:bg-white dark:hover:bg-slate-900"}`}>
                    <button onClick={() => setOpenIndex(isOpen ? null : originalIndex)} className="w-full flex items-center justify-between p-4 sm:p-6 text-left">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg transition-colors ${isOpen ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 group-hover:text-amber-600 dark:group-hover:text-amber-400"}`}>
                          {isOpen ? <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </div>
                        <span className={`text-sm sm:text-lg font-bold transition-colors break-words ${isOpen ? "text-amber-700 dark:text-amber-300" : "text-slate-900 dark:text-white"}`}>
                          {highlightMatch(faq.question, searchQuery)}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-amber-600 dark:text-amber-400" : "text-slate-400 dark:text-slate-500"}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-10 sm:pl-[4.5rem]">
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{highlightMatch(faq.answer, searchQuery)}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-12 px-4">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4"><Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" /></div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("No results found", "No results found")}</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4">{t("Try searching with different keywords or switch categories", "Try searching with different keywords or switch categories")}</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="px-5 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all shadow-md shadow-amber-500/20">{t("Clear filters", "Clear filters")}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ==========================================
            PREMIUM CTA CARD - Mobile Optimized (WhatsApp Only)
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 sm:mt-20 relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 p-6 sm:p-8 md:p-12 text-center shadow-2xl shadow-amber-500/20 mx-2 sm:mx-0"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 bg-white/20 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-64 sm:h-64 bg-black/10 rounded-full blur-2xl sm:blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-4 sm:mb-6"
            >
              <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight px-2">
              {t("Still Have Questions?", "Questions Still Dey?")}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
              {t("Our legal experts and support team are standing by 24/7 to assist you with your specific case.", "Our legal experts and support team dey stand by 24/7 to assist you with your specific case.")}
            </p>

            {/* ✅ SINGLE WHATSAPP BUTTON - Centered and perfectly sized */}
            <a href="https://wa.me/2349136931832" target="_blank" rel="noopener noreferrer" className="w-full max-w-md mx-auto px-2 sm:px-0 block">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-amber-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("Chat on WhatsApp", "Chat on WhatsApp")}
              </motion.button>
            </a>
          </div>
        </motion.div>
        {/* ========================================== */}

      </div>
    </section>
  );
}