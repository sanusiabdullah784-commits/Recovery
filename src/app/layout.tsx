import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AIChatWidget } from "@/components/AIChatWidget";
import { LanguageDirection } from "@/components/LanguageDirection"; // ✅ NEW: Handles RTL for Arabic

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  // ✅ UPDATED: Added "Services" to match your full company name
  title: "Homeland Recovery Services Ltd | Global Leaders in Secure Recovery",
  description: "The secure, verified, and fastest way to recover your lost property and resolve disputes in Nigeria and across the globe.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Homeland Recovery",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans antialiased overflow-x-hidden bg-white`}>
        
        <LanguageProvider>
          {/* ✅ NEW: This automatically flips the site to Right-to-Left when Arabic is chosen */}
          <LanguageDirection />
          {children}
        </LanguageProvider>
        
        <FloatingWhatsApp /> 
        <AIChatWidget />
        
      </body>
    </html>
  );
}