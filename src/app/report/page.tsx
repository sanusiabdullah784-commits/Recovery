import { Navbar } from "@/components/Navbar";
import { FoundReportSection } from "@/components/FoundReportSection";
import { Footer } from "@/components/Footer";

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <FoundReportSection />
      <Footer />
    </main>
  );
}