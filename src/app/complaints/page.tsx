import { Navbar } from "@/components/Navbar";
import { ComplaintSection } from "@/components/ComplaintSection";
import { Footer } from "@/components/Footer";

export default function ComplaintsPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <ComplaintSection />
      <Footer />
    </main>
  );
}