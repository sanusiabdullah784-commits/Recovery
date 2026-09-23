import { Navbar } from "@/components/Navbar";
import { ClaimYourItemSection } from "@/components/ClaimYourItemSection";
import { Footer } from "@/components/Footer";

export default function ClaimPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-white">
      <Navbar />
      <ClaimYourItemSection />
      <Footer />
    </main>
  );
}