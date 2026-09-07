import { Navbar } from "@/components/Navbar";
import { TrackSection } from "@/components/TrackSection";
import { Footer } from "@/components/Footer";

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <TrackSection />
      <Footer />
    </main>
  );
}