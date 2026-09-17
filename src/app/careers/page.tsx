"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, ArrowRight, ShieldCheck, 
  Users, TrendingUp, Heart, CheckCircle2, Mail 
} from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 dark:text-amber-400" />,
      title: "Professional Growth",
      desc: "Continuous training, certifications, and clear pathways for career advancement within the company."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />,
      title: "Comprehensive Benefits",
      desc: "Competitive salary, health insurance, and performance-based bonuses for our dedicated team members."
    },
    {
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700 dark:text-amber-300" />,
      title: "Inclusive Culture",
      desc: "A diverse, collaborative, and supportive work environment where every voice is heard and valued."
    },
    {
      icon: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 dark:text-amber-400" />,
      title: "Meaningful Impact",
      desc: "Do work that truly matters. Help individuals and businesses recover what matters most to them."
    }
  ];

  const openRoles = [
    {
      title: "Senior Recovery Specialist",
      department: "Operations",
      location: "Abuja, Nigeria (Hybrid)",
      type: "Full-time",
      link: "mailto:homelandrecoveryservicesltd@gmail.com?subject=Application: Senior Recovery Specialist"
    },
    {
      title: "Legal Counsel / Mediator",
      department: "Legal Services",
      location: "Lagos, Nigeria (On-site)",
      type: "Full-time",
      link: "mailto:homelandrecoveryservicesltd@gmail.com?subject=Application: Legal Counsel"
    },
    {
      title: "Customer Success Lead",
      department: "Support",
      location: "Remote (Nigeria)",
      type: "Full-time",
      link: "mailto:homelandrecoveryservicesltd@gmail.com?subject=Application: Customer Success Lead"
    },
    {
      title: "Frontend Software Engineer",
      department: "Technology",
      location: "Remote (Nigeria)",
      type: "Contract / Full-time",
      link: "mailto:homelandrecoveryservicesltd@gmail.com?subject=Application: Frontend Software Engineer"
    }
  ];

  const steps = [
    { step: "01", title: "Browse Roles", desc: "Find a position that matches your skills and passion." },
    { step: "02", title: "Submit Application", desc: "Send your CV and a brief cover letter to our careers email." },
    { step: "03", title: "Interview", desc: "Meet with our team to discuss your experience and cultural fit." },
    { step: "04", title: "Join the Team", desc: "Receive your offer, complete onboarding, and start making an impact." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      
      {/* Hero Section - Updated to Company Logo Colors */}
      <section className="relative py-20 sm:py-32 px-3 sm:px-4 overflow-hidden bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-amber-500/20">
              Join Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6 px-2">
              Build the Future of <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
                Secure Recovery
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              We are looking for passionate, driven, and ethical professionals to help us restore peace of mind to individuals and businesses across Nigeria and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 sm:py-24 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Why Work With Us?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              We invest in our people because they are the foundation of our success and the face of our brand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/50 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-amber-400/50 transition-all duration-300"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-24 px-3 sm:px-4 bg-amber-50/30 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Open Positions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              Explore our current opportunities and find the perfect role for your expertise.
            </p>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {role.type}
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href={role.link}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 text-sm sm:text-base whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 sm:py-24 px-3 sm:px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Our Hiring Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              We've designed our application process to be straightforward, transparent, and respectful of your time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30"
              >
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 mt-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General CTA */}
      <section className="py-16 sm:py-24 px-3 sm:px-4 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-black/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
          >
            <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-white mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4 px-4">
              Don't See the Right Role?
            </h2>
            <p className="text-sm sm:text-base text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto px-4 leading-relaxed">
              We are always looking for exceptional talent. Send us your CV and a brief introduction, and we will keep you in mind for future opportunities.
            </p>
            <a 
              href="mailto:homelandrecoveryservicesltd@gmail.com?subject=General Career Inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-amber-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-amber-50 text-sm sm:text-base"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              Send Us Your CV
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}