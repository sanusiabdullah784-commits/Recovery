"use client";

import { motion } from "framer-motion";
import { Search, Scale, Gavel, Handshake, MessageCircle, Monitor, FileText, Shield, TrendingUp, Users, CheckCircle, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function CoreObjectives() {
  const { t } = useLanguage();

  const mainObjectives = [
    {
      icon: <Search className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: t("Lost and Found", "Lost and Found"),
      description: t("To operate a comprehensive lost and found service, including physical collection centers and digital platforms for reporting and matching lost items with owners.", "To run comprehensive lost and found service, including physical collection centers and digital platforms for reporting and matching lost items with owners."),
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      features: [
        t("Recovery & Retrieval of Lost Items", "Recovery & Retrieval of Lost Items"),
        t("Asset Tracing & Verification", "Asset Tracing & Verification"),
        t("Missing Persons Location Services", "Missing Persons Location Services"),
        t("Digital & Physical Reporting Platforms", "Digital & Physical Reporting Platforms")
      ]
    },
    {
      icon: <Scale className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: t("Legal Services", "Legal Services"),
      description: t("To provide comprehensive legal services including arbitration, mediation, litigation, and online dispute resolution for commercial, civil, labor, family, and international disputes.", "To provide comprehensive legal services including arbitration, mediation, litigation, and online dispute resolution for commercial, civil, labor, family, and international disputes."),
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      features: [
        t("Litigation & Dispute Resolution", "Litigation & Dispute Resolution"),
        t("Arbitration & Mediation Services", "Arbitration & Mediation Services"),
        t("Negotiation & Conciliation", "Negotiation & Conciliation"),
        t("Online Dispute Resolution (ODR)", "Online Dispute Resolution (ODR)")
      ]
    }
  ];

  const pipelineSteps = [
    { step: "01", title: t("Report", "Report"), desc: t("Lodge a secure complaint or report a found item via our digital platform.", "Lodge secure complaint or report found item via our digital platform."), icon: FileText },
    { step: "02", title: t("Verify & Pay", "Verify & Pay"), desc: t("Complete secure identity verification and transparent fee payment.", "Complete secure identity verification and transparent fee payment."), icon: Shield },
    { step: "03", title: t("Investigate", "Investigate"), desc: t("Our verified agents and legal experts immediately begin tracing your case.", "Our verified agents and legal experts go immediately start to trace your case."), icon: Search },
    { step: "04", title: t("Resolve", "Resolve"), desc: t("Successfully recover your property or achieve a binding legal resolution.", "Successfully recover your property or achieve binding legal resolution."), icon: CheckCircle }
  ];

  const legalServices = [
    { icon: <Gavel className="h-4 w-4 sm:h-5 sm:w-5" />, title: t("Litigation", "Litigation"), desc: t("Court representation and legal proceedings", "Court representation and legal proceedings") },
    { icon: <Handshake className="h-4 w-4 sm:h-5 sm:w-5" />, title: t("Arbitration", "Arbitration"), desc: t("Alternative dispute resolution services", "Alternative dispute resolution services") },
    { icon: <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />, title: t("Mediation", "Mediation"), desc: t("Facilitated negotiation and settlement", "Facilitated negotiation and settlement") },
    { icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />, title: t("Negotiation", "Negotiation"), desc: t("Strategic deal-making and agreements", "Strategic deal-making and agreements") },
    { icon: <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />, title: t("ODR", "ODR"), desc: t("Online Dispute Resolution platform", "Online Dispute Resolution platform") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:via-blue-950/10 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-blue-200 dark:border-blue-800">
            {t("Official Company Mandate", "Official Company Mandate")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            {t("Our", "Our")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t("Core Objectives", "Core Objectives")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            {t("As registered with the Corporate Affairs Commission of Nigeria, we are officially mandated to provide comprehensive recovery and legal services.", "As we don register with the Corporate Affairs Commission of Nigeria, we get official mandate to provide comprehensive recovery and legal services.")}
          </p>
        </motion.div>

        {/* Main Objectives Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-20 perspective-[1000px]"
        >
          {mainObjectives.map((objective, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, rotateX: 3, rotateY: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 ${objective.bgColor} backdrop-blur-sm border-2 ${objective.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${objective.color} text-white mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {objective.icon}
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${objective.color} bg-clip-text text-transparent`}>{objective.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">{objective.description}</p>
                <ul className="space-y-2 sm:space-y-3">
                  {objective.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${objective.color} flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Recovery Pipeline */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 sm:mb-3">{t("How We Deliver Results", "How We Deliver Results")}</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">{t("A transparent, secure, and highly efficient 4-step process designed to recover your assets and resolve disputes.", "A transparent, secure, and highly efficient 4-step process designed to recover your assets and resolve disputes.")}</p>
          </div>
          <div className="relative p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-xl">
            <div className="hidden md:block absolute top-1/2 left-16 right-16 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4">
              {pipelineSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} whileHover={{ y: -8 }} className="group flex flex-col items-center text-center">
                  <div className="relative mb-3 sm:mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                      <step.icon className="h-6 w-6 sm:h-7 sm:w-7 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">{step.step}</div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Legal Services Detail Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200 dark:border-slate-700 shadow-xl mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white mb-3 sm:mb-4 shadow-lg"><Scale className="h-6 w-6 sm:h-7 sm:w-7" /></div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{t("Comprehensive Legal Services", "Comprehensive Legal Services")}</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">{t("Our team of legal experts provides end-to-end dispute resolution services across multiple domains", "Our team of legal experts provides end-to-end dispute resolution services across multiple domains")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {legalServices.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{service.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==========================================
            OFFICIAL MANDATE CERTIFICATE
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="perspective-[1000px]"
        >
          <motion.div
            whileHover={{ rotateY: 3, rotateX: 3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl border border-amber-500/20 shadow-2xl overflow-hidden"
          >
            {/* Gold Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            
            {/* Subtle Watermark Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <Scale className="absolute -right-10 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 text-slate-900/5 dark:text-white/5 rotate-12 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
              
              {/* Left Content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-400 uppercase mb-2 sm:mb-3">
                  {t("Officially Registered & Mandated", "Officially Registered & Mandated")}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                  {t("Certificate of Incorporation", "Certificate of Incorporation")}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 max-w-md mx-auto md:mx-0">
                  {t("Homeland Recovery Services Ltd is fully registered and authorized by the Corporate Affairs Commission of the Federal Republic of Nigeria.", "Homeland Recovery Services Ltd don fully register and get authorization from the Corporate Affairs Commission of the Federal Republic of Nigeria.")}
                </p>
                
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-900/5 dark:bg-white/5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">RC Number</span>
                    <span className="text-base sm:text-lg font-mono font-extrabold text-slate-900 dark:text-white leading-none">9578175</span>
                  </div>
                </div>
              </div>

              {/* Right Gold Seal */}
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-500/30 border-2 sm:border-4 border-white dark:border-slate-800 relative">
                  {/* Inner Ring */}
                  <div className="absolute inset-1 sm:inset-2 rounded-full border-2 border-amber-300/50" />
                  <div className="text-center text-white px-2 sm:px-4">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 mx-auto mb-1 drop-shadow-md" />
                    <span className="text-[8px] sm:text-[10px] md:text-xs font-black tracking-widest opacity-95 drop-shadow-sm">{t("VERIFIED", "VERIFIED")}</span>
                  </div>
                </div>
                {/* Subtle Glow Behind Seal */}
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl -z-10" />
              </div>

            </div>
          </motion.div>
        </motion.div>
        {/* ========================================== */}

      </div>
    </section>
  );
}