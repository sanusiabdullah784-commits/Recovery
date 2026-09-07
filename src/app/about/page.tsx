"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Award, MapPin, Phone, Mail, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-cyan-500/20">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 px-2">
              Homeland Recovery <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Services Ltd
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              Global leaders in secure recovery. We provide the fastest, most verified way to recover lost property and resolve legal disputes in Nigeria and across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Mandate Banner */}
      <section className="relative py-6 sm:py-8 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">RC Number</p>
                <p className="text-base sm:text-lg font-mono font-extrabold text-slate-900 dark:text-white">9578175</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Headquarters</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Abuja, FCT, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/30"
            >
              <Target className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-600 dark:text-cyan-400 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                To provide a secure, transparent, and highly efficient platform for the recovery of lost property and the resolution of legal disputes. We are committed to restoring peace of mind to individuals and businesses through verified, professional, and compassionate service.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30"
            >
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 dark:text-purple-400 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                To be the most trusted and recognized recovery and legal mediation service in Africa, setting the global standard for integrity, speed, and technological innovation in asset recovery and dispute resolution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              The principles that guide every action we take and every case we handle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "We operate with absolute honesty and transparency in every transaction and interaction." },
              { icon: Users, title: "Client-Centric", desc: "Your peace of mind is our priority. We tailor our approach to meet your unique needs." },
              { icon: CheckCircle2, title: "Excellence", desc: "We maintain the highest professional standards in recovery and legal mediation." },
              { icon: Target, title: "Efficiency", desc: "Time is critical. Our streamlined processes ensure rapid, effective results." },
              { icon: ShieldCheck, title: "Confidentiality", desc: "Your data and case details are protected with enterprise-grade security." },
              { icon: Award, title: "Accountability", desc: "We take full responsibility for our actions and deliver on our promises." },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
            
            <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4 px-4">
              Ready to Work With Us?
            </h2>
            <p className="relative z-10 text-sm sm:text-base text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
              Reach out to our team today for a confidential consultation. We are here to help you recover what matters most.
            </p>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4">
              <a 
                href="https://wa.me/2349136931832" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                WhatsApp Us
              </a>
              <a 
                href="mailto:homelandrecoveryservicesltd@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}