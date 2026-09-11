import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AIChatWidget } from "@/components/AIChatWidget";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Homeland Recovery Service Ltd | Global Leaders in Secure Recovery",
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
      {/* ADDED: bg-white to force pure white background permanently */}
      <body className={`${jakarta.variable} font-sans antialiased overflow-x-hidden bg-white`}>
        
        {/* ✅ REMOVED: ThemeProvider wrapper to disable dark mode entirely */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        
        <FloatingWhatsApp /> 
        <AIChatWidget />
        
      </body>
    </html>
  );
}