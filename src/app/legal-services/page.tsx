import { Navbar } from "@/components/Navbar";
import { LegalServicesSection } from "@/components/LegalServicesSection";
import { Footer } from "@/components/Footer";

export default function LegalServicesPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <LegalServicesSection />
      <Footer />
    </main>
  );
}