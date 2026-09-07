import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AIChatWidget } from "@/components/AIChatWidget"; // ✅ NEW: Import AI Chat

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Homeland Recovery Service Ltd | Global Leaders in Secure Recovery",
  description: "The secure, verified, and fastest way to recover your lost property and resolve disputes in Nigeria and across the globe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ADDED: overflow-x-hidden to prevent horizontal scrolling on mobile */}
      <body className={`${jakarta.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        
        <FloatingWhatsApp /> 
        <AIChatWidget /> {/* ✅ NEW: AI Chat Widget Added Here */}
        
      </body>
    </html>
  );
}