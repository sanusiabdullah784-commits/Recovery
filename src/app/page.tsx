import { Navbar } from "@/components/Navbar";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/Hero";
import { CoreObjectives } from "@/components/CoreObjectives";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsCounter } from "@/components/StatsCounter";
import { Testimonials } from "@/components/Testimonials";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { BadgeSystem } from "@/components/BadgeSystem";
import { Leaderboard } from "@/components/Leaderboard";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      {/* Marquee is now at the very top */}
      <Marquee />
      <Navbar />
      <Hero />
      <CoreObjectives />
      <HowItWorks />
      <StatsCounter />
      <Testimonials />
      <VideoTestimonials />
      <BadgeSystem />
      <Leaderboard />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}