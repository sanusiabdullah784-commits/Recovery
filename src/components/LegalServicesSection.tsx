"use client";

import { motion } from "framer-motion";
import { Scale, Gavel, Handshake, MessageCircle, Monitor, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function LegalServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Gavel className="h-8 w-8" />,
      title: t("Litigation", "Litigation"),
      desc: t("Expert court representation and strategic legal proceedings for commercial, civil, and criminal matters.", "Expert court representation and strategic legal proceedings for commercial, civil, and criminal matters.")
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: t("Arbitration", "Arbitration"),
      desc: t("Fast, confidential, and binding alternative dispute resolution outside the traditional court system.", "Fast, confidential, and binding alternative dispute resolution outside the traditional court system.")
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: t("Mediation", "Mediation"),
      desc: t("Facilitated, neutral negotiation to help opposing parties reach a mutually beneficial settlement.", "Facilitated, neutral negotiation to help opposing parties reach a mutually beneficial settlement.")
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: t("Negotiation", "Negotiation"),
      desc: t("Strategic deal-making, contract reviews, and settlement agreements to protect your interests.", "Strategic deal-making, contract reviews, and settlement agreements to protect your interests.")
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: t("Online Dispute Resolution (ODR)", "Online Dispute Resolution (ODR)"),
      desc: t("Modern, digital-first conflict resolution platform for fast, remote, and efficient case management.", "Modern, digital-first conflict resolution platform for fast, remote, and efficient case management.")
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden bg-white">
      
      {/* Subtle Ambient Orbs - Gold/Amber */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-200/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-yellow-200/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      {/* Grid Pattern - Gold */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(217, 169, 56, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 169, 56, 0.3) 1px, transparent 1px)`, 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 border border-amber-200/50 bg-amber-50/50 shadow-lg">
            <Scale className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">
            {t("Elite Legal Services", "Elite Legal Services")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-600 font-medium">
            {t("From complex litigation to swift online dispute resolution, our verified legal experts are mandated to protect your rights and secure your legacy.", "From complex litigation to swift online dispute resolution, our verified legal experts dey ready to protect your rights and secure your legacy.")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-3xl border border-amber-200/50 bg-white/80 backdrop-blur-sm hover:border-amber-400/50 hover:bg-amber-50/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/50 mb-6 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <div className="text-amber-600">{service.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-amber-700 transition-colors">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">{service.desc}</p>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-3 p-8 md:p-10 rounded-3xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-yellow-50/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-white border border-amber-200/50 mt-1 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{t("Ready to Resolve Your Dispute?", "You Ready to Resolve Your Dispute?")}</h3>
                <p className="text-sm text-slate-600 font-medium max-w-xl">
                  {t("Lodge a formal complaint or request a consultation with our legal team today. Your first step toward justice starts here.", "Lodge formal complaint or request consultation with our legal team today. Your first step toward justice start here.")}
                </p>
              </div>
            </div>
            <Link href="/complaints" className="flex-shrink-0 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700">
                {t("Start Your Case", "Start Your Case")}
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { label: t("Verified Legal Experts", "Verified Legal Experts"), desc: t("Licensed & Accredited", "Licensed & Accredited") },
            { label: t("Confidential & Secure", "Confidential & Secure"), desc: t("100% Data Protection", "100% Data Protection") },
            { label: t("Proven Track Record", "Proven Track Record"), desc: t("High Success Rate", "High Success Rate") }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-amber-50/50 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-amber-600" />
              <h4 className="font-bold text-slate-900">{item.label}</h4>
              <p className="text-xs font-medium text-slate-500">{item.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}