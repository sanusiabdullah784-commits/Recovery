"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  // Supports BOTH: t("key") and t("English", "Pidgin")
  t: (arg1: string, arg2?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (arg1: string, arg2?: string) => {
    // 1. NEW FORMAT: t("key") -> Looks up in the master dictionary
    if (arg2 === undefined && arg1 in translations) {
      const key = arg1 as keyof typeof translations;
      return translations[key][lang] || translations[key]["en"];
    }
    
    // 2. OLD FORMAT: t("English", "Pidgin") -> Backward compatibility
    if (arg2 !== undefined) {
      return lang === "pid" ? arg2 : arg1; // Falls back to English for new languages
    }

    // 3. FALLBACK: If it's just a random string not in the dictionary, return it as-is
    return arg1;
  };

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