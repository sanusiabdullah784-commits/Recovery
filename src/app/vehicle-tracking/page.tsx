"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Car, Truck, Ship, Tractor, Bike, Bus, Container, Settings, ArrowRight, MapPin, Phone, CreditCard } from "lucide-react";

const trackingItems = [
  {
    id: 1,
    title: "Sedans & Compact Cars",
    desc: "Discreet GPS trackers designed for everyday vehicles, offering real-time location and trip history.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 2,
    title: "Motorcycles & Scooters",
    desc: "Compact, waterproof tracking devices specifically engineered for two-wheelers to prevent theft.",
    icon: Bike,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 3,
    title: "SUVs & 4x4 Vehicles",
    desc: "Rugged tracking solutions for off-road and luxury SUVs, featuring geofencing and immobilization.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 4,
    title: "Commercial Vans",
    desc: "Fleet management trackers for delivery vans, providing route optimization and driver behavior monitoring.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 5,
    title: "Heavy Duty Trucks",
    desc: "Industrial-grade GPS and fuel monitoring systems for long-haul logistics and cargo security.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 6,
    title: "Buses & Public Transport",
    desc: "High-capacity tracking with passenger safety features, stop announcements, and live ETA updates.",
    icon: Bus,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 7,
    title: "Construction Machinery",
    desc: "Heavy-duty, vibration-resistant trackers for excavators, bulldozers, and cranes on remote sites.",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 8,
    title: "Marine Vehicles & Boats",
    desc: "Fully waterproof, marine-grade tracking devices with satellite backup for offshore vessels.",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 9,
    title: "Generators & Equipment",
    desc: "Asset trackers with motion detection and battery monitoring for valuable stationary equipment.",
    icon: Container,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 10,
    title: "Agricultural Tractors",
    desc: "Long-battery-life GPS trackers designed for large farm equipment and rural terrain coverage.",
    icon: Tractor,
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function VehicleTrackingPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      
      {/* ✅ 1. Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-bold mb-6"
          >
            <ShieldCheck className="h-4 w-4" />
            Advanced GPS Security
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            Vehicle & Motorbike <span className="text-amber-600">Tracking</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Protect your most valuable assets. From everyday cars to heavy industrial machinery, 
            our premium GPS tracking solutions offer real-time monitoring, geofencing, and instant theft alerts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/complaints" className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:-translate-y-0.5">
              Register & Pay Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/track" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300">
              Track Existing Device
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ✅ 2. Categories & Pricing Section (Moved UP right after Hero) */}
      <section className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8">
              Categories & Pricing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-6 w-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Registration Fee</h3>
                </div>
                <p className="text-3xl font-black text-amber-600 mb-2">₦3,000</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Registration is 3,000 Naira. This is a mandatory one-time fee to enable your account and process your tracking request.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="h-6 w-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Installation Cost</h3>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">Varies by Vehicle Type</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Cost of tracker installation depends on Vehicle and Motorbikes. For more inquiries, contact us on any of our numbers.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Phone className="h-5 w-5 text-amber-600" />
                For more inquiries, contact us on any of our official numbers.
              </p>
              <Link href="/complaints" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:-translate-y-0.5 text-lg">
                Proceed to Registration
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ 3. Grid Section (10 Items) */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {trackingItems.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <item.icon className="h-5 w-5 text-amber-400" />
                    <span className="font-bold text-sm uppercase tracking-wider">{item.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                    {item.desc}
                  </p>
                  
                  <Link 
                    href="/complaints" 
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500/30 transition-all duration-300 text-sm group/btn"
                  >
                    <CreditCard className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Register for Tracker
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ✅ 4. Bottom CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Not sure which tracker fits your needs?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Our security experts are ready to assess your assets and recommend the perfect tracking solution for your specific vehicle or equipment.
            </p>
            <Link href="/complaints" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:-translate-y-0.5 text-lg">
              Contact Our Experts
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}