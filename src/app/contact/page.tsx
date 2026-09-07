import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}