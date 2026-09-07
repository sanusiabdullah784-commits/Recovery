"use client";

import { motion } from "framer-motion";
import { 
  FileText, Download, Mail, Phone, Calendar, ArrowRight, 
  ShieldCheck, Building2, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function PressPage() {
  const pressReleases = [
    {
      date: "August 15, 2026",
      title: "Homeland Recovery Services Ltd Announces Strategic Partnership with Leading Nigerian Insurers",
      summary: "A new collaboration aimed at streamlining the recovery of insured assets and providing faster, more transparent resolutions for policyholders across the country.",
      link: "#"
    },
    {
      date: "July 22, 2026",
      title: "Launch of New Digital Platform to Streamline Asset Recovery and Dispute Resolution",
      summary: "The company unveils its next-generation digital platform, featuring real-time case tracking, secure document verification, and integrated legal mediation services.",
      link: "#"
    },
    {
      date: "June 10, 2026",
      title: "Homeland Recovery Services Ltd Reports 98% Success Rate in Q2 2026 Operations",
      summary: "Driven by advanced tracing technology and a dedicated team of legal experts, the company continues to set the industry standard for recovery excellence in West Africa.",
      link: "#"
    }
  ];

  const mediaAssets = [
    { name: "Primary Logo (PNG)", size: "2.4 MB", type: "Image" },
    { name: "Primary Logo (SVG)", size: "145 KB", type: "Vector" },
    { name: "Brand Guidelines PDF", size: "4.1 MB", type: "Document" },
    { name: "Executive Headshots (ZIP)", size: "12.5 MB", type: "Archive" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-3 sm:px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-cyan-500/20">
              Newsroom
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 px-2">
              Press & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Media</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              Official news, resources, and updates from Homeland Recovery Services Ltd. For media inquiries, please contact our press team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest Press Releases */}
      <section className="py-16 sm:py-24 px-3 sm:px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Latest Press Releases
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                Stay updated with our most recent announcements, partnerships, and company milestones.
              </p>
            </div>
            <Link href="/contact" className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5 whitespace-nowrap">
              View All News <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-5 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{release.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                      {release.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {release.summary}
                    </p>
                    <a 
                      href={release.link} 
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                    >
                      Read Full Release <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                  <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 transition-colors">
                    <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Assets & Boilerplate Grid */}
      <section className="py-16 sm:py-24 px-3 sm:px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Media Assets */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                  <Download className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Media Assets</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Download official logos, brand guidelines, and high-resolution images for editorial use. Please adhere to our brand guidelines when using these assets.
              </p>
              <div className="space-y-3">
                {mediaAssets.map((asset, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">{asset.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{asset.type} • {asset.size}</p>
                      </div>
                    </div>
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Company Boilerplate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">About Us</h3>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="mb-4">
                  <strong className="text-slate-900 dark:text-white">Homeland Recovery Services Ltd</strong> (RC 9578175) is a premier, fully licensed recovery and legal mediation firm headquartered in Abuja, Nigeria. 
                </p>
                <p className="mb-4">
                  We specialize in the secure recovery of lost property, asset tracing, and the resolution of commercial, civil, and family disputes. Backed by a team of verified agents, legal experts, and cutting-edge technology, we provide a transparent, efficient, and highly successful alternative to traditional, prolonged legal battles.
                </p>
                <p>
                  With a proven 98% success rate and a commitment to strict confidentiality and NDPR compliance, we are the trusted partner for individuals, corporations, and insurance providers across Nigeria and West Africa.
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Quick Facts</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>Founded: 2020</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>Headquarters: Abuja, FCT, Nigeria</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>RC Number: 9578175</span>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Media Contact CTA */}
      <section className="py-16 sm:py-24 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4 px-4">
                Media Inquiries
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto px-4 leading-relaxed">
                For interview requests, press passes, or additional information, please reach out to our dedicated media relations team. We aim to respond to all inquiries within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                <a 
                  href="mailto:press@homelandrecovery.ng" 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 text-sm sm:text-base"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  press@homelandrecovery.ng
                </a>
                <a 
                  href="tel:+2349065173333"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  +234 906 517 3333
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}