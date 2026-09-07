import { Navbar } from "@/components/Navbar";
import { FlaggedItemsSection } from "@/components/FlaggedItemsSection";
import { Footer } from "@/components/Footer";

export default function FlaggedItemsPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <FlaggedItemsSection />
      <Footer />
    </main>
  );
}