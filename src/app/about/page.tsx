"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Award, MapPin, Phone, Mail, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-amber-500/20">
              {t("about_badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6 px-2">
              Homeland Recovery <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
                Services Ltd
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t("about_hero_text")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-6 sm:py-8 px-4 bg-white border-y border-amber-200/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 bg-amber-100 rounded-full">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">{t("about_rc_label")}</p>
                <p className="text-base sm:text-lg font-mono font-extrabold text-slate-900">9578175</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 bg-amber-100 rounded-full">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">{t("about_hq_label")}</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-amber-50/50 border border-amber-200/50"
            >
              <Target className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{t("about_mission_title")}</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t("about_mission_desc")}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-yellow-50/50 border border-yellow-200/50"
            >
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{t("about_vision_title")}</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t("about_vision_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-amber-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">
              {t("about_values_title")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
              {t("about_values_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: ShieldCheck, title: t("about_val_integrity"), desc: t("about_val_integrity_desc") },
              { icon: Users, title: t("about_val_client"), desc: t("about_val_client_desc") },
              { icon: CheckCircle2, title: t("about_val_excellence"), desc: t("about_val_excellence_desc") },
              { icon: Target, title: t("about_val_efficiency"), desc: t("about_val_efficiency_desc") },
              { icon: ShieldCheck, title: t("about_val_confidentiality"), desc: t("about_val_confidentiality_desc") },
              { icon: Award, title: t("about_val_accountability"), desc: t("about_val_accountability_desc") },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200/50 shadow-sm hover:shadow-lg hover:border-amber-400/50 transition-all duration-300"
              >
                <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-amber-600 mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 text-center overflow-hidden shadow-2xl shadow-amber-500/20">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4 px-4">
                {t("about_cta_title")}
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
                {t("about_cta_desc")}
              </p>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4">
                <a 
                  href="https://wa.me/2349136931832" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-amber-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t("about_cta_whatsapp")}
                </a>
                <a 
                  href="mailto:homelandrecoveryservicesltd@gmail.com"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t("about_cta_email")}
                </a>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+234 906 517 3333</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}