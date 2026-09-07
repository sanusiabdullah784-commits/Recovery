"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pid";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (enText: string, pidText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Helper function to easily switch text in components
  const t = (enText: string, pidText: string) => (lang === "en" ? enText : pidText);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}